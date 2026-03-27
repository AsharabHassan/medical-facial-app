"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { useApp } from "@/lib/store";
import { useCamera } from "@/hooks/useCamera";

export default function CaptureScreen() {
  const { dispatch } = useApp();
  const { videoRef, canvasRef, isActive, error, startCamera, stopCamera, capturePhoto } = useCamera();

  useEffect(() => {
    startCamera();
    return () => { stopCamera(); };
  }, [startCamera, stopCamera]);

  function handleCapture() {
    const dataUrl = capturePhoto();
    if (dataUrl) {
      dispatch({ type: "SET_IMAGE", imageDataUrl: dataUrl });
      dispatch({ type: "SET_SCREEN", screen: "analyzing" });
    }
  }

  return (
    <div className="screen items-center gap-5 py-8">

      <div className="flex items-start justify-between w-full">
        <div>
          <p className="label-xs mb-1.5">Step 01 / 03</p>
          <h2 className="font-serif text-[2.2rem] font-normal italic text-slate leading-[1.05]">
            Position<br />Your Face.
          </h2>
        </div>
        <button
          className="font-sans text-[10px] text-graphite/50 tracking-widest uppercase hover:text-graphite/70 transition-colors mt-1 flex-shrink-0"
          onClick={() => dispatch({ type: "SET_SCREEN", screen: "landing" })}
        >
          Back
        </button>
      </div>

      <div className="relative w-full rounded-2xl overflow-hidden" style={{ aspectRatio: "3/4" }}>
        {/* Softened corner marks */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-teal/40 z-10 rounded-tl-2xl" />
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-teal/40 z-10 rounded-tr-2xl" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-teal/40 z-10 rounded-bl-2xl" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-teal/40 z-10 rounded-br-2xl" />

        <div className="absolute inset-1 overflow-hidden bg-slate/5 rounded-xl">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className={`absolute inset-0 w-full h-full object-cover scale-x-[-1] transition-opacity duration-500 ${isActive ? "opacity-100" : "opacity-0"}`}
          />

          {/* Pulsing oval guide */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.div
              className="border border-teal/25 rounded-full"
              style={{ width: "60%", height: "76%" }}
              animate={{ borderColor: ["rgba(76,166,162,0.2)", "rgba(76,166,162,0.45)", "rgba(76,166,162,0.2)"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          {error && (
            <div className="absolute inset-0 flex items-center justify-center p-6 bg-ivory/90">
              <p className="font-sans text-[12px] text-graphite/70 text-center">{error}</p>
            </div>
          )}

          {!isActive && !error && (
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.p
                animate={{ opacity: [0.4, 0.9, 0.4] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="font-sans text-[11px] text-teal/70 tracking-widest uppercase"
              >
                Initialising...
              </motion.p>
            </div>
          )}
        </div>
      </div>

      {/* Guidance text */}
      <div className="flex items-center justify-center gap-4 w-full">
        {["Centre your face", "Good lighting", "Neutral expression"].map((tip) => (
          <span key={tip} className="font-sans text-[9px] text-graphite/55 tracking-wide">{tip}</span>
        ))}
      </div>

      <canvas ref={canvasRef} className="hidden" />

      {isActive && (
        <motion.button
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="btn-coral w-full"
          onClick={handleCapture}
        >
          Capture Photo
        </motion.button>
      )}

      {/* Privacy note */}
      <p className="font-sans text-[9px] text-graphite/40 tracking-widest uppercase text-center">
        Powered by AI · Your image is never stored
      </p>
    </div>
  );
}
