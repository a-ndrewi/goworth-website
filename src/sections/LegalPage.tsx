import { ArrowLeft, ExternalLink } from 'lucide-react'
import { motion } from 'motion/react'
import { useI18n } from '../i18n'
import { getLegalDocument, legalHref, legalOrder, type LegalDocumentId } from '../legal'
import { sitePhotoCredits } from '../legal/photos'

const slug = (n: number) => `section-${n + 1}`

export function LegalPage({ id }: { id: LegalDocumentId }) {
  const { t, lang } = useI18n()
  const doc = getLegalDocument(id, lang)
  const isCredits = id === 'credits'
  const contents = [...doc.sections.map((s) => s.title), ...(isCredits ? [t.legal.website, t.legal.photos] : [])]

  return (
    <section className="relative pt-28 pb-24 sm:pt-36">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[30rem] w-[60rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(36,87,230,0.22),transparent)]" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <a href="#top" className="inline-flex items-center gap-2 text-sm font-medium text-muted transition hover:text-white">
          <ArrowLeft className="size-4" />
          {t.legal.back}
        </a>

        {/* Document switcher */}
        <div className="mt-8 -mx-4 overflow-x-auto px-4 [scrollbar-width:none] sm:mx-0 sm:px-0">
          <nav className="flex w-max gap-2 rounded-2xl border border-white/10 bg-white/[0.03] p-1.5" aria-label={t.footer.legal}>
            {legalOrder.map((docId) => (
              <a
                key={docId}
                href={legalHref(docId)}
                aria-current={docId === id ? 'page' : undefined}
                className={`rounded-xl px-4 py-2 text-sm font-semibold whitespace-nowrap transition ${
                  docId === id ? 'bg-white/10 text-white' : 'text-muted hover:text-white'
                }`}
              >
                {getLegalDocument(docId, lang).title}
              </a>
            ))}
          </nav>
        </div>

        <motion.header key={`${id}-${lang}`} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} className="mt-12 max-w-3xl">
          <p className="text-sm font-semibold tracking-[0.16em] text-brand uppercase">{t.legal.eyebrow}</p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">{doc.title}</h1>
          <p className="mt-4 text-sm text-muted">{doc.updated}</p>
        </motion.header>

        <div className="mt-12 grid gap-12 lg:grid-cols-[220px_1fr] lg:gap-16">
          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <p className="text-xs font-semibold tracking-[0.14em] text-muted uppercase">{t.legal.contents}</p>
              <ol className="mt-4 space-y-2.5 border-l border-white/10 text-sm">
                {contents.map((title, n) => (
                  <li key={title}>
                    <a href={`#${slug(n)}`} onClick={(e) => scrollToSection(e, slug(n))} className="-ml-px block border-l border-transparent pl-4 text-muted transition hover:border-brand hover:text-white">
                      {title}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </aside>

          <article className="max-w-3xl">
            {doc.sections.map((s, n) => (
              <section key={s.title} id={slug(n)} className="scroll-mt-28 border-t border-white/10 py-8 first:border-t-0 first:pt-0">
                <h2 className="font-display text-xl font-bold text-white sm:text-2xl">{s.title}</h2>
                <p className="mt-3 leading-relaxed whitespace-pre-line text-ink/80">{s.body}</p>
              </section>
            ))}

            {isCredits && (
              <>
                <section id={slug(doc.sections.length)} className="scroll-mt-28 border-t border-white/10 py-8">
                  <h2 className="font-display text-xl font-bold text-white sm:text-2xl">{t.legal.website}</h2>
                  <p className="mt-3 leading-relaxed text-ink/80">{t.legal.websiteBody}</p>
                </section>
                <section id={slug(doc.sections.length + 1)} className="scroll-mt-28 border-t border-white/10 py-8">
                  <h2 className="font-display text-xl font-bold text-white sm:text-2xl">{t.legal.photos}</h2>
                  <div className="mt-5 overflow-hidden rounded-2xl border border-white/10">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-white/[0.04] text-xs tracking-wider text-muted uppercase">
                        <tr>
                          <th className="px-4 py-3 font-semibold">{t.legal.place}</th>
                          <th className="px-4 py-3 font-semibold">{t.legal.creator}</th>
                          <th className="px-4 py-3 font-semibold">{t.legal.license}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/10">
                        {sitePhotoCredits.map((p) => (
                          <tr key={p.place}>
                            <td className="px-4 py-3 font-medium text-white">{p.place}</td>
                            <td className="px-4 py-3">
                              <a href={p.source} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-ink/80 transition hover:text-brand">
                                {p.creator}
                                <ExternalLink className="size-3.5 shrink-0" />
                              </a>
                            </td>
                            <td className="px-4 py-3 text-muted">CC0</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              </>
            )}
          </article>
        </div>
      </div>
    </section>
  )
}

/** In-page links would replace the `#/legal/...` route, so scroll without touching the hash. */
function scrollToSection(e: React.MouseEvent, id: string) {
  e.preventDefault()
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
