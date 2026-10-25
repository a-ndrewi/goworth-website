import { AnimatePresence, motion } from 'motion/react'
import type { ReactNode } from 'react'
import { asset } from '../config'

/** Status bar drawn above the app captures, which were taken without one. */
function StatusBar() {
  return (
    <div className="relative flex h-[7.5%] shrink-0 items-center justify-between bg-surface px-[9%] pt-[2%] text-[clamp(8px,1.1cqw+6px,13px)] font-semibold text-white">
      <span>9:41</span>
      <span className="absolute top-[22%] left-1/2 h-[46%] w-[31%] -translate-x-1/2 rounded-full bg-black" />
      <span className="flex items-center gap-[0.35em]">
        <svg viewBox="0 0 18 12" className="h-[0.8em] fill-current" aria-hidden>
          <rect x="0" y="8" width="3" height="4" rx="1" />
          <rect x="5" y="5.5" width="3" height="6.5" rx="1" />
          <rect x="10" y="3" width="3" height="9" rx="1" />
          <rect x="15" y="0" width="3" height="12" rx="1" />
        </svg>
        <svg viewBox="0 0 26 12" className="h-[0.85em]" aria-hidden>
          <rect x="0.5" y="0.5" width="22" height="11" rx="3" fill="none" stroke="currentColor" opacity="0.5" />
          <rect x="2" y="2" width="16" height="8" rx="1.8" fill="currentColor" />
          <rect x="24" y="4" width="1.6" height="4" rx="0.8" fill="currentColor" opacity="0.5" />
        </svg>
      </span>
    </div>
  )
}

type PhoneProps = {
  /** Path of a capture in `public/screens`, or custom content. */
  screen?: string
  alt?: string
  children?: ReactNode
  className?: string
  /** Animate a crossfade when `screen` changes. */
  animate?: boolean
  priority?: boolean
}

export function Phone({ screen, alt = '', children, className = '', animate = false, priority = false }: PhoneProps) {
  return (
    <div
      className={`@container relative aspect-[390/900] rounded-[14%/6.4%] bg-gradient-to-b from-[#3a4766] via-[#1b2438] to-[#2c3854] p-[2.6%] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.7),0_0_0_1px_rgba(255,255,255,0.08)_inset] ${className}`}
    >
      <div className="relative flex h-full flex-col overflow-hidden rounded-[11.5%/5.2%] bg-surface ring-1 ring-black">
        <StatusBar />
        <div className="relative min-h-0 flex-1">
          {children ??
            (animate ? (
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.img
                  key={screen}
                  src={asset(`screens/${screen}`)}
                  alt={alt}
                  className="absolute inset-0 size-full object-cover object-top"
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                />
              </AnimatePresence>
            ) : (
              <img
                src={asset(`screens/${screen}`)}
                alt={alt}
                loading={priority ? 'eager' : 'lazy'}
                decoding="async"
                className="absolute inset-0 size-full object-cover object-top"
              />
            ))}
        </div>
        {/* Glass glare */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.07] via-transparent to-transparent" />
      </div>
      {/* Side buttons */}
      <span className="absolute top-[18%] -left-[1.2%] h-[5%] w-[1.4%] rounded-l bg-[#2c3854]" />
      <span className="absolute top-[26%] -left-[1.2%] h-[8%] w-[1.4%] rounded-l bg-[#2c3854]" />
      <span className="absolute top-[24%] -right-[1.2%] h-[11%] w-[1.4%] rounded-r bg-[#2c3854]" />
    </div>
  )
}
