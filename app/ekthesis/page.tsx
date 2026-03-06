import Image from 'next/image'
import type { CaseStudy, StatItem } from '@/lib/content/types'
import ComparablesTable from './ComparablesTable'
import PlatformGrid from './PlatformGrid'
import { StreamingRatesTable, SyncRangesTable } from './RevenueTable'
import RevenueChart from './RevenueChart'
import AnimatedSection from './AnimatedSection'
import AnimatedElement from './AnimatedElement'
import HeroParallax from './HeroParallax'

/* ─── Reusable label / title (server markup, animated via client island) ─── */

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <AnimatedElement
      as="span"
      custom={0}
      className="text-xs font-sans tracking-[0.2em] uppercase text-white/40 block mb-6"
    >
      {children}
    </AnimatedElement>
  )
}

function SectionTitle({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <AnimatedElement
      as="h2"
      custom={1}
      className={`font-sans text-4xl md:text-5xl lg:text-6xl italic text-heading leading-[0.95] mb-12 ${className}`}
    >
      {children}
    </AnimatedElement>
  )
}

/* ─── Stat ─── */
function Stat({ value, label, source, accent, i = 0 }: StatItem & { accent?: boolean; i?: number }) {
  return (
    <AnimatedElement custom={i}>
      <span className={`block font-display text-4xl md:text-5xl ${accent ? 'text-accent' : 'text-heading'}`}>
        {value}
      </span>
      <span className="font-sans text-xs text-muted mt-2 block">{label}</span>
      {source && <span className="font-mono text-[9px] text-white/15 mt-1 block">{source}</span>}
    </AnimatedElement>
  )
}

/* ─── Case studies data ─── */
const caseStudies = [
  {
    artist: 'Brent Faiyaz',
    project: 'Lost Kids / Wasteland (2022)',
    finding: 'Debuted #2 Billboard 200 fully independent. Wasteland certified Platinum (Sep 2023). Built Lost Kids label, kept his masters, built a moody cinematic visual identity around the music. Later distributed via UnitedMasters.',
    relevance: 'Independent male R&B can go Platinum. FREE\'s CMC/OWJV structure follows this path.',
  },
  {
    artist: 'Frank Ocean',
    project: 'Endless / Blonde (2016)',
    finding: 'Released 45-minute visual album Endless on Apple Music to fulfill Def Jam contract. Next day, independently released Blonde via Boys Don\'t Cry label. Blonde went Platinum. Limited-edition magazine ($80) sold out at pop-ups, now resells at $300-500+.',
    relevance: 'Used a visual album as a business move. Art that doubled as an exit strategy. FREE\'s creative bible parallels Ocean\'s magazine: a physical narrative object.',
  },
  {
    artist: 'Beyonce',
    project: 'Black Is King (2020)',
    finding: '85-minute visual film released exclusively on Disney+. Grammy-nominated for Best Music Film. Shot across multiple countries. Helped drive Disney+ subscriber numbers during 2020.',
    relevance: 'Music-driven visual narrative sold as premium streaming content. FREE\'s Other World builds the same type of mythology at indie scale.',
  },
  {
    artist: 'Childish Gambino',
    project: 'Because the Internet (2013) + Clapping for the Wrong Reasons',
    finding: 'Released album alongside a 72-page screenplay and a free 25-minute short film on YouTube. This Is America later certified Diamond (10M+ units). The album/screenplay/film combo led directly to Atlanta (FX, 2016-2022).',
    relevance: 'Free short film + written narrative turned into a TV deal. FREE\'s creative bible + Fine By Me Film runs the same play.',
  },
] as const satisfies readonly CaseStudy[]

/* ═══════════════════════════════════════════ */
/*  EKTHESIS PAGE — 12 SECTIONS               */
/* ═══════════════════════════════════════════ */
export default function EkthesisPage() {
  return (
    <main className="bg-canvas min-h-screen">

      {/* ═══ 1. TITLE ═══ */}
      <HeroParallax />

      {/* ═══ 2. THE ARTIST ═══ */}
      <AnimatedSection id="artist" className="overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-cover.avif"
            alt="FREE in shadow"
            fill
            className="object-cover object-center opacity-15"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-canvas via-canvas/70 to-canvas" />
        </div>
        <div className="relative z-10">
          <SectionLabel>The Artist</SectionLabel>
          <AnimatedElement
            as="h2"
            custom={1}
            className="font-sans text-3xl md:text-5xl italic text-heading leading-[1.05] max-w-[24ch] mb-12"
          >
            Male R&amp;B artists rarely create music rooted in{' '}
            <span className="text-accent">longing</span> anymore. The bruises haven&rsquo;t gone anywhere.
          </AnimatedElement>
          <AnimatedElement custom={2} className="font-sans text-sm md:text-base leading-[1.8] text-muted max-w-[60ch] space-y-5 mb-12">
            <p>
              FREE is a songwriter in the space where deflection meets self-reflection.
              His sound draws from early 2010s R&amp;B: a cold croon. Product of the 90s, shaped
              by the Jodeci era, filtered through a millennial viewpoint. Based in Detroit.
            </p>
            <p>
              The creative universe is called Other World. Two copyright-holding entities
              sit behind it: Creative Minds Coalition and OWJV (Other Worldly, Just Visiting).
              Every release lives inside a visual mythology built before the first track dropped.
            </p>
          </AnimatedElement>
          <AnimatedElement custom={3} className="grid grid-cols-3 gap-6">
            <div>
              <span className="font-display text-5xl md:text-6xl text-accent block">10</span>
              <span className="font-sans text-xs text-muted mt-1 block">released tracks across 2 projects</span>
            </div>
            <div>
              <span className="font-display text-5xl md:text-6xl text-heading block">2</span>
              <span className="font-sans text-xs text-muted mt-1 block">film assets (Fine By Me Film + SINE NOCTIS trailers)</span>
            </div>
            <div>
              <span className="font-display text-5xl md:text-6xl text-heading block">5</span>
              <span className="font-sans text-xs text-muted mt-1 block">planned projects in the Other World arc</span>
            </div>
          </AnimatedElement>
        </div>
      </AnimatedSection>

      {/* ═══ 3. THE THESIS ═══ */}
      <AnimatedSection id="thesis">
        <SectionLabel>The Thesis</SectionLabel>
        <AnimatedElement
          as="h2"
          custom={1}
          className="font-sans text-3xl md:text-4xl lg:text-5xl italic text-heading leading-[1.05] max-w-[28ch] mb-6"
        >
          Male vulnerability is <span className="text-accent">underserved</span> in R&amp;B.
        </AnimatedElement>
        <AnimatedElement custom={2} className="font-sans text-sm leading-[1.8] text-muted max-w-[60ch] space-y-5 mb-16">
          <p>
            R&amp;B/Hip-Hop has been the #1 genre in US music consumption every year since 2017,
            holding roughly 28% of the market. R&amp;B standalone accounts for about 10-11%.
            That 10-11% is stable, loyal, and underserved on digital platforms relative to its
            actual cultural weight.
          </p>
          <p>
            Visual storytelling is the edge. Audio-only artists get lost in the feed.
            Short films feed the algorithm, give editors a story, and show sync supervisors
            the music works on screen.
          </p>
        </AnimatedElement>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          <Stat value="~28%" label="R&B/Hip-Hop share of US consumption" source="MRC Data/Luminate" accent i={3} />
          <Stat value="10-11%" label="R&B standalone share" source="RIAA via Statista" i={4} />
          <Stat value="+5%" label="Streams with Spotify Canvas" source="Spotify for Artists" i={5} />
          <Stat value="+145%" label="Shares with Spotify Canvas" source="Spotify for Artists" accent i={6} />
        </div>
        <AnimatedElement custom={7} className="mt-12 border border-white/10 p-6">
          <span className="text-xs font-sans tracking-[0.15em] uppercase text-white/30 block mb-4">Visual album press multiplier</span>
          <p className="font-sans text-xs text-muted leading-relaxed">
            Visual albums pull 3-5x more press than audio-only releases. Music writers cover the sound,
            film writers cover the visuals, fashion press covers the wardrobe. One release, multiple news cycles.
          </p>
          <p className="font-sans text-xs text-muted leading-relaxed mt-3">
            Spotify Canvas data: +5% streams, +145% shares, +20% playlist adds versus tracks without Canvas.
            That is just a looping video. A full short film hits harder.
          </p>
        </AnimatedElement>
      </AnimatedSection>

      {/* ═══ 4. THE UNIVERSE ═══ */}
      <AnimatedSection id="universe">
        <SectionLabel>The Universe</SectionLabel>
        <SectionTitle>Other World</SectionTitle>

        {/* Released projects */}
        <div className="space-y-16 mb-20">
          <AnimatedElement custom={2} className="flex flex-col md:flex-row gap-6 md:gap-10">
            <div className="relative w-40 h-40 shrink-0">
              <Image src="/images/finexme-cover.avif" alt="FINExME album cover" fill className="object-cover" sizes="160px" />
            </div>
            <div>
              <div className="flex items-center gap-4 mb-2">
                <span className="font-sans text-2xl md:text-3xl italic text-[#f5e6e0] tracking-wide">FINExME</span>
                <span className="font-sans text-xs tracking-[0.15em] uppercase text-accent">Act I &mdash; 2024</span>
              </div>
              <p className="font-sans text-sm leading-[1.8] text-muted mb-3">
                A collection of demos, sequenced into a cohesive narrative. 7 tracks. Vibrant reds
                and neon accents against shadow work. Passion and rawness, unpolished on purpose.
              </p>
              <div className="font-mono text-xs text-white/30 space-y-1">
                <div>Production: Mookie Magnolia, Ashton Woods, Worst Choice, Brando Heat</div>
                <div>Focal motif: The BMW (movement and identity)</div>
              </div>
              <div className="flex gap-4 mt-4">
                <a href="https://open.spotify.com/album/7qa4temn9cmuwiSPTwbf8c" target="_blank" rel="noopener noreferrer" className="font-sans text-xs tracking-[0.15em] uppercase text-white/40 hover:text-accent transition-colors">Spotify</a>
                <a href="https://music.apple.com/us/album/finexme/1724039694" target="_blank" rel="noopener noreferrer" className="font-sans text-xs tracking-[0.15em] uppercase text-white/40 hover:text-accent transition-colors">Apple Music</a>
              </div>
            </div>
          </AnimatedElement>

          <AnimatedElement custom={3} className="flex flex-col md:flex-row gap-6 md:gap-10">
            <div className="relative w-40 h-40 shrink-0">
              <Image src="/images/sinenoctis-cover.avif" alt="SINE NOCTIS cover art" fill className="object-cover grayscale" sizes="160px" />
            </div>
            <div>
              <div className="flex items-center gap-4 mb-2">
                <span className="font-sans text-2xl md:text-3xl italic text-[#e8e8e8] tracking-wide">SINE NOCTIS</span>
                <span className="font-sans text-xs tracking-[0.15em] uppercase text-white/40">Act II &mdash; 2026</span>
              </div>
              <p className="font-sans text-sm leading-[1.8] text-muted mb-3">
                The icy follow-up. Three tracks. Grayscale. Alone this time. Stillness on the
                surface, something heavier underneath.
              </p>
              <div className="font-mono text-xs text-white/30 space-y-1">
                <div>Production: FREE, HNMadeThisOne, Eli Myles</div>
                <div>Focal motif: The Alpinestars Jacket (shelter and resilience)</div>
              </div>
            </div>
          </AnimatedElement>
        </div>

        {/* Film content */}
        <AnimatedElement custom={4} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <div className="border border-white/10 p-6">
            <span className="font-sans text-xs tracking-[0.15em] uppercase text-accent/60 block mb-3">Film</span>
            <span className="font-display text-lg text-heading block mb-2">Fine By Me Film</span>
            <p className="font-sans text-xs text-muted leading-relaxed">
              A short film set at an ambiguous gravel lot by water near The Bridge.
              The white BMW acts as his chariot through this night-world.
            </p>
          </div>
          <div className="border border-white/10 p-6">
            <span className="font-sans text-xs tracking-[0.15em] uppercase text-white/40 block mb-3">Trailers</span>
            <span className="font-display text-lg text-heading block mb-2">SINE NOCTIS Visual Series</span>
            <p className="font-sans text-xs text-muted leading-relaxed">
              ANTE (the doorway), VESPERA (the dusk walk), NOCTEM (the night plunge). A three-part
              descent leading into the full visual for VAN GOGH and THIN ICE FREESTYLE.
            </p>
          </div>
        </AnimatedElement>

        {/* Future roadmap */}
        <AnimatedElement custom={5}>
          <span className="text-xs font-sans tracking-[0.15em] uppercase text-white/30 block mb-6">What comes next</span>
          <div className="grid grid-cols-3 gap-8">
            {[
              { alt: 'SINE NOCTIS 2', status: 'In Progress', desc: 'In final stages of completion and a companion piece to SINE NOCTIS sonically, narratively and visually.' },
              { alt: 'OTHERLAND', status: 'In Development', desc: 'Next full-length album.' },
              { alt: 'SEX SYMBOL', status: 'Postponed', desc: 'The culmination. Entirely produced by Worst Choice.' },
            ].map((item) => (
              <div key={item.alt}>
                <div className="w-full aspect-[3/1] mb-4 flex items-center justify-center">
                  <span className="font-sans text-xl md:text-2xl italic tracking-[0.06em] text-white/40">
                    {item.alt}
                  </span>
                </div>
                <span className="font-mono text-xs text-white/30 block mb-1">{item.status}</span>
                <p className="font-sans text-xs text-muted">{item.desc}</p>
              </div>
            ))}
          </div>
        </AnimatedElement>
      </AnimatedSection>

      {/* ═══ 5. THE MODEL ═══ */}
      <AnimatedSection id="model">
        <SectionLabel>The Model</SectionLabel>
        <SectionTitle className="max-w-[24ch]">Music &times; Film</SectionTitle>
        <AnimatedElement custom={2} className="font-sans text-sm leading-[1.8] text-muted max-w-[60ch] space-y-5 mb-16">
          <p>
            Every music release gets a narrative short film. The film doubles as a sync
            demo reel. Music supervisors watch the music work on screen instead of
            hearing it cold on a playlist.
          </p>
          <p>
            Visual albums pull 3-5x more press than audio-only releases.
            Spotify Canvas alone adds +5% streams, +145% shares, +20% playlist adds.
            Canvas is a looping video. A real short film does more.
          </p>
        </AnimatedElement>

        <AnimatedElement custom={3} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {[
            { label: 'Make', desc: 'Original music scored to narrative short films. Each film doubles as a sync demo reel.', color: 'text-accent' },
            { label: 'Circulate', desc: 'Films play festivals, YouTube, social. Music supervisors find the music already working on screen.', color: 'text-heading' },
            { label: 'Convert', desc: 'Sync inquiries come from the films. Brand deals follow. People who watch stick around longer than casual listeners.', color: 'text-heading' },
            { label: 'Grow', desc: 'Revenue funds the next film. Catalog grows. Sync pool grows. The whole body of work gets more valuable.', color: 'text-heading' },
          ].map((step) => (
            <div key={step.label} className="border border-white/10 p-6 hover:border-white/20 transition-colors">
              <span className={`text-xs font-sans tracking-[0.15em] uppercase block mb-3 ${step.color}`}>{step.label}</span>
              <p className="font-sans text-xs text-muted leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </AnimatedElement>

        {/* Revenue streams list */}
        <AnimatedElement custom={4}>
          <details className="group border border-white/10">
            <summary className="list-none flex items-center gap-2 cursor-pointer p-6 md:p-10 select-none hover:text-white/60 focus-visible:ring-1 focus-visible:ring-accent/50 focus-visible:outline-none">
              <span
                className="text-accent text-xs transition-transform duration-200 group-open:rotate-90"
                aria-hidden="true"
              >&#9654;</span>
              <span className="text-xs font-sans tracking-[0.15em] uppercase text-white/40">
                8 Revenue Streams — click to expand
              </span>
            </summary>
            <div className="px-6 md:px-10 pb-6 md:pb-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-2 text-sm">
                {[
                  'Streaming royalties (Spotify, Apple Music, TIDAL, etc.)',
                  'YouTube ad revenue (long-form films)',
                  'Sync licensing (TV, film, ads, games)',
                  'Live performance / touring',
                  'Merchandise (Other World IP-driven)',
                  'Brand deals (music + visual content)',
                  'Patreon / Bandcamp (direct fan support)',
                  'Film festivals / platform acquisitions',
                ].map((s) => (
                  <div key={s} className="flex items-start gap-2 py-2 border-b border-white/5 last:border-0">
                    <span className="text-accent/40 mt-0.5">+</span>
                    <span className="font-sans text-xs text-muted">{s}</span>
                  </div>
                ))}
              </div>
            </div>
          </details>
        </AnimatedElement>
      </AnimatedSection>

      {/* ═══ 6. MARKET OPPORTUNITY ═══ */}
      <AnimatedSection id="market">
        <SectionLabel>Market Opportunity</SectionLabel>
        <AnimatedElement
          as="h2"
          custom={1}
          className="font-sans text-3xl md:text-4xl lg:text-5xl italic text-heading leading-[1.05] max-w-[26ch] mb-6"
        >
          R&amp;B is the biggest genre in America
        </AnimatedElement>
        <AnimatedElement as="p" custom={2} className="font-sans text-sm leading-[1.8] text-muted max-w-[60ch] mb-16">
          Combined R&amp;B/Hip-Hop has been the #1 genre in US music consumption every year
          since 2017. Independent artists now earn half of all Spotify royalties. Distribution
          is cheaper, tools are better, and the middlemen are optional.
        </AnimatedElement>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 mb-16">
          <Stat value="$29.6B" label="Global recorded music revenue (2024)" source="IFPI 2024" accent i={3} />
          <Stat value="$1.2B" label="US R&B standalone revenue (est.)" source="RIAA/Statista, ~10-11% of $11.3B" i={4} />
          <Stat value="$412.6M" label="US sync licensing market (2024)" source="RIAA 2024" i={5} />
          <Stat value="752M" label="Global paid streaming subscribers" source="IFPI 2024" accent i={6} />
          <Stat value="$5B+" label="Indie artist earnings on Spotify (2024)" source="Spotify Loud & Clear 2024" i={7} />
          <Stat value="$10B+" label="Total Spotify payouts in 2024 (record year)" source="Spotify Loud & Clear 2024" i={8} />
        </div>

        <AnimatedElement custom={9} className="border border-white/10 p-6 md:p-10">
          <span className="text-xs font-sans tracking-[0.15em] uppercase text-white/30 block mb-6">Independent artist benchmarks (Spotify)</span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <span className="font-display text-3xl text-accent block">~1,500</span>
              <span className="font-sans text-xs text-muted mt-1 block">artists earning $1M+/year</span>
            </div>
            <div>
              <span className="font-display text-3xl text-heading block">~$131K</span>
              <span className="font-sans text-xs text-muted mt-1 block">10,000th-ranked artist annual earnings</span>
            </div>
            <div>
              <span className="font-display text-3xl text-heading block">3x+</span>
              <span className="font-sans text-xs text-muted mt-1 block">growth at every earning threshold since 2017</span>
            </div>
          </div>
          <p className="font-mono text-[10px] text-white/20 mt-6">Source: Spotify Loud &amp; Clear 2024, loudandclear.byspotify.com</p>
        </AnimatedElement>
      </AnimatedSection>

      {/* ═══ 7. AUDIENCE ═══ */}
      <AnimatedSection id="audience">
        <SectionLabel>Audience</SectionLabel>
        <SectionTitle className="max-w-[22ch]">Who Listens</SectionTitle>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-16">
          <Stat value="36%" label="Millennials prefer R&B/Soul" source="CBS News/Nielsen" accent i={2} />
          <Stat value="30%" label="Gen Z stream R&B on Spotify (4th genre)" source="Spotify/headphonesaddict" i={3} />
          <Stat value="75%" label="TikTok users discover new music there" source="demandsage.com 2025" accent i={4} />
          <Stat value="40.3%" label="TikTok users aged 25-34 (largest cohort)" source="demandsage.com 2025" i={5} />
        </div>

        <AnimatedElement custom={6} className="font-sans text-sm leading-[1.8] text-muted max-w-[60ch] space-y-5 mb-12">
          <p>
            R&amp;B/Soul skews 18-34, with strong crossover appeal. The genre has broader
            self-reported appeal (~39%) than its streaming share (~9-11%) suggests. That gap
            means a loyal but somewhat underserved audience on digital platforms.
          </p>
          <p>
            TikTok is where Gen Z finds new music. R&amp;B works there because the hooks are
            singable and the visuals translate to short-form clips. Average daily time on platform:
            53.8 minutes.
          </p>
        </AnimatedElement>

        <AnimatedElement custom={7} className="border border-white/10 p-6">
          <span className="text-xs font-sans tracking-[0.15em] uppercase text-white/30 block mb-4">Top markets</span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-sans text-xs text-muted leading-relaxed">
            <div><span className="text-heading">United States</span> &mdash; Largest music market globally. R&amp;B/Hip-Hop #1 since 2017.</div>
            <div><span className="text-heading">United Kingdom</span> &mdash; R&amp;B/Soul climbed to 5th most popular genre by 2021.</div>
            <div><span className="text-heading">Global streaming</span> &mdash; 50%+ of artists earning $1K+ generate majority of royalties outside home country.</div>
            <div><span className="text-heading">Asia-Pacific</span> &mdash; Fastest-growing streaming region at 14%+ CAGR.</div>
          </div>
          <p className="font-mono text-[10px] text-white/20 mt-4">Sources: Luminate/MRC Data, Spotify Loud &amp; Clear 2024, Grand View Research</p>
        </AnimatedElement>
      </AnimatedSection>

      {/* ═══ 8. PLATFORM LANDSCAPE ═══ */}
      <AnimatedSection id="platforms">
        <SectionLabel>Platforms</SectionLabel>
        <SectionTitle className="max-w-[24ch]">Where It Lives</SectionTitle>
        <AnimatedElement as="p" custom={2} className="font-sans text-sm leading-[1.8] text-muted max-w-[60ch] mb-12">
          People don&rsquo;t find music the same way anymore. 80%+ of artists earning $1M+ on Spotify never hit the
          Global Daily Top 50. Playlists and algorithms do the work now, not radio.
          Social platforms are where fans hear it first, then they go find it on a DSP.
        </AnimatedElement>

        <AnimatedElement custom={3}>
          <details className="group">
            <summary className="cursor-pointer text-xs font-sans tracking-[0.15em] uppercase text-white/40 hover:text-white/60 transition-colors mb-6 list-none flex items-center gap-2">
              <span className="text-accent group-open:rotate-90 transition-transform inline-block">&#9654;</span>
              8 platforms &mdash; click to expand
            </summary>
            <PlatformGrid />
          </details>
        </AnimatedElement>
      </AnimatedSection>

      {/* ═══ 9. MONETIZATION ═══ */}
      <AnimatedSection id="monetization">
        <SectionLabel>Monetization</SectionLabel>
        <SectionTitle className="max-w-[24ch]">The Numbers</SectionTitle>
        <AnimatedElement as="p" custom={2} className="font-sans text-sm leading-[1.8] text-muted max-w-[60ch] mb-12">
          Revenue comes from eight channels. Streaming is the baseline. Sync licensing,
          brand deals, and live performance are where the real money is. Fan-direct platforms
          (Patreon, Bandcamp) deliver the highest per-fan revenue.
        </AnimatedElement>

        <AnimatedElement custom={3}>
          <StreamingRatesTable />
          <SyncRangesTable />

          <details className="group mt-8">
            <summary className="cursor-pointer text-xs font-sans tracking-[0.15em] uppercase text-white/40 hover:text-white/60 transition-colors mb-6 list-none flex items-center gap-2">
              <span className="text-accent group-open:rotate-90 transition-transform inline-block">&#9654;</span>
              Additional monetization benchmarks &mdash; click to expand
            </summary>
            <div className="space-y-8">
              {/* Live performance */}
              <div>
                <h4 className="text-xs font-sans tracking-[0.15em] uppercase text-white/30 mb-4">Live Performance Tiers</h4>
                <div className="overflow-x-auto -mx-6 md:mx-0">
                  <table className="w-full min-w-[480px] text-left border-collapse">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="py-2 px-3 text-xs font-sans tracking-wider uppercase text-white/25 font-normal">Tier</th>
                        <th className="py-2 px-3 text-xs font-sans tracking-wider uppercase text-white/25 font-normal text-right">Per Show</th>
                        <th className="py-2 px-3 text-xs font-sans tracking-wider uppercase text-white/25 font-normal text-right">Annual (est.)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { tier: 'Early-stage indie (local/regional)', perShow: '$200-$1,500', annual: '$5K-$30K' },
                        { tier: 'Emerging with streaming traction', perShow: '$1,500-$5,000', annual: '$30K-$100K' },
                        { tier: 'Mid-level (50K+ monthly listeners)', perShow: '$5,000-$15,000', annual: '$100K-$300K' },
                        { tier: 'Breakout / small-venue headliner', perShow: '$15,000-$50,000', annual: '$300K-$1M+' },
                      ].map((r) => (
                        <tr key={r.tier} className="border-b border-white/5 last:border-0">
                          <td className="py-3 px-3 font-sans text-xs text-muted">{r.tier}</td>
                          <td className="py-3 px-3 font-mono text-xs text-heading text-right">{r.perShow}</td>
                          <td className="py-3 px-3 font-mono text-xs text-accent text-right">{r.annual}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Merch */}
              <div>
                <h4 className="text-xs font-sans tracking-[0.15em] uppercase text-white/30 mb-4">Merchandise Benchmarks</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-sans text-xs text-muted leading-relaxed">
                  <div className="border border-white/5 p-4">
                    <span className="text-heading block mb-1">At-show merch</span>
                    $5-$15 per attendee average. 60-70% margin on printed goods.
                  </div>
                  <div className="border border-white/5 p-4">
                    <span className="text-heading block mb-1">Online D2C</span>
                    $2,000-$20,000/month for emerging artists. Dependent on social following.
                  </div>
                  <div className="border border-white/5 p-4">
                    <span className="text-heading block mb-1">Merch as % of revenue</span>
                    10-25% of total indie artist income. Often the second-largest stream after live.
                  </div>
                  <div className="border border-white/5 p-4">
                    <span className="text-heading block mb-1">Bandcamp</span>
                    Artists receive 82% of each purchase. $1.67B total paid to artists. $214M in past year alone.
                  </div>
                </div>
              </div>

              {/* Brand deals */}
              <div>
                <h4 className="text-xs font-sans tracking-[0.15em] uppercase text-white/30 mb-4">Brand Deal Ranges</h4>
                <div className="overflow-x-auto -mx-6 md:mx-0">
                  <table className="w-full min-w-[480px] text-left border-collapse">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="py-2 px-3 text-xs font-sans tracking-wider uppercase text-white/25 font-normal">Tier</th>
                        <th className="py-2 px-3 text-xs font-sans tracking-wider uppercase text-white/25 font-normal">Followers</th>
                        <th className="py-2 px-3 text-xs font-sans tracking-wider uppercase text-white/25 font-normal text-right">Range</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { tier: 'Nano-influencer', followers: '1K-10K', range: '$500-$2,500' },
                        { tier: 'Micro-influencer', followers: '10K-50K', range: '$2,500-$10,000' },
                        { tier: 'Mid-tier emerging', followers: '50K-250K', range: '$10,000-$50,000' },
                        { tier: 'Breakout artist', followers: '250K-1M', range: '$50,000-$150,000+' },
                      ].map((r) => (
                        <tr key={r.tier} className="border-b border-white/5 last:border-0">
                          <td className="py-3 px-3 font-sans text-xs text-muted">{r.tier}</td>
                          <td className="py-3 px-3 font-mono text-xs text-white/40">{r.followers}</td>
                          <td className="py-3 px-3 font-mono text-xs text-accent text-right">{r.range}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="mt-3 font-sans text-xs text-white/30">
                  Hybrid premium: artists who deliver both original music AND visual content should command 1.5-3x
                  over standard influencer rates.
                </p>
              </div>

              {/* Patreon / fan-direct */}
              <div>
                <h4 className="text-xs font-sans tracking-[0.15em] uppercase text-white/30 mb-4">Fan-Direct Platforms</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-sans text-xs text-muted leading-relaxed">
                  <div className="border border-white/5 p-4">
                    <span className="text-heading block mb-1">Patreon</span>
                    $3.5B+ paid to creators lifetime. 10M+ paying members. 5-12% platform cut. Typical tiers: $3-$25/month.
                  </div>
                  <div className="border border-white/5 p-4">
                    <span className="text-heading block mb-1">Bandcamp</span>
                    $1.67B total paid to artists. 82% average to artist per purchase. 14.9M digital albums in past year.
                  </div>
                </div>
                <p className="font-mono text-[10px] text-white/20 mt-4">
                  Sources: Patreon About page 2025, bandcamp.com/about.
                </p>
              </div>
            </div>
          </details>
        </AnimatedElement>
      </AnimatedSection>

      {/* ═══ 10. COMPARABLES ═══ */}
      <AnimatedSection id="comparables">
        <SectionLabel>Comparables</SectionLabel>
        <SectionTitle>Who Else</SectionTitle>
        <AnimatedElement as="p" custom={2} className="font-sans text-sm leading-[1.8] text-muted max-w-[60ch] mb-12">
          Nobody else is running this exact play. Vulnerable male R&amp;B, fully independent,
          with a visual mythology that existed before the first song dropped. That&rsquo;s the gap.
        </AnimatedElement>

        <AnimatedElement custom={3}>
          <details className="group" open>
            <summary className="cursor-pointer text-xs font-sans tracking-[0.15em] uppercase text-white/40 hover:text-white/60 transition-colors mb-6 list-none flex items-center gap-2">
              <span className="text-accent group-open:rotate-90 transition-transform inline-block">&#9654;</span>
              11 comparables &mdash; click to collapse
            </summary>
            <ComparablesTable />
          </details>
        </AnimatedElement>

        <AnimatedElement custom={4} className="mt-10 border border-accent/20 bg-accent/5 p-6">
          <span className="text-xs font-sans tracking-[0.15em] uppercase text-accent block mb-2">The White Space</span>
          <p className="font-sans text-xs text-muted leading-relaxed">
            Most of these artists are on major labels, lean hip-hop, or built their narrative IP after
            gaining traction. FREE built the Other World universe before the first track dropped.
            Independent. Male R&amp;B. Visual mythology from day one. That combination does not exist yet.
          </p>
        </AnimatedElement>
      </AnimatedSection>

      {/* ═══ 11. CASE STUDIES ═══ */}
      <AnimatedSection id="case-studies">
        <SectionLabel>Case Studies</SectionLabel>
        <SectionTitle>Proof Points</SectionTitle>

        <AnimatedElement custom={2}>
          <details className="group" open>
            <summary className="cursor-pointer text-xs font-sans tracking-[0.15em] uppercase text-white/40 hover:text-white/60 transition-colors mb-8 list-none flex items-center gap-2">
              <span className="text-accent group-open:rotate-90 transition-transform inline-block">&#9654;</span>
              4 case studies &mdash; click to collapse
            </summary>
            <div className="space-y-10">
              {caseStudies.map((cs, i) => (
                <div key={cs.artist} className="border border-white/10 p-6 md:p-8">
                  <div className="flex items-baseline gap-4 mb-1">
                    <span className="font-mono text-sm text-accent/30">{String(i + 1).padStart(2, '0')}</span>
                    <span className="font-display text-lg text-heading">{cs.artist}</span>
                  </div>
                  <span className="font-sans text-xs text-white/30 block mb-4 ml-10">{cs.project}</span>
                  <p className="font-sans text-xs text-muted leading-relaxed mb-4">{cs.finding}</p>
                  <div className="border-l-2 border-accent/30 pl-4">
                    <span className="font-sans text-xs text-white/40 italic leading-relaxed block">
                      {cs.relevance}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </details>
        </AnimatedElement>

        <AnimatedElement custom={3} className="mt-12 border border-white/10 p-6 md:p-8">
          <span className="text-xs font-sans tracking-[0.15em] uppercase text-white/30 block mb-4">What to take from each</span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-sans text-xs text-muted leading-relaxed">
            <div><span className="text-heading">Brent Faiyaz</span> &mdash; Stay independent, own masters, build visual brand consistency, let quality create demand.</div>
            <div><span className="text-heading">Frank Ocean</span> &mdash; Use visual content strategically, create physical narrative objects, embrace scarcity.</div>
            <div><span className="text-heading">Beyonce</span> &mdash; Music-driven visual narratives can be pitched to streaming platforms as premium content.</div>
            <div><span className="text-heading">Childish Gambino</span> &mdash; Free short film + written narrative = way more press than you&rsquo;d expect, and a real path into film/TV.</div>
          </div>
          <p className="font-mono text-[10px] text-white/20 mt-4">
            RIAA certifications verified via riaa.com, Feb 2026.
          </p>
        </AnimatedElement>
      </AnimatedSection>

      {/* ═══ 12. PROJECTIONS + CONTACT ═══ */}
      <AnimatedSection id="projections" className="border-t-0">
        <SectionLabel>Projections</SectionLabel>
        <SectionTitle>Revenue Path</SectionTitle>

        <AnimatedElement custom={2}>
          <RevenueChart />
        </AnimatedElement>

        <AnimatedElement custom={3} className="border border-white/10 p-6 md:p-8 mb-20">
          <span className="text-xs font-sans tracking-[0.15em] uppercase text-white/30 block mb-4">Key assumptions</span>
          <div className="font-sans text-xs text-muted leading-relaxed space-y-2">
            <p>Year 1: 125K-2M total streams, 50K-500K video views, 5-15 local/regional shows.</p>
            <p>Year 2-3: Monthly Spotify listeners grow to 2K-25K. YouTube subscribers grow to 2K-15K. At least one additional album released (OTHERLAND).</p>
            <p>Base scenario achieves positive ROI within Year 1 from combined revenue streams at $5K-$15K production cost per micro-visual album.</p>
          </div>
          <p className="font-mono text-[10px] text-white/20 mt-4">
            All projections are modeled estimates based on Spotify Loud &amp; Clear 2024, IFPI 2024, RIAA 2024, and industry benchmarks.
          </p>
        </AnimatedElement>

        {/* Contact CTA */}
        <div id="contact" className="text-center max-w-2xl mx-auto pt-16 border-t border-white/10">
          <AnimatedElement
            as="h2"
            custom={4}
            className="font-sans text-5xl md:text-6xl lg:text-7xl italic text-heading leading-[0.9] mb-8"
          >
            The fire is already lit.
          </AnimatedElement>
          <AnimatedElement as="p" custom={5} className="font-sans text-sm text-muted mb-16 max-w-[40ch] mx-auto">
            FREE is building in public. The visual universe is live. The music is written.
            This is about funding what is already working.
          </AnimatedElement>

          <AnimatedElement custom={6} className="flex flex-wrap justify-center gap-4 md:gap-6 mb-16">
            <a
              href="https://www.instagram.com/freenotavailable/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3 border border-accent/40 text-xs font-sans tracking-[0.15em] uppercase text-accent hover:bg-accent/10 transition-all duration-300 min-w-[160px]"
            >
              Instagram
            </a>
            <a
              href="https://open.spotify.com/artist/13Z1MsZ0A9Ddox3DZcu9zk"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3 border border-white/15 text-xs font-sans tracking-[0.15em] uppercase text-white/70 hover:text-white hover:border-white/40 hover:bg-white/5 transition-all duration-300 min-w-[160px]"
            >
              Spotify
            </a>
            <a
              href="https://music.apple.com/us/artist/free/1715333809"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3 border border-white/15 text-xs font-sans tracking-[0.15em] uppercase text-white/70 hover:text-white hover:border-white/40 hover:bg-white/5 transition-all duration-300 min-w-[160px]"
            >
              Apple Music
            </a>
            <a
              href="https://www.youtube.com/@OWJV/videos"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3 border border-white/15 text-xs font-sans tracking-[0.15em] uppercase text-white/70 hover:text-white hover:border-white/40 hover:bg-white/5 transition-all duration-300 min-w-[160px]"
            >
              YouTube
            </a>
          </AnimatedElement>

          <AnimatedElement custom={7} className="flex flex-col items-center gap-6 pt-8 border-t border-white/5">
            <div className="relative w-10 h-10 opacity-30">
              <Image src="/images/owjv-cherub.png" alt="OWJV emblem" fill className="object-contain" sizes="40px" />
            </div>
            <span className="text-xs font-sans tracking-[0.15em] uppercase text-white/30">
              &copy; 2024&ndash;2026 Creative Minds Coalition &times; OWJV &mdash; Detroit, MI
            </span>
          </AnimatedElement>
        </div>
      </AnimatedSection>
    </main>
  )
}
