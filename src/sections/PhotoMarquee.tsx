import { MapPin } from 'lucide-react'
import { asset } from '../config'
import { Reveal } from '../components/ui'
import { useI18n } from '../i18n'

const places = [
  ['positano', 'Positano', 'Italy'],
  ['kyoto', 'Kyoto', 'Japan'],
  ['santorini', 'Santorini', 'Greece'],
  ['bali', 'Bali', 'Indonesia'],
  ['paris', 'Paris', 'France'],
  ['sibiu', 'Sibiu', 'Romania'],
  ['rio', 'Rio de Janeiro', 'Brazil'],
  ['lisbon', 'Lisbon', 'Portugal'],
  ['iceland', 'Iceland', 'Iceland'],
  ['marrakech', 'Marrakech', 'Morocco'],
  ['tokyo', 'Tokyo', 'Japan'],
  ['brasov', 'Brașov', 'Romania'],
  ['new-york', 'New York', 'USA'],
  ['cape-town', 'Cape Town', 'South Africa'],
  ['istanbul', 'Istanbul', 'Türkiye'],
  ['seoul', 'Seoul', 'South Korea'],
] as const

export function PhotoMarquee() {
  const { t } = useI18n()
  return (
    <section className="relative py-20 sm:py-24">
      <Reveal className="mx-auto max-w-3xl px-4 text-center">
        <p className="text-sm font-semibold tracking-[0.16em] text-teal uppercase">{t.marquee.eyebrow}</p>
        <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-balance text-white sm:text-4xl">{t.marquee.title}</h2>
      </Reveal>
      <div className="relative mt-12 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="animate-marquee pause-on-hover flex w-max gap-5">
          {[...places, ...places].map(([id, city, country], n) => (
            <figure key={n} className="group relative h-80 w-60 shrink-0 overflow-hidden rounded-3xl ring-1 ring-white/10 sm:h-96 sm:w-72" aria-hidden={n >= places.length}>
              <img
                src={asset(`photos/${id}.jpg`)}
                alt={n < places.length ? `${city}, ${country}` : ''}
                decoding="async"
                className="size-full object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
              <figcaption className="absolute inset-x-0 bottom-0 p-5">
                <p className="font-display text-2xl font-bold text-white">{city}</p>
                <p className="mt-1 flex items-center gap-1 text-sm text-white/75">
                  <MapPin className="size-3.5" />
                  {country}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
