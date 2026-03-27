import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { z } from "zod";
import { FACIAL_ANALYSIS_PROMPT } from "@/lib/prompts";
import { buildTreatmentPrompt } from "@/lib/treatmentPrompt";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const MAX_BASE64_BYTES = 5 * 1024 * 1024;

const concernSchema = z.object({
  type: z.string(),
  description: z.string(),
  severity: z.enum(["none", "mild", "moderate"]),
});

const faceZoneSchema = z.object({
  id: z.number(),
  name: z.string(),
  concerns: z.array(concernSchema),
  overlayRegion: z.enum([
    "forehead", "temples", "undereyes", "cheeks",
    "lips", "jawline", "neck", "skin",
  ]),
});

const analysisResultSchema = z.object({
  faceShape: z.string(),
  overallSummary: z.string(),
  zones: z.array(faceZoneSchema).length(8),
});

const treatmentSchema = z.object({
  priority: z.number(),
  name: z.string(),
  reason: z.string(),
  targetZones: z.array(z.string()),
  timeline: z.string(),
});

const treatmentPlanSchema = z.object({
  planSummary: z.string(),
  treatments: z.array(treatmentSchema).min(1).max(5),
  disclaimer: z.string(),
  timelineNote: z.string(),
});

function cleanJsonResponse(text: string): string {
  return text
    .trim()
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/, "")
    .trim();
}

export async function POST(req: NextRequest) {
  try {
    const { imageDataUrl } = await req.json();

    if (!imageDataUrl || !imageDataUrl.startsWith("data:image/")) {
      return NextResponse.json({ error: "Invalid image data" }, { status: 400 });
    }

    const base64 = imageDataUrl.split(",")[1];

    if (base64.length > MAX_BASE64_BYTES) {
      return NextResponse.json(
        { error: "Image too large. Please use a smaller photo." },
        { status: 413 }
      );
    }

    const mediaType = imageDataUrl.split(";")[0].split(":")[1] as
      | "image/jpeg"
      | "image/png"
      | "image/webp";

    // === PASS 1: Vision Analysis ===
    const pass1Response = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 2048,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              source: { type: "base64", media_type: mediaType, data: base64 },
            },
            {
              type: "text",
              text: FACIAL_ANALYSIS_PROMPT,
            },
          ],
        },
      ],
    });

    const pass1Text =
      pass1Response.content[0].type === "text" ? pass1Response.content[0].text : "";
    const cleanedPass1 = cleanJsonResponse(pass1Text);

    let parsedAnalysis: unknown;
    try {
      parsedAnalysis = JSON.parse(cleanedPass1);
    } catch {
      console.error("Pass 1 returned non-JSON:", pass1Text.slice(0, 200));
      return NextResponse.json(
        { error: "Analysis failed. Please try again." },
        { status: 500 }
      );
    }

    const analysisResult = analysisResultSchema.safeParse(parsedAnalysis);
    if (!analysisResult.success) {
      console.error("Pass 1 schema validation failed:", analysisResult.error);
      return NextResponse.json(
        { error: "Analysis failed. Please try again." },
        { status: 500 }
      );
    }

    // === PASS 2: Treatment Recommendation ===
    const treatmentPrompt = buildTreatmentPrompt(JSON.stringify(analysisResult.data, null, 2));

    const pass2Response = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 2048,
      messages: [
        {
          role: "user",
          content: treatmentPrompt,
        },
      ],
    });

    const pass2Text =
      pass2Response.content[0].type === "text" ? pass2Response.content[0].text : "";
    const cleanedPass2 = cleanJsonResponse(pass2Text);

    let parsedPlan: unknown;
    try {
      parsedPlan = JSON.parse(cleanedPass2);
    } catch {
      console.error("Pass 2 returned non-JSON:", pass2Text.slice(0, 200));
      return NextResponse.json({
        analysisResult: analysisResult.data,
        treatmentPlan: null,
      });
    }

    const treatmentPlan = treatmentPlanSchema.safeParse(parsedPlan);
    if (!treatmentPlan.success) {
      console.error("Pass 2 schema validation failed:", treatmentPlan.error);
      return NextResponse.json({
        analysisResult: analysisResult.data,
        treatmentPlan: null,
      });
    }

    return NextResponse.json({
      analysisResult: analysisResult.data,
      treatmentPlan: treatmentPlan.data,
    });
  } catch (error) {
    console.error("Analysis error:", error);
    return NextResponse.json(
      { error: "Analysis failed. Please try again." },
      { status: 500 }
    );
  }
}
