import { ArrowRight, Check, Crown, Infinity as InfinityIcon, Repeat, Sparkles } from 'lucide-react'
import { Reveal, SectionHeading } from '../components/ui'
import { useI18n } from '../i18n'
import { legalHref } from '../legal'

const icons = { monthly: Repeat, yearly: Sparkles, lifetime: InfinityIcon }

/**
 * The app's three Premium plans, with yearly in the middle as the main offer, as on the paywall.
 * No prices here: the app shows the store's price in the local currency.
 */
export function Plans() {
  const { t } = useI18n()
  const p = t.plans
  return (
    <section id="premium" className="relative pt-24 sm:pt-32">
      <div className="pointer-events-none absolute inset-x-0 top-1/4 mx-auto h-96 max-w-3xl rounded-full bg-[#F5C451]/[0.07] blur-3xl" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading eyebrow={p.eyebrow} title={p.title} lead={p.lead} />

        <Reveal className="mx-auto mt-10 max-w-3xl">
          <ul className="grid gap-3 sm:grid-cols-2">
            {p.perks.map((perk) => (
              <li key={perk} className="flex items-center gap-3 text-[15px] font-medium text-ink">
                <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[#F5C451] text-[#3A2600]">
                  <Check className="size-3" strokeWidth={3} />
                </span>
                {perk}
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="mt-12 grid items-end gap-5 md:grid-cols-3">
          {p.items.map((plan, n) => {
            const yearly = plan.id === 'yearly'
            const Icon = icons[plan.id as keyof typeof icons]
            return (
              <Reveal key={plan.id} delay={n * 0.06}>
                <div
                  className={`relative flex flex-col rounded-3xl border p-7 ${
                    yearly
                      ? 'border-[#F5C451]/60 bg-gradient-to-b from-[#F5C451]/[0.14] to-[#F5C451]/[0.03] pt-10 shadow-[0_10px_60px_rgba(245,196,81,0.18)] md:pb-10'
                      : 'border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.015]'
                  }`}
                >
                  {yearly && (
                    <span className="absolute -top-3.5 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-gradient-to-r from-[#FFE7A3] to-[#F5C451] px-3.5 py-1 text-[11px] font-extrabold tracking-[0.12em] whitespace-nowrap text-[#3A2600] uppercase">
                      <Crown className="size-3" />
                      {p.bestValue}
                    </span>
                  )}
                  <span
                    className={`flex size-10 items-center justify-center rounded-xl ring-1 ${
                      yearly ? 'bg-[#F5C451]/15 text-[#F5C451] ring-[#F5C451]/30' : 'bg-white/[0.07] text-white ring-white/10'
                    }`}
                  >
                    <Icon className="size-5" />
                  </span>
                  <h3 className="mt-5 font-display text-2xl font-bold text-white">{plan.name}</h3>
                  <p className={`mt-2 text-[15px] leading-relaxed ${yearly ? 'text-[#FFE7A3]' : 'text-muted'}`}>{plan.note}</p>
                  <p className="mt-6 text-xs font-semibold tracking-wider text-muted uppercase">{plan.unit}</p>
                </div>
              </Reveal>
            )
          })}
        </div>

        <Reveal className="mx-auto mt-10 max-w-3xl text-center">
          <p className="text-[15px] font-semibold text-ink">{p.priceNote}</p>
          <p className="mt-3 text-sm leading-relaxed text-muted">{p.fine}</p>
          <a href={legalHref('premium')} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand transition hover:text-white">
            {p.rules}
            <ArrowRight className="size-4" />
          </a>
        </Reveal>
      </div>
    </section>
  )
}
