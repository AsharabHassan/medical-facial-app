"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useApp } from "@/lib/store";
import { ACCREDITATIONS } from "@/lib/trustData";

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

      <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-5 flex-1">

        {/* Clinic banner image */}
        <motion.div variants={item} className="relative w-full rounded-xl overflow-hidden" style={{ height: "140px" }}>
          <Image
            src="/clinic/clinic-medfacials-59-banner-2000x600px-c.jpg"
            alt="MEDfacials Clinic"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate/60 to-transparent" />
          <div className="absolute top-3 left-3">
            <img src="/logo.svg" alt="MEDfacials" className="h-6" />
          </div>
          <div className="absolute bottom-3 left-3">
            <p className="font-sans text-[9px] text-white/80 tracking-widest uppercase font-semibold">
              Step 03 / 03
            </p>
          </div>
        </motion.div>

        <motion.div variants={item} className="space-y-2">
          <h2 className="font-serif text-[2.4rem] font-normal italic text-slate leading-[1.05]">
            {firstName ? `${firstName},` : ""}<br />
            Book Your Free<br />Consultation.
          </h2>
        </motion.div>

        {/* Video */}
        <motion.div variants={item} className="space-y-1.5">
          <div className="rounded-xl overflow-hidden">
            <video
              src="/clinic/Why_Medfacials.mp4"
              controls
              playsInline
              preload="metadata"
              poster="/clinic/about-medfacials_2048x.jpg"
              className="w-full rounded-xl"
            />
          </div>
          <p className="font-sans text-[9px] text-graphite/45 text-center tracking-widest uppercase">
            Why Patients Choose MEDfacials
          </p>
        </motion.div>

        {/* Dr. Stolte card */}
        <motion.div variants={item} className="card p-4 space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-teal/10 flex items-center justify-center flex-shrink-0">
              <span className="font-serif text-[1rem] italic text-teal">Dr</span>
            </div>
            <div>
              <h4 className="font-serif text-[1rem] italic text-slate">Dr. Joe Stolte</h4>
              <p className="font-sans text-[9px] text-teal/80 font-semibold tracking-wide uppercase">
                Lead Aesthetic Practitioner · GMC Registered
              </p>
            </div>
          </div>
          <p className="font-sans text-[10px] text-graphite/65 leading-relaxed">
            Over a decade of experience in aesthetic medicine across two UK locations,
            combining clinical expertise with the latest non-surgical technologies.
          </p>
        </motion.div>

        {/* What to Expect */}
        <motion.div variants={item} className="w-full space-y-0">
          <p className="label-xs mb-3">What to Expect</p>
          {[
            { code: "01", text: "Personalised consultation with Dr. Stolte" },
            { code: "02", text: "Review your AI analysis together" },
            { code: "03", text: "Bespoke treatment plan & timeline" },
            { code: "04", text: "No obligation — completely free" },
          ].map(({ code, text }) => (
            <div key={code} className="flex items-start gap-3 py-3 border-b border-graphite/8 first:border-t">
              <div className="w-5 h-5 rounded-full bg-coral/12 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="font-sans text-[8px] text-coral font-bold">{code}</span>
              </div>
              <span className="font-sans text-[11px] text-graphite/70 leading-relaxed">{text}</span>
            </div>
          ))}
        </motion.div>

        {/* Accreditation strip on dark background */}
        <motion.div variants={item} className="space-y-2 pt-1">
          <p className="font-sans text-[8px] text-graphite/50 text-center tracking-[0.25em] uppercase">
            Registered & Accredited
          </p>
          <div className="bg-slate rounded-xl px-4 py-3 flex items-center justify-between gap-3">
            {ACCREDITATIONS.map((acc) => (
              <div key={acc.name} className="flex-1 flex items-center justify-center">
                <Image
                  src={acc.logo}
                  alt={acc.name}
                  width={48}
                  height={24}
                  className="h-5 w-auto object-contain brightness-0 invert opacity-70"
                />
              </div>
            ))}
          </div>
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
        <a
          href="tel:+441872888888"
          className="btn-outline w-full text-center"
        >
          Call the Clinic
        </a>
        <div className="flex gap-2">
          <button
            className="flex-1 font-sans text-[9px] text-graphite/40 tracking-widest uppercase hover:text-graphite/60 transition-colors py-2 font-semibold"
            onClick={() => dispatch({ type: "SET_SCREEN", screen: "results" })}
          >
            Review Results
          </button>
          <button
            className="flex-1 font-sans text-[9px] text-graphite/40 tracking-widest uppercase hover:text-graphite/60 transition-colors py-2 font-semibold"
            onClick={() => dispatch({ type: "RESET" })}
          >
            New Analysis
          </button>
        </div>
      </motion.div>
    </div>
  );
}
