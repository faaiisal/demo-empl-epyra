import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import ProofStrip from '@/components/sections/ProofStrip'
import AudienceRouter from '@/components/sections/AudienceRouter'
import ProjectDiscovery from '@/components/sections/ProjectDiscovery'
import EngineeredBD from '@/components/sections/EngineeredBD'
import LiveProgress from '@/components/sections/LiveProgress'
import TrustLandowners from '@/components/sections/TrustLandowners'

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="main-content">
        {/* 2. Hero — full-bleed 360° autoplay video background */}
        <Hero />
        {/* 3. Proof strip */}
        <ProofStrip />
        {/* 4. Audience router */}
        <AudienceRouter />
        {/* 5. Project discovery */}
        <ProjectDiscovery />
        {/* 6. Engineered for Bangladesh */}
        <EngineeredBD />
        {/* 7. Live progress */}
        <LiveProgress />
        {/* 8. Trust & landowners */}
        <TrustLandowners />
      </main>
      {/* 9. Footer / final CTA */}
      <Footer />
      {/* Bottom padding so mobile sticky bar doesn't cover footer content */}
      <div className="md:hidden h-16" aria-hidden="true" />
    </>
  )
}
