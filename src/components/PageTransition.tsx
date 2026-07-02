"use client";

import { motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reduced = useReducedMotion();

  if (reduced) {
    return <>{children}</>;
  }

  return (
    <div key={pathname}>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-50 bg-gold"
        initial={{ x: "-100%" }}
        animate={{ x: ["-100%", "0%", "0%", "100%"] }}
        transition={{ duration: 0.6, times: [0, 0.42, 0.58, 1], ease: EASE }}
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.32, duration: 0.35, ease: EASE }}
      >
        {children}
      </motion.div>
    </div>
  );
}
