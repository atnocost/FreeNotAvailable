export type EntryType = 'single' | 'album' | 'ep' | 'film' | 'trailer' | 'teaser' | 'remix' | 'collaboration' | 'future'
export type Era = 'finexme' | 'sinenoctis' | 'future'

export interface TimelineEntry {
  id: number
  title: string
  subtitle: string
  date: string
  displayDate: string
  type: EntryType
  era: Era
  image: string
  link?: string
  tracks?: number
}

// Array order is intentional display order (not strictly chronological by date)
export const TIMELINE_ENTRIES: TimelineEntry[] = [
  {
    id: 1,
    title: 'ZODIAC KILLER',
    subtitle: 'Single',
    date: '2023-10-31',
    displayDate: 'Oct 31, 2023',
    type: 'single',
    era: 'finexme',
    image: 'zodiac-killer-still.avif',
    link: 'https://music.apple.com/us/album/zodiac-killer/1713498638?i=1713498639',
  },
  {
    id: 2,
    title: 'AT NO COST',
    subtitle: 'First Trailer',
    date: '2024-02-01',
    displayDate: '~Feb 2024',
    type: 'trailer',
    era: 'finexme',
    image: 'red-portrait.avif',
    link: 'https://youtu.be/lV3YCXGO6kw',
  },
  {
    id: 3,
    title: 'FINExME',
    subtitle: 'Album — 7 tracks',
    date: '2024-01-11',
    displayDate: 'Jan 11, 2024',
    type: 'album',
    era: 'finexme',
    image: 'finexme-cover.avif',
    link: 'https://music.apple.com/us/album/finexme/1724944039',
    tracks: 7,
  },
  {
    id: 4,
    title: 'Fine By Me',
    subtitle: 'Film',
    date: '2024-02-15',
    displayDate: '~Feb 2024',
    type: 'film',
    era: 'finexme',
    image: 'dusk-silhouette-two.avif',
    link: 'https://youtu.be/8wNWnEFeipQ',
  },
  {
    id: 5,
    title: 'ANTE',
    subtitle: 'Teaser',
    date: '2025-11-01',
    displayDate: '~Nov 2025',
    type: 'teaser',
    era: 'sinenoctis',
    image: 'ante-doorway.avif',
    link: 'https://youtu.be/LjMu2mOCKpw',
  },
  {
    id: 6,
    title: 'VESPERA',
    subtitle: 'Teaser II',
    date: '2025-12-01',
    displayDate: '~Dec 2025',
    type: 'teaser',
    era: 'sinenoctis',
    image: 'vespera-cover.avif',
    link: 'https://youtu.be/3LlIdAvtuqY',
  },
  {
    id: 7,
    title: 'NOCTEM',
    subtitle: 'Trailer',
    date: '2026-01-01',
    displayDate: '~Jan 2026',
    type: 'trailer',
    era: 'sinenoctis',
    image: 'noctem-cover.avif',
    link: 'https://youtu.be/pJeSxF9nmHE',
  },
  {
    id: 8,
    title: 'SINE NOCTIS',
    subtitle: 'EP — 3 tracks',
    date: '2026-06-01',
    displayDate: '2026',
    type: 'ep',
    era: 'sinenoctis',
    image: 'sinenoctis-cover.avif',
    tracks: 3,
  },
  {
    id: 9,
    title: 'SINE NOCTIS 2',
    subtitle: 'Future',
    date: '2099-01-01',
    displayDate: 'TBA',
    type: 'future',
    era: 'future',
    image: 'logotype-sinenoctis2.png',
  },
  {
    id: 10,
    title: 'OTHERLAND',
    subtitle: 'Future',
    date: '2099-01-02',
    displayDate: 'TBA',
    type: 'future',
    era: 'future',
    image: 'logotype-otherland.png',
  },
  {
    id: 11,
    title: 'SEX SYMBOL',
    subtitle: 'Future',
    date: '2099-01-03',
    displayDate: 'TBA',
    type: 'future',
    era: 'future',
    image: 'logotype-sexsymbol.png',
  },
]

export const ERA_COLORS = {
  finexme: '#c0392b',
  sinenoctis: '#d0d0d0',
  future: 'rgba(255,255,255,0.2)',
} as const

export const ERA_LABELS = {
  finexme: 'FINExME',
  sinenoctis: 'SINE NOCTIS',
  future: "What's Next",
} as const

export const ERA_YEAR_RANGES = {
  finexme: '2023\u20132025',
  sinenoctis: '2025\u20132026',
  future: 'TBA',
} as const
