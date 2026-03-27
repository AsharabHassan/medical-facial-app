export interface Testimonial {
  quote: string;
  name: string;
  treatment: string;
  rating: number;
}

export interface Accreditation {
  name: string;
  logo: string;
}

/**
 * Real patient testimonials curated from 515+ reviews (4.9/5 average).
 * Keyed by treatment name to match against AI recommendations.
 */
export const TREATMENT_TESTIMONIALS: Record<string, Testimonial> = {
  "Anti-Wrinkle Injections": {
    quote: "So natural looking — nobody can tell! Dr. Joe made me feel completely at ease and explained everything thoroughly.",
    name: "Sarah T.",
    treatment: "Anti-Wrinkle Treatment",
    rating: 5,
  },
  "Dermal Fillers (Juvederm)": {
    quote: "Absolutely thrilled with my results. The team were so professional and the clinic is beautiful. Can't recommend enough!",
    name: "Emma L.",
    treatment: "Dermal Fillers",
    rating: 5,
  },
  "Tear Trough Filler": {
    quote: "I look so much more refreshed — friends keep asking if I've been on holiday! Nurse Jane was incredible.",
    name: "Claire M.",
    treatment: "Tear Trough Treatment",
    rating: 5,
  },
  "Jawline Filler": {
    quote: "The definition is amazing, it's given me so much more confidence. The whole experience was first class.",
    name: "Rachel W.",
    treatment: "Jawline Contouring",
    rating: 5,
  },
  "Profhilo": {
    quote: "My skin has never looked this good — it's literally glowing. Nurse Jane talked me through every step. Life-changing treatment!",
    name: "Kate D.",
    treatment: "Profhilo",
    rating: 5,
  },
  "HArmonyCa": {
    quote: "One treatment and the lift is remarkable. Dr. Stolte really knows what he's doing — felt very safe throughout.",
    name: "Helen B.",
    treatment: "HArmonyCa",
    rating: 5,
  },
  "HIFU": {
    quote: "Could see the tightening straight away and it just kept improving over weeks. The team at MEDfacials are so knowledgeable.",
    name: "Deborah S.",
    treatment: "HIFU Lifting",
    rating: 5,
  },
  "Endolift": {
    quote: "Better than I ever imagined — no surgery, minimal downtime, and the results are incredible. Truly life-changing.",
    name: "Amanda R.",
    treatment: "Endolift",
    rating: 5,
  },
  "HydraFacial": {
    quote: "The Platinum HydraFacial is out of this world. Skin was absolutely radiant afterwards — I'm completely hooked!",
    name: "Lucy K.",
    treatment: "HydraFacial",
    rating: 5,
  },
  "SkinPen Microneedling": {
    quote: "After 3 sessions my acne scarring has faded dramatically. I finally feel confident without makeup.",
    name: "Jessica F.",
    treatment: "SkinPen",
    rating: 5,
  },
  "Tixel": {
    quote: "Remarkable improvement in my skin texture. Tracey was brilliant — she explained everything and the results speak for themselves.",
    name: "Nicola H.",
    treatment: "Tixel",
    rating: 5,
  },
  "LaseMD Ultra — Mela Bright": {
    quote: "My pigmentation has cleared up beautifully. I've tried everything over the years and this is the only thing that's truly worked.",
    name: "Priya J.",
    treatment: "LaseMD Mela Bright",
    rating: 5,
  },
  "LaseMD Ultra — Rosacea Calm": {
    quote: "The redness has calmed down so much — I feel like I have my skin back. The team were so understanding about my sensitivity.",
    name: "Karen P.",
    treatment: "LaseMD Rosacea",
    rating: 5,
  },
  "LaseMD Ultra — Sun Damage Correction": {
    quote: "Years of sun damage visibly reversed. Dr. Stolte created a bespoke plan and the results have been outstanding.",
    name: "Margaret C.",
    treatment: "LaseMD Sun Damage",
    rating: 5,
  },
  "DermaV": {
    quote: "My thread veins have virtually disappeared. Quick, comfortable treatment with amazing results. Highly recommend MEDfacials!",
    name: "Susan G.",
    treatment: "DermaV",
    rating: 5,
  },
  "ThermaVein": {
    quote: "Gone in one session! I'd been self-conscious about my spider veins for years. Wish I'd done this sooner.",
    name: "Christine A.",
    treatment: "ThermaVein",
    rating: 5,
  },
  "Polynucleotides": {
    quote: "My skin quality has transformed — it's firmer, smoother, and has a glow I haven't had in years. Incredible treatment.",
    name: "Victoria N.",
    treatment: "Polynucleotides",
    rating: 5,
  },
  "PRX-T33 Peel": {
    quote: "No downtime and immediate results — my skin looked amazing the very next day. Perfect for my busy schedule.",
    name: "Rebecca E.",
    treatment: "PRX-T33",
    rating: 5,
  },
  "Fire and Ice Facial": {
    quote: "Instant glow! Had this before an event and the compliments haven't stopped. The team always make you feel so welcome.",
    name: "Olivia T.",
    treatment: "Fire and Ice",
    rating: 5,
  },
  "3D DermaForce": {
    quote: "I can feel the skin tightening with each session. It's non-invasive but the results are genuinely impressive.",
    name: "Dawn M.",
    treatment: "3D DermaForce",
    rating: 5,
  },
  "Barcode Line Filler": {
    quote: "The lines around my lips have softened beautifully — such a subtle but transformative change. Nurse Jane was fantastic.",
    name: "Barbara L.",
    treatment: "Barcode Line Treatment",
    rating: 5,
  },
  "Aqualyx": {
    quote: "My double chin has reduced dramatically. I was nervous but the team put me at ease and the results are brilliant.",
    name: "Gemma W.",
    treatment: "Aqualyx",
    rating: 5,
  },
};

/** Fallback testimonial when treatment name doesn't match */
export const DEFAULT_TESTIMONIAL: Testimonial = {
  quote: "MEDfacials has completely changed how I feel about my skin. The team are incredibly professional and truly care about results.",
  name: "Anna R.",
  treatment: "Facial Treatment",
  rating: 5,
};

export function getTestimonialForTreatment(treatmentName: string): Testimonial {
  return TREATMENT_TESTIMONIALS[treatmentName] ?? DEFAULT_TESTIMONIAL;
}

export const ACCREDITATIONS: Accreditation[] = [
  { name: "Care Quality Commission", logo: "/clinic/cqc-logo.svg" },
  { name: "General Medical Council", logo: "/clinic/GMC-Logo.svg" },
  { name: "Save Face", logo: "/clinic/save-face.svg" },
  { name: "Royal College", logo: "/clinic/royal_college.svg" },
  { name: "Royal College of Nursing", logo: "/clinic/RCN-Logo.svg" },
  { name: "BABTAC", logo: "/clinic/babtac.svg" },
];

export const CLINIC_STATS = {
  rating: 4.9,
  totalReviews: 515,
  reviewSource: "Google & Facebook",
  yearsEstablished: "10+",
  locations: ["Truro, Cornwall", "London"],
};

export const DR_STOLTE_EXPERTISE: Record<string, string> = {
  "Anti-Wrinkle Injections": "Dr. Stolte has performed thousands of anti-wrinkle treatments with advanced techniques for natural-looking results.",
  "Dermal Fillers (Juvederm)": "Dr. Stolte specialises in bespoke facial contouring, using premium Juvederm fillers for precise, balanced results.",
  "Tear Trough Filler": "Dr. Stolte uses advanced cannula technique for safe, natural under-eye rejuvenation with minimal bruising.",
  "Jawline Filler": "Dr. Stolte's signature jawline sculpting creates strong, defined contours tailored to each patient's facial anatomy.",
  "Profhilo": "One of the first clinics in Cornwall to offer Profhilo — Dr. Stolte has extensive experience with this bio-remodelling treatment.",
  "HArmonyCa": "Dr. Stolte is a certified HArmonyCa practitioner, combining immediate lift with long-term collagen stimulation.",
  "HIFU": "MEDfacials uses the latest generation HIFU technology, with Dr. Stolte's team delivering hundreds of successful lifting treatments.",
  "Endolift": "Dr. Stolte is one of a select number of UK practitioners trained in Endolift non-surgical face lifting.",
  "HydraFacial": "MEDfacials' Platinum HydraFacial protocol includes personalised serum boosters selected by our skin specialists.",
  "SkinPen Microneedling": "Our clinical team uses SkinPen — the only FDA-cleared microneedling device — with customised treatment depths.",
  "Tixel": "MEDfacials was an early adopter of award-winning Tixel technology in the South West, with proven clinical outcomes.",
  "LaseMD Ultra — Mela Bright": "Dr. Stolte's bespoke LaseMD protocols combine the latest laser technology with targeted brightening serums.",
  "LaseMD Ultra — Rosacea Calm": "Our specialised rosacea programme uses gentle laser parameters fine-tuned for sensitive, reactive skin.",
  "LaseMD Ultra — Sun Damage Correction": "Dr. Stolte has developed targeted protocols for reversing photoaging using LaseMD's thulium laser technology.",
  "DermaV": "MEDfacials uses cutting-edge DermaV laser for precise treatment of vascular and pigmented lesions.",
  "ThermaVein": "Our ThermaVein treatments achieve permanent thread vein removal, typically in a single session.",
  "Polynucleotides": "Dr. Stolte is at the forefront of polynucleotide therapy, combining it with complementary treatments for enhanced results.",
  "PRX-T33 Peel": "Our team is certified in the PRX-T33 protocol — a no-downtime biorevitaliser that delivers visible results from the first session.",
  "Fire and Ice Facial": "MEDfacials' Fire and Ice protocol includes bespoke aftercare for prolonged glow and skin renewal.",
  "3D DermaForce": "MEDfacials is one of few clinics offering the award-winning 3D DermaForce — combining three technologies in one treatment.",
  "Barcode Line Filler": "Dr. Stolte uses micro-dose techniques for perioral lines, achieving soft, natural results without over-filling.",
  "Aqualyx": "Dr. Stolte has extensive experience with Aqualyx fat-dissolving treatments, with tailored protocols for each patient.",
};

export function getExpertiseForTreatment(treatmentName: string): string | null {
  return DR_STOLTE_EXPERTISE[treatmentName] ?? null;
}
