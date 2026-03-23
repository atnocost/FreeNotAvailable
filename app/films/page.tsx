'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Footer from '@/components/layout/Footer'

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const FINEXME_FILMS = [
  {
    title: 'AT NO COST',
    slug: 'at-no-cost',
    role: 'First Trailer',
    description:
      'The prologue. Full-color, high-intensity reds and blacks. FREE\u2019s face is completely concealed. The Lady In Black is present as the unnamed counterpart, already framed as omen rather than love interest.',
    image: '/images/red-portrait.avif',
    alt: 'Red-lit portrait from AT NO COST trailer',
    videoUrl: 'https://www.youtube.com/watch?v=Bpc8srzl8jA',
  },
  {
    title: 'Fine By Me',
    slug: 'fine-by-me',
    role: 'Film',
    description:
      'The first visual from the Other World. Shot on a gravel lot near the bridge, Fine By Me establishes FREE as The Faceless Man and The Lady In Black as the executor of consequence. The white BMW is his chariot through this night-world. The camera is a spy \u2014 long lenses, over-the-shoulder angles, and partial occlusions make every frame feel like a stolen moment.',
    image: '/images/dusk-silhouette-two.avif',
    alt: 'Dusk silhouette from Fine By Me',
    videoUrl: 'https://www.youtube.com/watch?v=hNwNaHOud-U',
  },
]

const SINENOCTIS_FILMS = [
  {
    title: 'ANTE',
    slug: 'ante',
    role: 'Teaser',
    description:
      'The liminal corridor between worlds. FREE emerging from a dark doorway, face still obscured. The footage is tight, grayscale, intimate. The doorway is his portal into the new world \u2014 the threshold between death and reincarnation.',
    image: '/images/ante-doorway.avif',
    alt: 'Stone archway doorway from ANTE teaser',
    videoUrl: 'https://www.youtube.com/watch?v=0MZYQ8p_QEU',
  },
  {
    title: 'VESPERA',
    slug: 'vespera',
    role: 'Teaser II',
    description:
      'Evening/dusk/evening star. FREE\u2019s first evening wandering this new world. Less shock, more numb, heavy melancholy. He drifts before the next set of temptations draws him in.',
    image: '/images/vespera-cover.avif',
    alt: 'European architecture at night from VESPERA',
    videoUrl: 'https://www.youtube.com/watch?v=UHIgUJa2fI4',
  },
  {
    title: 'NOCTEM',
    slug: 'noctem',
    role: 'Trailer',
    description:
      'The plunge into the new night. This is where FREE begins to actively participate in this incarnation \u2014 making choices, setting up for what comes next.',
    image: '/images/noctem-cover.avif',
    alt: 'Bokeh night photography from NOCTEM trailer',
    videoUrl: 'https://www.youtube.com/watch?v=PSIpF980ZAE',
  },
  {
    title: 'SINE NOCTIS',
    slug: 'sine-noctis',
    role: 'Full Visual',
    description:
      'A double visual for Van Gogh and Thin Ice Freestyle. The jacket replaces the BMW as the protective shell. FREE\u2019s face remains partially obscured through the corridors, streets, and stairwells of a single voyeuristic night.',
    image: '/images/sinenoctis-visual-cover.avif',
    alt: 'Alpinestars jacket portrait from SINE NOCTIS visual',
  },
]

/* ------------------------------------------------------------------ */
/*  Helpers                                                             */
/* ------------------------------------------------------------------ */

function toEmbedUrl(watchUrl: string): string {
  const id = new URL(watchUrl).searchParams.get('v')
  return `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`
}

/* ------------------------------------------------------------------ */
/*  Play Button SVG                                                    */
/* ------------------------------------------------------------------ */

function PlayIcon() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
      className="opacity-60 group-hover:opacity-100 transition-opacity duration-300"
    >
      <circle cx="24" cy="24" r="23" stroke="currentColor" strokeWidth="1" />
      <polygon points="19,15 35,24 19,33" fill="currentColor" />
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/*  Film Card                                                          */
/* ------------------------------------------------------------------ */

function FilmCard({
  title,
  role,
  description,
  image,
  alt,
  videoUrl,
  index,
  grayscale,
  accentColor,
}: {
  title: string
  role: string
  description: string
  image: string
  alt: string
  videoUrl?: string
  index: number
  grayscale?: boolean
  accentColor?: string
}) {
  const [playing, setPlaying] = useState(false)
  const isReversed = index % 2 !== 0
  const labelColor = accentColor ?? 'rgba(255,255,255,0.4)'

  useEffect(() => {
    if (!playing) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setPlaying(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [playing])

  const imageContent = (
    <div className={`relative ${isReversed ? 'lg:order-2' : ''}`}>
      <div className="relative aspect-[16/10] overflow-hidden group">
        {playing && videoUrl ? (
          <>
            <iframe
              src={toEmbedUrl(videoUrl)}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
            {/* Close button */}
            <button
              onClick={() => setPlaying(false)}
              className="absolute top-3 right-3 z-10 text-white/50 hover:text-white transition-colors text-xs font-sans tracking-[0.2em] uppercase flex items-center gap-1.5 bg-black/60 backdrop-blur-sm px-3 py-1.5 focus-visible:ring-1 focus-visible:ring-accent/50 focus-visible:outline-none"
              aria-label="Close video"
            >
              Close
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M1 1l10 10M11 1L1 11" />
              </svg>
            </button>
          </>
        ) : (
          <>
            <Image
              src={image}
              alt={alt}
              fill
              className={`object-cover transition-transform duration-700 group-hover:scale-105 ${grayscale ? 'grayscale' : ''}`}
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 vignette" />

            {/* Play overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
              <div className="relative z-10 flex flex-col items-center gap-3 text-white/60 group-hover:text-white/90 transition-colors duration-300">
                <PlayIcon />
                <span className="text-xs font-sans tracking-[0.2em] uppercase">
                  {videoUrl ? 'Watch' : 'Coming Soon'}
                </span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )

  return (
    <article
      className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
        index > 0 ? 'mt-24 md:mt-32' : ''
      }`}
    >
      {/* Image side */}
      {videoUrl && !playing ? (
        <button onClick={() => setPlaying(true)} className="block text-left w-full cursor-pointer focus-visible:ring-1 focus-visible:ring-accent/50 focus-visible:outline-none" aria-label={`Watch ${title}`}>
          {imageContent}
        </button>
      ) : (
        imageContent
      )}

      {/* Text side */}
      <div className={isReversed ? 'lg:order-1' : ''}>
        <span
          className="text-xs font-sans tracking-[0.2em] uppercase block mb-4"
          style={{ color: labelColor }}
        >
          {role}
        </span>
        <h3 className="font-sans text-3xl md:text-4xl lg:text-5xl italic text-heading mb-6 tracking-wide">
          {videoUrl ? (
            <button onClick={() => setPlaying(true)} className="hover:text-[#c0392b] transition-colors duration-300 text-left cursor-pointer focus-visible:ring-1 focus-visible:ring-accent/50 focus-visible:outline-none">
              {title}
            </button>
          ) : (
            title
          )}
        </h3>
        <p className="font-sans text-sm md:text-base leading-[1.85] text-muted max-w-[55ch]">
          {description}
        </p>
        {videoUrl && (
          playing ? (
            <a
              href={videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-6 text-xs font-sans tracking-[0.15em] uppercase text-[#c0392b]/70 hover:text-[#c0392b] transition-colors focus-visible:ring-1 focus-visible:ring-accent/50 focus-visible:outline-none"
            >
              Watch on YouTube
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M2 10L10 2M10 2H4M10 2v6" />
              </svg>
            </a>
          ) : (
            <button
              onClick={() => setPlaying(true)}
              className="inline-flex items-center gap-2 mt-6 text-xs font-sans tracking-[0.15em] uppercase text-[#c0392b]/70 hover:text-[#c0392b] transition-colors cursor-pointer focus-visible:ring-1 focus-visible:ring-accent/50 focus-visible:outline-none"
            >
              Watch Now
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M2 10L10 2M10 2H4M10 2v6" />
              </svg>
            </button>
          )
        )}
      </div>
    </article>
  )
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function FilmsPage() {
  return (
    <div className="min-h-screen bg-canvas text-body">

      {/* ---- Hero ---- */}
      <section
        data-section-id="films-hero"
        className="relative min-h-[70vh] flex flex-col items-center justify-center overflow-hidden"
        aria-label="Films"
      >
        {/* Background */}
        <div className="absolute inset-0">
          <Image
            src="/images/fine-by-me-still.avif"
            alt="Fine By Me film still"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
            quality={85}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-canvas" />
        </div>
        <div className="absolute inset-0 vignette" />

        <div className="relative z-10 text-center px-6">
          <h1 className="font-pixel text-[clamp(3.5rem,10vw,8rem)] text-heading tracking-[0.04em] leading-none">
            FILMS
          </h1>
          <p className="mt-4 font-sans text-lg md:text-xl italic text-white/50 tracking-wide">
            The visual extensions of the Other World
          </p>
        </div>
      </section>

      {/* ---- FINExME Era ---- */}
      <section
        data-section-id="films-finexme"
        className="relative section-padding"
        aria-label="FINExME Era Films"
      >
        {/* Ambient red glow */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,rgba(192,57,43,0.1)_0%,transparent_60%)]" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10">
          {/* Era label */}
          <div className="mb-16 md:mb-24">
            <span className="text-xs font-sans tracking-[0.2em] uppercase text-[#c0392b]/80 block mb-4">
              Act I
            </span>
            <h2 className="font-sans text-4xl md:text-5xl lg:text-6xl italic text-heading tracking-wide">
              FINExME
            </h2>
            <div className="mt-4 w-16 h-px bg-[#c0392b]/40" />
          </div>

          {/* Film entries */}
          {FINEXME_FILMS.map((film, i) => (
            <FilmCard
              key={film.slug}
              title={film.title}
              role={film.role}
              description={film.description}
              image={film.image}
              alt={film.alt}
              videoUrl={film.videoUrl}
              index={i}
              accentColor="rgba(192,57,43,0.8)"
            />
          ))}
        </div>
      </section>

      {/* ---- Pilgrim Interlude ---- */}
      <section className="relative h-[320px] overflow-hidden" aria-label="Pilgrim interlude">
        <Image
          src="/images/pilgrim-film.jpg"
          alt="Pilgrim — reaching into snow"
          fill
          className="object-cover object-[center_20%] opacity-[0.28] grayscale-[0.2]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-canvas via-transparent to-canvas" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-sans tracking-[0.2em] uppercase text-white/30">
            Interlude · Pilgrim
          </span>
        </div>
      </section>

      {/* ---- SINE NOCTIS Era ---- */}
      <section
        data-section-id="films-sinenoctis"
        className="relative section-padding"
        aria-label="SINE NOCTIS Era Films"
      >
        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10">
          {/* Era label */}
          <div className="mb-16 md:mb-24">
            <span className="text-xs font-sans tracking-[0.2em] uppercase text-white/40 block mb-4">
              Act II
            </span>
            <h2 className="font-sans text-4xl md:text-5xl lg:text-6xl italic text-[#e8e8e8]/90 tracking-wide">
              SINE NOCTIS
            </h2>
            <div className="mt-4 w-16 h-px bg-white/20" />
          </div>

          {/* Film entries */}
          {SINENOCTIS_FILMS.map((film, i) => (
            <FilmCard
              key={film.slug}
              title={film.title}
              role={film.role}
              description={film.description}
              image={film.image}
              alt={film.alt}
              videoUrl={'videoUrl' in film ? film.videoUrl : undefined}
              index={i}
              grayscale
            />
          ))}
        </div>
      </section>

      {/* ---- Recognition / Opportunities ---- */}
      <section
        data-section-id="films-recognition"
        className="relative section-padding border-t border-white/5"
        aria-label="Recognition and Opportunities"
      >
        <div className="max-w-3xl mx-auto px-6 md:px-10 text-center">
          <h2 className="font-sans text-3xl md:text-4xl italic text-heading mb-12 tracking-wide">
            Recognition
          </h2>

          <div className="space-y-8 text-sm md:text-base leading-[1.85] text-muted">
            <p>
              Film Independent&rsquo;s Sony Music Vision Fellowship &mdash; a $10K grant
              for filmmakers with music-driven projects &mdash; is the first institutional
              target for this body of work.
            </p>
            <p>
              Sundance, SXSW, and Tribeca form the submission pipeline for the
              completed short films as they leave development.
            </p>
          </div>

          <div className="mt-16 pt-12 border-t border-white/5">
            <p className="font-sans text-xl md:text-2xl italic text-white/30 tracking-wide max-w-[40ch] mx-auto leading-relaxed">
              Every film is a Greek vignette. Every vignette expands the Other World.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
