import { motion } from 'motion/react'
import Reveal from './Reveal'
import Butterfly from './Butterfly'

function Stamp() {
  return (
    <div
      aria-hidden="true"
      className="absolute right-5 top-5 w-[64px] rotate-[4deg] sm:right-8 sm:top-7 sm:w-[76px]"
      style={{ filter: 'drop-shadow(0 2px 2px rgba(60,40,20,0.2))' }}
    >
      <svg viewBox="0 0 80 96" className="h-auto w-full">
        <defs>
          <mask id="perf">
            <rect width="80" height="96" fill="#fff" />
            {Array.from({ length: 9 }, (_, i) => (
              <g key={i}>
                <circle cx={4 + i * 9} cy="0" r="2.6" fill="#000" />
                <circle cx={4 + i * 9} cy="96" r="2.6" fill="#000" />
              </g>
            ))}
            {Array.from({ length: 11 }, (_, i) => (
              <g key={i}>
                <circle cx="0" cy={4 + i * 9} r="2.6" fill="#000" />
                <circle cx="80" cy={4 + i * 9} r="2.6" fill="#000" />
              </g>
            ))}
          </mask>
        </defs>
        <g mask="url(#perf)">
          <rect width="80" height="96" fill="#faf5ea" />
          <rect x="7" y="7" width="66" height="70" fill="#1a2350" />
          <circle cx="56" cy="22" r="6" fill="#ece6d3" />
          <path d="M7 77 L 18 63 C 21 59 23 57 24 57 C 26 57 28 59 31 62 L 34 60 C 40 50 46 42 50 41 C 54 42 60 50 73 70 L 73 77 Z" fill="#2c3a78" />
          <path d="M45 46 C 47 43 49 41 50 41 C 52 41 54 43 56 46 L 53 47 L 50 45 L 47 47 Z" fill="#dfe6fb" opacity="0.8" />
          <text x="40" y="88" textAnchor="middle" fontFamily="'Noto Serif Armenian', serif" fontSize="7.5" letterSpacing="1" fill="#1a2350">
            ՀԱՅԱՍՏԱՆ
          </text>
        </g>
      </svg>
    </div>
  )
}

function Divider() {
  return (
    <div aria-hidden="true" className="my-7 flex items-center justify-center gap-3 text-ink-soft/50">
      <span className="h-px w-10 bg-current" />
      <span className="text-[11px]">✦</span>
      <span className="h-px w-10 bg-current" />
    </div>
  )
}

export default function Letter() {
  return (
    <section aria-label="A letter for you" className="px-4 pt-[max(18vh,7rem)] sm:px-6">
      <motion.p
        className="mb-5 flex items-center justify-center gap-2 text-center text-[12px] uppercase tracking-[0.3em] text-silver-dim"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1.4 }}
      >
        <Butterfly size={18} flap={1.4} /> A letter for you
      </motion.p>

      <motion.article
        className="paper relative mx-auto max-w-[35rem] rounded-[3px] px-6 pb-12 pt-20 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.75),0_0_0_1px_rgba(255,255,255,0.04)] sm:px-12 sm:pt-24"
        initial={{ opacity: 0, y: 60, rotateX: 8 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 1.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformPerspective: 1200 }}
      >
        {/* faint fold line */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-1/3 h-px bg-gradient-to-r from-transparent via-[#b8a989]/40 to-transparent" />
        <Stamp />

        <div className="text-[17.5px] leading-[1.8] text-ink sm:text-[19px]">
          <Reveal>
            <h2 className="mb-7 font-armenian text-[25px] font-medium leading-snug text-ink sm:text-[28px]">
              Բարև, իմ սիրելի հայ
            </h2>
          </Reveal>

          <Reveal>
            <p>
              We come from a small country with a big history. Many of us have traveled far from home to build new
              lives, follow our dreams, and find our place in the world.
            </p>
          </Reveal>

          <Reveal>
            <p className="mt-6 font-serif text-[20px] italic leading-relaxed text-[#2d3566] sm:text-[22px]">
              But no matter how far we go, we still have each other.
            </p>
          </Reveal>

          <Divider />

          <Reveal>
            <p>
              I wanted to send you something small. Two little stickers, a familiar memory, a little joke, and a piece
              of me.
            </p>
          </Reveal>
          <Reveal>
            <p className="mt-5">
              Maybe one makes you laugh. Maybe the other reminds you of being a kid. That’s enough.
            </p>
          </Reveal>

          <Reveal>
            <p className="mt-5">
              I believe we can all do more to support each other, whether it’s helping an Armenian-owned business,
              checking on a friend, or showing kindness to someone we don’t even know.
            </p>
          </Reveal>

          <Reveal>
            <p className="mt-6">
              <span className="font-medium text-[#2d3566]">Small things matter.</span> Sometimes one thoughtful moment
              can make someone’s entire day.
            </p>
          </Reveal>

          <Divider />

          <Reveal>
            <p>
              So here’s my only wish: when you have the chance, pass a little kindness on. To an Armenian, to a
              neighbor, to anyone who needs it.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="mt-10 text-right font-hand text-[30px] leading-[1.15] text-[#2a3a7a] sm:text-[34px]">
              With love,
              <br />
              just another Armenian <span className="font-sans text-[22px]">💙</span>
            </p>
          </Reveal>
        </div>
      </motion.article>
    </section>
  )
}
