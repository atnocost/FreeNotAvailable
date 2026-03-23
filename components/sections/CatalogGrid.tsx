import Image from 'next/image'
import Link from 'next/link'
import FadeInView from '@/components/ui/FadeInView'

const PROJECTS = [
  {
    act: 'Act I',
    title: 'FINExME',
    desc: 'Seven tracks. Warm reds. Romantic fatalism.',
    cover: '/images/finexme-cover.avif',
    href: '/finexme',
    accent: '#c0392b',
  },
  {
    act: 'Act II',
    title: 'SINE NOCTIS',
    desc: 'Three movements. Monochrome. One descent.',
    cover: '/images/sinenoctis-cover.avif',
    href: '/sinenoctis',
    accent: '#d0d0d0',
    grayscale: true,
  },
]

export default function CatalogGrid() {
  return (
    <section
      id="catalog"
      data-section-id="catalog"
      className="relative section-padding"
      aria-label="Catalog"
    >
      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-10">
        <FadeInView>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {PROJECTS.map((p) => (
              <Link
                key={p.title}
                href={p.href}
                className="group block"
              >
                <div className="relative aspect-square overflow-hidden rounded-sm">
                  <Image
                    src={p.cover}
                    alt={`${p.title} cover art`}
                    fill
                    className={`object-cover transition-transform duration-700 group-hover:scale-[1.03] ${p.grayscale ? 'grayscale' : ''}`}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute inset-0 vignette" />
                  {/* Text overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                    <span
                      className="text-[9px] font-pixel tracking-[0.2em] uppercase block mb-2"
                      style={{ color: p.accent }}
                    >
                      {p.act}
                    </span>
                    <h3 className="font-big-caesar text-3xl md:text-4xl text-white/90 tracking-wide mb-2">
                      {p.title}
                    </h3>
                    <p className="font-sans text-xs md:text-sm text-white/50">
                      {p.desc}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </FadeInView>
      </div>
    </section>
  )
}
