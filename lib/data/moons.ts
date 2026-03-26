export type Moon = {
  id: string
  label: string
  displayTitle?: string
  fullname: string
  desc: string
  src: string
  href?: string
  locked?: boolean
}

export const MOONS: Moon[] = [
  {
    id: 'owjv',
    label: 'OWJV',
    fullname: 'Other Worldly, Just Visiting.',
    desc: 'The dark moon. The container for every project, every phase, every chapter.',
    src: '/images/moon-owjv.png',
    href: '/',
  },
  {
    id: 'finexme',
    label: 'FINExME',
    fullname: 'Fine x Me.',
    desc: 'Blood moon. The collision of craft and self. Where the personal becomes undeniable.',
    src: '/images/moon-finexme.png',
    href: '/finexme',
  },
  {
    id: 'sinenoctis',
    label: 'SINE NOCTIS',
    displayTitle: 'SINENOCTIS',
    fullname: 'Sine Noctis.',
    desc: 'Without night. Light through the dark. Sound that exists between the silences.',
    src: '/images/moon-sinenoctis.png',
    href: '/sinenoctis',
  },
  {
    id: 'sn2',
    label: 'SN2',
    fullname: 'Sine Noctis II.',
    desc: 'The golden continuation. Warmth held against the cold. A second orbit.',
    src: '/images/moon-sn2.png',
    locked: true,
  },
  {
    id: 'otherland',
    label: 'OTHERLAND',
    fullname: 'Otherland.',
    desc: 'A world seen from elsewhere. Everything familiar made strange.',
    src: '/images/moon-otherland.png',
    locked: true,
  },
  {
    id: 'sexsymbol',
    label: 'SEX SYMBOL',
    fullname: 'Sex Symbol.',
    desc: 'Steel and night. The blue hour. Presence as its own kind of power.',
    src: '/images/moon-sexsymbol.png',
    locked: true,
  },
]
