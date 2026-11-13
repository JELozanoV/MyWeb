import Head from 'next/head'
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
import { useContent } from '../src/hooks/useContent'

export default function Home() {
  const { fadePhase } = useLocale();
  const { labels } = useContent();

  return (
    <>
      <Head>
        <title>{labels.meta.title}</title>
        <meta name="description" content={labels.meta.description} />
        <meta property="og:title" content={labels.meta.title} />
        <meta property="og:description" content={labels.meta.description} />
        <meta property="og:type" content="website" />
      </Head>
      <div className={`relative z-10 min-h-screen transition-opacity duration-300 ease-in-out motion-reduce:transition-none ${fadePhase === 'out' ? 'opacity-0' : 'opacity-100'}`}>
        <Navbar />
        <main>
          <Hero />
          <ProjectsSection />
          <Skills />
          <Experience />
          <About />
          <Education />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  )
}
