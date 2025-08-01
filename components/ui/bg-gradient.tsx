"use client"

import { useMemo } from "react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import chroma from "chroma-js"

type Variant = "mesh" | "linear" | "conic" | "waves"
type Intensity = "subtle" | "medium" | "bold"

interface GradientBackgroundProps {
  variant?: Variant
  intensity?: Intensity
  animated?: boolean
  overlay?: boolean
  className?: string
}

const INTENSITY_MAP: Record<Intensity, { opacity: number; blur: number; scale: number }> = {
  subtle: { opacity: 0.3, blur: 120, scale: 1.2 },
  medium: { opacity: 0.5, blur: 100, scale: 1.5 },
  bold:   { opacity: 0.7, blur:  80, scale: 1.8 },
}

type ThemeMode = keyof typeof PRIMARY_MAP
const PRIMARY_MAP = {
  light: "#7c3aed",
  dark:  "#8b5cf6",
} as const

function derivePalette(primary: string) {
  const p = chroma(primary)
  const [h, , l] = p.hsl()

  const secondary     = p.set("hsl.h", h + 60).hex()
  const accent        = p.set("hsl.h", h - 60).hex()
  const primaryLight  = p.brighten(1.2).hex()
  const primaryDark   = p.darken(1.2).hex()
  const bgLightness   = l > 0.5 ? 0.95 : 0.05
  const bg            = p.set("hsl.l", bgLightness).hex()
  const surface       = chroma.mix(bg, primary, 0.1).hex()

  return { primary, secondary, accent, primaryLight, primaryDark, bg, surface }
}

export function GradientBackground({
  variant = "mesh",
  intensity = "medium",
  animated = true,
  overlay = false,
  className = "",
}: GradientBackgroundProps) {
  const { resolvedTheme } = useTheme()
  const mode = (resolvedTheme === "dark" ? "dark" : "light") as ThemeMode
  const basePrimary = PRIMARY_MAP[mode]

  const cfg     = INTENSITY_MAP[intensity]
  const palette = useMemo(() => derivePalette(basePrimary), [basePrimary])

  const { primary, secondary, accent, primaryLight, primaryDark } = palette

  // Helper to build rgba strings
  const rgba = (hex: string, mult = 1) => {
    const [r, g, b] = chroma(hex).rgb()
    return `rgba(${r}, ${g}, ${b}, ${cfg.opacity * mult})`
  }

  const backgrounds = useMemo<Record<Variant, string>>(() => ({
    mesh: `
      radial-gradient(circle at 20% 80%, ${rgba(primary)} 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, ${rgba(secondary, 0.8)} 0%, transparent 50%),
      radial-gradient(circle at 40% 40%, ${rgba(accent, 0.6)} 0%, transparent 50%),
      radial-gradient(circle at 60% 80%, ${rgba(primaryLight, 0.6)} 0%, transparent 50%),
      radial-gradient(circle at 90% 60%, ${rgba(primaryDark, 0.4)} 0%, transparent 50%)
    `,
    linear: `
      linear-gradient(
        135deg,
        ${rgba(primary)} 0%,
        ${rgba(secondary, 0.7)} 50%,
        ${rgba(accent, 0.5)} 100%
      )
    `,
    conic: `
      conic-gradient(
        from 0deg at 50% 50%,
        ${rgba(primary)} 0deg,
        ${rgba(secondary, 0.8)} 120deg,
        ${rgba(accent, 0.6)} 240deg,
        ${rgba(primary)} 360deg
      )
    `,
    waves: `
      linear-gradient(
        90deg,
        ${rgba(primary)} 0%,
        transparent 50%,
        ${rgba(accent, 0.6)} 100%
      )
    `,
  }), [primary, secondary, accent, primaryLight, primaryDark, cfg.opacity, rgba])

  const style: React.CSSProperties = useMemo(() => ({
    position: "fixed",
    inset: 0,
    zIndex: overlay ? 1 : -1,
    pointerEvents: "none",
    filter: `blur(${cfg.blur}px)`,
    background: backgrounds[variant],
  }), [backgrounds, cfg.blur, overlay, variant])

  if (!animated) {
    return <div style={style} className={className} />
  }

  return (
    <motion.div
      style={style}
      className={className}
      animate={{
        scale: [1, cfg.scale, 1],
        rotate: [0, 5, -5, 0],
        opacity: [cfg.opacity * 0.8, cfg.opacity, cfg.opacity * 0.9, cfg.opacity],
      }}
      transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
    />
  )
}
