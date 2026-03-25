import type { ComparableArtist } from '@/lib/content/types'

const comparables = [
  {
    name: 'Beyonce',
    category: 'visual',
    achievement: 'Visual albums (Lemonade 4x Plat, Black Is King on Disney+). Self-distributed concert film. Premieres through Parkwood, her own label.',
    relevance: 'The template for visual album as narrative IP. FREE runs a version of this at indie scale.',
  },
  {
    name: 'The Weeknd',
    category: 'visual',
    achievement: 'Multi-album cinematic universe (After Hours 3x Plat, Dawn FM, Hurry Up Tomorrow). HBO series The Idol. Feature film in development.',
    relevance: 'Most direct comp for serialized male R&B narrative across albums. Proves the lane exists.',
  },
  {
    name: 'Childish Gambino',
    category: 'hybrid-model',
    achievement: 'Because the Internet album + 72-page screenplay + free short film. This Is America: Diamond (10M+ units). Created Atlanta (FX).',
    relevance: 'Closest blueprint for free short film + written narrative as IP funnel leading to TV/film deals.',
  },
  {
    name: 'Tyler, the Creator',
    category: 'franchise',
    achievement: 'Music + Golf Wang fashion + Camp Flog Gnaw festival + animation (The Jellies). Call Me If You Get Lost 2x Plat. Owns masters.',
    relevance: 'Artist-as-universe model. Every album gets its own visual world and character.',
  },
  {
    name: 'Brent Faiyaz',
    category: 'indie-rb',
    achievement: 'Fully independent. Wasteland debuted #2 Billboard 200 on Lost Kids label. Certified Platinum. Later via UnitedMasters.',
    relevance: 'Most direct independent male R&B comp. Proved you can go Platinum without a label.',
  },
  {
    name: 'pgLang',
    category: 'hybrid-model',
    achievement: 'Founded by Kendrick Lamar and Dave Free. Music, film, and creative content under one roof. Interscope distribution deal.',
    relevance: 'Closest structural comp: small artist-led company treating music and film as inseparable.',
  },
  {
    name: 'SZA',
    category: 'visual',
    achievement: 'SOS 8x Platinum. Ctrl 6x Platinum. Cohesive visual identity with ocean/water motifs across all SOS-era visuals.',
    relevance: 'Visual cohesion keeps fans coming back. One look, one world, every release.',
  },
  {
    name: 'Daniel Caesar',
    category: 'indie-rb',
    achievement: 'Independent via Golden Child Recordings. Get You 7x Platinum. Freudian certified Platinum.',
    relevance: 'Direct comp for indie male R&B vulnerability lane. Proved being honest pays.',
  },
  {
    name: 'Frank Ocean',
    category: 'visual',
    achievement: 'Endless visual album fulfilled Def Jam contract. Blonde Platinum on Boys Don\'t Cry label. Limited-edition magazine.',
    relevance: 'Used the visual album as a strategic business move. FREE\'s creative bible parallels Ocean\'s magazine.',
  },
] as const satisfies readonly ComparableArtist[]

const categoryLabel: Record<ComparableArtist['category'], string> = {
  visual: 'Visual/Narrative',
  'indie-rb': 'Indie R&B',
  'hybrid-model': 'Hybrid Model',
  franchise: 'Franchise/Infra',
}

export default function ComparablesTable() {
  return (
    <div className="overflow-x-auto -mx-6 md:mx-0">
      <table className="w-full min-w-[640px] text-left border-collapse">
        <thead>
          <tr className="border-b border-white/10">
            <th className="py-3 px-3 text-xs font-sans tracking-[0.15em] uppercase text-white/30 font-normal w-[140px]">
              Artist / Entity
            </th>
            <th className="py-3 px-3 text-xs font-sans tracking-[0.15em] uppercase text-white/30 font-normal w-[100px]">
              Category
            </th>
            <th className="py-3 px-3 text-xs font-sans tracking-[0.15em] uppercase text-white/30 font-normal">
              Achievement
            </th>
            <th className="py-3 px-3 text-xs font-sans tracking-[0.15em] uppercase text-white/30 font-normal">
              Relevance to FREE
            </th>
          </tr>
        </thead>
        <tbody>
          {comparables.map((c) => (
            <tr key={c.name} className="border-b border-white/5 last:border-0">
              <td className="py-4 px-3 font-display text-sm text-heading align-top">
                {c.name}
              </td>
              <td className="py-4 px-3 align-top">
                <span className="inline-block font-mono text-[10px] tracking-wider uppercase text-accent/60 border border-accent/20 px-2 py-0.5">
                  {categoryLabel[c.category]}
                </span>
              </td>
              <td className="py-4 px-3 font-sans text-xs text-muted leading-relaxed align-top">
                {c.achievement}
              </td>
              <td className="py-4 px-3 font-sans text-xs text-white/50 leading-relaxed italic align-top">
                {c.relevance}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-4 font-mono text-[10px] text-white/20 px-3">
        RIAA certifications verified via riaa.com, Feb 2026. Category assignments are editorial.
      </p>
    </div>
  )
}
