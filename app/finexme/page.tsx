import ScrollController from '@/components/ui/ScrollController'
import GrainOverlay from '@/components/ui/GrainOverlay'
import FineXMeSection from '@/components/sections/FineXMeSection'
import Footer from '@/components/layout/Footer'

export default function FineXMePage() {
  return (
    <ScrollController>
      <GrainOverlay />
      <main className="pt-20">
        <FineXMeSection />
      </main>
      <Footer />
    </ScrollController>
  )
}
