import Image from 'next/image'

export default function BriefGate() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-6">
      <div className="max-w-md w-full text-center flex flex-col items-center">
        <div className="relative w-10 h-10 opacity-40 mb-8">
          <Image src="/images/owjv-cherub-transparent.png" alt="OWJV" fill className="object-contain" sizes="40px" priority />
        </div>

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
    </div>
  )
}
