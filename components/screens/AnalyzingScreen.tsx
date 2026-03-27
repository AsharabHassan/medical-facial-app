"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useApp } from "@/lib/store";

const ZONES = [
  { id: "01", name: "FOREHEAD" },
  { id: "02", name: "TEMPLES" },
  { id: "03", name: "UNDER-EYES" },
  { id: "04", name: "CHEEKS" },
  { id: "05", name: "LIPS" },
  { id: "06", name: "JAWLINE" },
  { id: "07", name: "NECK" },
  { id: "08", name: "OVERALL SKIN" },
];

export default function AnalyzingScreen() {
  const { state, dispatch } = useApp();
  const [activeZone, setActiveZone] = useState(0);
  const [phase, setPhase] = useState<1 | 2>(1);
  const [dots, setDots] = useState(".");

  useEffect(() => {
    if (!state.imageDataUrl) {
      dispatch({ type: "SET_SCREEN", screen: "capture" });
      return;
    }

    let unmounted = false;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 120000);

    const phaseTimer = setTimeout(() => {
      if (!unmounted) setPhase(2);
    }, 8000);

    async function analyze() {
      try {
        const res = await fetch("/api/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ imageDataUrl: state.imageDataUrl }),
          signal: controller.signal,
        });
        clearTimeout(timeout);
        if (unmounted) return;
        const data = await res.json();
        if (data.analysisResult) {
          dispatch({ type: "SET_ANALYSIS", result: data.analysisResult });
          if (data.treatmentPlan) {
            dispatch({ type: "SET_TREATMENT_PLAN", plan: data.treatmentPlan });
          }
          dispatch({ type: "SET_SCREEN", screen: "gate" });
        } else {
          dispatch({ type: "SET_SCREEN", screen: "capture" });
        }
      } catch {
        clearTimeout(timeout);
        if (unmounted) return;
        dispatch({ type: "SET_SCREEN", screen: "capture" });
      }
    }

    analyze();
    return () => { unmounted = true; clearTimeout(timeout); clearTimeout(phaseTimer); controller.abort(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const zoneInterval = setInterval(() => {
      setActiveZone((p) => (p + 1) % ZONES.length);
    }, 600);
    const dotInterval = setInterval(() => {
      setDots((d) => (d.length >= 3 ? "." : d + "."));
    }, 400);
    return () => { clearInterval(zoneInterval); clearInterval(dotInterval); };
  }, []);

  return (
    <div className="screen items-stretch justify-between relative overflow-hidden py-10">

      {state.imageDataUrl && (
        <div className="absolute inset-0">
          <img
            src={state.imageDataUrl}
            alt=""
            className="w-full h-full object-cover opacity-[0.06]"
            style={{ filter: "grayscale(100%) contrast(1.2)" }}
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #FFF9EF 0%, rgba(255,249,239,0.7) 50%, #FFF9EF 100%)" }} />
          <motion.div
            className="absolute inset-x-0 h-[2px] pointer-events-none"
            style={{ background: "linear-gradient(90deg, transparent, rgba(76,166,162,0.5), transparent)" }}
            animate={{ top: ["10%", "90%"] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
          />
        </div>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="relative z-10 flex flex-col justify-between h-full flex-1 gap-8"
      >
        <div className="flex items-center justify-between">
          <span className="label-xs">MEDfacials · Analysis</span>
          <span className="font-sans text-[9px] text-teal/50 tracking-widest font-semibold">
            {phase === 1 ? "ANALYSING" : "PLANNING"} <span className="animate-blink">●</span>
          </span>
        </div>

        <div className="flex flex-col items-center gap-6 text-center">
          <div className="space-y-2">
            <h2 className="font-serif text-[3rem] italic text-slate leading-none tracking-tight">
              {phase === 1 ? "Analysing" : "Building Plan"}
            </h2>
            <p className="font-sans text-[10px] text-teal/60 tracking-widest uppercase font-semibold">
              {phase === 1 ? `Scanning facial zones${dots}` : `Creating your treatment plan${dots}`}
            </p>
          </div>
        </div>

        <div className="font-sans text-[11px] space-y-1.5">
          <div className="text-teal/40 text-[9px] tracking-widest font-semibold mb-3">
            {phase === 1 ? "ZONE SCAN STATUS" : "TREATMENT MATCHING"}
          </div>
          {ZONES.map((zone, i) => {
            const isDone = i < activeZone;
            const isActive = i === activeZone;
            return (
              <motion.div
                key={zone.id}
                className="flex items-center gap-3"
                animate={{ opacity: isDone ? 0.4 : isActive ? 1 : 0.15 }}
                transition={{ duration: 0.2 }}
              >
                <span className="text-teal/60 w-5 font-semibold">{zone.id}</span>
                <span
                  className="text-[9px] tracking-widest font-semibold"
                  style={{ color: isActive ? "#4CA6A2" : isDone ? "rgba(58,71,77,0.5)" : "rgba(58,71,77,0.2)" }}
                >
                  {zone.name}
                </span>
                <span className="flex-1 text-[9px]" style={{ color: "rgba(76,166,162,0.2)" }}>
                  {"·".repeat(12)}
                </span>
                <span
                  className="text-[9px] w-12 text-right font-semibold"
                  style={{ color: isDone ? "rgba(76,166,162,0.6)" : isActive ? "#4CA6A2" : "rgba(58,71,77,0.15)" }}
                >
                  {isDone ? "DONE" : isActive ? "SCAN" : "WAIT"}
                </span>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
