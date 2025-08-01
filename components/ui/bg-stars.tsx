"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { motion, useScroll, useTransform, useSpring } from "motion/react"
import { useTheme } from "next-themes"

interface Star {
  id: number
  x: number
  y: number
  size: number
  layer: number
  twinkleDelay: number
}

interface ShootingStar {
  x: number
  y: number
  length: number
  speed: number
  angle: number
  opacity: number
}

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const shootingStarsRef = useRef<ShootingStar[]>([])
  const animationRef = useRef<number | null>(null)
  const { resolvedTheme } = useTheme()
  const [stars, setStars] = useState<Star[]>([])
  const [mounted, setMounted] = useState(false)

  // Framer Motion scroll and parallax setup
  const { scrollY: motionScrollY } = useScroll()

  // Create parallax transforms for different layers with more dramatic effect
  const y1 = useTransform(motionScrollY, [0, 2000], [0, -200])
  const y2 = useTransform(motionScrollY, [0, 2000], [0, -400])
  const y3 = useTransform(motionScrollY, [0, 2000], [0, -600])
  const y4 = useTransform(motionScrollY, [0, 2000], [0, -800])

  // Add spring physics for smoother motion
  const springY1 = useSpring(y1, { stiffness: 100, damping: 30 })
  const springY2 = useSpring(y2, { stiffness: 100, damping: 30 })
  const springY3 = useSpring(y3, { stiffness: 100, damping: 30 })
  const springY4 = useSpring(y4, { stiffness: 100, damping: 30 })

  useEffect(() => {
    setMounted(true)
  }, [])

  // Generate stars on mount
  useEffect(() => {
    const generateStars = () => {
      const newStars: Star[] = []
      const starCount = 150

      for (let i = 0; i < starCount; i++) {
        newStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 300,
          size: Math.random() * 3 + 0.5,
          layer: Math.floor(Math.random() * 4) + 1,
          twinkleDelay: Math.random() * 5,
        })
      }
      setStars(newStars)
    }

    if (mounted) {
      generateStars()
    }
  }, [mounted])

  // Get proper colors for canvas
  const getCanvasColors = useCallback(() => {
    const isDark = resolvedTheme === "dark"
    return {
      primary: isDark ? "#8b5cf6" : "#7c3aed",
      primaryRgb: isDark ? "139, 92, 246" : "124, 58, 237",
    }
  }, [resolvedTheme])

  // Canvas animation for shooting stars only
  useEffect(() => {
    if (!mounted) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const createShootingStar = () => {
      if (Math.random() < 0.002) {
        shootingStarsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height * 0.6,
          length: Math.random() * 100 + 30,
          speed: Math.random() * 8 + 6,
          angle: (Math.random() * Math.PI) / 6 + Math.PI / 4,
          opacity: 1,
        })
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const colors = getCanvasColors()

      // Create and animate shooting stars
      createShootingStar()

      shootingStarsRef.current = shootingStarsRef.current.filter((shootingStar) => {
        ctx.save()
        ctx.globalAlpha = shootingStar.opacity
        ctx.lineWidth = 3
        ctx.lineCap = "round"

        const startX = shootingStar.x
        const startY = shootingStar.y
        const endX = shootingStar.x - Math.cos(shootingStar.angle) * shootingStar.length
        const endY = shootingStar.y - Math.sin(shootingStar.angle) * shootingStar.length

        const gradient = ctx.createLinearGradient(startX, startY, endX, endY)
        gradient.addColorStop(0, colors.primary)
        gradient.addColorStop(0.7, `rgba(${colors.primaryRgb}, 0.5)`)
        gradient.addColorStop(1, `rgba(${colors.primaryRgb}, 0)`)

        ctx.strokeStyle = gradient
        ctx.beginPath()
        ctx.moveTo(startX, startY)
        ctx.lineTo(endX, endY)
        ctx.stroke()
        ctx.restore()

        // Update shooting star position
        shootingStar.x += Math.cos(shootingStar.angle) * shootingStar.speed
        shootingStar.y += Math.sin(shootingStar.angle) * shootingStar.speed
        shootingStar.opacity -= 0.008

        return shootingStar.opacity > 0 && shootingStar.x < canvas.width + 200 && shootingStar.y < canvas.height + 200
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    resizeCanvas()
    const timeoutId = setTimeout(animate, 100)

    const handleResize = () => {
      resizeCanvas()
    }

    window.addEventListener("resize", handleResize)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      clearTimeout(timeoutId)
      window.removeEventListener("resize", handleResize)
    }
  }, [mounted, resolvedTheme, getCanvasColors])

  const getLayerTransform = (layer: number) => {
    switch (layer) {
      case 1:
        return springY1
      case 2:
        return springY2
      case 3:
        return springY3
      case 4:
        return springY4
      default:
        return springY1
    }
  }

  const getLayerOpacity = (layer: number) => {
    switch (layer) {
      case 1:
        return 0.3
      case 2:
        return 0.5
      case 3:
        return 0.7
      case 4:
        return 0.9
      default:
        return 0.5
    }
  }

  const getLayerSize = (layer: number, baseSize: number) => {
    switch (layer) {
      case 1:
        return baseSize * 0.6
      case 2:
        return baseSize * 0.8
      case 3:
        return baseSize * 1.0
      case 4:
        return baseSize * 1.2
      default:
        return baseSize
    }
  }

  const getStarColor = (layer: number) => {
    const isDark = resolvedTheme === "dark"
    if (isDark) {
      return `hsl(262.1, 83.3%, ${57.8 + layer * 5}%)`
    } else {
      return `hsl(262.1, 83.3%, ${47.8 + layer * 3}%)`
    }
  }

  if (!mounted) return null

  return (
    <>
      {/* Canvas for shooting stars */}
      <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />

      {/* Parallax stars using Framer Motion */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute rounded-full"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${getLayerSize(star.layer, star.size)}px`,
              height: `${getLayerSize(star.layer, star.size)}px`,
              y: getLayerTransform(star.layer),
              opacity: getLayerOpacity(star.layer),
              willChange: "transform, opacity",
              background: getStarColor(star.layer),
              boxShadow: `0 0 ${star.size * 2}px ${getStarColor(star.layer)}50`,
            }}
            animate={{
              opacity: [
                getLayerOpacity(star.layer) * 0.3,
                getLayerOpacity(star.layer),
                getLayerOpacity(star.layer) * 0.5,
                getLayerOpacity(star.layer),
              ],
              scale: [1, 1.1, 0.9, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Number.POSITIVE_INFINITY,
              delay: star.twinkleDelay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </>
  )
}
