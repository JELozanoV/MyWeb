import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import About from '../components/About'
import Skills from '../components/Skills'
import ProjectsSection from '../components/ProjectsSection'
import Experience from '../components/Experience'
import Education from '../components/Education'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import GuidedMouse from '../components/GuidedMouse'

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <ProjectsSection />
      <Experience />
      <Education />
      <Contact />
      <Footer />
      <GuidedMouse />
    </div>
  )
}