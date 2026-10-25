import { CalendarDays, Heart, Sparkles, Wallet } from 'lucide-react'
import { motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { Phone } from '../components/Phone'
import { StoreButtons } from '../components/StoreButtons'
import { useI18n } from '../i18n'

const heroScreens = ['deck-1.jpg', 'deck-2.jpg', 'deck-3.jpg']
const ease = [0.22, 1, 0.36, 1] as const

function FloatingCard({ children, className, delay }: { children: React.ReactNode; className: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, delay, ease }}
      className={`absolute z-20 ${className}`}
    >
      <div className="animate-float flex items-center gap-2.5 rounded-2xl border border-white/10 bg-[#121c30]/80 px-3 py-2.5 sm:gap-3 sm:px-4 sm:py-3 shadow-2xl shadow-black/50 backdrop-blur-xl" style={{ animationDelay: `${delay}s` }}>
        {children}
      </div>
    </motion.div>
  )
}

export function Hero() {
  const { t } = useI18n()
  const [i, setI] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % heroScreens.length), 3200)
    return () => clearInterval(id)
  }, [])

  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-20 sm:pt-40 lg:pb-28">
      {/* Backdrop */}
      <div className="grid-fade pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[42rem] w-[70rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(36,87,230,0.35),transparent)]" />
      <div className="pointer-events-none absolute top-40 -right-40 h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(closest-side,rgba(45,189,181,0.18),transparent)]" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-16 px-4 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-8">
        <div className="text-center lg:text-left">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }}>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 py-1 pr-3.5 pl-1.5 text-sm text-ink/90 backdrop-blur">
              <span className="flex size-6 items-center justify-center rounded-full bg-gradient-to-br from-brand to-teal">
                <Sparkles className="size-3.5 text-white" />
              </span>
              {t.hero.badge}
            </span>
          </motion.div>

          <h1 className="mt-7 font-display text-[clamp(3.2rem,8vw,6.2rem)] leading-[0.95] font-extrabold tracking-[-0.035em] text-white">
            {[t.hero.title1, t.hero.title2, t.hero.title3].map((word, n) => (
              <motion.span
                key={word}
                className={`block ${n === 2 ? 'text-gradient pb-2' : ''}`}
                initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.8, delay: 0.1 + n * 0.12, ease }}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <motion.p
            className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-pretty text-muted sm:text-xl lg:mx-0"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease }}
          >
            {t.hero.lead}
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.62, ease }}>
            <StoreButtons showWeb className="mt-9 justify-center lg:justify-start" />
          </motion.div>

          <motion.dl
            className="mx-auto mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-white/10 pt-8 lg:mx-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {t.hero.stats.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-display text-3xl font-bold text-white sm:text-4xl">{s.value}</dd>
                <dd className="mt-1 text-xs leading-snug text-muted sm:text-sm">{s.label}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* Device composition */}
        <div className="relative mx-auto h-[540px] w-full max-w-[520px] sm:h-[640px]">
          <motion.div
            className="absolute top-16 left-0 w-[44%] sm:left-2"
            initial={{ opacity: 0, x: 40, rotate: 0 }}
            animate={{ opacity: 0.85, x: 0, rotate: -9 }}
            transition={{ duration: 1, delay: 0.45, ease }}
          >
            <Phone screen="map-globe.jpg" alt="GoWorth world map" priority />
          </motion.div>
          <motion.div
            className="absolute top-16 right-0 w-[44%] sm:right-2"
            initial={{ opacity: 0, x: -40, rotate: 0 }}
            animate={{ opacity: 0.85, x: 0, rotate: 9 }}
            transition={{ duration: 1, delay: 0.55, ease }}
          >
            <Phone screen="itinerary-1.jpg" alt="GoWorth itinerary" priority />
          </motion.div>
          <motion.div
            className="absolute top-0 left-1/2 z-10 w-[52%] -translate-x-1/2"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease }}
          >
            <div className="absolute -inset-10 -z-10 rounded-full bg-brand/30 blur-3xl" />
            <Phone screen={heroScreens[i]} alt="GoWorth discovery deck" animate />
          </motion.div>

          <FloatingCard className="top-[46%] left-0 sm:-left-8" delay={1.1}>
            <span className="flex size-9 items-center justify-center rounded-xl bg-pink/15">
              <Heart className="size-4.5 fill-pink text-pink" />
            </span>
            <span className="text-xs font-semibold text-white sm:text-sm">{t.hero.toastSaved}</span>
          </FloatingCard>
          <FloatingCard className="top-[12%] right-0 sm:-right-6" delay={1.3}>
            <span className="flex size-9 items-center justify-center rounded-xl bg-green/15">
              <Wallet className="size-4.5 text-green" />
            </span>
            <span className="leading-tight">
              <span className="block font-display text-lg font-bold text-white">€332.86</span>
              <span className="text-xs text-muted">{t.hero.toastBudget}</span>
            </span>
          </FloatingCard>
          <FloatingCard className="right-0 bottom-[12%] sm:-right-2" delay={1.5}>
            <span className="flex size-9 items-center justify-center rounded-xl bg-brand/15">
              <CalendarDays className="size-4.5 text-brand" />
            </span>
            <span className="text-xs font-semibold text-white sm:text-sm">{t.hero.toastRoute}</span>
          </FloatingCard>
        </div>
      </div>
    </section>
  )
}
