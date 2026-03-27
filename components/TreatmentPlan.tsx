"use client";

import { motion } from "framer-motion";
import { TreatmentPlan as TreatmentPlanType } from "@/lib/types";
import TreatmentCard from "./TreatmentCard";

interface Props {
  plan: TreatmentPlanType;
}

export default function TreatmentPlan({ plan }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="space-y-4"
    >
      <div className="border-l-[3px] border-coral/40 pl-4 py-1">
        <p className="label-xs mb-1.5">Your Personalised Plan</p>
        <p className="font-serif text-[1rem] italic text-slate/80 leading-relaxed">
          {plan.planSummary}
        </p>
      </div>

      <div className="flex items-center gap-2 px-1">
        <div className="w-1.5 h-1.5 rounded-full bg-teal/40" />
        <p className="font-sans text-[10px] text-teal/60 font-semibold tracking-wide uppercase">
          {plan.timelineNote}
        </p>
      </div>

      <div className="space-y-3">
        {plan.treatments.map((treatment) => (
          <TreatmentCard key={treatment.priority} treatment={treatment} />
        ))}
      </div>

      <div className="bg-slate/[0.03] rounded-xl p-4 border border-slate/5">
        <p className="font-sans text-[10px] text-graphite/40 leading-relaxed text-center">
          {plan.disclaimer}
        </p>
      </div>
    </motion.div>
  );
}
