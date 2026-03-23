import Image from 'next/image'
import Link from 'next/link'
import FadeInView from '@/components/ui/FadeInView'

export default function HeroSection() {
  return (
    <section
      id="hero"
      data-section-id="hero"
      className="relative min-h-screen flex flex-col overflow-hidden"
      aria-label="Welcome"
    >
      {/* Background photo */}
      <div className="absolute inset-0">
        <Image
          src="/images/pilgrim-hero.jpg"
          alt="FREE — Other World Mythos"
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: '55% 18%' }}
          quality={85}
        />
        {/* Left-to-right gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/92 via-black/58 via-[42%] to-black/10" />
        {/* Bottom-to-top gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent to-[38%]" />
      </div>

      {/* Content — bottom-left aligned */}
      <div className="relative z-10 mt-auto px-6 md:px-8 pb-10 md:pb-11 max-w-[960px]">
        {/* Eyebrow */}
        <FadeInView>
          <p className="text-[8px] tracking-[0.24em] uppercase text-[#c35f23]/90 mb-3">
            Other World Mythos
          </p>
        </FadeInView>

        {/* FREE logo — forced white */}
        <FadeInView delay={0.15}>
          <div className="relative h-[54px] md:h-[130px] w-auto mb-3.5">
            <Image
              src="/images/logotype-free.png"
              alt="FREE"
              fill
              className="object-contain object-left brightness-0 invert"
              sizes="(max-width: 768px) 200px, 400px"
            />
          </div>
        </FadeInView>

        {/* Tagline */}
        <FadeInView delay={0.25}>
          <p className="font-serif text-[15px] italic font-light text-white/42 leading-[1.65] max-w-[340px] mb-5">
            For the ones who still yearn.
          </p>
        </FadeInView>

        {/* CTAs */}
        <FadeInView delay={0.35}>
          <div className="flex gap-2.5">
            <Link
              href="/#finexme"
              className="text-[9px] tracking-[0.16em] uppercase py-2.5 px-7 bg-white text-black rounded-[2px] font-sans font-normal hover:bg-white/90 transition-colors"
            >
              Hear
            </Link>
            <Link
              href="/films"
              className="text-[9px] tracking-[0.16em] uppercase py-2.5 px-7 bg-transparent text-white/52 border border-white/20 rounded-[2px] font-sans hover:text-white/80 hover:border-white/40 transition-all"
            >
              Visit the Otherworld
            </Link>
          </div>
        </FadeInView>
      </div>
    </section>
  )
}
