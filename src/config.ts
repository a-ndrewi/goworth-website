/**
 * Store and site links. Replace the App Store URL with the real listing once the app is live
 * (it looks like https://apps.apple.com/app/goworth/id0000000000).
 */
export const links = {
  appStore: 'https://apps.apple.com/app/goworth',
  googlePlay: 'https://play.google.com/store/apps/details?id=com.andrewi.goworth',
  /** Encoded in the "scan to download" QR code. Point it at the deployed site so each phone gets its own store. */
  site: 'https://a-ndrewi.github.io/goworth-website/',
  /** Optional link to the web version of the app. Leave empty to hide the "Open in browser" button. */
  webApp: '',
}

/** Resolves a file in `public/` against the build's base path. */
export const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
