import Image from 'next/image'

export default function EkthesisGate() {
  return (
    <div className="min-h-screen bg-canvas flex flex-col items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        {/* Eyebrow */}
        <span className="text-[9px] tracking-[0.2em] uppercase text-white/30 block mb-6">
          A Proposition for the Other World
        </span>

        {/* Title */}
        <h1 className="font-sans text-5xl md:text-6xl font-extrabold text-heading tracking-[0.02em] mb-5">
          EKTHESIS
        </h1>

        {/* Subtitle */}
        <p className="font-serif text-sm italic text-white/40 mb-10">
          This isn&rsquo;t public. You&rsquo;d know if it were.
        </p>

        {/* Request access */}
        <a
          href="mailto:entry@atnocost.cc?subject=Ekthesis%20Access%20Request"
          className="text-[9.5px] text-accent/70 hover:text-accent transition-colors"
        >
          Request access &rarr;
        </a>
      </div>

      {/* OWJV emblem */}
      <div className="absolute bottom-10">
        <div className="relative w-8 h-8 opacity-20">
          <Image src="/images/owjv-cherub-transparent.png" alt="OWJV" fill className="object-contain" sizes="32px" />
        </div>
      </div>
    </div>
  )
}
