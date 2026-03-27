"use client";

import { motion } from "framer-motion";
import { TreatmentRecommendation } from "@/lib/types";
import { getTestimonialForTreatment, getExpertiseForTreatment } from "@/lib/trustData";

interface Props {
  treatment: TreatmentRecommendation;
}

export default function TreatmentCard({ treatment }: Props) {
  const testimonial = getTestimonialForTreatment(treatment.name);
  const expertise = getExpertiseForTreatment(treatment.name);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: treatment.priority * 0.1, duration: 0.4 }}
      className="card p-4 space-y-3"
    >
      <div className="flex items-start gap-3">
        <div className="w-7 h-7 rounded-full bg-coral/15 flex items-center justify-center flex-shrink-0">
          <span className="font-sans text-[11px] text-coral font-bold">{treatment.priority}</span>
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-serif text-[1.1rem] italic text-slate leading-tight">
            {treatment.name}
          </h4>
          <p className="font-sans text-[10px] text-teal/60 mt-0.5 font-semibold tracking-wide uppercase">
            {treatment.timeline}
          </p>
        </div>
      </div>

      <p className="font-sans text-[11px] text-graphite/55 leading-relaxed">
        {treatment.reason}
      </p>

      <div className="flex flex-wrap gap-1.5">
        {treatment.targetZones.map((zone) => (
          <span
            key={zone}
            className="font-sans text-[9px] text-teal/70 bg-teal/8 px-2 py-0.5 rounded-full font-semibold tracking-wide"
          >
            {zone}
          </span>
        ))}
      </div>

      {expertise && (
        <div className="bg-slate/[0.03] rounded-lg px-3 py-2.5 border border-slate/5">
          <p className="font-sans text-[9px] text-teal/60 font-bold tracking-wide uppercase mb-1">
            Dr. Stolte&apos;s Expertise
          </p>
          <p className="font-sans text-[10px] text-graphite/50 leading-relaxed">
            {expertise}
          </p>
        </div>
      )}

      <div className="bg-ivory rounded-lg px-3 py-2.5 border border-coral/10">
        <div className="flex items-center gap-1 mb-1.5">
          <div className="flex gap-0.5">
            {Array.from({ length: testimonial.rating }).map((_, i) => (
              <svg key={i} className="w-2.5 h-2.5 text-coral" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="font-sans text-[9px] text-coral/60 font-semibold ml-1">
            Verified Patient
          </span>
        </div>
        <p className="font-serif text-[11px] italic text-slate/70 leading-relaxed">
          &ldquo;{testimonial.quote}&rdquo;
        </p>
        <p className="font-sans text-[9px] text-graphite/35 mt-1.5 font-semibold">
          — {testimonial.name}
        </p>
      </div>
    </motion.div>
  );
}
