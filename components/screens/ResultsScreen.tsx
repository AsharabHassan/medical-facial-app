"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useApp } from "@/lib/store";
import FaceOverlay from "@/components/FaceOverlay";
import ZoneCard from "@/components/ZoneCard";
import TreatmentPlan from "@/components/TreatmentPlan";

type Tab = "zones" | "plan";

export default function ResultsScreen() {
  const { state, dispatch } = useApp();
  const [activeZoneId, setActiveZoneId] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>("zones");
  const { analysisResult, treatmentPlan, imageDataUrl, leadData } = state;

  if (!analysisResult || !imageDataUrl) {
    dispatch({ type: "SET_SCREEN", screen: "landing" });
    return null;
  }

  return (
    <div className="screen pb-12">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full space-y-5"
      >
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="label-xs">Facial Analysis Report</span>
            <span className="font-sans text-[9px] text-teal/40 tracking-wider font-semibold uppercase">
              {analysisResult.faceShape} Face
            </span>
          </div>
          <div className="w-full h-px bg-teal/15" />
          <h2 className="font-serif text-[2.6rem] font-normal italic text-slate leading-[1.05]">
            {leadData?.firstName ? `${leadData.firstName}'s` : "Your"}<br />
            Results.
          </h2>
        </div>

        <div className="relative">
          <FaceOverlay
            imageDataUrl={imageDataUrl}
            zones={analysisResult.zones}
            activeZoneId={activeZoneId}
            onZoneClick={setActiveZoneId}
          />
          <div className="mt-2 flex items-center justify-between">
            <span className="font-sans text-[9px] text-graphite/25 tracking-widest uppercase">Tap zone to inspect</span>
            <span className="font-sans text-[9px] text-teal/35 font-semibold">{analysisResult.zones.length} Zones</span>
          </div>
        </div>

        <div className="border-l-[3px] border-teal/30 pl-4 py-1 space-y-1.5">
          <p className="label-xs">Assessment Summary</p>
          <p className="font-serif text-[1rem] italic text-slate/70 leading-relaxed">
            {analysisResult.overallSummary}
          </p>
        </div>

        <div className="flex gap-1 bg-slate/[0.04] rounded-xl p-1">
          <button
            className={`flex-1 py-2.5 rounded-lg font-sans text-[11px] font-bold tracking-wide uppercase transition-all ${
              activeTab === "zones"
                ? "bg-white text-slate shadow-sm"
                : "text-graphite/40 hover:text-graphite/60"
            }`}
            onClick={() => setActiveTab("zones")}
          >
            Zone Analysis
          </button>
          <button
            className={`flex-1 py-2.5 rounded-lg font-sans text-[11px] font-bold tracking-wide uppercase transition-all ${
              activeTab === "plan"
                ? "bg-white text-slate shadow-sm"
                : "text-graphite/40 hover:text-graphite/60"
            }`}
            onClick={() => setActiveTab("plan")}
          >
            Treatment Plan
          </button>
        </div>

        {activeTab === "zones" && (
          <div className="space-y-0">
            <p className="label-xs mb-3">Zone Breakdown</p>
            {analysisResult.zones.map((zone) => (
              <ZoneCard
                key={zone.id}
                zone={zone}
                isActive={activeZoneId === zone.id}
                onClick={() => setActiveZoneId(activeZoneId === zone.id ? null : zone.id)}
              />
            ))}
          </div>
        )}

        {activeTab === "plan" && treatmentPlan && (
          <TreatmentPlan plan={treatmentPlan} />
        )}

        {activeTab === "plan" && !treatmentPlan && (
          <div className="card p-6 text-center">
            <p className="font-sans text-[11px] text-graphite/40">
              Treatment plan unavailable. Please book a consultation for personalised recommendations.
            </p>
          </div>
        )}

        <p className="font-sans text-[9px] text-graphite/20 text-center leading-relaxed tracking-wide uppercase">
          AI-Generated · For Informational Purposes Only<br />
          Treatment Plans Confirmed at Consultation
        </p>

        <button
          className="btn-coral w-full"
          onClick={() => dispatch({ type: "SET_SCREEN", screen: "booking" })}
        >
          Book Free Consultation
        </button>
      </motion.div>
    </div>
  );
}
