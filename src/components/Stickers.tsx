import { motion } from 'motion/react'
import Reveal from './Reveal'
import gtnvacEraz from '../assets/stickers/gtnvac-eraz.png'
import armenianBmw from '../assets/stickers/armenian-bmw.webp'

type Sticker = {
  title: string
  subtitle?: string
  text: string
  tilt: number
  tape: string
  image: React.ReactNode
}

/*
 * Both images are the original files, untouched. The BMW file has wide
 * transparent margins, so we frame it with CSS (no cropping of the file):
 * artwork bounding box inside the 2000×1649 canvas is x 600–1405, y 415–1204.
 */
const BMW_BOX = { x: 600, y: 415, w: 805, h: 789, W: 2000, H: 1649 }

const stickers: Sticker[] = [
  {
    title: 'Գտնված երազ',
    subtitle: 'Found Dream',
    text: 'Inspired by a beloved old Armenian cartoon, Found Dream. A little nostalgia, and a reminder of the stories we carry with us.',
    tilt: -2.5,
    tape: 'rgba(143,180,255,0.45)',
    image: (
      <img
        src={gtnvacEraz}
        width={1296}
        height={1206}
        alt="Sticker: the old man and the girl from the Armenian cartoon Գտնված երազ (Found Dream), looking up together."
        className="sticker-edge pointer-events-none mx-auto h-auto w-full max-w-[260px] select-none"
        loading="lazy"
        decoding="async"
        draggable={false}
      />
    ),
  },
  {
    title: 'The Armenian BMW',
    text: 'Because if you’ve spent enough time around Armenians in Glendale… you get it. This one’s just a little inside joke that made me smile.',
    tilt: 2.5,
    tape: 'rgba(224,160,64,0.45)',
    image: (
      // overflow-hidden + padding keeps the oversized canvas from widening the page
      <div className="mx-auto w-full max-w-[272px] overflow-hidden px-4 pb-6 pt-3">
        <div className="relative w-full" style={{ aspectRatio: `${BMW_BOX.w} / ${BMW_BOX.h}` }}>
          <img
            src={armenianBmw}
            width={BMW_BOX.W}
            height={BMW_BOX.H}
            alt="Sticker: a bearded guy in sunglasses leaning out of a black BMW, rosary beads swinging from his hand."
            className="sticker-edge pointer-events-none absolute h-auto max-w-none select-none"
            style={{
              width: `${(BMW_BOX.W / BMW_BOX.w) * 100}%`,
              left: `${(-BMW_BOX.x / BMW_BOX.w) * 100}%`,
              top: `${(-BMW_BOX.y / BMW_BOX.h) * 100}%`,
            }}
            loading="lazy"
            decoding="async"
            draggable={false}
          />
        </div>
      </div>
    ),
  },
]

export default function Stickers() {
  return (
    <section aria-labelledby="stickers-title" className="mx-auto max-w-4xl px-5 pt-28 sm:pt-36">
      <Reveal className="text-center">
        <p className="text-[12px] uppercase tracking-[0.3em] text-silver-dim">Inside your envelope</p>
        <h2 id="stickers-title" className="mt-3 font-serif text-[26px] italic text-moon sm:text-[30px]">
          Two little pieces of me
        </h2>
      </Reveal>

      <div className="mt-12 grid gap-14 sm:mt-16 md:grid-cols-2 md:gap-10">
        {stickers.map((s, i) => (
          <Reveal key={s.title} delay={i * 0.12}>
            <figure
              className="float relative mx-auto max-w-[22rem]"
              style={{ '--tilt': `${s.tilt}deg`, animationDelay: `${-i * 3.5}s` } as React.CSSProperties}
            >
              <div className="paper relative rounded-[3px] px-6 pb-7 pt-9 shadow-[0_24px_60px_-18px_rgba(0,0,0,0.75)]">
                {/* washi tape */}
                <span
                  aria-hidden="true"
                  className="absolute -top-3 left-1/2 h-7 w-24 -translate-x-1/2 rotate-[-3deg] rounded-[2px]"
                  style={{ background: s.tape, boxShadow: '0 1px 2px rgba(0,0,0,0.12)' }}
                />
                <motion.div
                  className="cursor-pointer touch-manipulation py-2"
                  whileHover={{ scale: 1.04, rotate: s.tilt > 0 ? -2 : 2, y: -4 }}
                  whileTap={{ scale: 0.95, rotate: s.tilt > 0 ? 5 : -5 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 14 }}
                >
                  {s.image}
                </motion.div>
                <figcaption className="mt-6 text-center">
                  <h3
                    className={`text-[21px] font-medium leading-snug text-ink ${s.subtitle ? 'font-armenian' : 'font-serif'}`}
                  >
                    {s.title}
                  </h3>
                  {s.subtitle && <p className="mt-0.5 text-[14px] italic text-ink-soft">{s.subtitle}</p>}
                  <p className="mx-auto mt-3 max-w-[19rem] text-[16px] leading-relaxed text-ink-soft">{s.text}</p>
                </figcaption>
              </div>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
