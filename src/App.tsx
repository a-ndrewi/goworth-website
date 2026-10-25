import { I18nProvider } from './i18n'
import { Bento } from './sections/Bento'
import { Faq } from './sections/Faq'
import { FeatureTour } from './sections/FeatureTour'
import { FinalCta } from './sections/FinalCta'
import { Footer } from './sections/Footer'
import { Hero } from './sections/Hero'
import { Navbar } from './sections/Navbar'
import { PhotoMarquee } from './sections/PhotoMarquee'
import { Steps } from './sections/Steps'
import { Videos } from './sections/Videos'

export default function App() {
  return (
    <I18nProvider>
      <Navbar />
      <main className="overflow-x-clip">
        <Hero />
        <PhotoMarquee />
        <FeatureTour />
        <Steps />
        <Videos />
        <Bento />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </I18nProvider>
  )
}
