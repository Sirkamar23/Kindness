import { AnimatePresence, motion } from 'motion/react'
import type { SongStatus } from '../useSong'

type Props = { status: SongStatus; error: string | null; onToggle: () => void }

function MiniReel({ spinning }: { spinning: boolean }) {
  return (
    <svg viewBox="0 0 20 20" className="h-5 w-5" aria-hidden="true">
      <g className={`reel ${spinning ? 'is-playing' : ''}`}>
        <circle cx="10" cy="10" r="8.5" fill="none" stroke="currentColor" strokeWidth="1.3" />
        <circle cx="10" cy="10" r="2.2" fill="currentColor" />
        {[0, 120, 240].map((a) => (
          <rect key={a} x="9.3" y="2.5" width="1.4" height="4" rx="0.7" fill="currentColor" transform={`rotate(${a} 10 10)`} />
        ))}
      </g>
    </svg>
  )
}

/** Small, always-reachable music control that floats above the letter. */
export default function MusicControl({ status, error, onToggle }: Props) {
  const playing = status === 'playing'
  const loading = status === 'loading'
  const label = playing ? 'Pause music' : loading ? 'Loading music' : 'Play music'

  return (
    <motion.div
      className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-[max(1rem,env(safe-area-inset-right))] z-50 flex flex-col-reverse items-end gap-2"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 1 }}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-label={label}
        aria-pressed={playing}
        title={label}
        className="flex min-h-[44px] touch-manipulation items-center gap-2 rounded-full border border-white/15 bg-[#0b112b]/75 py-2 pl-3 pr-4 text-[13.5px] text-moon shadow-[0_6px_20px_-6px_rgba(0,0,0,0.6)] backdrop-blur-sm transition-colors hover:border-white/30"
      >
        <MiniReel spinning={playing} />
        <span aria-hidden="true">{playing ? 'Pause' : loading ? '…' : 'Play'}</span>
        <span aria-hidden="true" className="ml-0.5 flex h-3.5 items-end gap-[2px]">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="w-[2px] rounded-full bg-[#8fb4ff]"
              animate={playing ? { height: ['30%', '100%', '45%', '80%', '30%'] } : { height: '30%' }}
              transition={playing ? { duration: 1.4 + i * 0.25, repeat: Infinity, ease: 'easeInOut' } : { duration: 0.4 }}
            />
          ))}
        </span>
      </button>
      <AnimatePresence>
        {error && (
          <motion.div
            role="alert"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="max-w-[16rem] rounded-xl border border-white/10 bg-[#0b112b]/90 px-4 py-3 text-left text-[13.5px] leading-snug text-[#f1d9b5]"
          >
            {error}{' '}
            <button type="button" onClick={onToggle} className="mt-1 block text-moon underline underline-offset-4">
              Try again
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
