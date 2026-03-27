"use client";

import { useEffect, useRef } from "react";
import { FaceZone } from "@/lib/types";

interface Props {
  imageDataUrl: string;
  zones: FaceZone[];
  activeZoneId?: number | null;
  onZoneClick?: (id: number) => void;
}

export default function FaceOverlay({ imageDataUrl }: Props) {
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
    };
    img.src = imageDataUrl;
  }, [imageDataUrl]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full rounded-2xl"
    />
  );
}
