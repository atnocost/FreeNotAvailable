'use client'

import { motion, useScroll, useTransform } from 'motion/react'
import Image from 'next/image'
import { useRef } from 'react'

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]

export default function HeroParallax() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0])

  return (
    <motion.section
      ref={heroRef}
      data-section-id="title"
      style={{ opacity: heroOpacity }}
      className="min-h-screen flex flex-col items-center justify-center px-6 relative"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 1.5 }}
        className="relative w-10 h-10 mb-12"
      >
        <Image src="/images/owjv-cherub-transparent.png" alt="OWJV emblem" fill className="object-contain" sizes="40px" />
      </motion.div>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3, ease: EASE }}
        className="font-pixel text-[clamp(4rem,12vw,10rem)] leading-[0.85] tracking-tight text-heading text-center"
      >
        EKTHESIS
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="font-mono text-[clamp(0.75rem,2vw,1rem)] text-muted mt-6 text-center tracking-wider"
      >
        A proposition for the Other World
      </motion.p>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="w-px h-14 bg-white/20"
        />
      </motion.div>
    </motion.section>
  )
}
