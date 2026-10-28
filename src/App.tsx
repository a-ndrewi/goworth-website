import { useEffect, useState } from 'react'
import { I18nProvider } from './i18n'
import { isLegalId, type LegalDocumentId } from './legal'
import { Bento } from './sections/Bento'
import { Faq } from './sections/Faq'
import { FeatureTour } from './sections/FeatureTour'
import { FinalCta } from './sections/FinalCta'
import { Footer } from './sections/Footer'
import { Hero } from './sections/Hero'
import { LegalPage } from './sections/LegalPage'
import { Navbar } from './sections/Navbar'
import { PhotoMarquee } from './sections/PhotoMarquee'
import { Steps } from './sections/Steps'
import { Videos } from './sections/Videos'
import { Wheel } from './sections/Wheel'

/** `#/legal/<id>` opens a legal document; any other hash is an anchor on the home page. */
function legalRoute(hash: string): LegalDocumentId | null {
  const id = hash.match(/^#\/legal\/([a-z]+)$/)?.[1]
  return id && isLegalId(id) ? id : null
}

function useLegalRoute() {
  const [route, setRoute] = useState(() => legalRoute(window.location.hash))

  useEffect(() => {
    const onHash = () => {
      const next = legalRoute(window.location.hash)
      setRoute(next)
      if (next) {
        window.scrollTo({ top: 0 })
      } else {
        // The home sections mount on this render; scroll to the anchor once they exist.
        setTimeout(() => document.getElementById(window.location.hash.slice(1) || 'top')?.scrollIntoView({ behavior: 'instant' }))
      }
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  return route
}

export default function App() {
  const legal = useLegalRoute()

  return (
    <I18nProvider>
      <Navbar />
      <main className="overflow-x-clip">
        {legal ? (
          <LegalPage id={legal} />
        ) : (
          <>
            <Hero />
            <PhotoMarquee />
            <FeatureTour />
            <Steps />
            <Videos />
            <Bento />
            <Wheel />
            <Faq />
            <FinalCta />
          </>
        )}
      </main>
      <Footer />
    </I18nProvider>
  )
}
