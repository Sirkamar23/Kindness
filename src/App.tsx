import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, MotionConfig, motion } from 'motion/react'
import songUrl from './assets/audio/gtnvac-eraz.mp3'
import { useSong } from './useSong'
import Sky from './components/Sky'
import Butterflies from './components/Butterflies'
import Entrance from './components/Entrance'
import Letter from './components/Letter'
import Stickers from './components/Stickers'
import Kindness from './components/Kindness'
import Footer from './components/Footer'
import MusicControl from './components/MusicControl'

type Phase = 'entrance' | 'opening' | 'letter'

export default function App() {
  const song = useSong(songUrl)
  const [phase, setPhase] = useState<Phase>('entrance')

  const start = useCallback(async () => {
    setPhase('opening')
    const ok = await song.play()
    if (!ok) setPhase('entrance')
  }, [song])

  // Once the tape is actually turning, linger a moment, then drift into the letter.
  useEffect(() => {
    if (phase !== 'opening' || song.status !== 'playing') return
    const t = setTimeout(() => setPhase('letter'), 1900)
    return () => clearTimeout(t)
  }, [phase, song.status])

  const skip = useCallback(() => setPhase('letter'), [])

  useEffect(() => {
    if (phase === 'letter') window.scrollTo(0, 0)
  }, [phase])

  const inside = phase === 'letter'
  const bright = song.status === 'playing' || inside

  return (
    <MotionConfig reducedMotion="user">
      {/* The one audio element. It lives here for the whole visit, so the song never restarts. */}
      <audio ref={song.audioRef} src={song.src} preload="auto" loop playsInline />

      <Sky bright={bright} />
      <Butterflies count={6} />

      <AnimatePresence mode="wait">
        {!inside ? (
          <Entrance
            key="entrance"
            status={song.status}
            error={song.error}
            starting={phase === 'opening'}
            onStart={start}
            onSkip={skip}
          />
        ) : (
          <motion.main
            key="main"
            className="relative z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
          >
            <Letter />
            <Stickers />
            <Kindness />
            <Footer />
          </motion.main>
        )}
      </AnimatePresence>

      {inside && <MusicControl status={song.status} error={song.error} onToggle={song.toggle} />}
    </MotionConfig>
  )
}
