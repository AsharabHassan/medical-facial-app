import { NextRequest, NextResponse } from "next/server";
import {
  AnalysisResult,
  OverlayRegion,
  Severity,
  TreatmentPlan,
} from "@/lib/types";

const REGIONS: OverlayRegion[] = [
  "forehead",
  "temples",
  "undereyes",
  "cheeks",
  "lips",
  "jawline",
  "neck",
  "skin",
];

function worstSeverity(severities: Severity[]): Severity {
  if (severities.includes("moderate")) return "moderate";
  if (severities.includes("mild")) return "mild";
  return "none";
}

function flattenAnalysis(result: AnalysisResult | null | undefined): Record<string, string | number> {
  const out: Record<string, string | number> = {
    faceShape: "",
    overallSummary: "",
    concernsTotal: 0,
    concernsModerate: 0,
    concernsMild: 0,
    worstSeverity: "none",
    moderateZones: "",
    mildZones: "",
  };
  for (const region of REGIONS) {
    out[`${region}Severity`] = "none";
    out[`${region}Concerns`] = "";
  }
  if (!result) return out;

  const allConcerns = result.zones.flatMap((z) => z.concerns);
  const moderate = allConcerns.filter((c) => c.severity === "moderate").length;
  const mild = allConcerns.filter((c) => c.severity === "mild").length;

  out.faceShape = result.faceShape ?? "";
  out.overallSummary = result.overallSummary ?? "";
  out.concernsTotal = moderate + mild;
  out.concernsModerate = moderate;
  out.concernsMild = mild;
  out.worstSeverity = worstSeverity(allConcerns.map((c) => c.severity));
  out.moderateZones = result.zones
    .filter((z) => z.concerns.some((c) => c.severity === "moderate"))
    .map((z) => z.name)
    .join(", ");
  out.mildZones = result.zones
    .filter((z) => z.concerns.some((c) => c.severity === "mild"))
    .map((z) => z.name)
    .join(", ");

  for (const region of REGIONS) {
    const zone = result.zones.find((z) => z.overlayRegion === region);
    const severities = zone?.concerns.map((c) => c.severity) ?? [];
    const concerns =
      zone?.concerns
        .filter((c) => c.severity !== "none")
        .map((c) => `${c.type} (${c.severity})`)
        .join("; ") ?? "";
    out[`${region}Severity`] = worstSeverity(severities);
    out[`${region}Concerns`] = concerns;
  }

  return out;
}

function flattenPlan(plan: TreatmentPlan | null | undefined): Record<string, string | number> {
  const out: Record<string, string | number> = {
    planSummary: "",
    timelineNote: "",
    treatmentsCount: 0,
    treatmentsList: "",
  };
  for (let i = 1; i <= 5; i++) {
    out[`treatment${i}Name`] = "";
    out[`treatment${i}Reason`] = "";
    out[`treatment${i}Timeline`] = "";
    out[`treatment${i}Zones`] = "";
  }
  if (!plan) return out;

  const sorted = [...plan.treatments].sort((a, b) => a.priority - b.priority);
  out.planSummary = plan.planSummary ?? "";
  out.timelineNote = plan.timelineNote ?? "";
  out.treatmentsCount = sorted.length;
  out.treatmentsList = sorted.map((t) => t.name).join(", ");

  sorted.slice(0, 5).forEach((t, idx) => {
    const n = idx + 1;
    out[`treatment${n}Name`] = t.name ?? "";
    out[`treatment${n}Reason`] = t.reason ?? "";
    out[`treatment${n}Timeline`] = t.timeline ?? "";
    out[`treatment${n}Zones`] = (t.targetZones ?? []).join(", ");
  });

  return out;
}

export async function POST(req: NextRequest) {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      marketingConsent,
      analysisResult,
      treatmentPlan,
    } = await req.json();

    const webhookUrl = process.env.GHL_WEBHOOK_URL;
    if (!webhookUrl) {
      console.warn("GHL_WEBHOOK_URL not set — lead not forwarded to CRM");
      return NextResponse.json({ success: true, warning: "CRM webhook not configured" });
    }

    const fullName = [firstName, lastName].filter(Boolean).join(" ");

    const payload = {
      firstName: firstName ?? "",
      lastName: lastName ?? "",
      fullName,
      email: email ?? "",
      phone: phone ?? "",
      marketingConsent: marketingConsent ? "Yes" : "No",
      marketingConsentBool: Boolean(marketingConsent),
      source: "MEDfacials Facial Analysis App",
      tag: "medfacials-analysis-lead",
      submittedAt: new Date().toISOString(),
      ...flattenAnalysis(analysisResult),
      ...flattenPlan(treatmentPlan),
    };

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => "");
      console.error("GHL webhook error:", response.status, errorText);
      return NextResponse.json({ success: true, warning: "CRM sync failed" });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Lead submission error:", error);
    return NextResponse.json({ success: true, warning: "CRM sync failed" });
  }
}
