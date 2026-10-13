import { useCallback, useEffect, useRef, useState } from 'react'

export type SongStatus = 'idle' | 'loading' | 'playing' | 'paused' | 'error'

/**
 * Owns the one-and-only <audio> element for the whole experience.
 * The element is rendered once at the top of the app and never unmounted,
 * so the song keeps playing from the entrance through every section.
 */
export function useSong(src: string) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [status, setStatus] = useState<SongStatus>('idle')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const a = audioRef.current
    if (!a) return
    const onPlaying = () => {
      setStatus('playing')
      setError(null)
    }
    const onPause = () => setStatus((s) => (s === 'error' ? s : 'paused'))
    const onWaiting = () => setStatus((s) => (s === 'paused' ? s : 'loading'))
    const onError = () => {
      setStatus('error')
      setError('The song couldn’t load. Check your connection and try again.')
    }
    a.addEventListener('playing', onPlaying)
    a.addEventListener('pause', onPause)
    a.addEventListener('waiting', onWaiting)
    a.addEventListener('error', onError)
    return () => {
      a.removeEventListener('playing', onPlaying)
      a.removeEventListener('pause', onPause)
      a.removeEventListener('waiting', onWaiting)
      a.removeEventListener('error', onError)
    }
  }, [])

  /** Must be called directly from a user gesture (tap/click/keypress). */
  const play = useCallback(async () => {
    const a = audioRef.current
    if (!a) return false
    if (a.error) a.load() // retry after a network error
    setStatus('loading')
    setError(null)
    try {
      await a.play()
      return true
    } catch (e) {
      const name = (e as DOMException)?.name
      setStatus('error')
      setError(
        name === 'NotAllowedError'
          ? 'Your browser paused the music. Tap play to try again.'
          : 'The song couldn’t start. Tap to try again.',
      )
      return false
    }
  }, [])

  const pause = useCallback(() => audioRef.current?.pause(), [])

  const toggle = useCallback(() => {
    const a = audioRef.current
    if (!a) return
    if (a.paused) void play()
    else a.pause()
  }, [play])

  // Lock-screen / notification controls on phones.
  useEffect(() => {
    if (!('mediaSession' in navigator)) return
    navigator.mediaSession.metadata = new MediaMetadata({
      title: 'Գիշերվա աստղազարդ նկարում',
      artist: 'Vahag Rush · Ruben Hakhverdyan cover',
      album: 'Գտնված երազ',
    })
    navigator.mediaSession.setActionHandler('play', () => void play())
    navigator.mediaSession.setActionHandler('pause', () => pause())
  }, [play, pause])

  return { audioRef, src, status, error, play, pause, toggle }
}
