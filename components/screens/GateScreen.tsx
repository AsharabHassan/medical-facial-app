"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useApp } from "@/lib/store";
import { leadSchema, LeadFormData } from "@/lib/validation";
import { CLINIC_STATS } from "@/lib/trustData";

export default function GateScreen() {
  const { state, dispatch } = useApp();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LeadFormData>({ resolver: zodResolver(leadSchema) });

  function onSubmit(data: LeadFormData) {
    fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        marketingConsent: data.marketingConsent,
      }),
    }).catch((err) => console.error("Lead submission error:", err));

    dispatch({
      type: "SET_LEAD",
      lead: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        marketingConsent: data.marketingConsent,
      },
    });
    dispatch({ type: "SET_SCREEN", screen: "results" });
  }

  return (
    <div className="screen justify-center relative overflow-hidden">

      {/* Blurred selfie preview */}
      {state.imageDataUrl && (
        <div className="absolute inset-0">
          <img
            src={state.imageDataUrl}
            alt=""
            className="w-full h-full object-cover"
            style={{ opacity: 0.12, filter: "blur(20px) grayscale(40%)" }}
          />
          <div className="absolute inset-0 bg-ivory/[0.82]" />
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full space-y-6"
      >
        {/* Blurred preview card with lock */}
        {state.imageDataUrl && (
          <div className="relative w-full h-32 rounded-xl overflow-hidden">
            <img
              src={state.imageDataUrl}
              alt=""
              className="w-full h-full object-cover object-top"
              style={{ filter: "blur(16px) saturate(0.7)", transform: "scale(1.1)" }}
            />
            <div className="absolute inset-0 bg-slate/30 backdrop-blur-sm flex flex-col items-center justify-center gap-2">
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <p className="font-sans text-[10px] text-white/80 font-semibold tracking-wide">
                Complete to unlock your results
              </p>
            </div>
          </div>
        )}

        <div className="space-y-2">
          <h2 className="font-serif text-[2.4rem] font-normal italic text-slate leading-[1.05]">
            Your Analysis<br />Is Ready.
          </h2>
          <p className="font-sans text-[10px] text-graphite/40 tracking-[0.15em] uppercase font-semibold">
            Enter details to unlock your report & treatment plan
          </p>
        </div>

        {/* Trust bar */}
        <div className="flex items-center gap-2 px-3 py-2 bg-teal/[0.04] rounded-lg border border-teal/10">
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg key={i} className="w-2.5 h-2.5 text-coral" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="font-sans text-[9px] text-slate/60 font-semibold">
            Join {CLINIC_STATS.totalReviews}+ patients who trust MEDfacials
          </span>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="label-xs">First Name</label>
              <input {...register("firstName")} placeholder="Sarah" className="input-field" />
              {errors.firstName && <p className="font-sans text-[10px] text-red-400/70 mt-1">{errors.firstName.message}</p>}
            </div>
            <div className="space-y-1.5">
              <label className="label-xs">Last Name</label>
              <input {...register("lastName")} placeholder="Johnson" className="input-field" />
              {errors.lastName && <p className="font-sans text-[10px] text-red-400/70 mt-1">{errors.lastName.message}</p>}
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="label-xs">Email</label>
            <input {...register("email")} type="email" placeholder="sarah@example.com" className="input-field" />
            {errors.email && <p className="font-sans text-[10px] text-red-400/70 mt-1">{errors.email.message}</p>}
          </div>

          <div className="space-y-1.5">
            <label className="label-xs">Phone</label>
            <input {...register("phone")} type="tel" placeholder="+44 7700 000000" className="input-field" />
            {errors.phone && <p className="font-sans text-[10px] text-red-400/70 mt-1">{errors.phone.message}</p>}
          </div>

          <label className="flex items-start gap-3 cursor-pointer group">
            <div className="relative mt-0.5 flex-shrink-0">
              <input {...register("marketingConsent")} type="checkbox" className="sr-only peer" />
              <div className="w-5 h-5 border border-graphite/20 rounded peer-checked:border-teal peer-checked:bg-teal/10 transition-all duration-200" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 peer-checked:opacity-100">
                <span className="font-sans text-[10px] text-teal font-bold">✓</span>
              </div>
            </div>
            <span className="font-sans text-[10px] text-graphite/40 leading-relaxed group-hover:text-graphite/60 transition-colors">
              I consent to receive my analysis results and aesthetic communications from MEDfacials in accordance with UK data protection law.
            </span>
          </label>
          {errors.marketingConsent && <p className="font-sans text-[10px] text-red-400/70">{errors.marketingConsent.message}</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-coral w-full disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Processing..." : "Unlock My Results"}
          </button>
        </form>

        {/* Mini accreditation strip */}
        <div className="flex items-center justify-center gap-4 pt-1">
          {[
            { src: "/clinic/cqc-logo.svg", alt: "CQC" },
            { src: "/clinic/GMC-Logo.svg", alt: "GMC" },
            { src: "/clinic/save-face.svg", alt: "Save Face" },
          ].map((acc) => (
            <Image key={acc.alt} src={acc.src} alt={acc.alt} width={40} height={20} className="h-4 w-auto opacity-30" />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
