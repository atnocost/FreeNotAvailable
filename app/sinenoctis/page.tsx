import ScrollController from '@/components/ui/ScrollController'
import GrainOverlay from '@/components/ui/GrainOverlay'
import SineNoctisSection from '@/components/sections/SineNoctisSection'
import PilgrimSection from '@/components/sections/PilgrimSection'
import Footer from '@/components/layout/Footer'

export default function SineNoctisPage() {
  return (
    <ScrollController>
      <GrainOverlay />
      <main className="pt-20">
        <SineNoctisSection />
        <PilgrimSection />
      </main>
      <Footer />
    </ScrollController>
  )
}
