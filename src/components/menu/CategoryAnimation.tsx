import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";

import type { AnimationKind } from "@/data/menuData";

type Props = {
  kind: AnimationKind;
  image: string;
  name: string;
  /** compact = card preview, full = inside the opened tab */
  variant?: "compact" | "full";
  /** Whether to play animations - helps performance */
  isActive?: boolean;
};

const seeded = (i: number, mod: number) => ((i * 9301 + 49297) % mod) / mod;

/**
 * Elegant, photoreal-friendly motion layers drawn over the dish photo:
 * no cartoon characters — only light, steam, ice, syrup and sparkle.
 */
export function CategoryAnimation({ kind, image, name, variant = "compact", isActive = true }: Props) {
  const reduce = useReducedMotion();
  const full = variant === "full";

  return (
    <div className="relative h-full w-full overflow-hidden">
      <motion.img
        src={image}
        alt={name}
        width={1024}
        height={1024}
        loading="lazy"
        className="h-full w-full object-cover"
        initial={{ scale: 1.06, opacity: 0 }}
        animate={
          reduce || !isActive
            ? { scale: 1, opacity: 1 }
            : {
                scale: kind === "shake" ? [1.04, 1.06, 1.04] : [1.06, 1.01, 1.06],
                x: kind === "shake" ? [0, -4, 4, -2, 0] : 0,
                opacity: 1,
              }
        }
        transition={
          reduce || !isActive
            ? { duration: 0.3 }
            : {
                scale: { duration: kind === "shake" ? 1.6 : 16, repeat: Infinity },
                x: { duration: 1.6, repeat: Infinity },
                opacity: { duration: 0.8 },
              }
        }
      />

      {/* brand veil so copper strokes stay legible */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/85 via-background/20 to-transparent" />

      {!reduce && isActive && (
        <div className="pointer-events-none absolute inset-0">
          {kind === "steam" && <Steam full={full} />}
          {kind === "ice-fall" && <IceFall full={full} />}
          {kind === "bubble" && <Bubbles full={full} />}
          {kind === "shake" && <Drips />}
          {kind === "flip" && <Pour full={full} />}
          {kind === "slice" && <Slice />}
          {kind === "stack" && <Stack />}
          {kind === "sparkle" && <Sparkle full={full} />}
        </div>
      )}
    </div>
  );
}

function Steam({ full }: { full: boolean }) {
  const count = full ? 4 : 3;
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <motion.span
          key={i}
          className="absolute bottom-[34%] w-[2px] rounded-full bg-gradient-to-t from-transparent via-ivory/60 to-transparent will-change-transform"
          style={{ left: `${28 + i * (44 / count)}%`, height: full ? 140 : 90 }}
          initial={{ opacity: 0, y: 20, scaleY: 0.5 }}
          animate={{ opacity: [0, 0.7, 0], y: [20, -70], scaleY: [0.5, 1.2] }}
          transition={{
            duration: 3.4 + seeded(i, 7) * 1.6,
            repeat: Infinity,
            delay: i * 0.45,
            ease: "easeOut",
          }}
        />
      ))}
    </>
  );
}

function IceFall({ full }: { full: boolean }) {
  const count = full ? 6 : 4;
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <motion.span
          key={i}
          className="absolute top-0 rounded-[4px] border border-ivory/50 bg-ivory/20 will-change-transform"
          style={{
            left: `${8 + seeded(i, 11) * 84}%`,
            width: full ? 16 : 11,
            height: full ? 16 : 11,
          }}
          initial={{ y: -30, opacity: 0, rotate: 0 }}
          animate={{ y: full ? 340 : 200, opacity: [0, 0.9, 0], rotate: 180 }}
          transition={{
            duration: 2.6 + seeded(i, 5) * 1.4,
            repeat: Infinity,
            delay: i * 0.35,
            ease: "easeIn",
          }}
        />
      ))}
    </>
  );
}

function Bubbles({ full }: { full: boolean }) {
  const count = full ? 8 : 5;
  return (
    <>
      {Array.from({ length: count }).map((_, i) => {
        const size = 5 + seeded(i, 13) * (full ? 16 : 9);
        return (
          <motion.span
            key={i}
            className="absolute bottom-0 rounded-full border border-ivory/50 will-change-transform"
            style={{ left: `${5 + seeded(i, 17) * 90}%`, width: size, height: size }}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: full ? -320 : -190, opacity: [0, 0.8, 0] }}
            transition={{
              duration: 3.2 + seeded(i, 9) * 2,
              repeat: Infinity,
              delay: i * 0.28,
              ease: "easeOut",
            }}
          />
        );
      })}
    </>
  );
}

function Drips() {
  return (
    <>
      {[22, 48, 74].map((left, i) => (
        <motion.span
          key={left}
          className="absolute top-[38%] w-[3px] rounded-full bg-copper/80"
          style={{ left: `${left}%` }}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: [0, 60, 0], opacity: [0, 1, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.5 }}
        />
      ))}
    </>
  );
}

/** Syrup / chocolate poured onto the plate, then spreading. */
function Pour({ full }: { full: boolean }) {
  return (
    <>
      <motion.span
        className="absolute left-1/2 top-0 w-[6px] -translate-x-1/2 rounded-full bg-gradient-to-b from-copper-soft via-copper to-copper/70"
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: [0, full ? 190 : 120, full ? 190 : 120, 0], opacity: [0, 1, 1, 0] }}
        transition={{ duration: 4, repeat: Infinity, times: [0, 0.35, 0.75, 1] }}
      />
      <motion.span
        className="absolute left-1/2 -translate-x-1/2 rounded-full bg-copper/45 blur-[1px]"
        style={{ top: full ? 180 : 112, height: full ? 22 : 14 }}
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: [0, full ? 200 : 130], opacity: [0, 0.85, 0] }}
        transition={{ duration: 4, repeat: Infinity, delay: 0.9, ease: "easeOut" }}
      />
    </>
  );
}

/** A blade of light sweeping across, as if the loaf is being sliced. */
function Slice() {
  return (
    <motion.span
      className="absolute inset-y-0 w-24 bg-gradient-to-r from-transparent via-ivory/45 to-transparent"
      initial={{ x: "-30%", skewX: -12 }}
      animate={{ x: "130%" }}
      transition={{ duration: 2.6, repeat: Infinity, repeatDelay: 1.4, ease: "easeInOut" }}
    />
  );
}

/** Layers dropping in, like a sandwich being built. */
function Stack() {
  return (
    <>
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="absolute left-1/2 h-[3px] w-1/2 -translate-x-1/2 rounded-full bg-copper/70"
          style={{ bottom: `${26 + i * 9}%` }}
          initial={{ y: -40, opacity: 0, scaleX: 0.6 }}
          animate={{ y: 0, opacity: [0, 1, 1, 0], scaleX: 1 }}
          transition={{
            duration: 3.2,
            repeat: Infinity,
            delay: i * 0.35,
            ease: [0.16, 1, 0.3, 1],
          }}
        />
      ))}
    </>
  );
}

function Sparkle({ full }: { full: boolean }) {
  const count = full ? 9 : 6;
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-copper-soft will-change-transform"
          style={{
            left: `${6 + seeded(i, 19) * 88}%`,
            top: `${10 + seeded(i + 3, 23) * 76}%`,
            width: 3 + seeded(i, 7) * 3,
            height: 3 + seeded(i, 7) * 3,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0, 1, 0], scale: [0, 1.6, 0] }}
          transition={{
            duration: 1.8 + seeded(i, 11) * 1.4,
            repeat: Infinity,
            delay: i * 0.22,
          }}
        />
      ))}
    </>
  );
}
