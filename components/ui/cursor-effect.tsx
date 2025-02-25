"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export const CursorEffect = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest("button") || target.closest("a")) {
        setIsHovering(true)
      } else {
        setIsHovering(false)
      }
    }

    window.addEventListener("mousemove", updateMousePosition)
    window.addEventListener("mouseover", handleMouseEnter)

    return () => {
      window.removeEventListener("mousemove", updateMousePosition)
      window.removeEventListener("mouseover", handleMouseEnter)
    }
  }, [])

  return (
    <motion.div
      className="fixed pointer-events-none z-[60]"
      animate={{
        x: mousePosition.x - 4,
        y: mousePosition.y - 4,
        scale: isHovering ? 2 : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 30,
      }}
    >
      <div className="relative">
        <div className="w-2 h-2 bg-white rounded-full" />

        <div className="absolute -inset-2 bg-white/20 rounded-full blur-sm" />
        <div className="absolute -inset-3 bg-white/10 rounded-full blur-md" />

        {isHovering && <div className="absolute -inset-4 border border-white/30 rounded-full" />}
      </div>
    </motion.div>
  )
}

