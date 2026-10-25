import { links } from '../config'
import { Logo } from '../components/ui'
import { useI18n } from '../i18n'
import { getLegalDocument, legalHref, legalOrder } from '../legal'

const year = new Date().getFullYear()

export function Footer() {
  const { t, lang } = useI18n()
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 sm:grid-cols-3 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="sm:col-span-3 md:col-span-1">
          <a href="#top" aria-label="GoWorth home">
            <Logo />
          </a>
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
        <div>
          <p className="text-sm font-semibold text-white">{t.footer.legal}</p>
          <ul className="mt-4 space-y-3 text-sm text-muted">
            {legalOrder.map((id) => (
              <li key={id}>
                <a href={legalHref(id)} className="transition hover:text-white">
                  {getLegalDocument(id, lang).title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-6 text-xs text-muted sm:px-6">
          <p>
            © {year} GoWorth. {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  )
}
