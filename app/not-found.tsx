"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Home, RefreshCw } from "lucide-react"

export default function NotFound() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Mouse position tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        })
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  // Spring physics for smoother motion
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  useEffect(() => {
    x.set(mousePosition.x)
    y.set(mousePosition.y)
  }, [mousePosition, x, y])

  const springConfig = { damping: 25, stiffness: 100 }
  const springX = useSpring(x, springConfig)
  const springY = useSpring(y, springConfig)

  // Transform values for the floating 404
  const rotateX = useTransform(springY, [0, 300], [10, -10])
  const rotateY = useTransform(springX, [0, 300], [-10, 10])
  const float404X = useTransform(springX, [0, 300], [-15, 15])
  const float404Y = useTransform(springY, [0, 300], [-15, 15])

  // Handle refresh animation
  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      window.location.reload()
    }, 1000)
  }

  // Particles for background
  const particles = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 10 + 5,
    duration: Math.random() * 20 + 10,
  }))

  return (
    <div
      ref={containerRef}
      className="relative flex items-center justify-center min-h-screen overflow-hidden bg-gradient-to-b from-background to-background/80 text-foreground"
    >
      {/* Interactive particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-primary/10"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            x: [0, Math.random() * 100 - 50, 0],
            y: [0, Math.random() * 100 - 50, 0],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Main content */}
      <div className="relative z-10 text-center space-y-8 max-w-md px-4">
        {/* Interactive 404 that follows mouse */}
        <motion.div
          className="relative"
          style={{
            x: float404X,
            y: float404Y,
            rotateX,
            rotateY,
            perspective: 1000,
          }}
        >
          <motion.h1
            className="text-8xl font-bold"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">404</span>
          </motion.h1>

          {/* Shadow effect */}
          <motion.div
            className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 blur-xl opacity-30 text-8xl font-bold text-primary"
            style={{
              x: useTransform(float404X, (v) => v * -0.5),
              y: useTransform(float404Y, (v) => v * -0.5),
            }}
          >
            404
          </motion.div>
        </motion.div>

        <motion.h2
          className="text-3xl font-semibold"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Page Not Found
        </motion.h2>

        <motion.p
          className="text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Oops! The page you&apos;re looking for doesn&apos;t exist. It might have been moved or deleted.
        </motion.p>

        {/* Interactive search */}
        <motion.div
          className="pt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          {!isSearching ? (
            <Button variant="outline" onClick={() => setIsSearching(true)} className="group">
              <Search className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
              Looking for something?
            </Button>
          ) : (
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Try searching..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
                autoFocus
              />
              <Button variant="outline" onClick={() => setIsSearching(false)}>
                Cancel
              </Button>
            </div>
          )}
        </motion.div>

        {/* Action buttons */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 pt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <Link href="/" passHref>
            <Button variant="default" size="lg" className="group relative overflow-hidden">
              <motion.span
                className="absolute inset-0 bg-primary-foreground/10"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.5 }}
              />
              <Home className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
              Return Home
            </Button>
          </Link>

          <Button variant="outline" size="lg" onClick={handleRefresh} className="group" disabled={isRefreshing}>
            <motion.span
              animate={isRefreshing ? { rotate: 360 } : {}}
              transition={{ duration: 1, ease: "linear", repeat: isRefreshing ? Number.POSITIVE_INFINITY : 0 }}
            >
              <RefreshCw className="mr-2 h-5 w-5" />
            </motion.span>
            Try Again
          </Button>
        </motion.div>
      </div>
    </div>
  )
}
