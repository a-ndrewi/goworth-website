import { Menu, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { Logo } from '../components/ui'
import { useI18n, type Lang } from '../i18n'

function LangSwitch() {
  const { lang, setLang } = useI18n()
  return (
    <div className="flex rounded-full border border-white/10 bg-white/5 p-0.5 text-xs font-semibold" role="group" aria-label="Language">
      {(['en', 'ro'] as Lang[]).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={`rounded-full px-2.5 py-1 uppercase transition ${lang === l ? 'bg-white text-night' : 'text-muted hover:text-white'}`}
        >
          {l}
        </button>
      ))}
    </div>
  )
}

export function Navbar() {
  const { t } = useI18n()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const items = [
    { href: '#features', label: t.nav.features },
    { href: '#how', label: t.nav.how },
    { href: '#watch', label: t.nav.watch },
    { href: '#premium', label: t.nav.premium },
    { href: '#faq', label: t.nav.faq },
  ]

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-3 sm:px-6">
      <nav
        className={`mx-auto flex h-14 max-w-6xl items-center justify-between rounded-2xl px-3 pl-4 transition-all duration-300 ${
          scrolled || open ? 'border border-white/10 bg-night/75 shadow-2xl shadow-black/40 backdrop-blur-xl' : 'border border-transparent'
        }`}
      >
        <a href="#top" aria-label="GoWorth home">
          <Logo />
        </a>
        <div className="hidden items-center gap-1 md:flex">
          {items.map((i) => (
            <a key={i.href} href={i.href} className="rounded-full px-3.5 py-2 text-sm font-medium text-muted transition hover:bg-white/5 hover:text-white">
              {i.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <LangSwitch />
          <a
            href="#download"
            className="hidden rounded-xl bg-brand px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-brand/30 transition hover:bg-[#6d94f7] sm:inline-block"
          >
            {t.nav.download}
          </a>
          <button className="rounded-lg p-2 text-white md:hidden" onClick={() => setOpen((o) => !o)} aria-label="Menu" aria-expanded={open}>
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="mx-auto mt-2 max-w-6xl rounded-2xl border border-white/10 bg-night/95 p-2 backdrop-blur-xl md:hidden"
          >
            {[...items, { href: '#download', label: t.nav.download }].map((i) => (
              <a key={i.href} href={i.href} onClick={() => setOpen(false)} className="block rounded-xl px-4 py-3 font-medium text-ink hover:bg-white/5">
                {i.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
