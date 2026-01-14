"use client"

import { motion } from "framer-motion"
import { Menu } from "lucide-react"

interface MenuButtonProps {
  onClick: () => void
}

export default function MenuButton({ onClick }: MenuButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className="fixed top-4 right-4 md:top-8 md:right-8 z-50 p-3 md:p-4 bg-black/50 backdrop-blur-lg border border-white/20 rounded-full hover:bg-primary/20 hover:border-primary/50 transition-all duration-300"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.3 }}
    >
      <Menu className="w-5 h-5 md:w-6 md:h-6 text-white" />
    </motion.button>
  )
}

