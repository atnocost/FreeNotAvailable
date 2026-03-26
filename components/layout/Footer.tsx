import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="relative py-16 md:py-24 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6 md:px-10 flex flex-col items-center gap-8">
        {/* OWJV cherub logo */}
        <div className="relative w-20 h-20 md:w-28 md:h-28 opacity-40">
          <Image
            src="/images/owjv-cherub-transparent.png"
            alt="OWJV"
            fill
            className="object-contain"
            sizes="64px"
          />
        </div>

        {/* Text credits */}
        <div className="flex flex-col items-center gap-2 text-center">
          <p className="text-xs font-sans tracking-[0.15em] uppercase text-white/30">
            Creative Minds Coalition
          </p>
          <p className="text-xs font-sans tracking-[0.2em] uppercase text-white/25">
            OWJV
          </p>
        </div>

        {/* Links */}
        <div className="flex gap-5">
          <a
            href="/epk"
            className="text-[9px] font-sans tracking-[0.2em] uppercase text-white/25 hover:text-white/35 transition-colors"
          >
            Press
          </a>
          <a
            href="/ekthesis"
            className="text-[9px] font-sans tracking-[0.2em] uppercase text-white/25 hover:text-white/35 transition-colors"
          >
            Proposition
          </a>
        </div>

        {/* Copyright */}
        <p className="text-[10px] font-sans tracking-[0.1em] text-white/25">
          &copy; 2026 Other Worldly, Just Visiting. All Rights Reserved.
        </p>
      </div>
    </footer>
  )
}
