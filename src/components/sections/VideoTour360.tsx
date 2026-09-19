'use client'

import { useRef, useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'

export default function VideoTour360() {
  const t = useTranslations('video360')
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const onTimeUpdate = () => {
      if (video.duration) {
        setProgress((video.currentTime / video.duration) * 100)
      }
    }
    const onLoadedMetadata = () => setDuration(video.duration)
    const onEnded = () => { setIsPlaying(false); setProgress(0) }
    const onFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    video.addEventListener('timeupdate', onTimeUpdate)
    video.addEventListener('loadedmetadata', onLoadedMetadata)
    video.addEventListener('ended', onEnded)
    document.addEventListener('fullscreenchange', onFullscreenChange)

    return () => {
      video.removeEventListener('timeupdate', onTimeUpdate)
      video.removeEventListener('loadedmetadata', onLoadedMetadata)
      video.removeEventListener('ended', onEnded)
      document.removeEventListener('fullscreenchange', onFullscreenChange)
    }
  }, [])

  function togglePlay() {
    const video = videoRef.current
    if (!video) return
    if (video.paused) {
      video.play()
      setIsPlaying(true)
      setHasStarted(true)
    } else {
      video.pause()
      setIsPlaying(false)
    }
  }

  function toggleMute() {
    const video = videoRef.current
    if (!video) return
    video.muted = !video.muted
    setIsMuted(video.muted)
  }

  function handleProgressClick(e: React.MouseEvent<HTMLDivElement>) {
    const video = videoRef.current
    if (!video || !video.duration) return
    const rect = e.currentTarget.getBoundingClientRect()
    const ratio = (e.clientX - rect.left) / rect.width
    video.currentTime = ratio * video.duration
  }

  function toggleFullscreen() {
    const container = containerRef.current
    if (!container) return
    if (!document.fullscreenElement) {
      container.requestFullscreen()
    } else {
      document.exitFullscreen()
    }
  }

  function formatTime(seconds: number) {
    const m = Math.floor(seconds / 60)
    const s = Math.floor(seconds % 60)
    return `${m}:${s.toString().padStart(2, '0')}`
  }

  return (
    <section
      id="video-tour"
      aria-labelledby="video-tour-heading"
      className="bg-[var(--color-basalt)] border-b border-white/10 py-[var(--spacing-2xl)]"
    >
      <div className="section-container">
        {/* Section header */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <p className="type-label-code text-[var(--color-terracotta)]">{t('eyebrow')}</p>
            <h2
              id="video-tour-heading"
              className="type-headline-xl text-white mt-2"
            >
              {t('heading')}
            </h2>
            <p className="type-body-md text-white/60 mt-3 max-w-xl">
              {t('subhead')}
            </p>
          </div>

          {/* 360° badge */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="border border-[var(--color-terracotta)]/40 bg-[var(--color-terracotta)]/10 px-4 py-2 flex items-center gap-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="text-[var(--color-terracotta)]"
                />
                <path
                  d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10A15.3 15.3 0 0 1 8 12a15.3 15.3 0 0 1 4-10z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="text-[var(--color-terracotta)]"
                />
              </svg>
              <span className="type-label-code text-[var(--color-terracotta)]">360° WALKTHROUGH</span>
            </div>
          </div>
        </div>

        {/* Video player container */}
        <div
          ref={containerRef}
          className="relative group bg-black overflow-hidden"
          style={{ aspectRatio: '16/9' }}
        >
          {/* The video element */}
          <video
            ref={videoRef}
            src="/videos/EMPL_Autorun.mp4"
            muted
            playsInline
            preload="metadata"
            className="w-full h-full object-cover"
            aria-label="EMPLD Residence 360-degree walkthrough video"
          />

          {/* Cinematic overlay gradient — only when paused / not started */}
          {!isPlaying && (
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none"
            />
          )}

          {/* Center play button — big, architectural */}
          {!hasStarted && (
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                onClick={togglePlay}
                aria-label="Play 360 walkthrough video"
                className="group/btn flex items-center gap-3 bg-white/10 border border-white/20 backdrop-blur-md px-8 py-5 hover:bg-[var(--color-terracotta)] hover:border-[var(--color-terracotta)] transition-all duration-300"
              >
                {/* Play icon */}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M5 3l14 9-14 9V3z" fill="currentColor" className="text-white" />
                </svg>
                <span className="type-label-code text-white">PLAY 360° TOUR</span>
              </button>
            </div>
          )}

          {/* Playing — center pause on hover */}
          {isPlaying && (
            <button
              onClick={togglePlay}
              aria-label="Pause video"
              className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <div className="bg-black/50 backdrop-blur-sm p-4">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <rect x="6" y="4" width="4" height="16" fill="white" />
                  <rect x="14" y="4" width="4" height="16" fill="white" />
                </svg>
              </div>
            </button>
          )}

          {/* Bottom controls bar */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent px-5 py-4 flex flex-col gap-3 translate-y-1 group-hover:translate-y-0 opacity-80 group-hover:opacity-100 transition-all duration-300">
            {/* Scrub bar */}
            <div
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Video progress"
              onClick={handleProgressClick}
              className="relative h-1 bg-white/20 cursor-pointer hover:h-1.5 transition-all"
            >
              <div
                className="absolute left-0 top-0 h-full bg-[var(--color-terracotta)] transition-all"
                style={{ width: `${progress}%` }}
              />
              {/* Thumb */}
              <div
                className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow-md"
                style={{ left: `calc(${progress}% - 6px)` }}
                aria-hidden="true"
              />
            </div>

            {/* Row: play/pause, mute, time, fullscreen */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {/* Play/Pause */}
                <button
                  onClick={togglePlay}
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                  className="text-white hover:text-[var(--color-terracotta)] transition-colors"
                >
                  {isPlaying ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <rect x="6" y="4" width="4" height="16" fill="currentColor" />
                      <rect x="14" y="4" width="4" height="16" fill="currentColor" />
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M5 3l14 9-14 9V3z" fill="currentColor" />
                    </svg>
                  )}
                </button>

                {/* Mute toggle */}
                <button
                  onClick={toggleMute}
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                  className="text-white hover:text-[var(--color-terracotta)] transition-colors"
                >
                  {isMuted ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M11 5L6 9H2v6h4l5 4V5z" fill="currentColor" />
                      <path d="M23 9l-6 6M17 9l6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M11 5L6 9H2v6h4l5 4V5z" fill="currentColor" />
                      <path d="M15.54 8.46a5 5 0 0 1 0 7.07M19.07 4.93a10 10 0 0 1 0 14.14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  )}
                </button>

                {/* Time */}
                <span className="type-label-code text-white/70 text-[10px]">
                  {formatTime((progress / 100) * duration)} / {formatTime(duration)}
                </span>
              </div>

              <div className="flex items-center gap-3">
                {/* Project label */}
                <span className="type-label-code text-white/50 hidden sm:block">
                  EMPLD RESIDENCE · GULSHAN 2
                </span>
                {/* Fullscreen */}
                <button
                  onClick={toggleFullscreen}
                  aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
                  className="text-white hover:text-[var(--color-terracotta)] transition-colors"
                >
                  {isFullscreen ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M8 3v3a2 2 0 0 1-2 2H3M21 8h-3a2 2 0 0 1-2-2V3M3 16h3a2 2 0 0 1 2 2v3M16 21v-3a2 2 0 0 1 2-2h3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M8 3H5a2 2 0 0 0-2 2v3M21 8V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3M16 21h3a2 2 0 0 0 2-2v-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Caption row below video */}
        <div className="mt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-t border-white/10 pt-5">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--color-terracotta)] animate-pulse" aria-hidden="true" />
            <p className="type-body-sm text-white/60">{t('caption')}</p>
          </div>
          <a
            href="#contact"
            className="type-label-code text-[var(--color-terracotta)] hover:text-white underline underline-offset-4 transition-colors"
          >
            {t('cta')} →
          </a>
        </div>
      </div>
    </section>
  )
}
