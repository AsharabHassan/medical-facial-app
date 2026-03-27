"use client";

import { useEffect, useRef } from "react";
import { FaceZone } from "@/lib/types";

const ZONE_POSITIONS: Record<string, { x: number; y: number }> = {
  forehead:  { x: 50, y: 22 },
  temples:   { x: 30, y: 30 },
  undereyes: { x: 60, y: 40 },
  cheeks:    { x: 35, y: 52 },
  lips:      { x: 50, y: 62 },
  jawline:   { x: 50, y: 74 },
  neck:      { x: 50, y: 86 },
  skin:      { x: 72, y: 28 },
};

interface Props {
  imageDataUrl: string;
  zones: FaceZone[];
  activeZoneId?: number | null;
  onZoneClick?: (id: number) => void;
}

export default function FaceOverlay({ imageDataUrl, zones, activeZoneId, onZoneClick }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new window.Image();
    img.onload = () => {
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      ctx.drawImage(img, 0, 0);

      zones.forEach((zone) => {
        const pos = ZONE_POSITIONS[zone.overlayRegion];
        if (!pos) return;

        const x = (pos.x / 100) * canvas.width;
        const y = (pos.y / 100) * canvas.height;
        const r = canvas.width * 0.035;
        const isActive = activeZoneId === zone.id;
        const hasConcern = zone.concerns.some((c) => c.severity !== "none");

        ctx.beginPath();
        ctx.arc(x, y, r + 4, 0, Math.PI * 2);
        ctx.strokeStyle = isActive ? "#4CA6A2" : hasConcern ? "rgba(76,166,162,0.6)" : "rgba(58,71,77,0.3)";
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = isActive ? "#4CA6A2" : hasConcern ? "rgba(76,166,162,0.85)" : "rgba(58,71,77,0.2)";
        ctx.fill();

        ctx.font = `bold ${r * 1.1}px system-ui, sans-serif`;
        ctx.fillStyle = isActive || hasConcern ? "#FFFFFF" : "rgba(58,71,77,0.8)";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(String(zone.id), x, y + 1);
      });
    };
    img.src = imageDataUrl;
  }, [imageDataUrl, zones, activeZoneId]);

  function hitTest(clientX: number, clientY: number) {
    if (!onZoneClick) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const px = (clientX - rect.left) * scaleX;
    const py = (clientY - rect.top) * scaleY;

    for (const zone of zones) {
      const pos = ZONE_POSITIONS[zone.overlayRegion];
      if (!pos) continue;
      const x = (pos.x / 100) * canvas.width;
      const y = (pos.y / 100) * canvas.height;
      const r = canvas.width * 0.08;
      const dist = Math.sqrt((px - x) ** 2 + (py - y) ** 2);
      if (dist <= r) {
        onZoneClick(zone.id);
        return;
      }
    }
  }

  function handleClick(e: React.MouseEvent<HTMLCanvasElement>) {
    hitTest(e.clientX, e.clientY);
  }

  function handleTouch(e: React.TouchEvent<HTMLCanvasElement>) {
    e.preventDefault();
    const touch = e.changedTouches[0];
    if (touch) hitTest(touch.clientX, touch.clientY);
  }

  return (
    <canvas
      ref={canvasRef}
      onClick={handleClick}
      onTouchEnd={handleTouch}
      className="w-full rounded-2xl cursor-pointer"
    />
  );
}
