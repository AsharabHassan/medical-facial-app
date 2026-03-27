"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useApp } from "@/lib/store";
import { ACCREDITATIONS, CLINIC_STATS } from "@/lib/trustData";

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

      <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-5 w-full pt-2">
        {/* Hero with clinic image */}
        <motion.div variants={item} className="relative w-full rounded-2xl overflow-hidden" style={{ height: "200px" }}>
          <Image
            src="/clinic/about-medfacials_2048x.jpg"
            alt="MEDfacials Clinic"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate/70 via-slate/40 to-slate/80" />
          <div className="absolute top-4 left-4">
            <img src="/logo.svg" alt="MEDfacials" className="h-7" />
          </div>
          <div className="absolute bottom-4 left-4 right-4">
            <h1 className="font-serif text-[1.8rem] font-normal leading-[1.1] text-white italic tracking-tight">
              Discover Your<br />Perfect Treatment Plan.
            </h1>
          </div>
        </motion.div>

        {/* Star rating banner */}
        <motion.div variants={item} className="flex items-center gap-2.5 px-1">
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg key={i} className="w-3.5 h-3.5 text-coral" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="font-serif text-[1.1rem] italic text-slate font-normal">{CLINIC_STATS.rating}/5</span>
          <span className="font-sans text-[9px] text-graphite/40 tracking-wide">from {CLINIC_STATS.totalReviews}+ verified reviews</span>
        </motion.div>

        {/* Value props */}
        <motion.div variants={item} className="w-full space-y-2">
          {[
            { icon: "🔬", label: "AI-Powered 8-Zone Analysis", desc: "Advanced facial mapping technology" },
            { icon: "📋", label: "Personalised Treatment Plan", desc: "Tailored recommendations for your skin" },
            { icon: "👨‍⚕️", label: "Expert Clinical Team", desc: "Led by Dr. Joe Stolte, GMC registered" },
          ].map(({ icon, label, desc }) => (
            <div key={label} className="card px-4 py-3 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-teal/8 flex items-center justify-center flex-shrink-0">
                <span className="text-[16px]">{icon}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-sans text-[11px] text-slate font-bold tracking-wide">{label}</p>
                <p className="font-sans text-[9px] text-graphite/40 mt-0.5">{desc}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Accreditation strip */}
        <motion.div variants={item} className="space-y-2">
          <p className="font-sans text-[8px] text-graphite/25 text-center tracking-[0.25em] uppercase">Registered & Accredited</p>
          <div className="flex items-center justify-between gap-2 px-1">
            {ACCREDITATIONS.map((acc) => (
              <div key={acc.name} className="flex-1 flex items-center justify-center">
                <Image
                  src={acc.logo}
                  alt={acc.name}
                  width={48}
                  height={24}
                  className="h-5 w-auto object-contain opacity-40"
                />
              </div>
            ))}
          </div>
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
