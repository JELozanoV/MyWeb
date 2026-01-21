import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import About from '../components/About'
import Skills from '../components/Skills'
import ProjectsSection from '../components/ProjectsSection'
import Experience from '../components/Experience'
import Education from '../components/Education'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import { useLocale } from '../src/context/LocaleContext'

export default function Home() {
  const { fadePhase } = useLocale();

  return (
    <div className={`min-h-screen transition-opacity duration-300 ease-in-out motion-reduce:transition-none ${fadePhase === 'out' ? 'opacity-0' : 'opacity-100'}`}>
      <Navbar />
      <Hero />
      <ProjectsSection />
      <Skills />
      <Experience />
      <About />
      <Education />
      <Contact />
      <Footer />
    </div>
  )
}