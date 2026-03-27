export interface Treatment {
  name: string;
  description: string;
  concernTypes: string[];
}

export const TREATMENT_CATALOG: Treatment[] = [
  {
    name: "Anti-Wrinkle Injections",
    description: "Relaxes muscles to smooth forehead lines, frown lines, crow's feet, and bunny lines. Results in 4-10 days, lasting approximately 12 weeks.",
    concernTypes: ["fine_lines", "wrinkles", "dynamic_lines", "crow_feet", "frown_lines"],
  },
  {
    name: "Dermal Fillers (Juvederm)",
    description: "Hyaluronic acid fillers for lip augmentation, cheek enhancement, and facial contouring. Creates fuller, more defined features.",
    concernTypes: ["volume_loss", "lip_volume", "cheek_volume", "facial_contouring"],
  },
  {
    name: "Tear Trough Filler",
    description: "Corrects under-eye hollowing and dark circles by restoring volume to the tear trough area.",
    concernTypes: ["tear_troughs", "under_eye_hollowing", "dark_circles"],
  },
  {
    name: "Jawline Filler",
    description: "Defines the jawline, improves jowling, and creates a more sculpted lower face profile.",
    concernTypes: ["jawline_definition", "jowling", "chin_projection"],
  },
  {
    name: "Profhilo",
    description: "Premium injectable skin hydration using pure hyaluronic acid. Improves skin quality, hydration, and fine lines. Best results with 2 treatments 1 month apart.",
    concernTypes: ["skin_hydration", "fine_lines", "skin_quality", "skin_laxity", "crepiness"],
  },
  {
    name: "HArmonyCa",
    description: "Dual-action filler combining hyaluronic acid with calcium hydroxyapatite. Stimulates collagen and gives immediate lift to lower face. Just one treatment needed.",
    concernTypes: ["volume_loss", "skin_laxity", "collagen_loss", "cheek_hollowing", "jowling"],
  },
  {
    name: "HIFU",
    description: "High-Intensity Focused Ultrasound for non-surgical skin lifting and tightening. Targets deep skin layers to stimulate collagen production.",
    concernTypes: ["skin_laxity", "sagging", "double_chin", "neck_laxity", "neck_bands", "brow_ptosis"],
  },
  {
    name: "Endolift",
    description: "Non-surgical facelift using laser technology. Highly effective for face and neck tightening and sculpting.",
    concernTypes: ["skin_laxity", "sagging", "neck_laxity", "jowling", "facial_contouring"],
  },
  {
    name: "HydraFacial",
    description: "Multi-award-winning 5-in-1 facial: deep cleansing, exfoliation, extraction, serum boost, and LED therapy. Instant glow visible from first treatment.",
    concernTypes: ["skin_texture", "pores", "dullness", "congestion", "dehydration"],
  },
  {
    name: "SkinPen Microneedling",
    description: "Creates micro-channels to stimulate collagen production. Improves fine lines, acne scarring, stretch marks, and overall skin texture. 3-6 sessions recommended.",
    concernTypes: ["skin_texture", "acne_scarring", "fine_lines", "stretch_marks", "scarring"],
  },
  {
    name: "Tixel",
    description: "Award-winning skin rejuvenation that resurfaces and tightens skin. Treats fine lines, sun damage, discolouration, and acne scars with minimal downtime.",
    concernTypes: ["fine_lines", "sun_damage", "pigmentation", "acne_scarring", "skin_texture"],
  },
  {
    name: "LaseMD Ultra — Mela Bright",
    description: "Laser treatment targeting melanin and pigmentation. Brightens and evens skin tone.",
    concernTypes: ["pigmentation", "melasma", "dark_spots", "uneven_tone"],
  },
  {
    name: "LaseMD Ultra — Rosacea Calm",
    description: "Specialised laser protocol for calming rosacea, reducing redness and inflammation.",
    concernTypes: ["rosacea", "redness", "flushing", "vascular"],
  },
  {
    name: "LaseMD Ultra — Sun Damage Correction",
    description: "Targets sun-damaged skin to reverse signs of photoaging.",
    concernTypes: ["sun_damage", "photoaging", "fine_lines", "pigmentation"],
  },
  {
    name: "DermaV",
    description: "Cutting-edge treatment for vascular and pigmented lesions. Combines optimal wavelength with skin-cooling for comfort and effectiveness.",
    concernTypes: ["redness", "vascular", "thread_veins", "pigmentation", "rosacea"],
  },
  {
    name: "ThermaVein",
    description: "Permanent treatment for thread/spider veins using thermo-coagulation. No scarring or bruising, often only 1-2 treatments needed.",
    concernTypes: ["thread_veins", "spider_veins", "vascular"],
  },
  {
    name: "Polynucleotides",
    description: "Anti-ageing injections that stimulate tissue repair and skin regeneration from within. Works as both rejuvenation for older skin and prevention for younger skin.",
    concernTypes: ["skin_quality", "fine_lines", "skin_laxity", "collagen_loss", "skin_regeneration"],
  },
  {
    name: "PRX-T33 Peel",
    description: "No-peel peel with no pain or downtime. Penetrates deeper skin layers without damaging outer layers. Targets acne, fine lines, sun damage, and pigmentation.",
    concernTypes: ["skin_texture", "fine_lines", "pigmentation", "acne", "sun_damage"],
  },
  {
    name: "Fire and Ice Facial",
    description: "Professional resurfacing peel with no downtime and immediate results. Rapidly resurfaces skin, reducing fine lines whilst encouraging cellular renewal.",
    concernTypes: ["skin_texture", "fine_lines", "dullness", "cellular_renewal"],
  },
  {
    name: "3D DermaForce",
    description: "Award-winning device combining ultrasound, radiofrequency, and shockwave therapy for skin tightening, body contouring, and cellulite reduction.",
    concernTypes: ["skin_laxity", "skin_tightening", "contouring"],
  },
  {
    name: "Barcode Line Filler",
    description: "Targeted filler treatment for vertical lip lines (smoker's lines) around the mouth.",
    concernTypes: ["barcode_lines", "smoker_lines", "perioral_lines"],
  },
  {
    name: "Aqualyx",
    description: "Fat dissolving injections for localised fat deposits. Effectively reduces stubborn areas of fat.",
    concernTypes: ["double_chin", "submental_fat", "fat_deposits"],
  },
];

export function getCatalogForPrompt(): string {
  return TREATMENT_CATALOG.map(
    (t) => `- **${t.name}**: ${t.description} [Targets: ${t.concernTypes.join(", ")}]`
  ).join("\n");
}
