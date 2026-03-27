"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaceZone, Severity } from "@/lib/types";

const SEVERITY_COLORS: Record<Severity, { bar: string; text: string }> = {
  none:     { bar: "bg-graphite/10",  text: "text-graphite/30" },
  mild:     { bar: "bg-teal/50",      text: "text-teal/70"     },
  moderate: { bar: "bg-coral",        text: "text-coral"       },
};

interface Props {
  zone: FaceZone;
  isActive: boolean;
  onClick: () => void;
}

function getWorstSeverity(zone: FaceZone): Severity {
  if (zone.concerns.some((c) => c.severity === "moderate")) return "moderate";
  if (zone.concerns.some((c) => c.severity === "mild")) return "mild";
  return "none";
}

export default function ZoneCard({ zone, isActive, onClick }: Props) {
  const [expanded, setExpanded] = useState(false);
  const worst = getWorstSeverity(zone);
  const sev = SEVERITY_COLORS[worst];

  useEffect(() => {
    if (isActive) setExpanded(true);
  }, [isActive]);

  const concernCount = zone.concerns.filter((c) => c.severity !== "none").length;

  return (
    <motion.div
      layout
      className="cursor-pointer transition-colors duration-200 card mb-2"
      style={{ borderLeft: `3px solid ${isActive ? "#4CA6A2" : worst === "none" ? "rgba(58,71,77,0.08)" : worst === "moderate" ? "#F8B188" : "rgba(76,166,162,0.4)"}` }}
      onClick={() => { onClick(); setExpanded((v) => !v); }}
    >
      <div className="flex items-center gap-3 py-3 pl-3 pr-3">
        <span className="font-sans text-[12px] text-teal/50 font-bold w-6 flex-shrink-0">
          {String(zone.id).padStart(2, "0")}
        </span>

        <div className="flex-1 min-w-0">
          <p className={`font-serif text-[1.05rem] italic leading-tight ${isActive ? "text-slate" : "text-slate/60"}`}>
            {zone.name}
          </p>
          <p className="font-sans text-[10px] text-graphite/35 truncate mt-0.5">
            {concernCount > 0 ? `${concernCount} concern${concernCount > 1 ? "s" : ""} detected` : "No concerns detected"}
          </p>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <div className={`w-1 h-6 rounded-full ${sev.bar}`} />
          <span className="font-sans text-[11px] text-graphite/20">{expanded ? "−" : "+"}</span>
        </div>
      </div>

      {expanded && zone.concerns.length > 0 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="pl-12 pr-3 pb-3"
        >
          <div className="border-t border-graphite/5 pt-2 space-y-2">
            {zone.concerns.map((concern, i) => {
              const csev = SEVERITY_COLORS[concern.severity];
              return (
                <div key={i}>
                  <p className="font-sans text-[10px] text-graphite/50 leading-relaxed">{concern.description}</p>
                  {concern.severity !== "none" && (
                    <p className={`font-sans text-[9px] mt-0.5 tracking-widest uppercase font-semibold ${csev.text}`}>
                      {concern.severity}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
