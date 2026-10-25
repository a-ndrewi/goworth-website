import { Globe } from 'lucide-react'
import { links } from '../config'
import { useI18n } from '../i18n'

function AppleLogo() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="size-6 fill-current sm:size-7">
      <path d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.57-.12 0-.23-.02-.3-.03-.01-.06-.04-.22-.04-.39 0-1.15.572-2.27 1.206-2.98.804-.94 2.142-1.64 3.248-1.68.03.13.05.28.05.43zm4.565 15.71c-.03.07-.463 1.58-1.518 3.12-.945 1.34-1.94 2.71-3.43 2.71-1.517 0-1.9-.88-3.63-.88-1.698 0-2.302.91-3.67.91-1.377 0-2.332-1.26-3.428-2.8-1.287-1.82-2.323-4.63-2.323-7.28 0-4.28 2.797-6.55 5.552-6.55 1.448 0 2.675.95 3.6.95.865 0 2.222-1.01 3.902-1.01.613 0 2.886.06 4.374 2.19-.13.09-2.383 1.37-2.383 4.19 0 3.26 2.854 4.42 2.955 4.45z" />
    </svg>
  )
}

function PlayLogo() {
  return (
    <svg viewBox="0 0 512 512" aria-hidden className="size-5 sm:size-6">
      <path fill="#00D2FF" d="M48 59.49v393a4.33 4.33 0 0 0 7.37 3.07L260 256 55.37 56.42A4.33 4.33 0 0 0 48 59.49z" />
      <path fill="#00E676" d="M345.8 174 89.22 32.64l-.16-.09c-4.42-2.4-8.62 3.58-5 7.06l201.13 192.32z" />
      <path fill="#FF3D57" d="M84.08 472.39c-3.64 3.48.56 9.46 5 7.06l.16-.09L345.8 338l-60.61-57.95z" />
      <path fill="#FFC400" d="M449.38 231l-71.65-39.46L310.36 256l67.37 64.43L449.38 281c19.49-10.77 19.49-39.23 0-50z" />
    </svg>
  )
}

const badge =
  'group inline-flex h-[52px] items-center gap-2.5 rounded-2xl bg-white px-3.5 sm:h-14 sm:gap-3 sm:px-5 text-night shadow-lg shadow-black/30 ring-1 ring-white/20 transition duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-brand/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand'

export function StoreButtons({ className = '', showWeb = false }: { className?: string; showWeb?: boolean }) {
  const { t } = useI18n()
  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      <a href={links.appStore} target="_blank" rel="noopener noreferrer" className={badge} aria-label={`${t.store.appleTop} ${t.store.appleName}`}>
        <AppleLogo />
        <span className="flex flex-col text-left leading-none">
          <span className="text-[10px] font-medium sm:text-[11px]">{t.store.appleTop}</span>
          <span className="mt-0.5 text-[17px] font-semibold sm:text-[19px] tracking-tight">{t.store.appleName}</span>
        </span>
      </a>
      <a href={links.googlePlay} target="_blank" rel="noopener noreferrer" className={badge} aria-label={`${t.store.googleTop} ${t.store.googleName}`}>
        <PlayLogo />
        <span className="flex flex-col text-left leading-none">
          <span className="text-[10px] font-medium uppercase sm:text-[11px] tracking-wide">{t.store.googleTop}</span>
          <span className="mt-0.5 text-[17px] font-semibold sm:text-[19px] tracking-tight">{t.store.googleName}</span>
        </span>
      </a>
      {showWeb && links.webApp && (
        <a
          href={links.webApp}
          className="inline-flex h-14 items-center gap-2 rounded-2xl border border-white/15 px-5 font-semibold text-white transition hover:border-white/30 hover:bg-white/5"
        >
          <Globe className="size-5" />
          {t.hero.web}
        </a>
      )}
    </div>
  )
}
