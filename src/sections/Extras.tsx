import { ArrowRight, Award, Bell, BookOpen, CalendarDays, Check, CloudSun, Coffee, Crown, Gift, Layers, Martini, Music, Plane, RefreshCw, Share2, Smartphone, Sun, Users, Utensils, WalletCards, WifiOff } from 'lucide-react'
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

/** A trip's companions as the app's sheet lists them: the organiser first, then who joined or is invited. */
const party = [
  { initial: 'A', name: 'Andrei', handle: '@andrei', color: '#5b86f5', role: 'organiser' },
  { initial: 'M', name: 'Maria', handle: '@maria.travels', color: '#22b98a', role: 'joined' },
  { initial: 'D', name: 'Dan', handle: '@dan', color: '#f6ae55', role: 'invited' },
] as const

function CompanionsArt() {
  const { t } = useI18n()
  const x = t.extras.companions
  return (
    <ul className="mt-6 space-y-2">
      {party.map((person, n) => (
        <li key={person.handle} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-2.5">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-full font-display text-sm font-extrabold text-[#0B1430]" style={{ backgroundColor: person.color }}>
            {person.initial}
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-sm font-semibold text-white">{n === 0 ? `${person.name} · ${x.you}` : person.name}</span>
            <span className="block truncate text-xs text-muted">{person.handle}</span>
          </span>
          <span
            className={`rounded-full px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase ${
              person.role === 'invited' ? 'bg-white/[0.07] text-muted' : 'bg-brand/15 text-brand'
            }`}
          >
            {x[person.role]}
          </span>
        </li>
      ))}
    </ul>
  )
}

/** The share sheet's style picker and a story card, as the app shows them; Route and Passport carry the Premium crown. */
function ShareArt() {
  const { t } = useI18n()
  const x = t.extras.share
  return (
    <div className="mt-6 flex items-center gap-4">
      <div className="relative aspect-[9/16] w-24 shrink-0 overflow-hidden rounded-2xl ring-1 ring-white/15 sm:w-28">
        <div className="absolute inset-0 flex">
          <span className="flex-1 bg-[#0055A4]" />
          <span className="flex-1 bg-[#F4F6FA]" />
          <span className="flex-1 bg-[#EF4135]" />
        </div>
        <div className="absolute inset-x-2 bottom-2 rounded-xl bg-[#0B1430]/85 p-2 text-white backdrop-blur">
          <p className="font-display text-sm leading-tight font-extrabold">France</p>
          <p className="text-[9px] font-semibold text-white/70">Paris · Lyon</p>
          <p className="mt-1 text-[9px] font-bold tracking-wider text-[#F5C451] uppercase">6 days · 14 places</p>
        </div>
      </div>
      <div className="min-w-0 flex-1 space-y-2">
        {x.styles.map((style, n) => (
          <span
            key={style}
            className={`flex items-center justify-between gap-2 rounded-full px-3.5 py-1.5 text-[13px] font-bold ${
              n === 0 ? 'bg-white text-[#0B1430]' : 'border border-white/15 bg-white/[0.04] text-white'
            }`}
          >
            {style}
            {n > 0 && <Crown className="size-3.5 shrink-0 text-[#F5C451]" />}
          </span>
        ))}
        <span className="flex items-center gap-2 px-1 text-xs font-semibold text-muted">
          <span className="relative h-4 w-7 shrink-0 rounded-full bg-white/15">
            <span className="absolute top-0.5 left-0.5 size-3 rounded-full bg-white/70" />
          </span>
          {x.spending}
        </span>
      </div>
    </div>
  )
}

const tripColors = ['#5b86f5', '#22b98a', '#f07088']

function TripsArt() {
  const { t } = useI18n()
  const x = t.extras.trips
  return (
    <ul className="mt-6 space-y-2">
      {x.list.map((trip, n) => (
        <li key={trip.name} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-2.5">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-xl text-[#0B1430]" style={{ backgroundColor: tripColors[n] }}>
            <CalendarDays className="size-4" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-sm font-semibold text-white">{trip.name}</span>
            <span className="block truncate text-xs text-muted">{trip.dates}</span>
          </span>
          <span className="rounded-full bg-brand/15 px-2.5 py-1 text-[10px] font-bold tracking-wider text-brand uppercase">{trip.tag}</span>
        </li>
      ))}
    </ul>
  )
}

/** Settle up as the app shows it: your balance, then the fewest payments that square the group. */
function SplitArt() {
  const { t } = useI18n()
  const x = t.extras.split
  return (
    <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
      <div className="flex items-baseline justify-between gap-3">
        <p className="text-[10px] font-bold tracking-widest text-muted uppercase">{x.balance}</p>
        <p className="font-display text-2xl font-extrabold text-green tabular-nums">€86</p>
      </div>
      <ul className="mt-3 space-y-2">
        {[
          { from: 'Maria', to: 'Andrei', amount: '€54', color: '#22b98a' },
          { from: 'Dan', to: 'Andrei', amount: '€32', color: '#f6ae55' },
        ].map((row, n) => (
          <li key={row.from} className="flex items-center gap-2.5 rounded-xl bg-[#0B1430] px-3 py-2 ring-1 ring-white/10">
            <span className="flex size-7 shrink-0 items-center justify-center rounded-full font-display text-xs font-extrabold text-[#0B1430]" style={{ backgroundColor: row.color }}>
              {row.from[0]}
            </span>
            <span className="flex min-w-0 flex-1 items-center gap-1.5 truncate text-[13px] font-semibold text-white">
              {row.from}
              <ArrowRight className="size-3.5 shrink-0 text-muted" />
              {row.to}
            </span>
            <span className="text-[13px] font-bold text-white tabular-nums">{row.amount}</span>
            {n === 0 ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-green/15 px-2 py-0.5 text-[10px] font-bold tracking-wider text-green uppercase">
                <Check className="size-3" />
              </span>
            ) : (
              <span className="rounded-full bg-white px-2.5 py-1 text-[10px] font-bold text-[#0B1430]">{x.paid}</span>
            )}
          </li>
        ))}
      </ul>
      <p className="mt-3 text-xs font-semibold text-muted">{x.square}</p>
    </div>
  )
}

/** The invite pass from the app: a perforated ticket with the code on its stub. */
function InviteArt() {
  const { t } = useI18n()
  const x = t.extras.invite
  return (
    <div className="mt-6 overflow-hidden rounded-2xl border border-[#F5C451]/25 bg-gradient-to-br from-[#13224A] to-[#0B1430]">
      <div className="px-4 pt-4 pb-3">
        <p className="text-[10px] font-bold tracking-widest text-[#F5C451] uppercase">{x.label}</p>
        <p className="mt-1 font-display text-3xl font-extrabold tracking-[0.3em] text-white tabular-nums">K7Q4MZ</p>
      </div>
      <div className="relative border-t-2 border-dashed border-white/15">
        <span className="absolute -top-2.5 -left-2.5 size-5 rounded-full bg-[#0e1626]" />
        <span className="absolute -top-2.5 -right-2.5 size-5 rounded-full bg-[#0e1626]" />
      </div>
      <div className="flex items-center gap-3 px-4 py-3">
        <span className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-white px-3 py-2 text-[13px] font-bold text-[#0B1430]">
          <Share2 className="size-4" />
          {x.share}
        </span>
        <span className="text-right text-[11px] leading-tight font-semibold text-muted">
          <span className="block font-display text-base font-extrabold text-white">3</span>
          {x.friends}
        </span>
        <span className="text-right text-[11px] leading-tight font-semibold text-muted">
          <span className="block font-display text-base font-extrabold text-[#F5C451]">3</span>
          {x.months}
        </span>
      </div>
    </div>
  )
}

const venueIcons = [Utensils, Martini, Coffee, Music, Sun]

function VenuesArt() {
  const { t } = useI18n()
  const x = t.extras.venues
  return (
    <div className="mt-6 flex flex-wrap gap-2">
      {x.chips.map((chip, n) => {
        const Icon = venueIcons[n]
        return (
          <span
            key={chip}
            className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[13px] font-bold ${
              n === 0 ? 'bg-brand text-white' : 'border border-white/15 bg-white/[0.04] text-white'
            }`}
          >
            <Icon className="size-3.5" />
            {chip}
          </span>
        )
      })}
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
          <Tile icon={<Users className="size-5" />} title={x.companions.title} body={x.companions.body} className="md:col-span-3" delay={0.04}>
            <CompanionsArt />
          </Tile>
          <Tile icon={<WifiOff className="size-5" />} title={x.offline.title} body={x.offline.body} className="md:col-span-3" delay={0.1}>
            <div className="mt-6 flex items-center gap-2.5 rounded-2xl bg-[#0B1430] px-4 py-3 text-[13px] font-semibold text-white ring-1 ring-white/10">
              <Plane className="size-4 shrink-0" />
              <span className="flex-1">{x.offline.banner}</span>
              <RefreshCw className="size-4 shrink-0 text-muted" />
            </div>
          </Tile>
          <Tile icon={<Share2 className="size-5" />} title={x.share.title} body={x.share.body} className="md:col-span-3" delay={0.04}>
            <ShareArt />
          </Tile>
          <Tile icon={<Layers className="size-5" />} title={x.trips.title} body={x.trips.body} className="md:col-span-3" delay={0.1}>
            <TripsArt />
          </Tile>
          <Tile icon={<WalletCards className="size-5" />} title={x.split.title} body={x.split.body} className="md:col-span-3" delay={0.04}>
            <SplitArt />
          </Tile>
          <Tile icon={<Gift className="size-5" />} title={x.invite.title} body={x.invite.body} className="md:col-span-3" delay={0.1}>
            <InviteArt />
          </Tile>
          <Tile icon={<Utensils className="size-5" />} title={x.venues.title} body={x.venues.body} className="md:col-span-4" delay={0.04}>
            <VenuesArt />
          </Tile>
          <Tile icon={<CloudSun className="size-5" />} title={x.weather.title} body={x.weather.body} className="md:col-span-2" delay={0.08}>
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
          <Tile icon={<Bell className="size-5" />} title={x.reminders.title} body={x.reminders.body} className="md:col-span-3" delay={0.04} />
          <Tile icon={<Award className="size-5" />} title={x.stamps.title} body={x.stamps.body} className="md:col-span-3" delay={0.1} />
        </div>
      </div>
    </section>
  )
}
