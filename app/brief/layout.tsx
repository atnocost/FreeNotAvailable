import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'SINE NOCTIS Brief — OWJV',
  description: 'Creative brief for SINE NOCTIS rollout.',
  robots: { index: false, follow: false },
}

export default function BriefLayout({ children }: { children: React.ReactNode }) {
  return children
}
