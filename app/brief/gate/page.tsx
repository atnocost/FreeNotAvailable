import Image from 'next/image'

export default function BriefGate() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        <span className="text-[9px] tracking-[0.2em] uppercase text-white/30 block mb-6">
          SINE NOCTIS &middot; Creative Brief
        </span>

        <h1 className="font-big-caesar text-5xl md:text-6xl tracking-[0.04em] text-white/85 mb-5">
          SINENOCTIS
        </h1>

        <p className="font-serif text-sm italic text-white/40 mb-10">
          This document is internal. Access requires a token.
        </p>

        <a
          href="mailto:freeisavailable@atnocost.cc?subject=Brief%20Access%20Request"
          className="text-[9.5px] text-white/40 hover:text-white/60 transition-colors"
        >
          Request access &rarr;
        </a>
      </div>

      <div className="absolute bottom-10">
        <div className="relative w-8 h-8 opacity-20">
          <Image src="/images/owjv-cherub-transparent.png" alt="OWJV" fill className="object-contain" sizes="32px" />
        </div>
      </div>
    </div>
  )
}
