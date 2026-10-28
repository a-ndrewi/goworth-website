import type { Lang } from '../i18n'
import { legalDocuments, type LegalDocumentId } from './legal'
import { legalDocumentsRo } from './legal-ro'

export type { LegalDocumentId }

/** Order of the documents in the footer and on the legal page. */
export const legalOrder: LegalDocumentId[] = ['privacy', 'terms', 'premium', 'credits']

export const isLegalId = (id: string): id is LegalDocumentId => (legalOrder as string[]).includes(id)

export const legalHref = (id: LegalDocumentId) => `#/legal/${id}`

export const getLegalDocument = (id: LegalDocumentId, lang: Lang) => (lang === 'ro' ? legalDocumentsRo : legalDocuments)[id]
