import { useCallback, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import Reveal from './Reveal'
import Butterfly from './Butterfly'

const IDEAS = [
  'Call someone you haven’t spoken to in a while. Just to say hi.',
  'Support an Armenian-owned small business this week, and tell a friend about it.',
  'Compliment someone sincerely. Mean every word.',
  'Help someone without expecting anything in return.',
  'Send a kind message to a friend. Right now, before you forget.',
  'Make a stranger smile today.',
  'Call your grandparents, or someone’s, and ask them for a story from back home.',
  'Leave a warm review for a local Armenian bakery, restaurant, or shop.',
  'Teach someone one Armenian word. Start with «շնորհակալություն». Good luck to them.',
  'Let someone merge in front of you in traffic. Yes, even in the BMW.',
  'Check on a neighbor who lives alone.',
  'Quietly pay for the next person’s coffee.',
  'Thank a teacher who shaped you. It’s never too late.',
  'Cook too much food, the Armenian way, and share it with someone.',
  'Write a little note and leave it where someone will find it.',
  'Really listen to someone today, with your phone away.',
  'Text your mom, your dad, or whoever raised you: “I was thinking about you.”',
  'Do one kind thing today and don’t tell anyone about it.',
]

function shuffle<T>(arr: T[]) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function Kindness() {
  const reduce = useReducedMotion()
  const deck = useRef<string[]>([])
  const [idea, setIdea] = useState<{ text: string; n: number } | null>(null)
  const [flights, setFlights] = useState<number[]>([])

  const next = useCallback(() => {
    if (deck.current.length === 0) {
      deck.current = shuffle(IDEAS).filter((t) => t !== idea?.text)
    }
    const text = deck.current.pop()!
    setIdea((prev) => ({ text, n: (prev?.n ?? 0) + 1 }))
    if (!reduce) {
      const id = Date.now()
      setFlights((f) => [...f.slice(-3), id])
      setTimeout(() => setFlights((f) => f.filter((x) => x !== id)), 3200)
    }
  }, [idea, reduce])

  return (
    <section aria-labelledby="kindness-title" className="mx-auto max-w-xl px-6 pt-32 text-center sm:pt-40">
      <Reveal>
        <Butterfly size={30} flap={1.2} className="mx-auto mb-5" />
        <h2 id="kindness-title" className="font-serif text-[28px] italic leading-tight text-moon sm:text-[32px]">
          Pass the kindness on.
        </h2>
        <p className="mx-auto mt-3 max-w-sm text-[16px] leading-relaxed text-silver">
          Not sure where to start? Let the stars pick something small for you.
        </p>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="relative mt-9 inline-block">
          <motion.button
            type="button"
            onClick={next}
            className="relative min-h-[52px] touch-manipulation rounded-full border border-[#b9c8f2]/40 bg-[#18224f]/70 px-7 py-3.5 text-[16.5px] text-moon shadow-[0_0_30px_-6px_rgba(143,180,255,0.45)] transition-colors hover:border-[#b9c8f2]/70 hover:bg-[#1d2a60]/80"
            whileTap={{ scale: 0.96 }}
          >
            Give me a little kindness idea ♡
          </motion.button>
          {/* a butterfly lifts off with every tap */}
          <AnimatePresence>
            {flights.map((id) => (
              <motion.div
                key={id}
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-0"
                initial={{ x: '-50%', y: 0, opacity: 0, scale: 0.6 }}
                animate={{ x: ['-50%', '-10%', '-80%', '-30%'], y: [0, -60, -130, -210], opacity: [0, 1, 1, 0], scale: [0.6, 1, 1, 0.8] }}
                transition={{ duration: 3, ease: 'easeOut' }}
              >
                <Butterfly size={26} flap={0.45} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </Reveal>

      <div className="mt-8 min-h-[9rem]" aria-live="polite" aria-atomic="true">
        <AnimatePresence mode="wait">
          {idea && (
            <motion.div
              key={idea.n}
              initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -8, filter: 'blur(4px)' }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative mx-auto max-w-md rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-6"
            >
              <p className="text-[19px] leading-relaxed text-moon sm:text-[20px]">{idea.text}</p>
              <p className="mt-3 text-[13px] text-silver-dim">Tap again for another one.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
