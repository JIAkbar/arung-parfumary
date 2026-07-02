"use client";

import { useId } from "react";

export default function BottleIllustration({
  color = "#3f2d1c",
  className = "",
}: {
  color?: string;
  className?: string;
}) {
  const uid = useId().replace(/:/g, "");
  const glassId = `glass-${uid}`;
  const capId = `cap-${uid}`;
  const shadowId = `shadow-${uid}`;
  const shineId = `shine-${uid}`;

  return (
    <svg
      viewBox="0 0 160 280"
      className={className}
      role="img"
      aria-label="Ilustrasi botol parfum"
    >
      <defs>
        <linearGradient id={glassId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.85" />
          <stop offset="55%" stopColor={color} />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.35" />
        </linearGradient>
        <linearGradient id={capId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e7c374" />
          <stop offset="100%" stopColor="#a16207" />
        </linearGradient>
        <linearGradient id={shineId} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="45%" stopColor="#ffffff" stopOpacity="0.22" />
          <stop offset="60%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <radialGradient id={shadowId} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#000000" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </radialGradient>
      </defs>

      <ellipse cx="80" cy="266" rx="42" ry="8" fill={`url(#${shadowId})`} />

      {/* Cap */}
      <rect x="66" y="4" width="28" height="10" rx="2" fill={`url(#${capId})`} />
      <rect x="70" y="12" width="20" height="16" rx="3" fill={`url(#${capId})`} />
      <rect x="70" y="17" width="20" height="1.5" fill="#00000022" />
      <rect x="70" y="21" width="20" height="1.5" fill="#00000022" />

      {/* Neck */}
      <path d="M74 27 L86 27 L86 40 L74 40 Z" fill={`url(#${glassId})`} />

      {/* Body */}
      <path
        d="M62 40
           H98
           L110 66
           Q112 70 112 76
           L112 244
           Q112 260 96 260
           H64
           Q48 260 48 244
           L48 76
           Q48 70 50 66
           Z"
        fill={`url(#${glassId})`}
        stroke="#a16207"
        strokeWidth="1.25"
        strokeOpacity="0.6"
      />

      {/* Glass shine streak */}
      <path
        d="M62 40 H98 L110 66 Q112 70 112 76 L112 244 Q112 260 96 260 H64 Q48 260 48 244 L48 76 Q48 70 50 66 Z"
        fill={`url(#${shineId})`}
      />

      {/* Label plate */}
      <rect
        x="60"
        y="128"
        width="40"
        height="66"
        rx="3"
        fill="rgba(255,255,255,0.10)"
        stroke="#c9a24b"
        strokeOpacity="0.5"
        strokeWidth="0.75"
      />
      <path
        d="M70 144 h20 M70 150 h20"
        stroke="#e7c374"
        strokeWidth="1"
        strokeOpacity="0.8"
      />
      <circle cx="80" cy="168" r="6" fill="none" stroke="#e7c374" strokeWidth="1" strokeOpacity="0.7" />
      <path d="M70 182 h20" stroke="#e7c374" strokeWidth="0.75" strokeOpacity="0.5" />
    </svg>
  );
}
