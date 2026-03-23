'use client'

import Image from 'next/image'
import { motion } from 'motion/react'
import type { TimelineEntry } from './timelineData'
import { ERA_COLORS } from './timelineData'

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]

function NodeDot({ era }: { era: TimelineEntry['era'] }) {
  if (era === 'future') {
    return (
      <span className="block h-3 w-3 rounded-full bg-white/20 border border-dashed border-white/30" />
    )
  }
  return (
    <span
      className="block h-3 w-3 rounded-full"
      style={{ backgroundColor: ERA_COLORS[era] }}
    />
  )
}

function CoverImage({ entry }: { entry: TimelineEntry }) {
  if (entry.type === 'future') {
    return (
      <div className="relative aspect-[3/4] w-full rounded-sm border border-dashed border-white/20 flex flex-col items-center justify-center gap-4 bg-white/[0.03]">
        {entry.image && (
          <div className="relative w-3/4 aspect-[3/1]">
            <Image
              src={`/images/${entry.image}`}
              alt={entry.title}
              fill
              sizes="(max-width: 768px) 80vw, 300px"
              className="object-contain opacity-40"
            />
          </div>
        )}
        <span className="font-mono text-[10px] tracking-widest uppercase text-white/30">
          Coming Soon
        </span>
      </div>
    )
  }

  if (!entry.image) {
    return (
      <div className="relative aspect-[3/4] w-full rounded-sm border border-white/10 flex items-center justify-center bg-white/[0.03]">
        <span className="font-sans text-sm italic text-muted/60 text-center px-4">
          {entry.title}
        </span>
      </div>
    )
  }

  return (
    <motion.div
      className="relative aspect-[3/4] w-full rounded-sm overflow-hidden vignette"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3, ease: EASE }}
    >
      <Image
        src={`/images/${entry.image}`}
        alt={entry.title}
        fill
        sizes="(max-width: 768px) 100vw, 420px"
        className={`object-cover ${entry.era === 'sinenoctis' ? 'grayscale' : ''}`}
      />
    </motion.div>
  )
}

export default function TimelineNode({ entry }: { entry: TimelineEntry }) {
  return (
    <motion.div
      className="w-[420px] shrink-0 flex flex-col items-center relative px-6 max-md:w-full"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.6, ease: EASE }}
    >
      {/* Cover image — above the rail */}
      <div className="w-full pb-5">
        <CoverImage entry={entry} />
      </div>

      {/* Node dot — on the rail */}
      <div className="flex items-center justify-center py-2">
        <NodeDot era={entry.era} />
      </div>

      {/* Text area — below the rail */}
      <div className="w-full pt-5 flex flex-col items-center text-center gap-1">
        <span className="font-mono text-[10px] tracking-widest uppercase text-muted">
          {entry.displayDate}
        </span>
        <h3
          className={`font-sans text-lg italic ${
            entry.type === 'future' ? 'text-white/30' : 'text-heading'
          }`}
        >
          {entry.title}
        </h3>
        <p className="font-sans text-xs text-muted">{entry.subtitle}</p>
        {entry.link && (
          <a
            href={entry.link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-1 font-mono text-[10px] tracking-wider uppercase text-muted/80 hover:text-heading transition-colors"
          >
            {entry.type === 'film' || entry.type === 'trailer' || entry.type === 'teaser' ? 'Watch' : 'Listen'}
            <svg
              width="10"
              height="10"
              viewBox="0 0 16 16"
              fill="none"
              className="inline-block"
            >
              <path
                d="M5 3h8v8M13 3L3 13"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        )}
      </div>
    </motion.div>
  )
}
