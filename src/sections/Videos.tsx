import { Pause, Play, Volume2, VolumeX } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { asset } from '../config'
import { Reveal, SectionHeading } from '../components/ui'
import { useI18n } from '../i18n'

function VideoCard({ src, poster, label, hasAudio, className = '' }: { src: string; poster: string; label: string; hasAudio?: boolean; className?: string }) {
  const { t } = useI18n()
  const ref = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(true)
  const userPaused = useRef(false)

  // Autoplay muted while on screen, unless the visitor paused it.
  useEffect(() => {
    const video = ref.current
    if (!video) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !userPaused.current) video.play().catch(() => {})
        else if (!entry.isIntersecting) video.pause()
      },
      { threshold: 0.4 },
    )
    io.observe(video)
    return () => io.disconnect()
  }, [])

  const toggle = () => {
    const video = ref.current
    if (!video) return
    if (video.paused) {
      userPaused.current = false
      video.play().catch(() => {})
    } else {
      userPaused.current = true
      video.pause()
    }
  }

  return (
    <div className={`group relative overflow-hidden rounded-[2rem] bg-surface shadow-2xl shadow-black/60 ring-1 ring-white/10 ${className}`}>
      <video
        ref={ref}
        src={asset(src)}
        poster={asset(poster)}
        muted={muted}
        loop
        playsInline
        preload="metadata"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onClick={toggle}
        className="aspect-[9/16] w-full cursor-pointer object-cover"
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/50 to-transparent" />
      <span className="absolute top-4 left-4 rounded-full bg-black/40 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md">{label}</span>
      <div className="absolute right-4 bottom-4 flex gap-2">
        {hasAudio && (
          <button
            onClick={() => setMuted((m) => !m)}
            aria-label={muted ? t.watch.unmute : t.watch.mute}
            className="flex size-11 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur-md transition hover:bg-black/65"
          >
            {muted ? <VolumeX className="size-5" /> : <Volume2 className="size-5" />}
          </button>
        )}
        <button
          onClick={toggle}
          aria-label={playing ? t.watch.pause : t.watch.play}
          className="flex size-11 items-center justify-center rounded-full bg-white text-night shadow-lg transition hover:scale-105"
        >
          {playing ? <Pause className="size-5 fill-current" /> : <Play className="ml-0.5 size-5 fill-current" />}
        </button>
      </div>
    </div>
  )
}

export function Videos() {
  const { t } = useI18n()
  return (
    <section id="watch" className="relative overflow-hidden py-24 sm:py-32">
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-[50rem] w-[50rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(36,87,230,0.22),transparent)]" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading eyebrow={t.watch.eyebrow} title={t.watch.title} lead={t.watch.lead} />
        <div className="mt-16 flex flex-col items-center justify-center gap-6 sm:flex-row sm:items-end">
          <Reveal className="w-full max-w-[340px]">
            <VideoCard src="video/goworth-tour.mp4" poster="video/goworth-tour.jpg" label={t.watch.tour} />
          </Reveal>
          <Reveal delay={0.12} className="w-full max-w-[280px] sm:mb-10">
            <VideoCard src="video/goworth-teaser.mp4" poster="video/goworth-teaser.jpg" label={t.watch.teaser} hasAudio />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
