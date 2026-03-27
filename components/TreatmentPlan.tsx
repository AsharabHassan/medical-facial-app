"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { TreatmentPlan as TreatmentPlanType } from "@/lib/types";
import { ACCREDITATIONS, CLINIC_STATS } from "@/lib/trustData";
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
      className="space-y-5"
    >
      {/* Plan Summary */}
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

      {/* Treatment Cards */}
      <div className="space-y-3">
        {plan.treatments.map((treatment) => (
          <TreatmentCard key={treatment.priority} treatment={treatment} />
        ))}
      </div>

      {/* Why MEDfacials Section */}
      <div className="space-y-3 pt-2">
        <p className="label-xs">Why MEDfacials</p>

        {/* Clinic Image */}
        <div className="relative rounded-xl overflow-hidden">
          <Image
            src="/clinic/about-medfacials_2048x.jpg"
            alt="MEDfacials Clinic"
            width={800}
            height={400}
            className="w-full h-40 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate/60 to-transparent" />
          <div className="absolute bottom-3 left-3 right-3">
            <p className="font-serif text-white text-[1rem] italic leading-tight">
              Truro&apos;s Trusted Aesthetic Clinic
            </p>
            <p className="font-sans text-white/70 text-[10px] mt-0.5">
              Truro, Cornwall &bull; London
            </p>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-2">
          <div className="card p-2.5 text-center">
            <p className="font-serif text-[1.3rem] italic text-coral leading-none">{CLINIC_STATS.rating}</p>
            <div className="flex justify-center gap-0.5 mt-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} className="w-2 h-2 text-coral" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="font-sans text-[8px] text-graphite/40 mt-0.5">{CLINIC_STATS.totalReviews}+ Reviews</p>
          </div>
          <div className="card p-2.5 text-center">
            <p className="font-serif text-[1.3rem] italic text-teal leading-none">{CLINIC_STATS.yearsEstablished}</p>
            <p className="font-sans text-[8px] text-graphite/40 mt-1">Years Established</p>
          </div>
          <div className="card p-2.5 text-center">
            <p className="font-serif text-[1.3rem] italic text-slate leading-none">2</p>
            <p className="font-sans text-[8px] text-graphite/40 mt-1">UK Locations</p>
          </div>
        </div>

        {/* Dr. Stolte Credentials */}
        <div className="card p-4 space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-teal/10 flex items-center justify-center flex-shrink-0">
              <span className="font-serif text-[1rem] italic text-teal">Dr</span>
            </div>
            <div>
              <h4 className="font-serif text-[1rem] italic text-slate">Dr. Joe Stolte</h4>
              <p className="font-sans text-[10px] text-teal/60 font-semibold tracking-wide uppercase">
                Lead Aesthetic Practitioner
              </p>
            </div>
          </div>
          <p className="font-sans text-[11px] text-graphite/50 leading-relaxed">
            GMC-registered medical professional with over a decade of experience in aesthetic medicine.
            Dr. Stolte leads a team of specialists across two UK locations, combining clinical
            expertise with the latest non-surgical technologies to deliver safe, natural-looking results.
          </p>
        </div>

        {/* Accreditation Badges */}
        <div className="space-y-2">
          <p className="font-sans text-[9px] text-graphite/30 text-center tracking-widest uppercase">
            Registered &amp; Accredited
          </p>
          <div className="grid grid-cols-3 gap-3">
            {ACCREDITATIONS.map((acc) => (
              <div key={acc.name} className="card p-2.5 flex items-center justify-center">
                <Image
                  src={acc.logo}
                  alt={acc.name}
                  width={80}
                  height={40}
                  className="h-8 w-auto object-contain opacity-60"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-slate/[0.03] rounded-xl p-4 border border-slate/5">
        <p className="font-sans text-[10px] text-graphite/40 leading-relaxed text-center">
          {plan.disclaimer}
        </p>
      </div>
    </motion.div>
  );
}
