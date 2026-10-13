import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import Recorder from './Recorder'
import type { SongStatus } from '../useSong'

type Props = {
  status: SongStatus
  error: string | null
  starting: boolean
  onStart: () => void
  onSkip: () => void
}

export default function Entrance({ status, error, starting, onStart, onSkip }: Props) {
  const playing = status === 'playing'
  const waiting = starting && !playing && status !== 'error'

  // On a very slow connection, let people in while the song finishes loading.
  const [slow, setSlow] = useState(false)
  useEffect(() => {
    if (!waiting) return setSlow(false)
    const t = setTimeout(() => setSlow(true), 6000)
    return () => clearTimeout(t)
  }, [waiting])

  return (
    <motion.section
      key="entrance"
      className="relative z-10 flex min-h-[100svh] flex-col items-center justify-center px-6 pb-[max(2rem,env(safe-area-inset-bottom))] pt-[max(2rem,env(safe-area-inset-top))] text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04, filter: 'blur(6px)' }}
      transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.p
        className="mb-6 font-armenian text-[13px] tracking-[0.35em] text-silver-dim/80"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 1.4 }}
      >
        ՔԵԶ ՀԱՄԱՐ · FOR YOU
      </motion.p>

      <div className="relative w-[min(82vw,380px)]">
        {/* soft moonlight pooled behind the recorder */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-16 rounded-full"
          style={{ background: 'radial-gradient(closest-side, rgba(170,190,255,0.22), transparent)' }}
          animate={{ opacity: playing ? 1 : 0.6, scale: playing ? 1.1 : 1 }}
          transition={{ duration: 2 }}
        />
        <motion.button
          type="button"
          onClick={onStart}
          disabled={waiting || playing}
          aria-label="Play the song and enter the dream"
          className="relative block w-full cursor-pointer touch-manipulation rounded-3xl disabled:cursor-default"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: [0, -6, 0] }}
          transition={{
            opacity: { duration: 1.6, delay: 0.2 },
            y: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
        >
          <Recorder playing={playing} />
        </motion.button>
      </div>

      <motion.h1
        className="mt-8 font-serif text-[28px] italic leading-tight text-moon sm:text-[32px]"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1.4 }}
      >
        Enter the Dream
      </motion.h1>

      <div className="mt-3 min-h-[4.5rem]" aria-live="polite">
        {error ? (
          <div role="alert" className="flex flex-col items-center gap-3">
            <p className="max-w-xs text-[15px] text-[#f1d9b5]">{error}</p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={onStart}
                className="rounded-full border border-silver/40 px-5 py-2.5 text-[15px] text-moon transition hover:bg-white/5"
              >
                Try again
              </button>
              <button type="button" onClick={onSkip} className="px-3 py-2.5 text-[14px] text-silver-dim underline underline-offset-4">
                Continue without music
              </button>
            </div>
          </div>
        ) : waiting ? (
          <div className="flex flex-col items-center gap-3">
            <p className="text-[15px] italic text-silver">Rewinding the tape…</p>
            {slow && (
              <button type="button" onClick={onSkip} className="text-[14px] text-silver-dim underline underline-offset-4">
                Go ahead, the song will catch up
              </button>
            )}
          </div>
        ) : playing ? (
          <p className="text-[15px] italic text-silver">Գիշերվա աստղազարդ նկարում…</p>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6, duration: 1.2 }}>
            <p className="text-[15px] text-silver">Tap the recorder to begin.</p>
            <p className="mt-1.5 text-[12.5px] text-silver-dim/80">Best with your sound on ♪</p>
          </motion.div>
        )}
      </div>
    </motion.section>
  )
}
