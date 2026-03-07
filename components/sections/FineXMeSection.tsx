import Image from 'next/image'
import FadeInView from '@/components/ui/FadeInView'
import AutoplayVideo from '@/components/ui/AutoplayVideo'

const TRACKLIST = [
  { num: '01', title: 'Fine By Me', spotify: 'https://open.spotify.com/track/1bDsTY39ICcA0DlBkiFDDv', apple: 'https://music.apple.com/us/album/fine-by-me/1724039694?i=1724039695' },
  { num: '02', title: 'Twins', spotify: 'https://open.spotify.com/track/3gGDqcfkXGhC3djgbglAom', apple: 'https://music.apple.com/us/album/twins/1724039694?i=1724039696' },
  { num: '03', title: 'Chambers', spotify: 'https://open.spotify.com/track/0bSisXV76kUMxJSIMsUPbN', apple: 'https://music.apple.com/us/album/chambers/1724039694?i=1724039697' },
  { num: '04', title: 'Flo', spotify: 'https://open.spotify.com/track/7zGYtI2yueti0HpEKmQlni', apple: 'https://music.apple.com/us/album/flo/1724039694?i=1724039698' },
  { num: '05', title: 'Zodiac Killer', spotify: 'https://open.spotify.com/track/3R5F18TT6SwbV6a9bD1bkh', apple: 'https://music.apple.com/us/album/zodiac-killer/1724039694?i=1724039699' },
  { num: '06', title: 'Maybe', spotify: 'https://open.spotify.com/track/3JT3Oj6jsTS855v3Y2qazP', apple: 'https://music.apple.com/us/album/maybe/1724039694?i=1724039700' },
  { num: '07', title: 'Pilgrim', spotify: 'https://open.spotify.com/track/39JXoG0CZxHFRiWwg29zi4', apple: 'https://music.apple.com/us/album/pilgrim/1724039694?i=1724039701' },
]

const GALLERY = [
  { src: '/images/red-portrait.avif', alt: 'Red-lit portrait', caption: 'Red-lit portrait' },
  { src: '/images/bmw-red-wheel.avif', alt: 'BMW red wheel detail', caption: 'BMW wheel detail' },
  { src: '/images/fine-by-me-still.avif', alt: 'Fine By Me visual still', caption: 'Fine By Me' },
  { src: '/images/dusk-silhouette-two.avif', alt: 'Sunset silhouette with two figures', caption: 'Sunset' },
  { src: '/images/fine-by-me-sunset.webp', alt: 'Dusk silhouette at the lot', caption: 'Dusk silhouette' },
  { src: '/images/red-bokeh-portrait.avif', alt: 'Red bokeh portrait', caption: 'Red bokeh' },
]

export default function FineXMeSection() {
  return (
    <>
      <section
        id="finexme"
        data-section-id="finexme"
        className="relative section-padding"
        aria-label="ACT I — FINExME"
      >
        {/* Ambient red glow */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,rgba(192,57,43,0.08)_0%,transparent_70%)]" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10">
          {/* Chapter label */}
          <div className="mb-16 md:mb-24">
            <span className="text-xs font-pixel tracking-[0.2em] uppercase text-[#c0392b]/80 block mb-6">
              Act I
            </span>
            <h2 className="font-sans text-4xl md:text-5xl lg:text-6xl italic text-[#f5e6e0] tracking-wide">
              FINExME
            </h2>
          </div>

          {/* Manifesto text */}
          <FadeInView className="max-w-2xl mb-20 md:mb-28">
            <p className="font-sans text-2xl md:text-3xl italic leading-relaxed text-[#f5e6e0]/90 mb-8">
              In today&rsquo;s R&amp;B, men rarely make music that yearns anymore.
            </p>
            <p className="font-sans text-sm md:text-base leading-[1.8] text-[#f5e6e0]/60 max-w-[65ch]">
              FREE occupies the grey area where deflection meets self-reflection.
              FINExME is an exercise in romantic fatalism&mdash;seven tracks that circle
              the drain of a relationship with the kind of quiet obsession that makes you
              check your phone at 2AM knowing nothing good is coming. The production
              breathes in warm reds and amber, every beat a slow pulse in a room where
              someone just left.
            </p>
          </FadeInView>

          {/* Cover art */}
          <div className="relative mb-20 md:mb-28">
            <div className="relative aspect-square max-w-md mx-auto">
              <Image
                src="/images/finexme-cover.avif"
                alt="FINExME cover art"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 448px"
              />
              <div className="absolute inset-0 vignette" />
            </div>
          </div>

          {/* Gallery grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mb-20 md:mb-28">
            {GALLERY.map(({ src, alt, caption }) => (
              <div key={src} className="gallery-item aspect-[3/4]">
                <Image
                  src={src}
                  alt={alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                <div className="gallery-caption">
                  <span className="text-xs font-sans tracking-[0.1em] uppercase text-white/80">
                    {caption}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Tracklist + Back cover */}
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start mb-20 md:mb-28">
            {/* Tracklist */}
            <div>
              <h3 className="text-xs font-sans tracking-[0.2em] uppercase text-[#c0392b]/70 mb-8">
                Tracklist
              </h3>
              <ol className="space-y-4">
                {TRACKLIST.map(({ num, title, spotify, apple }) => (
                  <li key={num} className="flex items-baseline gap-4 group">
                    <span className="text-xs font-sans text-[#c0392b]/40 tabular-nums">{num}</span>
                    <span className="font-sans text-lg md:text-xl italic text-[#f5e6e0]/80 group-hover:text-[#f5e6e0] transition-colors">
                      {title}
                    </span>
                    {/* Streaming icons — slide in on hover */}
                    <span className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 shrink-0 md:ml-auto">
                      {spotify && (
                        <a
                          href={spotify}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${title} on Spotify`}
                          className="text-white/30 hover:text-[#1DB954] transition-colors focus-visible:ring-1 focus-visible:ring-accent/50 focus-visible:outline-none rounded-sm"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                          </svg>
                        </a>
                      )}
                      {apple && (
                        <a
                          href={apple}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${title} on Apple Music`}
                          className="text-white/30 hover:text-[#FC3C44] transition-colors focus-visible:ring-1 focus-visible:ring-accent/50 focus-visible:outline-none rounded-sm"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                            <path d="M23.994 6.124a9.23 9.23 0 00-.24-2.19c-.317-1.31-1.062-2.31-2.18-3.043a5.022 5.022 0 00-1.877-.726 10.496 10.496 0 00-1.564-.15c-.04-.003-.083-.01-.124-.013H5.986c-.152.01-.303.017-.455.026-.747.043-1.49.123-2.193.4-1.336.53-2.3 1.452-2.865 2.78-.192.448-.292.925-.363 1.408-.056.392-.088.785-.1 1.18 0 .032-.007.062-.01.093v12.223c.01.14.017.283.027.424.05.815.154 1.624.497 2.373.65 1.42 1.738 2.353 3.234 2.802.42.127.856.187 1.293.228.555.053 1.11.06 1.667.06h11.03c.525-.015 1.05-.04 1.573-.104.727-.088 1.433-.247 2.08-.594.91-.488 1.61-1.2 2.083-2.14.29-.576.447-1.19.536-1.82.07-.51.105-1.022.116-1.536.003-.076.01-.152.01-.228V6.124zm-3.4 8.636a3.44 3.44 0 01-1.972 3.072c-.6.283-1.23.39-1.893.39-.334 0-.667-.048-.99-.148-.383-.12-.737-.312-1.098-.493-.298-.149-.596-.297-.916-.39-.24-.07-.49-.091-.737-.047-.34.06-.654.2-.957.363-.393.21-.773.446-1.2.574-.504.153-1.016.19-1.534.076-.632-.14-1.17-.452-1.612-.925-.76-.812-1.127-1.79-1.143-2.893-.008-.543.088-1.074.3-1.577.494-1.173 1.373-1.914 2.565-2.26.77-.224 1.555-.28 2.35-.19.524.06 1.034.18 1.524.394.024.01.05.015.094.028V7.2c0-.088-.01-.176-.027-.263-.044-.218-.222-.37-.444-.368-.108.002-.217.016-.325.036-.296.054-.59.123-.884.188-.79.175-1.584.302-2.392.263a3.466 3.466 0 01-1.292-.288c-.35-.153-.638-.39-.836-.72-.1-.165-.155-.347-.155-.54.002-.396.002-.792.002-1.188V3.71c0-.064.003-.128.012-.192.038-.256.206-.423.46-.45.132-.014.265-.004.397.016.3.046.596.11.893.173.9.193 1.804.34 2.724.328.24-.003.48-.03.717-.076.168-.033.328-.092.466-.207.093-.077.138-.175.138-.3V2.78c0-.205.004-.41.01-.614.01-.256.19-.462.442-.492.147-.018.296-.012.443.007.27.035.536.094.802.155 1.07.244 2.14.432 3.234.374.1-.005.2-.023.297-.05.204-.056.33-.194.362-.404.012-.073.016-.148.016-.222V1.19c0-.09.007-.18.022-.268.04-.225.2-.378.427-.4.167-.015.336-.003.502.027.42.075.835.174 1.25.276l.157.04c.208.052.325.202.353.414.012.086.015.173.015.26V14.76z"/>
                          </svg>
                        </a>
                      )}
                    </span>
                    <span className="flex-1 border-b border-white/5" />
                  </li>
                ))}
              </ol>
              {/* THIS IS A COLLECTION OF DEMOS dedication */}
              <div className="mt-16 pt-8 border-t border-white/5">
                <p className="font-sans text-xl md:text-2xl italic text-white/30 tracking-wide">
                  THIS IS A COLLECTION OF DEMOS
                </p>
              </div>
            </div>

            {/* Back cover */}
            <div className="relative aspect-square">
              <Image
                src="/images/finexme-backcover.avif"
                alt="FINExME back cover"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 vignette" />
            </div>
          </div>

          {/* Credits */}
          <div className="text-center">
            <p className="text-xs font-sans tracking-[0.15em] uppercase text-white/25">
              Creative Minds Coalition 2024 / OWJV 2024
            </p>
          </div>
        </div>
      </section>

      {/* ANTE Transition */}
      <section
        id="threshold"
        data-section-id="threshold"
        className="relative min-h-[80vh] flex items-center justify-center overflow-hidden"
        aria-label="Threshold between eras"
      >
        <div className="absolute inset-0">
          <AutoplayVideo
            src="/videos/ante-loop.mp4"
            poster="/images/ante-doorway.avif"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a0505]/60 via-black/40 to-[#0f0f0f]/80" />
        </div>
        <div className="absolute inset-0 vignette" />
      </section>
    </>
  )
}
