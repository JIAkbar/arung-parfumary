# Arung Wangi Redesign (Navbar, Logo, Tema, Transisi) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship the approved redesign — brass/parchment color tokens, a real brand mark (swirl logo), a mobile-responsive navbar, and a signature gold-wipe page transition — matching `docs/superpowers/specs/2026-07-03-arung-wangi-redesign-design.md`.

**Architecture:** Pure frontend change inside the existing Next.js App Router + Tailwind v4 site. New tokens flow through the existing `@theme inline` mapping in `globals.css` so every component that already uses `bg-gold`/`text-gold`/etc. re-colors automatically. Two new small client components (`BrandMark`, `PageTransition`) are added; `Header` gains local state for the mobile menu; `layout.tsx` wires `PageTransition` around `{children}`.

**Tech Stack:** Next.js 16 (App Router, `--webpack`), TypeScript, Tailwind CSS v4 (`@theme inline` tokens), framer-motion (already a dependency).

## Global Constraints

- Brand name in UI stays **"Arung Wangi"** (folder/repo name is unrelated).
- No test framework exists in this repo (no jest/vitest, `package.json` has no `test` script) — "testing" in each task means: `npx tsc --noEmit` (type check), `npm run lint` (eslint), and a manual check via the running dev server / browser preview tool. Do not invent a test runner for this plan.
- Keep `next dev --webpack` / `next build --webpack` — Turbopack is broken on this machine's spaced path (`AGENTS.md`/`CLAUDE.md`).
- Respect `prefers-reduced-motion` for every new animation (pattern already established in `src/components/Reveal.tsx`).
- Don't touch `WHATSAPP_NUMBER`, `whatsappOrderUrl`, `whatsappGeneralUrl`, or the Instagram removal — already shipped this session, out of scope here.
- Don't add a test framework, don't add a favicon/app-icon, don't touch `Hero.tsx`, `BottleIllustration.tsx`, `PyramidNotes.tsx`, `MainAccords.tsx`, or product data — out of scope per the spec.

---

### Task 1: Brass/parchment color tokens

**Files:**
- Modify: `src/app/globals.css:1-33` (full file)

**Interfaces:**
- Produces: Tailwind color utilities `bg-gold-hairline`, `text-gold-hairline`, `border-gold-hairline` (new), plus the existing `background`/`foreground`/`surface`/`ink-muted`/`border`/`gold`/`gold-light` utilities now resolving to new hex values. All later tasks consume these utility class names.

- [ ] **Step 1: Replace the token block**

Replace the full contents of `src/app/globals.css` with:

```css
@import "tailwindcss";

:root {
  --background: #f7f1e4;
  --foreground: #26201a;
  --surface: #fffdf8;
  --ink-muted: #6f6355;
  --border: #e6dcc8;
  --gold: #9c6a2b;
  --gold-light: #c79a49;
  --gold-hairline: rgba(156, 106, 43, 0.35);
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-surface: var(--surface);
  --color-ink-muted: var(--ink-muted);
  --color-border: var(--border);
  --color-gold: var(--gold);
  --color-gold-light: var(--gold-light);
  --color-gold-hairline: var(--gold-hairline);
  --font-serif: var(--font-playfair);
  --font-sans: var(--font-inter);
}

body {
  background: var(--background);
  color: var(--foreground);
  font-family: var(--font-sans), Arial, Helvetica, sans-serif;
}

h1, h2, h3, .font-serif-heading {
  font-family: var(--font-serif), Georgia, serif;
}
```

- [ ] **Step 2: Verify it compiles and renders**

Run: `npx tsc --noEmit`
Expected: no output (exit code 0) — CSS changes don't affect TS types, this just confirms the repo is otherwise healthy before continuing.

Start the dev server (`npm run dev` or the preview tool) and open `/`. Expected: background is a warmer parchment tone than before, body text is warm dark ink (not near-black), gold accents look slightly more brass/muted (less orange) than before.

- [ ] **Step 3: Commit**

```bash
git add src/app/globals.css
git commit -m "style: shift palette to brass/parchment tokens"
```

---

### Task 2: `BrandMark` component (swirl logo)

**Files:**
- Create: `src/components/BrandMark.tsx`

**Interfaces:**
- Produces: `export default function BrandMark({ className }: { className?: string }): JSX.Element` — a single inline SVG, stroke color driven by `currentColor` so callers set color via a `text-*` className. Consumed by Task 3 (`Header.tsx`) and Task 4 (`Footer.tsx`).

- [ ] **Step 1: Create the component**

```tsx
export default function BrandMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      role="img"
      aria-label="Simbol Arung Wangi"
    >
      <path
        d="M4 16C4 9 9 4 15 5C20 6 18 12 13 11C9 10 10 15 15 15"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
```

- [ ] **Step 2: Verify it type-checks**

Run: `npx tsc --noEmit`
Expected: no output (exit code 0).

- [ ] **Step 3: Commit**

```bash
git add src/components/BrandMark.tsx
git commit -m "feat: add BrandMark swirl logo component"
```

---

### Task 3: Header — desktop treatment + mobile menu

**Files:**
- Modify: `src/components/Header.tsx` (full file rewrite, currently 34 lines)

**Interfaces:**
- Consumes: `BrandMark` from `src/components/BrandMark.tsx` (Task 2), `gold`/`gold-hairline`/`ink-muted`/`background` Tailwind color utilities (Task 1), `usePathname` from `next/navigation`.
- Produces: no new exports — same `export default function Header()`. Behavior: renders a hamburger button below the `sm` breakpoint (640px) that opens/closes a slide-down panel; the panel closes on route change and on `Escape`.

- [ ] **Step 1: Replace the full file**

```tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import BrandMark from "@/components/BrandMark";

const NAV = [
  { href: "/katalog", label: "Katalog" },
  { href: "/tentang", label: "Tentang" },
  { href: "/kontak", label: "Kontak" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [lastPathname, setLastPathname] = useState(pathname);

  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-gold-hairline bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="flex items-center gap-2 font-serif text-xl font-semibold tracking-tight text-foreground"
        >
          <BrandMark className="h-5 w-5 text-gold" />
          Arung Wangi
        </Link>

        <nav className="hidden items-center gap-6 sm:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group relative text-sm text-ink-muted transition-colors hover:text-gold"
            >
              <span className="absolute -left-3 top-1/2 h-1 w-1 -translate-x-1 -translate-y-1/2 rounded-full bg-gold opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100" />
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          aria-label={open ? "Tutup menu" : "Buka menu"}
          aria-expanded={open}
          className="flex h-8 w-8 flex-col items-center justify-center gap-1.5 sm:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          <span
            className={`h-px w-5 bg-gold transition-transform duration-200 ${open ? "translate-y-[3px] rotate-45" : ""}`}
          />
          <span
            className={`h-px w-5 bg-gold transition-opacity duration-200 ${open ? "opacity-0" : ""}`}
          />
          <span
            className={`h-px w-5 bg-gold transition-transform duration-200 ${open ? "-translate-y-[3px] -rotate-45" : ""}`}
          />
        </button>
      </div>

      <div
        className={`overflow-hidden bg-background transition-[max-height] duration-300 ease-in-out sm:hidden ${
          open ? "max-h-60 border-t border-gold-hairline" : "max-h-0"
        }`}
      >
        <nav className="flex flex-col px-6 py-2">
          {NAV.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              className={`py-3 text-sm text-ink-muted hover:text-gold ${
                i > 0 ? "border-t border-gold-hairline" : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
```

- [ ] **Step 2: Verify it type-checks and lints**

Run: `npx tsc --noEmit`
Expected: no output (exit code 0).

Run: `npm run lint`
Expected: no errors (a pre-existing unrelated warning, if any, is fine — no new errors from `Header.tsx`).

- [ ] **Step 3: Verify in the browser**

Start the dev server, open `/`.
- Desktop width (≥640px): nav shows "Katalog / Tentang / Kontak" in a row, no hamburger visible; hovering a link shows a small gold dot sliding in to its left and the text turning gold.
- Resize to mobile width (≤500px, e.g. 375px): the row of links disappears, a 3-line hamburger button appears on the right of the logo.
- Click the hamburger: a panel slides down below the header with the 3 links, each separated by a thin gold hairline, each tall enough to comfortably tap (~44px).
- Click a link inside the open panel, or press `Escape`: panel closes.
- Navigate to a different page: panel is closed on arrival (it doesn't stay open across navigation).

- [ ] **Step 4: Commit**

```bash
git add src/components/Header.tsx
git commit -m "feat: redesign navbar with brand mark and mobile menu"
```

---

### Task 4: Footer — tokens + brand mark

**Files:**
- Modify: `src/components/Footer.tsx:1-27` (full file)

**Interfaces:**
- Consumes: `BrandMark` from Task 2.
- Produces: no new exports — same `export default function Footer()`.

- [ ] **Step 1: Replace the full file**

```tsx
import { whatsappGeneralUrl } from "@/lib/products";
import BrandMark from "@/components/BrandMark";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-foreground text-background">
      <div className="mx-auto max-w-6xl px-6 py-10 text-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <BrandMark className="h-4 w-4 text-gold-light" />
            <p className="font-serif text-lg">Arung Wangi</p>
          </div>
          <div className="flex gap-6 text-background/70">
            <a
              href={whatsappGeneralUrl()}
              target="_blank"
              rel="noreferrer"
              className="hover:text-gold-light"
            >
              WhatsApp
            </a>
          </div>
        </div>
        <p className="mt-6 text-xs text-background/50">
          &copy; {new Date().getFullYear()} Arung Wangi. Racikan
          artisan, bukan produk resmi brand manapun.
        </p>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Verify**

Run: `npx tsc --noEmit`
Expected: no output (exit code 0).

Open any page, scroll to the footer. Expected: small gold swirl mark sits to the left of the "Arung Wangi" wordmark in the dark footer band.

- [ ] **Step 3: Commit**

```bash
git add src/components/Footer.tsx
git commit -m "feat: add brand mark to footer"
```

---

### Task 5: `PageTransition` component (gold-wipe)

**Files:**
- Create: `src/components/PageTransition.tsx`

**Interfaces:**
- Consumes: `usePathname` from `next/navigation`, `motion`/`useReducedMotion` from `framer-motion`.
- Produces: `export default function PageTransition({ children }: { children: React.ReactNode }): JSX.Element`. Consumed by Task 6 (`layout.tsx`).

- [ ] **Step 1: Create the component**

```tsx
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
```

- [ ] **Step 2: Verify it type-checks**

Run: `npx tsc --noEmit`
Expected: no output (exit code 0). (Visual verification happens in Task 6, once it's wired into the page — this component renders nothing on its own until it wraps real content.)

- [ ] **Step 3: Commit**

```bash
git add src/components/PageTransition.tsx
git commit -m "feat: add gold-wipe PageTransition component"
```

---

### Task 6: Wire `PageTransition` into the root layout

**Files:**
- Modify: `src/app/layout.tsx:1-43` (full file)

**Interfaces:**
- Consumes: `PageTransition` from Task 5.

- [ ] **Step 1: Replace the full file**

```tsx
import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Arung Wangi — Racikan Parfum Artisan",
  description:
    "Parfum racikan artisan, diracik sendiri dengan bibit fragrance oil premium.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${playfair.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Header />
        <main className="flex-1">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Verify**

Run: `npx tsc --noEmit`
Expected: no output (exit code 0).

Run: `npm run lint`
Expected: no new errors.

- [ ] **Step 3: Commit**

```bash
git add src/app/layout.tsx
git commit -m "feat: wire gold-wipe transition into root layout"
```

---

### Task 7: Full verification pass

**Files:** none (verification only, no code changes expected unless a bug is found — if so, fix in the relevant file from Tasks 1-6 and re-run this task's checks before committing that fix separately).

- [ ] **Step 1: Build check**

Run: `npm run build`
Expected: build succeeds (exit code 0), no type or lint errors surfaced during build.

- [ ] **Step 2: Cross-page, cross-breakpoint manual check**

Using the dev server / browser preview tool, visit each of: `/`, `/katalog`, `/produk/gilded-noir`, `/tentang`, `/kontak`. For each:
- Desktop width: navbar shows full link row, hover dot works, footer shows brand mark.
- Mobile width (375px): hamburger menu opens/closes correctly, no horizontal overflow anywhere on the page (check body scroll width, not just the header).
- Click a nav link (or the logo) to navigate to another page: the gold bar sweeps across the screen and the new page fades in after the sweep passes; no layout jump or flash of unstyled content.

- [ ] **Step 3: Reduced motion check**

In the browser preview tool, emulate `prefers-reduced-motion: reduce` (e.g. `preview_resize` with `colorScheme` aside — use `preview_eval` to check `window.matchMedia('(prefers-reduced-motion: reduce)').matches` after emulating, or the browser's own devtools rendering emulation if the preview tool doesn't expose it directly). Expected: navigating between pages shows no gold-wipe overlay (instant swap), matching the existing `Reveal.tsx` reduced-motion behavior.

- [ ] **Step 4: Confirm no regressions from the earlier session**

Open `/kontak` and the footer on any page: the WhatsApp link still points to `https://wa.me/6289900447098?text=...`, and there is no Instagram link anywhere.

- [ ] **Step 5: Final commit (only if Step 1-4 required fixes)**

If everything passed with no fixes needed, there's nothing to commit here — Tasks 1-6 already committed their own work. If a fix was needed, commit it with a message describing the specific bug fixed, e.g.:

```bash
git add <fixed files>
git commit -m "fix: <specific bug found during verification>"
```
