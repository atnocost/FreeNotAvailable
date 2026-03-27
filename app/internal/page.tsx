import Image from 'next/image'
import Footer from '@/components/layout/Footer'

/* ------------------------------------------------------------------ */
/*  Section helpers                                                    */
/* ------------------------------------------------------------------ */

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-xs font-sans tracking-[0.2em] uppercase text-white/40 block mb-6">
      {children}
    </span>
  )
}

function SectionTitle({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <h2 className={`font-sans text-3xl md:text-4xl lg:text-5xl italic text-heading tracking-wide mb-8 ${className}`}>
      {children}
    </h2>
  )
}

function SubTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="font-sans text-xl md:text-2xl italic text-heading tracking-wide mb-4 mt-12">
      {children}
    </h3>
  )
}

function Paragraph({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-sans text-sm md:text-base leading-[1.85] text-muted max-w-[65ch] mb-4">
      {children}
    </p>
  )
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="font-sans text-sm md:text-base leading-[1.85] text-muted pl-1">
      {children}
    </li>
  )
}

function Divider() {
  return <div className="w-16 h-px bg-white/10 my-12" />
}

function KeyValue({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-3">
      <span className="text-xs font-sans tracking-[0.15em] uppercase text-white/40 mr-3">
        {label}
      </span>
      <span className="font-sans text-sm text-muted">{children}</span>
    </div>
  )
}

function VisualImage({
  src,
  alt,
  caption,
  aspect = 'video',
  className = '',
}: {
  src: string
  alt: string
  caption?: string
  aspect?: 'video' | 'square' | 'portrait' | 'landscape'
  className?: string
}) {
  const aspectClass = {
    video: 'aspect-video',
    square: 'aspect-square',
    portrait: 'aspect-[3/4]',
    landscape: 'aspect-[16/9]',
  }[aspect]

  return (
    <figure className={`my-8 ${className}`}>
      <div className={`relative w-full ${aspectClass} overflow-hidden`}>
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 800px"
        />
      </div>
      {caption && (
        <figcaption className="mt-3 text-xs font-sans tracking-[0.1em] uppercase text-white/25 text-center">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

/* ------------------------------------------------------------------ */
/*  Page Content                                                       */
/* ------------------------------------------------------------------ */

function InternalContent() {
  return (
    <div className="min-h-screen bg-canvas text-body">
      {/* ---- Hero ---- */}
      <section className="relative py-20 flex flex-col items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-canvas" />
        <div className="relative z-10 text-center px-6">
          <p className="text-[7px] tracking-[0.4em] uppercase text-white/20 mb-4">OWJV</p>
          <h1 className="font-pixel text-[clamp(2.5rem,6vw,5rem)] text-heading tracking-[0.04em] leading-none">
            INTERNAL
          </h1>
          <p className="mt-3 font-sans text-sm text-white/25 tracking-wide">
            Private reference &mdash; not for distribution
          </p>
        </div>
      </section>

      {/* ---- Tools ---- */}
      <section className="border-t border-white/5 py-10">
        <div className="max-w-4xl mx-auto px-6 md:px-10">
          <span className="text-[8px] font-sans tracking-[0.25em] uppercase text-white/20 block mb-6">
            Tools
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <a
              href="/internal/outreach"
              className="border border-white/8 hover:border-white/20 px-5 py-4 transition-colors group"
            >
              <span className="text-[10px] tracking-[0.15em] uppercase text-white/50 group-hover:text-white/70 transition-colors block mb-1">
                Press Outreach
              </span>
              <span className="text-[11px] text-white/25">
                Compose emails with auto-generated tokens &middot; 88 contacts
              </span>
            </a>
            <a
              href="/internal/tokens"
              className="border border-white/8 hover:border-white/20 px-5 py-4 transition-colors group"
            >
              <span className="text-[10px] tracking-[0.15em] uppercase text-white/50 group-hover:text-white/70 transition-colors block mb-1">
                Token Generator
              </span>
              <span className="text-[11px] text-white/25">
                Create &amp; revoke access tokens for ekthesis and brief gates
              </span>
            </a>
            <div className="border border-white/5 px-5 py-4 opacity-40">
              <span className="text-[10px] tracking-[0.15em] uppercase text-white/50 block mb-1">
                Analytics
              </span>
              <span className="text-[11px] text-white/25">
                View on Vercel Dashboard
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/*  DOCUMENT 1: ARTIST ONE-SHEET / EPK                              */}
      {/* ================================================================ */}

      <section
        className="relative section-padding border-t border-white/5"
        aria-label="Artist Overview"
      >
        {/* Ambient red glow */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,rgba(192,57,43,0.06)_0%,transparent_60%)]" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-10">
          <SectionLabel>Artist One-Sheet</SectionLabel>
          <SectionTitle>FREE</SectionTitle>

          {/* ACT I */}
          <div className="mb-16">
            <span className="text-xs font-sans tracking-[0.2em] uppercase text-[#c0392b]/80 block mb-4">
              Act I &mdash; FINExME
            </span>

            <Paragraph>
              In today&rsquo;s R&amp;B landscape, men rarely make music that yearns anymore.
              Yet in 2026, we&rsquo;re just as bruised, conflicted, and love-worn as our female
              counterparts. Heartbreak is universal &mdash; duality sits at the core of everyone
              navigating love and life.
            </Paragraph>

            <Paragraph>
              As a songwriter, FREE thrives in that grey area where deflection meets self-reflection.
              His sound doesn&rsquo;t chase the glossy nostalgia of old-school love ballads, but
              instead embraces the cold croon of the early 2010s &mdash; a shadowy echo that still
              resonates today.
            </Paragraph>

            <Paragraph>
              A collection of demos, sequenced into a cohesive narrative. FINExME is a debut worth
              revisiting. Welcome To The Other World.
            </Paragraph>

            <div className="mt-8 inline-block border border-[#c0392b]/30 px-5 py-3">
              <span className="text-xs font-sans tracking-[0.15em] uppercase text-[#c0392b]/70">
                Fine By Me Film
              </span>
            </div>
          </div>

          {/* ACT II */}
          <div>
            <span className="text-xs font-sans tracking-[0.2em] uppercase text-white/40 block mb-4">
              Act II &mdash; SINE NOCTIS
            </span>

            <Paragraph>
              The icy follow-up to 2024&rsquo;s steamy FINExME the album. SINE NOCTIS is perfect
              for the Fall/Winter season.
            </Paragraph>

            <div className="mt-8 inline-block border border-white/10 px-5 py-3">
              <span className="text-xs font-sans tracking-[0.15em] uppercase text-white/40">
                SINE NOCTIS Trailers
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/*  DOCUMENT 2: OTHER WORLD MYTHOS — VISUAL BIBLE                   */}
      {/* ================================================================ */}

      {/* ---- Core Myth ---- */}
      <section
        className="relative section-padding border-t border-white/5"
        aria-label="Other World Mythos"
      >
        <div className="max-w-4xl mx-auto px-6 md:px-10">
          <SectionLabel>Visual Bible</SectionLabel>
          <SectionTitle>Other World Mythos</SectionTitle>

          <p className="font-sans text-base md:text-lg leading-[1.85] text-muted/80 italic mb-10 max-w-[60ch]">
            A visual bible to accompany FREE on his journey.
          </p>

          <div className="grid grid-cols-2 gap-4 my-10">
            <figure>
              <div className="relative aspect-square overflow-hidden">
                <Image src="/images/finexme-cover.webp" alt="FINExME cover art" fill className="object-cover" sizes="400px" />
              </div>
              <figcaption className="mt-2 text-xs font-sans tracking-[0.1em] uppercase text-[#c0392b]/50 text-center">FINExME</figcaption>
            </figure>
            <figure>
              <div className="relative aspect-square overflow-hidden">
                <Image src="/images/sinenoctis-cover.webp" alt="SINE NOCTIS cover art" fill className="object-cover" sizes="400px" />
              </div>
              <figcaption className="mt-2 text-xs font-sans tracking-[0.1em] uppercase text-white/25 text-center">SINE NOCTIS</figcaption>
            </figure>
          </div>

          <Paragraph>
            Each project is a self-contained Greek-style tale about FREE, whose love life and vices
            replay the Prometheus myth in modern, nocturnal settings. Every era is a new
            &ldquo;night-world&rdquo; with its own armor, color grade, and emotional weather.
          </Paragraph>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* FREE = Prometheus */}
            <div className="border border-white/5 p-6">
              <span className="text-xs font-sans tracking-[0.2em] uppercase text-[#c0392b]/70 block mb-3">
                FREE = Prometheus
              </span>
              <p className="font-sans text-sm leading-[1.85] text-muted">
                In every project, he overindulges in intimacy of the body while neglecting intimacy
                of mind and spirit, repeating the same core sin until it kills him and triggers his
                reincarnation into a new version of himself. His &ldquo;fire&rdquo; is the love,
                attention, and devotion he keeps giving where it destroys him.
              </p>
            </div>

            {/* The Lady In Black = the Eagle */}
            <div className="border border-white/5 p-6">
              <span className="text-xs font-sans tracking-[0.2em] uppercase text-white/40 block mb-3">
                The Lady In Black = the Eagle
              </span>
              <p className="font-sans text-sm leading-[1.85] text-muted">
                She is the executor of consequence rather than a villain. Her face and identity are
                not highlighted as much as the pattern she represents: the way his own choices come
                back to devour him.
              </p>
            </div>
          </div>

          <div className="mt-8">
            <Paragraph>
              <strong className="text-heading/80">Project structure:</strong> Each release functions
              like a Greek vignette: emotionally and visually self-contained, but part of a larger
              pantheon of FREE&rsquo;s mythos, similar to how The Weeknd reinvents his persona each
              album while PND&rsquo;s projects act as time capsules that still fit a bigger myth.
            </Paragraph>
          </div>
        </div>
      </section>

      {/* ---- Visual Law ---- */}
      <section
        className="relative section-padding border-t border-white/5"
        aria-label="Visual Law"
      >
        <div className="max-w-4xl mx-auto px-6 md:px-10">
          <SectionLabel>Rules of the World</SectionLabel>
          <SectionTitle>Visual Law</SectionTitle>

          <div className="space-y-8">
            <div>
              <SubTitle>Intimacy vs Distance</SubTitle>
              <Paragraph>
                Bodies are close but faces are obscured. The woman is framed as an accessory to the
                tableau, not the narrative core. The real story is the recurring pattern in FREE, not
                the specific partner.
              </Paragraph>
            </div>

            <div>
              <SubTitle>Voyeurism</SubTitle>
              <Paragraph>
                The camera is a spy. Long lenses, over-the-shoulder angles, silhouettes, reflections,
                and partial occlusions make every visual feel like stolen moments from a private film.
              </Paragraph>
            </div>

            <div>
              <SubTitle>Reincarnation Cues</SubTitle>
              <Paragraph>
                Each era swaps his armor (a white BMW, a heavy leather jacket, etc.) while retaining
                shared DNA: night settings, partial visibility of his face, ambiguous urban locations.
                This sells the idea of one soul in multiple shells.
              </Paragraph>
            </div>

            <div>
              <SubTitle>Color Logic</SubTitle>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div>
                  <div className="relative aspect-[4/5] overflow-hidden mb-4">
                    <Image src="/images/finexme-cover.webp" alt="FINExME — hot reds and blacks" fill className="object-cover" sizes="400px" />
                  </div>
                  <div className="border-l-2 border-[#c0392b]/60 pl-6">
                    <span className="text-xs font-sans tracking-[0.2em] uppercase text-[#c0392b]/70 block mb-2">
                      FINExME
                    </span>
                    <p className="font-sans text-sm leading-[1.85] text-muted">
                      Hot reds and blacks, full color, present-tense sin.
                    </p>
                  </div>
                </div>
                <div>
                  <div className="relative aspect-[4/5] overflow-hidden mb-4">
                    <Image src="/images/sinenoctis-cover.webp" alt="SINE NOCTIS — greyscale memory" fill className="object-cover" sizes="400px" />
                  </div>
                  <div className="border-l-2 border-white/20 pl-6">
                    <span className="text-xs font-sans tracking-[0.2em] uppercase text-white/40 block mb-2">
                      SINE NOCTIS
                    </span>
                    <p className="font-sans text-sm leading-[1.85] text-muted">
                      Black-and-white/greyscale, memory and reflection, a colder chapter where the past
                      feels distant and already mythologized.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---- Thematic Loop ---- */}
      <section
        className="relative section-padding border-t border-white/5"
        aria-label="Thematic Loop"
      >
        <div className="max-w-4xl mx-auto px-6 md:px-10">
          <SectionLabel>The Cycle</SectionLabel>
          <SectionTitle>Thematic Loop</SectionTitle>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                title: 'Sin',
                description:
                  'FREE repeatedly gives himself to undeserving women, or harms those who did not deserve it, cycling through lust, love, self-doubt, hypersexuality, and other human-condition themes.',
              },
              {
                step: '02',
                title: 'Punishment',
                description:
                  'Each project ends with him effectively "dying" as a result of his hubris, defiance, and overindulgence \u2014 emotionally, spiritually, or even literally in the story world.',
              },
              {
                step: '03',
                title: 'Rebirth',
                description:
                  'At the beginning of the next project, he wakes in a new incarnation: different armor, different city space, but same underlying wound. He wanders, tries to make sense of his new world, and inevitably drifts back toward the same patterns.',
              },
              {
                step: '04',
                title: 'Eternal Return',
                description:
                  'No matter how the details change \u2014 the women, the city, the car, the jacket \u2014 the end result is always the same: Prometheus meets his demise again at the beak of his own choices.',
              },
            ].map((item) => (
              <div key={item.step} className="border border-white/5 p-6">
                <span className="text-xs font-mono text-white/20 block mb-3">
                  {item.step}
                </span>
                <h3 className="font-sans text-lg italic text-heading mb-3">
                  {item.title}
                </h3>
                <p className="font-sans text-xs leading-[1.85] text-muted">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- FINExME Visuals ---- */}
      <section
        className="relative section-padding border-t border-white/5"
        aria-label="FINExME Visual Breakdown"
      >
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,rgba(192,57,43,0.06)_0%,transparent_60%)]" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-10">
          <SectionLabel>Act I Visuals</SectionLabel>
          <SectionTitle>FINExME</SectionTitle>

          {/* AT NO COST */}
          <SubTitle>&ldquo;AT NO COST&rdquo; &mdash; First Trailer</SubTitle>
          <KeyValue label="Function">
            Establish FREE as &ldquo;The Faceless Man&rdquo; and introduce the FINExME color
            language. This is the myth&rsquo;s prologue in full color.
          </KeyValue>
          <div className="mt-4 mb-2">
            <span className="text-xs font-sans tracking-[0.15em] uppercase text-white/30 block mb-3">
              Visual Traits
            </span>
            <ul className="list-disc list-outside ml-5 space-y-2">
              <Bullet>Full-color, high-intensity reds and blacks.</Bullet>
              <Bullet>
                FREE&rsquo;s face is completely concealed; audiences only know him through
                silhouette, body language, and fragments.
              </Bullet>
              <Bullet>
                The Lady In Black is present as the unnamed counterpart, already framed as accessory
                and omen rather than just a named love interest.
              </Bullet>
            </ul>
          </div>

          <VisualImage
            src="/images/bmw-dusk.webp"
            alt="AT NO COST — FREE silhouetted against the BMW on a gravel lot at dusk"
            caption="At No Cost — First Trailer"
            aspect="landscape"
          />

          <Paragraph>
            <strong className="text-heading/80">Narrative implication:</strong> &ldquo;At no
            cost&rdquo; plays on the idea of &ldquo;free&rdquo; as both lack of price and lack of
            self-preservation. It sets up that he thinks he can give himself away without consequence,
            foreshadowing the debt that will be collected later.
          </Paragraph>

          <Divider />

          {/* FINE BY ME */}
          <SubTitle>&ldquo;FINE BY ME&rdquo; &mdash; Visual</SubTitle>
          <KeyValue label="Setting">
            An ambiguous gravel lot by water near The Bridge; the white BMW
            acts as his chariot through this night-world.
          </KeyValue>
          <KeyValue label="Characters">
            The Faceless Man (FREE/Prometheus) and The Lady In Black (Eagle) are firmly established.
            Their dynamic is physical, intoxicated, and dangerously intimate.
          </KeyValue>
          <div className="mt-4 mb-2">
            <span className="text-xs font-sans tracking-[0.15em] uppercase text-white/30 block mb-3">
              Visual Language
            </span>
            <ul className="list-disc list-outside ml-5 space-y-2">
              <Bullet>
                High-saturation reds and deep blacks, emphasizing lust, heat, and immediacy.
              </Bullet>
              <Bullet>
                Faces still partially hidden, but bodies intertwined; the camera treats the moment
                like a voyeuristic tableau more than a love scene.
              </Bullet>
            </ul>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
            <VisualImage
              src="/images/fine-by-me-still.webp"
              alt="FINE BY ME — FREE standing in red light on the lot"
              caption="The Faceless Man"
              aspect="landscape"
              className="my-0"
            />
            <VisualImage
              src="/images/red-portrait.webp"
              alt="FINE BY ME — intimate red-lit embrace"
              caption="The Lady In Black"
              aspect="landscape"
              className="my-0"
            />
          </div>
          <VisualImage
            src="/images/fine-by-me-sunset.webp"
            alt="FINE BY ME — silhouette through car at sunset"
            caption="Fine By Me — Visual"
            aspect="landscape"
          />

          <Paragraph>
            <strong className="text-heading/80">Final image:</strong> FREE and The Lady In Black
            embrace outside the car. The car &mdash; his armor &mdash; is left behind, and the embrace
            exposes them both to the open lot and the world. This reads as both vulnerability and the
            moment he steps out from his protection into judgment.
          </Paragraph>

          <Divider />

          {/* PILGRIM */}
          <SubTitle>Implied &ldquo;PILGRIM&rdquo; Visual &mdash; Final Song of FINExME</SubTitle>
          <ul className="list-disc list-outside ml-5 space-y-2 mb-6">
            <Bullet>
              <strong className="text-heading/80">Role:</strong> The unseen final chapter where the
              consequences land. This is the off-screen &ldquo;eagle&rdquo; sequence.
            </Bullet>
            <Bullet>
              <strong className="text-heading/80">Thematic outcome:</strong> By &ldquo;Pilgrim,&rdquo;
              FREE is spiritually dead &mdash; destroyed by his indulgence with The Lady In Black.
              Whether that&rsquo;s literal death or emotional annihilation is left ambiguous, but the
              result is the same: this incarnation of Prometheus has run his course.
            </Bullet>
            <Bullet>
              <strong className="text-heading/80">Narrative bridge:</strong> The implied end of
              &ldquo;PILGRIM&rdquo; is where the myth resets. In the moment we don&rsquo;t see, he
              &ldquo;dies,&rdquo; and the next time we meet him he is waking up somewhere else,
              stripped of the BMW, stripped of color.
            </Bullet>
          </ul>

          <VisualImage
            src="/images/pilgrim-card.webp"
            alt="PILGRIM — BMW dashboard at night, red glow"
            caption="Pilgrim — Final Song of FINExME"
            aspect="portrait"
          />
        </div>
      </section>

      {/* ---- Transition into SINE NOCTIS ---- */}
      <section
        className="relative section-padding border-t border-white/5"
        aria-label="Transition into SINE NOCTIS"
      >
        <div className="max-w-4xl mx-auto px-6 md:px-10">
          <SectionLabel>The Threshold</SectionLabel>
          <SectionTitle>Transition into SINE NOCTIS</SectionTitle>

          <SubTitle>ANTE &mdash; Teaser (&ldquo;Before&rdquo;)</SubTitle>
          <KeyValue label="Function">
            The liminal corridor between worlds. ANTE is the moment right after death and right
            before fully waking in the new life.
          </KeyValue>
          <KeyValue label="Visual Shift">
            FREE emerging from a dark doorway in downtown Birmingham, face still obscured. The
            footage is tight, grayscale, intimate. FREE is alone this time.
          </KeyValue>

          <div className="mt-6 mb-2">
            <span className="text-xs font-sans tracking-[0.15em] uppercase text-white/30 block mb-3">
              Symbolism
            </span>
            <ul className="list-disc list-outside ml-5 space-y-2">
              <Bullet>
                The doorway = his portal into the new world. It can be read as the threshold between
                death and reincarnation, between myth and memory.
              </Bullet>
              <Bullet>
                His disheveled locs and heavy leather jacket replace the BMW as his new armor,
                signaling a different stage of his journey.
              </Bullet>
            </ul>
          </div>

          <VisualImage
            src="/images/ante-doorway.webp"
            alt="ANTE — FREE emerging from a dark doorway in downtown Birmingham"
            caption="Ante — The Doorway Between Worlds"
          />

          <Paragraph>
            <strong className="text-heading/80">Emotional tone:</strong> Disorientation, quiet shock,
            an almost dreamlike &ldquo;where am I?&rdquo; feeling. ANTE doesn&rsquo;t explain; it
            simply reveals that the Faceless Man survived into another form and has stepped into a new
            city-soul.
          </Paragraph>
        </div>
      </section>

      {/* ---- SINE NOCTIS Cycle ---- */}
      <section
        className="relative section-padding border-t border-white/5"
        aria-label="SINE NOCTIS Visual Breakdown"
      >
        <div className="max-w-4xl mx-auto px-6 md:px-10">
          <SectionLabel>Act II Visuals</SectionLabel>
          <SectionTitle>SINE NOCTIS</SectionTitle>

          <Paragraph>
            The SINE NOCTIS cycle is a three-part descent: door (ANTE), dusk walk (VESPERA), and full
            night plunge (NOCTEM), leading into the full visual.
          </Paragraph>

          <div className="mt-6 mb-2">
            <span className="text-xs font-sans tracking-[0.15em] uppercase text-white/30 block mb-3">
              Overall Setting
            </span>
            <Paragraph>
              A downtown area at night, shot to emphasize European architecture &mdash; Romanian stone
              carvings, fountains, Parisian-loop streets, and a Neo-80s parking-structure stairwell
              with transparent windows. These spaces make it feel like he has awakened in a foreign
              city that is &ldquo;elsewhere&rdquo; but still earthlike.
            </Paragraph>
          </div>

          <KeyValue label="Color Grading">
            Strict black-and-white/greyscale to represent memory, reflection, and a sense that we are
            observing the aftermath of a story rather than living it in real time.
          </KeyValue>

          <VisualImage
            src="/images/jacket-portrait.webp"
            alt="SINE NOCTIS — the Alpinestars leather jacket, FREE's new armor"
            caption="The Jacket — SINE NOCTIS Armor"
            aspect="portrait"
          />

          <Divider />

          {/* VESPERA */}
          <SubTitle>VESPERA &mdash; Teaser II (&ldquo;Dusk&rdquo;)</SubTitle>

          <div className="mb-6">
            <span className="text-xs font-sans tracking-[0.15em] uppercase text-white/30 block mb-3">
              What It Means
            </span>
            <ul className="list-disc list-outside ml-5 space-y-2">
              <Bullet>
                <strong className="text-heading/80">Meaning:</strong> VESPERA is
                &ldquo;evening/dusk/evening star&rdquo; &mdash; the first calm after impact, when
                light is fading but not yet gone.
              </Bullet>
              <Bullet>
                <strong className="text-heading/80">Narrative:</strong> FREE has already crossed
                ANTE&rsquo;s doorway. VESPERA shows his first evening wandering this new world, trying
                to orient himself among its European facades and empty streets.
              </Bullet>
              <Bullet>
                <strong className="text-heading/80">Emotional Messaging:</strong> Less shock, more
                numb, heavy melancholy. He feels the weight of what he doesn&rsquo;t fully remember
                yet, drifting before the next set of temptations draws him in.
              </Bullet>
            </ul>
          </div>

          <div className="mb-6">
            <span className="text-xs font-sans tracking-[0.15em] uppercase text-white/30 block mb-3">
              How It Plays (30&ndash;45 seconds, one continuous dusk walk broken into shots)
            </span>
            <ul className="list-disc list-outside ml-5 space-y-2">
              <Bullet>
                <strong className="text-heading/80">Opening:</strong> A wide, static grayscale shot of
                the restaurant entrance with Romanian stonework and a fountain, empty. The location
                feels like it has always been there, waiting. After a quiet beat, FREE crosses into
                frame from the edge &mdash; slightly out of focus, head lowered, leather jacket clearly
                visible.
              </Bullet>
              <Bullet>
                <strong className="text-heading/80">Evening-star motif:</strong> Throughout the teaser,
                a single small light source (streetlamp, window glow, reflected car light) recurs in
                the frame. It is always somewhere behind or above him, never fully lighting his
                face &mdash; your vesper/star marker.
              </Bullet>
              <Bullet>
                <strong className="text-heading/80">Parisian street loop:</strong> Medium shots of FREE
                walking the faux-European loop, sometimes circling the same block. He occasionally
                glances up at balconies or windows as if hunting for a memory. He never speaks to
                anyone; the camera follows at a distance like a ghost.
              </Bullet>
              <Bullet>
                <strong className="text-heading/80">Alleyway passage:</strong> The camera tightens
                behind his shoulder as he moves through an alley. Foreground objects &mdash; posts,
                wall edges, a passing car &mdash; briefly block him, emphasizing voyeurism and the
                sense that the audience is spying on a man in transition rather than sharing his
                perspective.
              </Bullet>
              <Bullet>
                <strong className="text-heading/80">Parking structure foreshadow:</strong> A brief cut
                shows the Neo-80s stairwell from the outside at dusk. Behind the transparent windows,
                his silhouette is barely visible moving up or down the stairs. We don&rsquo;t dwell on
                it; it&rsquo;s a hint of the spaces NOCTEM and the full visual will inhabit.
              </Bullet>
              <Bullet>
                <strong className="text-heading/80">Closing shot:</strong> End on a medium-close of
                the jacket in soft focus as FREE pauses beneath the recurring light source. Background
                lights smear into bokeh, the frame drifts slightly as if the world is still unstable,
                then cut to black on a breath, drum hit, or vocal fragment.
              </Bullet>
            </ul>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
            <VisualImage
              src="/images/sn-architecture.webp"
              alt="VESPERA — FREE walking past European architecture in grayscale"
              caption="Parisian Street Loop"
              className="my-0"
            />
            <VisualImage
              src="/images/sn-scene.webp"
              alt="VESPERA — stairwell with diagonal railing, deep blacks"
              caption="Parking Structure"
              aspect="portrait"
              className="my-0"
            />
            <VisualImage
              src="/images/vespera-closing.webp"
              alt="VESPERA — silhouette beneath a streetlamp, bokeh background"
              caption="Closing Shot"
              aspect="portrait"
              className="my-0"
            />
          </div>

          <div className="mb-6">
            <span className="text-xs font-sans tracking-[0.15em] uppercase text-white/30 block mb-3">
              Tone &amp; Craft Notes
            </span>
            <ul className="list-disc list-outside ml-5 space-y-2">
              <Bullet>
                <strong className="text-heading/80">Color Grading:</strong> Still B/W, but lift the
                midtones slightly so this feels like the last light before true night &mdash; more
                haze, less absolute black than NOCTEM will use.
              </Bullet>
              <Bullet>
                <strong className="text-heading/80">Movement:</strong> Smooth, gliding camera movement
                dominates, with possibly one subtle handheld moment / jumpcut in the alley to betray
                underlying unease. Overall, it should feel like contemplative drift.
              </Bullet>
              <Bullet>
                <strong className="text-heading/80">Sound:</strong> Use an instrumental or reverb-heavy
                portion from the SINE NOCTIS material that plays like an &ldquo;evening prayer&rdquo;
                or prelude &mdash; a held breath before impact.
              </Bullet>
            </ul>
          </div>

          <Divider />

          {/* NOCTEM */}
          <SubTitle>NOCTEM &mdash; Trailer (&ldquo;Nightfall&rdquo;)</SubTitle>
          <Paragraph>
            We haven&rsquo;t detailed NOCTEM yet, but the rules are clear:
          </Paragraph>
          <ul className="list-disc list-outside ml-5 space-y-2 mb-6">
            <Bullet>
              <strong className="text-heading/80">Role:</strong> The plunge into the new night. This
              is where FREE begins to actively participate in this incarnation &mdash; making choices,
              not exactly encountering the next Eagle figure yet, but setting up the double visual for
              &ldquo;VAN GOGH&rdquo; and &ldquo;THIN ICE FREESTYLE.&rdquo;
            </Bullet>
            <Bullet>
              <strong className="text-heading/80">Visual shift:</strong> Same locations, but now it
              feels like full night. Blacks deepen, contrast increases, and that Neo-80s
              stairwell &mdash; with its transparent windows and floating-jacket imagery from existing
              footage &mdash; becomes an additional stage rather than a hint.
            </Bullet>
            <Bullet>
              <strong className="text-heading/80">Emotional tone:</strong> From numb drift to charged
              inevitability. We should sense that he&rsquo;s about to repeat the pattern, even if the
              woman isn&rsquo;t seen yet.
            </Bullet>
          </ul>

          <Divider />

          {/* Full Visual */}
          <SubTitle>SINE NOCTIS &mdash; Full Visual</SubTitle>
          <ul className="list-disc list-outside ml-5 space-y-2 mb-6">
            <Bullet>
              <strong className="text-heading/80">Structure:</strong> A double visual for &ldquo;VAN
              GOGH&rdquo; and &ldquo;THIN ICE FREESTYLE,&rdquo; using the same architecture as a
              continuous night-world. The JACKET replaces the BMW as the protective shell and focal
              object.
            </Bullet>
            <Bullet>
              <strong className="text-heading/80">Imagery:</strong> FREE&rsquo;s face remains
              partially obscured; shots from the corridor, the streets, the alleyways, and the
              stairwell create a single, voyeuristic narrative of a man trying to navigate a world he
              both recognizes and fears.
            </Bullet>
            <Bullet>
              <strong className="text-heading/80">Thematic function:</strong> This visual is the full
              chapter of this reincarnation. Where FINExME showed the sin in color, SINE NOCTIS shows
              the aftermath and the attempt at understanding, still under the threat that he will
              repeat the pattern and &ldquo;die&rdquo; again by the time the EP&rsquo;s arc completes.
            </Bullet>
          </ul>

          <VisualImage
            src="/images/sn-full-visual.webp"
            alt="SINE NOCTIS — full visual still, FREE head lowered in the night corridor"
            caption="SINE NOCTIS — Full Visual"
            aspect="portrait"
          />
        </div>
      </section>

      {/* ---- Artwork Narrative Synergy ---- */}
      <section
        className="relative section-padding border-t border-white/5"
        aria-label="Artwork Narrative Synergy"
      >
        <div className="max-w-4xl mx-auto px-6 md:px-10">
          <SectionLabel>Cover Art Direction</SectionLabel>
          <SectionTitle>Artwork Narrative Synergy</SectionTitle>

          <div className="mb-10">
            <span className="text-xs font-sans tracking-[0.15em] uppercase text-white/30 block mb-3">
              Overview
            </span>
            <ul className="list-disc list-outside ml-5 space-y-2 mb-6">
              <Bullet>
                Each project&rsquo;s cover art should encapsulate the exact narrative and emotion of
                its respective body of work &mdash; no text on front covers ever. The art alone must
                communicate the story.
              </Bullet>
              <Bullet>
                Every cover should also maintain visual and thematic uniformity with the previous ones,
                collectively forming a cohesive visual anthology. Think of them as paintings in an
                incomplete set, designed to evolve together over time.
              </Bullet>
            </ul>
          </div>

          <SubTitle>Foundational Visual Language</SubTitle>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
            <div className="border border-[#c0392b]/20 p-6">
              <div className="relative aspect-square overflow-hidden mb-4 -mx-6 -mt-6">
                <Image src="/images/finexme-cover.webp" alt="FINExME cover art" fill className="object-cover" sizes="400px" />
              </div>
              <span className="text-xs font-sans tracking-[0.2em] uppercase text-[#c0392b]/70 block mb-3">
                The FINExME Cover
              </span>
              <p className="font-sans text-sm leading-[1.85] text-muted">
                Sets the tone and serves as the perfect starting point for this chapter. Its vibrant
                reds and multicolored neon accents illuminate the shadow work introduced with FREE and
                The Lady in Black, capturing a moment of passion and rawness. This aligns perfectly
                with FINExME&rsquo;s identity as a collection of demos and establishes both tone and
                thematic foundation for future chapters.
              </p>
            </div>

            <div className="border border-white/10 p-6">
              <div className="relative aspect-square overflow-hidden mb-4 -mx-6 -mt-6">
                <Image src="/images/sinenoctis-cover.webp" alt="SINE NOCTIS cover art" fill className="object-cover" sizes="400px" />
              </div>
              <span className="text-xs font-sans tracking-[0.2em] uppercase text-white/40 block mb-3">
                The SINE NOCTIS Cover
              </span>
              <p className="font-sans text-sm leading-[1.85] text-muted">
                Isolates FREE &mdash; alone, enveloped in grayscale, radiating stillness while
                concealing deep emotional current beneath his composure. This imagery continues from
                FINExME, which concluded with Pilgrim, a track that embodies the
                &ldquo;disappointed dad&rdquo; theme in relational contexts. The black-and-white
                palette visually represents disorientation and rebirth &mdash; central concepts to the
                reincarnation themes that define this 3-track follow-up to 2024&rsquo;s 7-track
                release.
              </p>
            </div>
          </div>

          <SubTitle>Creative Continuity</SubTitle>
          <ul className="list-disc list-outside ml-5 space-y-2 mb-6">
            <Bullet>
              The intention for all subsequent projects is to evolve while maintaining narrative and
              aesthetic cohesion.
            </Bullet>
            <Bullet>
              Each visual entry should advance Prometheus/FREE&rsquo;s odyssey, building upon
              established motifs to explore new emotional and artistic terrain.
            </Bullet>
            <Bullet>
              As long as we adhere to this conceptual and artistic framework, every project will feel
              connected yet innovative &mdash; distinct chapters of a single narrative legacy.
            </Bullet>
          </ul>
        </div>
      </section>

      {/* ---- Production Standards ---- */}
      <section
        className="relative section-padding border-t border-white/5"
        aria-label="Production Standards"
      >
        <div className="max-w-4xl mx-auto px-6 md:px-10">
          <SectionLabel>Operations</SectionLabel>
          <SectionTitle>Production Standards</SectionTitle>

          <SubTitle>Behind the Scenes (BTS)</SubTitle>
          <Paragraph>
            Khalil remains the preferred BTS shooter for visual documentation. If unavailable, the
            established standard must still be met &mdash; ensuring all BTS footage yields materials
            viable for use in principal photography and as visual guides for subsequent projects.
          </Paragraph>

          <SubTitle>Back Cover / Tracklisting / Credits</SubTitle>
          <Paragraph>
            Roy is currently recreating what Choice and I developed for the FINExME back cover, which
            stands as the golden standard for all future releases. We will continue to commission Roy
            for future efforts.
          </Paragraph>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-white/5 p-5">
              <div className="relative aspect-[2/1] overflow-hidden mb-3 -mx-5 -mt-5">
                <Image src="/images/finexme-backcover.webp" alt="FINExME back cover" fill className="object-cover" sizes="400px" />
              </div>
              <span className="text-xs font-sans tracking-[0.15em] uppercase text-white/30 block mb-2">
                FINExME Back Cover
              </span>
              <p className="font-sans text-sm text-muted">The golden standard.</p>
            </div>
            <div className="border border-white/5 p-5">
              <div className="relative aspect-[2/1] overflow-hidden mb-3 -mx-5 -mt-5">
                <Image src="/images/sinenoctis-backcover.webp" alt="SINE NOCTIS back cover" fill className="object-cover" sizes="400px" />
              </div>
              <span className="text-xs font-sans tracking-[0.15em] uppercase text-white/30 block mb-2">
                SINE NOCTIS Back Cover
              </span>
              <p className="font-sans text-sm text-muted">
                Still a WIP. Verbiage should be identical on both.
              </p>
              <p className="font-sans text-xs text-white/20 mt-2 italic">
                (ex.) &ldquo;photography - rush hour / photography - silent k&rdquo;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---- Design Considerations ---- */}
      <section
        className="relative section-padding border-t border-white/5"
        aria-label="Design Considerations"
      >
        <div className="max-w-4xl mx-auto px-6 md:px-10">
          <SectionLabel>Design System</SectionLabel>
          <SectionTitle>Design Considerations</SectionTitle>

          <SubTitle>Typography &amp; Layout</SubTitle>
          <Paragraph>
            Proper spacing and structure for titles across all projects should maintain consistency.
            Adjustments are being made to ensure that the SINE NOCTIS title mirrors FINExME in both
            spacing and presentation. Additionally, its proximity to the FREE logo (created by Choice)
            should position the two nearly atop one another &mdash; think of &ldquo;FREE&rdquo; as a
            halo to the project title, symbolically crowning each body of work.
          </Paragraph>

          <SubTitle>Title Styling &amp; Narrative Intent</SubTitle>
          <Paragraph>
            The space between the words in SINE NOCTIS may be omitted to create a handwritten, organic
            aesthetic that aligns with the personal, diary-like tone of these projects. This approach
            mirrors FINExME&rsquo;s authentic presentation &mdash; each project appearing almost like a
            journal entry, captured in raw emotion and &ldquo;chicken scratch&rdquo; lettering.
          </Paragraph>

          <div className="mt-6 mb-8">
            <span className="text-xs font-sans tracking-[0.15em] uppercase text-white/30 block mb-4">
              Future Catalog &mdash; Naming Format &amp; Narrative Connections
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  title: 'SINE NOCTIS',
                  logo: '/images/logotype-sinenoctis.png',
                  description:
                    'The current EP being presented, which will receive a sequel of the same name before the next album.',
                },
                {
                  title: 'OTHERLAND',
                  logo: '/images/logotype-otherland.png',
                  description: 'The next full-length album we are building toward.',
                },
                {
                  title: 'SINE NOCTIS 2',
                  logo: '/images/logotype-sinenoctis2.png',
                  description:
                    'In final stages of completion and a companion piece to SINE NOCTIS sonically, narratively and visually.',
                },
                {
                  title: 'SEX SYMBOL (THE ALBUM)',
                  logo: '/images/logotype-sexsymbol.png',
                  description:
                    'The culmination of everything Choice and I have designed over the past seven years. The most important piece in the catalog, intentionally postponed. Entirely produced by Worst Choice.',
                },
              ].map((item) => (
                <div key={item.title} className="border border-white/5 p-5">
                  <div className="relative h-10 mb-4">
                    <Image src={item.logo} alt={`${item.title} logotype`} fill className="object-contain object-left" sizes="300px" />
                  </div>
                  <p className="font-sans text-xs leading-[1.85] text-muted">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <SubTitle>Logo Usage</SubTitle>
          <div className="my-6 border border-white/5 bg-white/[0.02] p-8 flex items-center justify-center">
            <div className="relative w-48 h-16">
              <Image src="/images/logotype-free.png" alt="FREE logotype" fill className="object-contain" sizes="200px" />
            </div>
          </div>
          <Paragraph>
            Continue using the original FREE logo (created by Choice). Although the PSD file is
            missing, the available screenshot can be vectored.
          </Paragraph>

          <SubTitle>Focal Motifs</SubTitle>
          <Paragraph>
            Each project&rsquo;s central motif should reflect FREE&rsquo;s protection or armor within
            that narrative world:
          </Paragraph>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
              <div className="relative aspect-video overflow-hidden mb-4">
                <Image src="/images/bmw-red-wheel.webp" alt="FINExME focal motif — the BMW" fill className="object-cover" sizes="400px" />
              </div>
              <div className="border-l-2 border-[#c0392b]/60 pl-6">
                <span className="text-xs font-sans tracking-[0.2em] uppercase text-[#c0392b]/70 block mb-2">
                  FINExME
                </span>
                <p className="font-sans text-sm text-muted">
                  The BMW (a symbol of movement and identity).
                </p>
              </div>
            </div>
            <div>
              <div className="relative aspect-video overflow-hidden mb-4">
                <Image src="/images/jacket-closeup.webp" alt="SINE NOCTIS focal motif — the Alpinestars Jacket" fill className="object-cover" sizes="400px" />
              </div>
              <div className="border-l-2 border-white/20 pl-6">
                <span className="text-xs font-sans tracking-[0.2em] uppercase text-white/40 block mb-2">
                  SINE NOCTIS
                </span>
                <p className="font-sans text-sm text-muted">
                  The Alpinestars Jacket (representing shelter and resilience).
                </p>
              </div>
            </div>
          </div>

          <Divider />

          <p className="font-sans text-base md:text-lg leading-[1.85] text-muted/60 italic max-w-[55ch]">
            As we continue onward into the planned catalog, we will develop distinct but uniform
            visual identities alongside the natural progression of the narrative we&rsquo;re building
            sonically. My hope is to make FREE a well oiled machine the likes Detroit has never seen.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Export                                                              */
/* ------------------------------------------------------------------ */

export default function InternalPage() {
  return <InternalContent />
}
