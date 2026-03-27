"use client";

import { motion } from "framer-motion";
import { useApp } from "@/lib/store";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11, delayChildren: 0.05 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

export default function LandingScreen() {
  const { dispatch } = useApp();

  return (
    <div className="screen justify-between relative overflow-hidden">

      <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-6 w-full pt-2">
        <motion.div variants={item} className="flex items-center justify-between w-full">
          <div className="bg-slate rounded-lg px-3 py-2">
            <img src="/logo.svg" alt="MEDfacials" className="h-8" />
          </div>
          <span className="label-xs">Dr. Stolte</span>
        </motion.div>

        <motion.div variants={item} className="w-full h-px bg-teal/20" />

        <motion.div variants={item} className="space-y-0">
          <p className="label-xs mb-3">AI Facial Analysis</p>
          <h1 className="font-serif text-[3.2rem] font-normal leading-[1.05] text-slate italic tracking-tight">
            Discover Your<br />Perfect<br />Treatment Plan.
          </h1>
        </motion.div>

        <motion.div variants={item} className="w-full mt-2">
          {[
            { code: "001", label: "8-Zone Facial Analysis" },
            { code: "002", label: "Personalised Treatment Plan" },
            { code: "003", label: "Free Consultation with Dr. Stolte" },
          ].map(({ code, label }) => (
            <div key={code} className="flex items-center gap-4 py-3 border-b border-teal/10 first:border-t">
              <span className="font-sans text-[10px] text-teal/50 w-7 flex-shrink-0 font-semibold">{code}</span>
              <div className="w-px h-3 bg-teal/15 flex-shrink-0" />
              <span className="font-sans text-[11px] text-graphite/60 tracking-wide">{label}</span>
              <span className="ml-auto text-[8px] text-coral/40">●</span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="w-full space-y-3 pb-4"
      >
        <button
          className="btn-coral w-full"
          onClick={() => dispatch({ type: "SET_SCREEN", screen: "capture" })}
        >
          Begin Analysis
        </button>
        <p className="font-sans text-[9px] text-center text-graphite/30 tracking-widest uppercase">
          Private · Secure · Image Not Stored
        </p>
      </motion.div>
    </div>
  );
}
