import { CalendarRange, Check, Compass, Heart, Map, Route, Wallet } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { Phone } from '../components/Phone'
import { SectionHeading } from '../components/ui'
import { useI18n } from '../i18n'

const DURATION = 6500
const meta = [
  { screen: 'deck-1.jpg', icon: Compass, color: 'text-brand', glow: 'rgba(91,134,245,0.35)' },
  { screen: 'map-globe.jpg', icon: Map, color: 'text-teal', glow: 'rgba(45,189,181,0.3)' },
  { screen: 'planner.jpg', icon: CalendarRange, color: 'text-purple', glow: 'rgba(143,130,230,0.32)' },
  { screen: 'itinerary-1.jpg', icon: Route, color: 'text-brand', glow: 'rgba(91,134,245,0.35)' },
  { screen: 'budget.jpg', icon: Wallet, color: 'text-green', glow: 'rgba(34,185,138,0.28)' },
  { screen: 'saved.jpg', icon: Heart, color: 'text-pink', glow: 'rgba(240,112,136,0.28)' },
]

export function FeatureTour() {
  const { t } = useI18n()
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const item = t.tour.items[active]

  useEffect(() => {
    if (paused) return
    const id = setTimeout(() => setActive((a) => (a + 1) % meta.length), DURATION)
    return () => clearTimeout(id)
  }, [active, paused])

  return (
    <section id="features" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading eyebrow={t.tour.eyebrow} title={t.tour.title} lead={t.tour.lead} />

        {/* Tabs */}
        <div className="mt-14 -mx-4 overflow-x-auto px-4 [scrollbar-width:none] sm:mx-0 sm:px-0">
          <div role="tablist" className="mx-auto flex w-max gap-2 rounded-2xl border border-white/10 bg-white/[0.03] p-1.5">
            {t.tour.items.map((it, n) => {
              const Icon = meta[n].icon
              const on = n === active
              return (
                <button
                  key={it.tab}
                  role="tab"
                  aria-selected={on}
                  onClick={() => setActive(n)}
                  className={`relative flex items-center gap-2 overflow-hidden rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                    on ? 'bg-white/10 text-white' : 'text-muted hover:text-white'
                  }`}
                >
                  <Icon className={`size-4 ${on ? meta[n].color : ''}`} />
                  {it.tab}
                  {on && (
                    <motion.span
                      key={`${active}-${paused}`}
                      className="absolute bottom-0 left-0 h-0.5 bg-brand"
                      initial={{ width: paused ? '100%' : '0%' }}
                      animate={{ width: '100%' }}
                      transition={{ duration: paused ? 0 : DURATION / 1000, ease: 'linear' }}
                    />
                  )}
                </button>
              )
            })}
          </div>
        </div>

        <div
          className="mt-14 grid items-center gap-12 lg:grid-cols-2 lg:gap-20"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="relative order-2 mx-auto w-full max-w-[300px] lg:order-1 lg:max-w-[330px]">
            <motion.div
              className="absolute -inset-16 -z-10 rounded-full blur-3xl"
              animate={{ background: `radial-gradient(closest-side, ${meta[active].glow}, transparent)` }}
              transition={{ duration: 0.8 }}
            />
            <Phone screen={meta[active].screen} alt={item.title} animate />
          </div>

          <div className="order-1 min-h-[320px] lg:order-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className={`font-display text-sm font-semibold tracking-[0.16em] uppercase ${meta[active].color}`}>
                  0{active + 1} · {item.tab}
                </p>
                <h3 className="mt-4 font-display text-3xl font-bold tracking-tight text-balance text-white sm:text-4xl">{item.title}</h3>
                <p className="mt-5 text-lg leading-relaxed text-muted">{item.body}</p>
                <ul className="mt-8 space-y-3.5">
                  {item.points.map((p) => (
                    <li key={p} className="flex items-start gap-3 text-ink">
                      <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-brand/15">
                        <Check className="size-3.5 text-brand" strokeWidth={3} />
                      </span>
                      {p}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
