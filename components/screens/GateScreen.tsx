"use client";

import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useApp } from "@/lib/store";
import { leadSchema, LeadFormData } from "@/lib/validation";

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
      {state.imageDataUrl && (
        <div className="absolute inset-0">
          <img
            src={state.imageDataUrl}
            alt=""
            className="w-full h-full object-cover blur-3xl scale-110"
            style={{ opacity: 0.04, filter: "grayscale(100%) blur(24px)" }}
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #FFF9EF 0%, rgba(255,249,239,0.92) 100%)" }} />
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full space-y-8"
      >
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 border border-teal/40 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="font-sans text-[11px] text-teal font-bold">✓</span>
            </div>
            <div className="h-px flex-1 bg-teal/20" />
          </div>
          <h2 className="font-serif text-[2.8rem] font-normal italic text-slate leading-[1.05]">
            Your Analysis<br />Is Ready.
          </h2>
          <p className="font-sans text-[10px] text-graphite/40 tracking-[0.2em] uppercase font-semibold">
            Enter details to unlock your report & treatment plan
          </p>
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
      </motion.div>
    </div>
  );
}
