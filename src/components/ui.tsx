import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import { asset } from '../config'

export function Logo({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <img src={asset('brand/app-icon.png')} alt="" width={36} height={36} className="size-9 rounded-[10px] shadow-lg shadow-brand/20 ring-1 ring-white/10" />
      <span className="font-display text-xl font-bold tracking-tight text-white">GoWorth</span>
    </span>
  )
}

/** Fades and lifts its children in the first time they scroll into view. */
export function Reveal({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-brand/25 bg-brand/10 px-3.5 py-1 text-xs font-semibold tracking-[0.14em] text-brand uppercase">
      {children}
    </span>
  )
}

export function SectionHeading({ eyebrow, title, lead, center = true }: { eyebrow: string; title: string; lead?: string; center?: boolean }) {
  return (
    <Reveal className={center ? 'mx-auto max-w-3xl text-center' : 'max-w-2xl'}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="mt-5 font-display text-4xl font-bold tracking-tight text-balance text-white sm:text-5xl">{title}</h2>
      {lead && <p className="mt-5 text-lg leading-relaxed text-pretty text-muted">{lead}</p>}
    </Reveal>
  )
}
