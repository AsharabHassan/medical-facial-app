"use client";

import { motion } from "framer-motion";
import { useApp } from "@/lib/store";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

export default function BookingScreen() {
  const { state, dispatch } = useApp();
  const bookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL || "#";
  const firstName = state.leadData?.firstName;

  return (
    <div className="screen justify-between relative overflow-hidden">

      <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-6 flex-1">

        <motion.div variants={item} className="flex items-center justify-between">
          <div className="bg-slate rounded-lg px-3 py-2">
            <img src="/logo.svg" alt="MEDfacials" className="h-8" />
          </div>
          <span className="label-xs">Step 03 / 03</span>
        </motion.div>

        <motion.div variants={item} className="w-full h-px bg-teal/15" />

        <motion.div variants={item} className="space-y-2">
          <p className="label-xs">Your Next Step</p>
          <h2 className="font-serif text-[2.8rem] font-normal italic text-slate leading-[1.05]">
            {firstName ? `${firstName},` : ""}<br />
            Book Your<br />Free<br />Consultation.
          </h2>
        </motion.div>

        <motion.div variants={item} className="w-full space-y-0">
          <p className="label-xs mb-3">What to Expect</p>
          {[
            { code: "01", text: "Consultation with Dr. Stolte" },
            { code: "02", text: "Review your AI analysis together" },
            { code: "03", text: "Bespoke treatment plan & timeline" },
            { code: "04", text: "No obligation — completely free" },
          ].map(({ code, text }) => (
            <div key={code} className="flex items-start gap-3 py-3 border-b border-graphite/5 first:border-t">
              <span className="font-sans text-[9px] text-teal/45 flex-shrink-0 pt-0.5 font-semibold">{code}</span>
              <span className="font-sans text-[11px] text-graphite/55 leading-relaxed">{text}</span>
            </div>
          ))}
        </motion.div>

      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.7 }}
        className="w-full space-y-2.5 pt-6"
      >
        <a
          href={bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-coral w-full text-center"
        >
          Reserve My Consultation
        </a>
        <button
          className="btn-outline w-full"
          onClick={() => dispatch({ type: "SET_SCREEN", screen: "results" })}
        >
          Review My Results
        </button>
        <button
          className="w-full font-sans text-[9px] text-graphite/20 tracking-widest uppercase hover:text-graphite/40 transition-colors py-2 font-semibold"
          onClick={() => dispatch({ type: "RESET" })}
        >
          Start New Analysis
        </button>
      </motion.div>
    </div>
  );
}
