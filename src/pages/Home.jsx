import Navbar from '../components/layout/Navbar.jsx'
import Footer from '../components/layout/Footer.jsx'
import HeroSection from '../components/sections/HeroSection.jsx'
import ServicesSection from '../components/sections/ServicesSection.jsx'
import AboutSection from '../components/sections/AboutSection.jsx'
import ReviewsSection from '../components/sections/ReviewsSection.jsx'
import ContactSection from '../components/sections/ContactSection.jsx'

export default function Home() {
  return (<>
    <Navbar />
    <main>
      <HeroSection /><ServicesSection /><AboutSection />
      <ReviewsSection /><ContactSection />
    </main>
    <Footer />
  </>)
}
