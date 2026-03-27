export type Screen =
  | "landing"
  | "capture"
  | "analyzing"
  | "gate"
  | "results"
  | "booking";

export type Severity = "none" | "mild" | "moderate";

export type OverlayRegion =
  | "forehead"
  | "temples"
  | "undereyes"
  | "cheeks"
  | "lips"
  | "jawline"
  | "neck"
  | "skin";

export interface Concern {
  type: string;
  description: string;
  severity: Severity;
}

export interface FaceZone {
  id: number;
  name: string;
  concerns: Concern[];
  overlayRegion: OverlayRegion;
}

export interface AnalysisResult {
  faceShape: string;
  overallSummary: string;
  zones: FaceZone[];
}

export interface TreatmentRecommendation {
  priority: number;
  name: string;
  reason: string;
  targetZones: string[];
  timeline: string;
}

export interface TreatmentPlan {
  planSummary: string;
  treatments: TreatmentRecommendation[];
  disclaimer: string;
  timelineNote: string;
}

export interface LeadData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  marketingConsent: boolean;
}

export interface AppState {
  screen: Screen;
  imageDataUrl: string | null;
  analysisResult: AnalysisResult | null;
  treatmentPlan: TreatmentPlan | null;
  leadData: LeadData | null;
}
