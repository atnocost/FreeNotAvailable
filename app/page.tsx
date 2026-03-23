import ScrollController from '@/components/ui/ScrollController'
import GrainOverlay from '@/components/ui/GrainOverlay'
import HeroSection from '@/components/sections/HeroSection'
import CatalogGrid from '@/components/sections/CatalogGrid'
import LinksSection from '@/components/sections/LinksSection'
import EmailCapture from '@/components/sections/EmailCapture'
import MythosSection from '@/components/sections/MythosSection'
import OtherMediaSection from '@/components/sections/OtherMediaSection'
import Footer from '@/components/layout/Footer'

export default function HomePage() {
  return (
    <ScrollController>
      <GrainOverlay />
      <main>
        <HeroSection />
        <CatalogGrid />
        <LinksSection />
        <EmailCapture />
        <MythosSection />
        <OtherMediaSection />
      </main>
      <Footer />
    </ScrollController>
  )
}
