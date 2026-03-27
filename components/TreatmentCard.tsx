"use client";

import { motion } from "framer-motion";
import { TreatmentRecommendation } from "@/lib/types";

interface Props {
  treatment: TreatmentRecommendation;
}

export default function TreatmentCard({ treatment }: Props) {
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
    </motion.div>
  );
}
