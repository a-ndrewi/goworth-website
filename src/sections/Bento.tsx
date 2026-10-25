import { Image as ImageIcon, Languages, Lock, Route, Wallet } from 'lucide-react'
import type { ReactNode } from 'react'
import { asset } from '../config'
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

const categories = [
  { pct: 60, color: 'bg-purple' },
  { pct: 30, color: 'bg-brand' },
  { pct: 9, color: 'bg-orange' },
  { pct: 1, color: 'bg-teal' },
]

export function Bento() {
  const { t } = useI18n()
  const b = t.bento
  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading eyebrow={b.eyebrow} title={b.title} />
        <div className="mt-16 grid auto-rows-auto gap-5 md:grid-cols-6">
          <Tile icon={<Route className="size-5" />} title={b.routes.title} body={b.routes.body} className="md:col-span-4 md:row-span-2">
            <div className="relative mt-8 -mb-7 flex-1 overflow-hidden">
              <div className="mx-auto h-[300px] w-full max-w-md overflow-hidden rounded-t-2xl border border-b-0 border-white/10 sm:h-[360px]">
                <img src={asset('screens/trip-bars.jpg')} alt="" loading="lazy" className="w-full object-cover object-top" />
              </div>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#0c1322] to-transparent" />
            </div>
          </Tile>
          <Tile icon={<Wallet className="size-5" />} title={b.budget.title} body={b.budget.body} className="md:col-span-2 md:row-span-2" delay={0.08}>
            <div className="mt-8 space-y-4">
              <div className="flex h-2.5 overflow-hidden rounded-full bg-white/10">
                {categories.map((c) => (
                  <span key={c.color} className={c.color} style={{ width: `${c.pct}%` }} />
                ))}
              </div>
              {categories.map((c, n) => (
                <div key={c.color} className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-ink">
                    <span className={`size-2.5 rounded-full ${c.color}`} />
                    {b.budget.categories[n]}
                  </span>
                  <span className="font-semibold text-muted tabular-nums">{c.pct}%</span>
                </div>
              ))}
              <div className="mt-2 grid grid-cols-2 gap-2 pt-2">
                <div className="rounded-xl bg-white/[0.05] p-3">
                  <p className="text-[10px] font-semibold tracking-wider text-muted uppercase">{b.budget.remaining}</p>
                  <p className="mt-1 font-display text-lg font-bold text-green">€2,330</p>
                </div>
                <div className="rounded-xl bg-white/[0.05] p-3">
                  <p className="text-[10px] font-semibold tracking-wider text-muted uppercase">{b.budget.perDay}</p>
                  <p className="mt-1 font-display text-lg font-bold text-white">€332.86</p>
                </div>
              </div>
            </div>
          </Tile>
          <Tile icon={<Lock className="size-5" />} title={b.privacy.title} body={b.privacy.body} className="md:col-span-2" delay={0.04} />
          <Tile icon={<Languages className="size-5" />} title={b.language.title} body={b.language.body} className="md:col-span-2" delay={0.1}>
            <div className="mt-5 flex flex-wrap gap-2">
              {['English', 'Română', '€ EUR', 'lei RON', '$ USD'].map((x) => (
                <span key={x} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-semibold text-ink">
                  {x}
                </span>
              ))}
            </div>
          </Tile>
          <Tile icon={<ImageIcon className="size-5" />} title={b.offline.title} body={b.offline.body} className="md:col-span-2" delay={0.16} />
        </div>
      </div>
    </section>
  )
}
