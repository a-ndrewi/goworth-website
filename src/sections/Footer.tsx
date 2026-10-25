import { links } from '../config'
import { Logo } from '../components/ui'
import { useI18n } from '../i18n'

const year = new Date().getFullYear()

export function Footer() {
  const { t } = useI18n()
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-4 font-display text-lg text-ink">{t.footer.tagline}</p>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted">{t.footer.credits}</p>
        </div>
        <div>
          <p className="text-sm font-semibold text-white">{t.footer.product}</p>
          <ul className="mt-4 space-y-3 text-sm text-muted">
            {[
              ['#features', t.nav.features],
              ['#how', t.nav.how],
              ['#watch', t.nav.watch],
              ['#faq', t.nav.faq],
            ].map(([href, label]) => (
              <li key={href}>
                <a href={href} className="transition hover:text-white">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold text-white">{t.footer.get}</p>
          <ul className="mt-4 space-y-3 text-sm text-muted">
            <li>
              <a href={links.appStore} target="_blank" rel="noopener noreferrer" className="transition hover:text-white">
                App Store
              </a>
            </li>
            <li>
              <a href={links.googlePlay} target="_blank" rel="noopener noreferrer" className="transition hover:text-white">
                Google Play
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-xs text-muted sm:flex-row sm:justify-between sm:px-6">
          <p>
            © {year} GoWorth. {t.footer.rights}
          </p>
          <p>{t.footer.madeIn}</p>
        </div>
      </div>
    </footer>
  )
}
