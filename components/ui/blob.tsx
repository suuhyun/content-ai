"use client"

import { motion } from "framer-motion"

export const Blob = () => {
  return (
    <motion.div
      className="absolute w-[800px] h-[800px] rounded-full bg-gradient-to-r from-violet-300/30 to-pink-300/30 blur-3xl"
      animate={{
        scale: [1, 1.2, 1],
        rotate: [0, 180, 360],
        borderRadius: ["60% 40% 30% 70%", "30% 60% 70% 40%", "60% 40% 30% 70%"],
      }}
      transition={{
        duration: 8,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse",
      }}
    />
  )
}

