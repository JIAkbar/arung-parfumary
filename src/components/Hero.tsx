"use client";

import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import BottleIllustration from "./BottleIllustration";

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Hero() {
  const reduced = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-foreground text-background">
      <div className="pointer-events-none absolute inset-0 opacity-20">
        <div className="absolute -left-20 -top-20 h-96 w-96 rounded-full bg-gold blur-3xl" />
        <div className="absolute -bottom-24 -right-10 h-96 w-96 rounded-full bg-gold-light blur-3xl" />
      </div>
      <motion.div
        className="relative mx-auto flex max-w-6xl flex-col items-center gap-10 px-6 py-24 text-center md:py-32"
        variants={reduced ? undefined : container}
        initial={reduced ? undefined : "hidden"}
        animate={reduced ? undefined : "show"}
      >
        <motion.span
          variants={reduced ? undefined : item}
          className="text-xs uppercase tracking-[0.3em] text-gold-light"
        >
          Racikan Artisan
        </motion.span>
        <motion.h1
          variants={reduced ? undefined : item}
          className="max-w-2xl font-serif text-4xl leading-tight md:text-6xl"
        >
          Aroma yang Diracik, Bukan Sekadar Dijual
        </motion.h1>
        <motion.p
          variants={reduced ? undefined : item}
          className="max-w-xl text-base text-background/70 md:text-lg"
        >
          Setiap botol Arung Wangi diracik tangan menggunakan bibit
          fragrance oil premium — dirancang untuk yang mencari karakter, bukan
          sekadar label.
        </motion.p>
        <motion.div
          variants={reduced ? undefined : item}
          className="flex flex-wrap justify-center gap-4"
        >
          <Link
            href="/katalog"
            className="rounded-full bg-gold px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-gold-light"
          >
            Lihat Katalog
          </Link>
          <Link
            href="/tentang"
            className="rounded-full border border-background/30 px-8 py-3 text-sm font-medium transition-colors hover:border-gold-light hover:text-gold-light"
          >
            Cerita Kami
          </Link>
        </motion.div>
        <motion.div
          variants={reduced ? undefined : item}
          animate={
            reduced
              ? undefined
              : { y: [0, -10, 0], transition: { duration: 4, repeat: Infinity, ease: "easeInOut" } }
          }
        >
          <BottleIllustration className="mt-8 h-56 w-auto opacity-90" />
        </motion.div>
      </motion.div>
    </section>
  );
}
