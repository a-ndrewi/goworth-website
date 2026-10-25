import { Baby, Calendar, Heart, Minus, Plus, User, Users } from 'lucide-react'
import { Reveal, SectionHeading } from '../components/ui'
import { useI18n } from '../i18n'

function Card({ n, title, body, children, delay }: { n: number; title: string; body: string; children: React.ReactNode; delay: number }) {
  return (
    <Reveal delay={delay} className="h-full">
      <div className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.015] p-7 transition duration-500 hover:border-brand/40">
        <div className="pointer-events-none absolute -top-24 -right-24 size-48 rounded-full bg-brand/0 blur-3xl transition duration-700 group-hover:bg-brand/25" />
        <span className="flex size-10 items-center justify-center rounded-full bg-brand font-display text-lg font-bold text-white shadow-lg shadow-brand/40">{n}</span>
        <h3 className="mt-6 font-display text-2xl font-bold text-white">{title}</h3>
        <p className="mt-2 leading-relaxed text-muted">{body}</p>
        <div className="mt-8 flex-1 rounded-2xl border border-white/10 bg-surface/80 p-4">{children}</div>
      </div>
    </Reveal>
  )
}

export function Steps() {
  const { t } = useI18n()
  const [s1, s2, s3] = t.steps.items
  const cities = [
    ['Paris', 3],
    ['Lyon', 2],
    ['Marseille', 2],
  ] as const
  const styleIcons = [User, Heart, Users, Baby]

  return (
    <section id="how" className="relative py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading eyebrow={t.steps.eyebrow} title={t.steps.title} />
        <div className="mt-16 grid gap-5 md:grid-cols-3">
          <Card n={1} title={s1.title} body={s1.body} delay={0}>
            <ol className="space-y-3">
              {cities.map(([city, days], n) => (
                <li key={city} className="flex items-center justify-between gap-3">
                  <span className="flex items-center gap-2.5">
                    <span className={`flex size-6 items-center justify-center rounded-full text-xs font-bold ${n === 0 ? 'bg-brand text-white' : 'border border-brand text-brand'}`}>{n + 1}</span>
                    <span className="font-semibold text-white">🇫🇷 {city}</span>
                  </span>
                  <span className="flex items-center gap-2 rounded-lg bg-raised px-2 py-1 text-sm font-semibold text-white">
                    <Minus className="size-3.5 text-brand" />
                    {days} {t.steps.days}
                    <Plus className="size-3.5 text-brand" />
                  </span>
                </li>
              ))}
            </ol>
          </Card>
          <Card n={2} title={s2.title} body={s2.body} delay={0.1}>
            <div className="grid grid-cols-2 gap-2">
              {[
                [t.steps.depart, 'Dec 6'],
                [t.steps.ret, 'Dec 12'],
              ].map(([label, date]) => (
                <div key={label} className="rounded-xl bg-raised p-3">
                  <p className="text-[10px] font-semibold tracking-wider text-muted uppercase">{label}</p>
                  <p className="mt-1 flex items-center gap-1.5 font-semibold text-white">
                    <Calendar className="size-3.5 text-brand" />
                    {date}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-3 grid grid-cols-7 gap-1 text-center text-xs">
              {Array.from({ length: 14 }, (_, n) => {
                const day = n + 1
                const inRange = day >= 6 && day <= 12
                return (
                  <span
                    key={n}
                    className={`rounded-md py-1.5 font-semibold ${
                      day === 6 || day === 12 ? 'bg-brand text-white' : inRange ? 'bg-brand/20 text-white' : 'text-muted'
                    }`}
                  >
                    {day}
                  </span>
                )
              })}
            </div>
          </Card>
          <Card n={3} title={s3.title} body={s3.body} delay={0.2}>
            <div className="grid grid-cols-4 gap-1.5">
              {t.steps.styles.map((s, n) => {
                const Icon = styleIcons[n]
                return (
                  <span
                    key={s}
                    className={`flex flex-col items-center gap-1 rounded-xl py-2.5 text-[11px] font-semibold ${n === 0 ? 'bg-brand text-white' : 'bg-raised text-muted'}`}
                  >
                    <Icon className="size-4" />
                    {s}
                  </span>
                )
              })}
            </div>
            <div className="mt-3 flex items-center justify-between rounded-xl bg-raised p-3">
              <span>
                <span className="block font-semibold text-white">€2,500</span>
                <span className="text-xs text-muted">{t.steps.perPerson}</span>
              </span>
              <span className="h-1.5 w-24 overflow-hidden rounded-full bg-white/10">
                <span className="block h-full w-3/5 rounded-full bg-gradient-to-r from-brand to-teal" />
              </span>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
