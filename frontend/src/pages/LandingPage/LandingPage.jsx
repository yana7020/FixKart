import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"

import Hero from "./Hero"
import WhyFixKart from "./WhyFixKart"
import Services from "./Services"
import HowItWorks from "./HowItWorks"
import CTA from "./CTA"

function LandingPage() {
  return (
    <>
      <Navbar />
      <Hero />
      <WhyFixKart />
      <Services />
      <HowItWorks />
      <CTA />
      <Footer />
    </>
  )
}

export default LandingPage