"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Moon, Sun, Menu, X } from "lucide-react"
import { useTheme } from "next-themes"
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "motion/react"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const navItems = ["About", "Projects", "Skills", "Contact"]
  const { scrollY } = useScroll()
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 100)
  })

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id.toLowerCase())
    if (element) {
      setTimeout(() => {
        element.scrollIntoView({ behavior: "smooth" })
      }, 100)
    }
    setIsMenuOpen(false)
  }

  if (!mounted) return null

  const renderNavLinks = (className = "text-sm font-medium text-foreground/70 hover:text-foreground transition-colors") => (
    navItems.map(item => (
      <button
        key={item}
        onClick={() => scrollToSection(item)}
        className={className}
      >
        {item}
      </button>
    ))
  )

  const ThemeButton = () => (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="rounded-full"
    >
      {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </Button>
  )

  return (
    <>
      {/* Unified Header */}
      <motion.header
        initial={{ opacity: 1 }}
        animate={{ opacity: isScrolled ? 0 : 1, pointerEvents: isScrolled ? 'none' : 'auto' }}
        transition={{ duration: 0.5 }}
        className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-full px-4 md:px-0"
      >
        <nav className="bg-background/24 border border-foreground/30 rounded-full px-6 py-3 flex items-center justify-between max-w-xl mx-auto">
          <div className="font-bold text-lg bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">Portfolio</div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center space-x-4">
            {renderNavLinks()}
            <ThemeButton />
          </div>

          {/* Mobile menu toggle */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeButton />
            <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </nav>

        {/* Mobile menu shown only in pill mode */}
        <AnimatePresence>
          {isMenuOpen && !isScrolled && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden bg-background/95 backdrop-blur-md border border-border mt-2 rounded-xl max-w-xs mx-auto"
            >
              <div className="px-4 py-4 space-y-3">
                {renderNavLinks("block w-full text-left text-sm font-medium text-foreground/70 hover:text-foreground transition-colors py-2")}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Fixed header when scrolled */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={isScrolled ? { y: 0, opacity: 1 } : { y: -100, opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        <nav className="bg-background/30 backdrop-blur-md border-b border-foreground/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="font-bold text-xl bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">Portfolio</div>
              <div className="hidden md:flex space-x-6 items-center">
                {renderNavLinks()}
                <ThemeButton />
              </div>
              <div className="md:hidden">
                <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                  {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </Button>
              </div>
            </div>
          </div>

          <AnimatePresence>
            {isMenuOpen && isScrolled && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden overflow-hidden bg-background/95 backdrop-blur-md border-b border-border"
              >
                <div className="px-4 py-4 space-y-3">
                  {renderNavLinks("block w-full text-left text-sm font-medium text-foreground/70 hover:text-foreground transition-colors py-2")}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    className="w-full justify-start"
                  >
                    {theme === "dark" ? <Sun className="h-4 w-4 mr-2" /> : <Moon className="h-4 w-4 mr-2" />}
                    {theme === "dark" ? "Light Mode" : "Dark Mode"}
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </motion.header>
    </>
  )
}
