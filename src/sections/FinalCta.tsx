import { QRCodeSVG } from 'qrcode.react'
import { asset, links } from '../config'
import { Phone } from '../components/Phone'
import { StoreButtons } from '../components/StoreButtons'
import { Reveal } from '../components/ui'
import { useI18n } from '../i18n'

export function FinalCta() {
  const { t } = useI18n()
  return (
    <section id="download" className="relative px-4 py-24 sm:px-6 sm:py-32">
      <Reveal className="mx-auto max-w-6xl">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#2457e6] via-[#3d6cf0] to-[#20a7a0] px-6 pt-14 sm:px-14 lg:px-16 lg:pt-0">
          <img src={asset('photos/santorini.jpg')} alt="" className="pointer-events-none absolute inset-0 size-full object-cover opacity-[0.12] mix-blend-luminosity" />
          <div className="pointer-events-none absolute -top-32 -left-20 size-96 rounded-full bg-white/20 blur-3xl" />
          <div className="relative grid items-center gap-12 lg:grid-cols-[1.2fr_1fr]">
            <div className="text-center lg:py-20 lg:text-left">
              <img src={asset('brand/app-icon.png')} alt="GoWorth" className="mx-auto size-20 rounded-[22px] shadow-2xl shadow-black/30 ring-1 ring-white/30 lg:mx-0" />
              <h2 className="mt-8 font-display text-4xl font-extrabold tracking-tight text-balance text-white sm:text-6xl">{t.cta.title}</h2>
              <p className="mt-5 text-lg text-white/80 sm:text-xl">{t.cta.body}</p>
              <StoreButtons className="mt-9 justify-center lg:justify-start" />
              <div className="mt-10 hidden items-center gap-4 lg:flex">
                <div className="rounded-2xl bg-white p-2.5 shadow-xl">
                  <QRCodeSVG value={links.site} size={84} fgColor="#0e1626" level="M" />
                </div>
                <div>
                  <p className="font-semibold text-white">{t.cta.scan}</p>
                  <p className="text-sm text-white/70">{t.cta.scanHint}</p>
                </div>
              </div>
            </div>
            <div className="relative mx-auto -mb-28 w-full max-w-[280px] self-end lg:-mb-20 lg:mt-16">
              <Phone screen="itinerary-1.jpg" alt="GoWorth trip" />
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
