"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

const TESTIMONIALS = [
  { quote: "My skin has never looked this good — it's literally glowing.", name: "Kate D.", treatment: "Profhilo", rating: 5 },
  { quote: "So natural looking — nobody can tell! Dr. Joe made me feel completely at ease.", name: "Sarah T.", treatment: "Anti-Wrinkle", rating: 5 },
  { quote: "Absolutely thrilled with my results. The team were so professional.", name: "Emma L.", treatment: "Dermal Fillers", rating: 5 },
  { quote: "Could see the tightening straight away and it just kept improving.", name: "Deborah S.", treatment: "HIFU Lifting", rating: 5 },
];

const FACTS = [
  "Dr. Stolte has over 10 years of aesthetic experience",
  "MEDfacials is CQC registered for your safety",
  "Over 515 five-star patient reviews",
  "Two locations: Truro, Cornwall & London",
];

export default function AnalyzingScreen() {
  const { state, dispatch } = useApp();
  const [activeZone, setActiveZone] = useState(0);
  const [phase, setPhase] = useState<1 | 2>(1);
  const [dots, setDots] = useState(".");
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const [factIdx, setFactIdx] = useState(0);
  const [progress, setProgress] = useState(0);

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
    const testimonialInterval = setInterval(() => {
      setTestimonialIdx((p) => (p + 1) % TESTIMONIALS.length);
    }, 4000);
    const factInterval = setInterval(() => {
      setFactIdx((p) => (p + 1) % FACTS.length);
    }, 5000);
    const progressInterval = setInterval(() => {
      setProgress((p) => Math.min(p + 0.5, 95));
    }, 300);
    return () => {
      clearInterval(zoneInterval);
      clearInterval(dotInterval);
      clearInterval(testimonialInterval);
      clearInterval(factInterval);
      clearInterval(progressInterval);
    };
  }, []);

  const testimonial = TESTIMONIALS[testimonialIdx];

  return (
    <div className="screen items-stretch justify-between relative overflow-hidden py-10">

      {/* Clinic image background */}
      <div className="absolute inset-0">
        <img
          src="/clinic/clinic-medfacials-59-banner-2000x600px-c.jpg"
          alt=""
          className="w-full h-full object-cover opacity-[0.08]"
          style={{ filter: "grayscale(60%) blur(2px)" }}
        />
        <div className="absolute inset-0 bg-ivory/[0.88]" />
      </div>

      {state.imageDataUrl && (
        <div className="absolute inset-0">
          <img
            src={state.imageDataUrl}
            alt=""
            className="w-full h-full object-cover opacity-[0.04]"
            style={{ filter: "grayscale(100%) contrast(1.2)" }}
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(255,249,239,0.95) 0%, rgba(255,249,239,0.8) 50%, rgba(255,249,239,0.95) 100%)" }} />
        </div>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="relative z-10 flex flex-col justify-between h-full flex-1 gap-6"
      >
        <div className="flex items-center justify-between">
          <span className="label-xs">MEDfacials · Analysis</span>
          <span className="font-sans text-[9px] text-teal/50 tracking-widest font-semibold">
            {phase === 1 ? "ANALYSING" : "PLANNING"} <span className="animate-blink">●</span>
          </span>
        </div>

        <div className="flex flex-col items-center gap-4 text-center">
          <div className="space-y-2">
            <h2 className="font-serif text-[3rem] italic text-slate leading-none tracking-tight">
              {phase === 1 ? "Analysing" : "Building Plan"}
            </h2>
            <p className="font-sans text-[10px] text-teal/60 tracking-widest uppercase font-semibold">
              {phase === 1 ? `Scanning facial zones${dots}` : `Creating your treatment plan${dots}`}
            </p>
          </div>

          {/* Progress bar */}
          <div className="w-full max-w-[240px] h-1 bg-slate/[0.06] rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ background: "linear-gradient(90deg, #4CA6A2, #F8B188)" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Zone scan readout */}
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

        {/* Trust carousel + facts */}
        <div className="space-y-3">
          {/* Testimonial carousel */}
          <div className="card px-4 py-3 min-h-[72px] relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={testimonialIdx}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4 }}
              >
                <div className="flex items-center gap-0.5 mb-1.5">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <svg key={i} className="w-2.5 h-2.5 text-coral" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="font-sans text-[8px] text-graphite/30 ml-1.5">{testimonial.treatment}</span>
                </div>
                <p className="font-serif text-[11px] italic text-slate/60 leading-relaxed">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <p className="font-sans text-[9px] text-graphite/30 mt-1 font-semibold">— {testimonial.name}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Did you know facts */}
          <div className="text-center min-h-[20px]">
            <AnimatePresence mode="wait">
              <motion.p
                key={factIdx}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="font-sans text-[9px] text-teal/50 tracking-wide"
              >
                {FACTS[factIdx]}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
