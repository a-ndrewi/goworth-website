import { Plus } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { Reveal, SectionHeading } from '../components/ui'
import { useI18n } from '../i18n'

export function Faq() {
  const { t } = useI18n()
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" className="relative py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading eyebrow={t.faq.eyebrow} title={t.faq.title} center={false} />
        </div>
        <Reveal>
          <div className="divide-y divide-white/10 border-y border-white/10">
            {t.faq.items.map((item, n) => {
              const isOpen = open === n
              return (
                <div key={item.q}>
                  <button
                    onClick={() => setOpen(isOpen ? null : n)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left"
                  >
                    <span className="font-display text-lg font-semibold text-white sm:text-xl">{item.q}</span>
                    <span
                      className={`flex size-8 shrink-0 items-center justify-center rounded-full border transition duration-300 ${
                        isOpen ? 'rotate-45 border-brand bg-brand text-white' : 'border-white/15 text-muted'
                      }`}
                    >
                      <Plus className="size-4" />
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-2xl pb-6 leading-relaxed text-muted">{item.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
