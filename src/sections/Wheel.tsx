import { ArrowRight, Check, Crown, Sparkles } from 'lucide-react'
import { Reveal, SectionHeading } from '../components/ui'
import { useI18n } from '../i18n'
import { legalHref } from '../legal'

/** The app's wheel colours: a night-blue and gold casino look. */
const c = {
  gold: '#F5C451', goldLight: '#FFE7A3', goldDark: '#B07A18', goldInk: '#3A2600',
  night: '#0B1430', navy: '#13224A', royal: '#2F5BEA', royalDeep: '#1A3A9E',
}

type Prize = 'lifetime' | 'month' | 'none'

/** Same slice order as the app; every slice is the same size and only the odds decide a prize. */
const slices: Prize[] = ['lifetime', 'none', 'month', 'none', 'none', 'month', 'none', 'none']

const SIZE = 360
const CENTER = SIZE / 2
const RIM = CENTER - 2
const RADIUS = RIM - SIZE * 0.06
const SPAN = 360 / slices.length
const BULBS = 24
const HUB = RADIUS * 0.2
const FONT = 12
const CROWN = 'M4 8l4 4 4-6 4 6 4-4-1.5 10h-13z'

const onCircle = (radius: number, degrees: number) => {
  const radians = (degrees * Math.PI) / 180
  return { x: CENTER + radius * Math.sin(radians), y: CENTER - radius * Math.cos(radians) }
}

function slicePath(index: number) {
  const a = onCircle(RADIUS, index * SPAN - SPAN / 2)
  const b = onCircle(RADIUS, index * SPAN + SPAN / 2)
  return `M ${CENTER} ${CENTER} L ${a.x} ${a.y} A ${RADIUS} ${RADIUS} 0 0 1 ${b.x} ${b.y} Z`
}

const fill = (prize: Prize, index: number) => (prize === 'lifetime' ? 'url(#w-lifetime)' : prize === 'month' ? 'url(#w-month)' : index % 2 ? 'url(#w-nightA)' : 'url(#w-nightB)')
const ink = (prize: Prize) => (prize === 'lifetime' ? c.goldInk : prize === 'month' ? '#FFFFFF' : 'rgba(255,231,163,0.72)')

function PrizeWheel({ labels }: { labels: Record<Prize, string> }) {
  const f = FONT
  const star = `M ${CENTER} ${CENTER - RADIUS * 0.9} l ${f * 0.28} ${f * 0.62} ${f * 0.62} ${f * 0.28} -${f * 0.62} ${f * 0.28} -${f * 0.28} ${f * 0.62} -${f * 0.28} -${f * 0.62} -${f * 0.62} -${f * 0.28} ${f * 0.62} -${f * 0.28} z`
  return (
    <div className="relative mx-auto w-full max-w-[360px]" role="img" aria-label={`${labels.lifetime} · ${labels.month} · ${labels.none}`}>
      <div className="absolute inset-x-0 top-[17px] aspect-square rounded-full shadow-[0_6px_60px_rgba(245,196,81,0.35)]" />
      <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="relative mt-[17px] w-full animate-wheel">
        <defs>
          <linearGradient id="w-rim" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={c.goldLight} />
            <stop offset="0.45" stopColor={c.gold} />
            <stop offset="1" stopColor={c.goldDark} />
          </linearGradient>
          <linearGradient id="w-lifetime" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={c.goldLight} />
            <stop offset="1" stopColor={c.gold} />
          </linearGradient>
          <linearGradient id="w-month" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={c.royal} />
            <stop offset="1" stopColor={c.royalDeep} />
          </linearGradient>
          <linearGradient id="w-nightA" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={c.navy} />
            <stop offset="1" stopColor={c.night} />
          </linearGradient>
          <linearGradient id="w-nightB" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#1A2C5C" />
            <stop offset="1" stopColor={c.navy} />
          </linearGradient>
          <radialGradient id="w-sheen" cx="50%" cy="50%" r="50%">
            <stop offset="0.55" stopColor="#000000" stopOpacity="0" />
            <stop offset="1" stopColor="#000000" stopOpacity="0.38" />
          </radialGradient>
          <radialGradient id="w-hub" cx="40%" cy="35%" r="70%">
            <stop offset="0" stopColor={c.goldLight} />
            <stop offset="0.6" stopColor={c.gold} />
            <stop offset="1" stopColor={c.goldDark} />
          </radialGradient>
        </defs>

        <circle cx={CENTER} cy={CENTER} r={RIM} fill="url(#w-rim)" />
        <circle cx={CENTER} cy={CENTER} r={RIM - 3} fill={c.night} />
        {Array.from({ length: BULBS }, (_, index) => {
          const { x, y } = onCircle((RIM + RADIUS) / 2 - 0.5, (index * 360) / BULBS + SPAN / 2)
          return (
            <g key={`bulb-${index}`}>
              <circle cx={x} cy={y} r={SIZE * 0.016} fill={c.goldLight} />
              <circle cx={x - SIZE * 0.004} cy={y - SIZE * 0.004} r={SIZE * 0.006} fill="#FFFFFF" opacity={0.9} />
            </g>
          )
        })}
        <circle cx={CENTER} cy={CENTER} r={RADIUS + 1.5} fill="url(#w-rim)" />

        {slices.map((prize, index) => (
          <path key={index} d={slicePath(index)} fill={fill(prize, index)} />
        ))}
        {slices.map((_, index) => {
          const { x, y } = onCircle(RADIUS, index * SPAN - SPAN / 2)
          return <path key={`sep-${index}`} d={`M ${CENTER} ${CENTER} L ${x} ${y}`} stroke={c.gold} strokeWidth={1.4} strokeOpacity={0.85} />
        })}
        <circle cx={CENTER} cy={CENTER} r={RADIUS} fill="url(#w-sheen)" />

        {slices.map((prize, index) => (
          <g key={`label-${index}`} transform={`rotate(${index * SPAN} ${CENTER} ${CENTER})`}>
            {prize === 'lifetime' && (
              <g transform={`translate(${CENTER - f * 0.75} ${CENTER - RADIUS * 0.9}) scale(${f / 16})`}>
                <path d={CROWN} fill={c.goldInk} />
              </g>
            )}
            {prize === 'month' && <path d={star} fill="#FFFFFF" opacity={0.9} />}
            <text
              x={CENTER}
              y={CENTER - RADIUS * 0.66}
              fill={ink(prize)}
              fontSize={prize === 'none' ? f * 0.85 : f}
              fontWeight={800}
              textAnchor="middle"
              letterSpacing={prize === 'none' ? 0.2 : 0.8}
              fontFamily="Inter Variable, Helvetica, Arial, sans-serif"
            >
              {labels[prize].toUpperCase()}
            </text>
          </g>
        ))}

        <circle cx={CENTER} cy={CENTER} r={HUB + 4} fill={c.night} opacity={0.5} />
        <circle cx={CENTER} cy={CENTER} r={HUB} fill="url(#w-hub)" stroke={c.goldLight} strokeWidth={1.5} />
        <circle cx={CENTER} cy={CENTER} r={HUB * 0.72} fill={c.night} />
        <g transform={`translate(${CENTER - HUB * 0.5} ${CENTER - HUB * 0.52}) scale(${HUB / 24})`}>
          <path d={CROWN} fill={c.gold} />
        </g>
      </svg>

      {/* Gold pointer with a gem, fixed above the wheel. */}
      <svg viewBox="0 0 34 38" className="absolute top-0 left-1/2 w-[34px] -translate-x-1/2">
        <defs>
          <linearGradient id="w-pointer" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={c.goldLight} />
            <stop offset="1" stopColor={c.goldDark} />
          </linearGradient>
        </defs>
        <path d="M 4 6 Q 4 2 8 2 L 26 2 Q 30 2 30 6 L 19 34 Q 17 37 15 34 Z" fill="url(#w-pointer)" stroke={c.night} strokeWidth={1.5} strokeLinejoin="round" />
        <circle cx={17} cy={11} r={4.5} fill={c.royal} stroke="#FFFFFF" strokeWidth={1.2} />
        <circle cx={15.6} cy={9.6} r={1.3} fill="#FFFFFF" opacity={0.85} />
      </svg>
    </div>
  )
}

export function Wheel() {
  const { t } = useI18n()
  const w = t.wheel
  return (
    <section id="premium" className="relative py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-1/3 mx-auto h-96 max-w-3xl rounded-full bg-[#F5C451]/[0.07] blur-3xl" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading eyebrow={w.eyebrow} title={w.title} lead={w.lead} />
        <div className="mt-16 grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <PrizeWheel labels={{ lifetime: w.labels.lifetime, month: w.labels.month, none: w.labels.none }} />
          </Reveal>
          <Reveal delay={0.08}>
            <div className="grid gap-4 sm:grid-cols-2">
              {w.prizes.map((prize, n) => (
                <div key={prize.name} className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.015] p-6">
                  <span
                    className={`flex size-10 items-center justify-center rounded-xl ring-1 ${
                      n === 0 ? 'bg-brand-deep/30 text-[#9db9ff] ring-brand/30' : 'bg-[#F5C451]/15 text-[#F5C451] ring-[#F5C451]/30'
                    }`}
                  >
                    {n === 0 ? <Sparkles className="size-5" /> : <Crown className="size-5" />}
                  </span>
                  <h3 className="mt-5 font-display text-lg font-bold text-white">{prize.name}</h3>
                  <p className="mt-2 font-display text-3xl font-bold text-white tabular-nums">{prize.odds}</p>
                  <p className="mt-1 text-sm text-muted">
                    {prize.pct} {w.chance}
                  </p>
                </div>
              ))}
            </div>
            <ul className="mt-8 space-y-3.5">
              {w.points.map((point) => (
                <li key={point} className="flex gap-3 text-[15px] leading-relaxed text-ink">
                  <Check className="mt-1 size-4 shrink-0 text-green" />
                  {point}
                </li>
              ))}
            </ul>
            <a href={legalHref('premium')} className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-brand transition hover:text-white">
              {w.rules}
              <ArrowRight className="size-4" />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
