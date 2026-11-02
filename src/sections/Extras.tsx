import { Bell, BookOpen, CloudSun, Plane, Smartphone } from 'lucide-react'
import type { ReactNode } from 'react'
import { Reveal, SectionHeading } from '../components/ui'
import { useI18n } from '../i18n'

function Tile({ icon, title, body, children, className = '', delay = 0 }: { icon: ReactNode; title: string; body: string; children?: ReactNode; className?: string; delay?: number }) {
  return (
    <Reveal delay={delay} className={className}>
      <div className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.015] p-7">
        <span className="flex size-10 items-center justify-center rounded-xl bg-white/[0.07] text-white ring-1 ring-white/10">{icon}</span>
        <h3 className="mt-5 font-display text-xl font-bold text-white">{title}</h3>
        <p className="mt-2 text-[15px] leading-relaxed text-muted">{body}</p>
        {children}
      </div>
    </Reveal>
  )
}

/** Visas as they look in the app's passport: a country, its stamp colour and the entries. */
const visas = [
  { code: 'FR', country: 'France', entries: 2, color: '#5b86f5', rotate: -8 },
  { code: 'IT', country: 'Italia', entries: 1, color: '#22b98a', rotate: 6 },
  { code: 'JP', country: '日本', entries: 1, color: '#f07088', rotate: -4 },
  { code: 'RO', country: 'România', entries: 3, color: '#f6ae55', rotate: 9 },
]

function PassportArt() {
  const { t } = useI18n()
  const x = t.extras.passport
  return (
    <div className="mt-8 rounded-2xl border border-[#F5C451]/20 bg-gradient-to-br from-[#13224A] to-[#0B1430] p-5">
      <p className="flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] text-[#F5C451] uppercase">
        <BookOpen className="size-3.5" />
        {x.label}
      </p>
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {visas.map((visa) => (
          <div
            key={visa.code}
            className="flex aspect-square flex-col items-center justify-center rounded-full border-2 border-dashed text-center"
            style={{ borderColor: visa.color, color: visa.color, transform: `rotate(${visa.rotate}deg)` }}
          >
            <span className="font-display text-2xl leading-none font-extrabold">{visa.code}</span>
            <span className="mt-1 text-[10px] font-bold tracking-wider uppercase">{visa.country}</span>
            <span className="mt-0.5 text-[9px] font-semibold opacity-80">
              {visa.entries} {visa.entries === 1 ? x.stamp : x.entries}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function BoardingPassArt() {
  const { t } = useI18n()
  const x = t.extras.widget
  return (
    <div className="mt-8 overflow-hidden rounded-[22px] bg-[#F4F6FA] text-[#0B1430] shadow-xl shadow-black/30">
      <div className="flex items-end justify-between px-5 pt-4">
        <div>
          <p className="text-[9px] font-bold tracking-widest text-[#6b7487] uppercase">{x.from}</p>
          <p className="font-display text-3xl font-extrabold">BUC</p>
        </div>
        <Plane className="mb-2.5 size-5 text-[#2457e6]" />
        <div className="text-right">
          <p className="text-[9px] font-bold tracking-widest text-[#6b7487] uppercase">{x.to}</p>
          <p className="font-display text-3xl font-extrabold">PAR</p>
        </div>
      </div>
      <div className="relative my-3 border-t-2 border-dashed border-[#c9cfdb]">
        <span className="absolute -top-2.5 -left-2.5 size-5 rounded-full bg-[#0e1626]" />
        <span className="absolute -top-2.5 -right-2.5 size-5 rounded-full bg-[#0e1626]" />
      </div>
      <div className="px-5 pb-4">
        <p className="text-[10px] font-bold tracking-widest text-[#2457e6] uppercase">{x.day}</p>
        <ul className="mt-2 space-y-1.5">
          {x.plans.map((plan, n) => (
            <li key={plan} className="flex items-center gap-2 text-[13px] font-semibold">
              <span className={`size-2 rounded-full ${n === 0 ? 'bg-[#2457e6]' : 'bg-[#c9cfdb]'}`} />
              {plan}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

const weather = [
  { city: 'Paris', temp: '14°' },
  { city: 'Lisboa', temp: '21°' },
  { city: 'Kyoto', temp: '17°' },
]

export function Extras() {
  const { t } = useI18n()
  const x = t.extras
  return (
    <section id="new" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading eyebrow={x.eyebrow} title={x.title} lead={x.lead} />
        <div className="mt-16 grid gap-5 md:grid-cols-6">
          <Tile icon={<BookOpen className="size-5" />} title={x.passport.title} body={x.passport.body} className="md:col-span-4">
            <PassportArt />
          </Tile>
          <Tile icon={<Smartphone className="size-5" />} title={x.widget.title} body={x.widget.body} className="md:col-span-2" delay={0.08}>
            <BoardingPassArt />
          </Tile>
          <Tile icon={<CloudSun className="size-5" />} title={x.weather.title} body={x.weather.body} className="md:col-span-3" delay={0.04}>
            <div className="mt-6 flex flex-wrap gap-2">
              {weather.map((w) => (
                <span key={w.city} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-sm font-semibold text-ink">
                  {w.city}
                  <span className="inline-flex items-center gap-1 text-orange tabular-nums">
                    <CloudSun className="size-4" />
                    {w.temp}
                  </span>
                </span>
              ))}
            </div>
          </Tile>
          <Tile icon={<Bell className="size-5" />} title={x.reminders.title} body={x.reminders.body} className="md:col-span-3" delay={0.1} />
        </div>
      </div>
    </section>
  )
}
