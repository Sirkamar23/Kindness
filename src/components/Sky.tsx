import { useMemo } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { seeded } from '../random'

type Star = { x: number; y: number; s: number; o: number; d: number; delay: number }

function makeStars(count: number, seed: number, minS: number, maxS: number): Star[] {
  const r = seeded(seed)
  return Array.from({ length: count }, () => ({
    x: r() * 100,
    y: r() * 100,
    s: minS + r() * (maxS - minS),
    o: 0.35 + r() * 0.6,
    d: 3 + r() * 5,
    delay: -r() * 8,
  }))
}

function StarLayer({ stars, glow }: { stars: Star[]; glow?: boolean }) {
  return (
    <>
      {stars.map((st, i) => (
        <span
          key={i}
          className="star"
          style={
            {
              left: `${st.x}%`,
              top: `${st.y}%`,
              width: st.s,
              height: st.s,
              '--o': st.o,
              '--d': `${st.d}s`,
              '--delay': `${st.delay}s`,
              boxShadow: glow ? `0 0 ${st.s * 3}px rgba(190,210,255,0.8)` : undefined,
            } as React.CSSProperties
          }
        />
      ))}
    </>
  )
}

/** Fixed night sky: gradient, two star layers, moon, a few clouds and Ararat. */
export default function Sky({ bright }: { bright: boolean }) {
  const reduce = useReducedMotion()
  const { scrollY } = useScroll()
  const k = reduce ? 0 : 1
  const farY = useTransform(scrollY, (v) => -v * 0.04 * k)
  const nearY = useTransform(scrollY, (v) => -v * 0.1 * k)
  const moonY = useTransform(scrollY, (v) => -v * 0.06 * k)
  const hillsY = useTransform(scrollY, (v) => v * 0.25 * k)
  const hillsOpacity = useTransform(scrollY, [0, 700], [1, 0.25])

  const far = useMemo(() => makeStars(120, 7, 0.8, 1.6), [])
  const near = useMemo(() => makeStars(32, 23, 1.6, 2.6), [])

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* sky gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 70% at 78% 8%, #1c2558 0%, rgba(20,27,66,0.6) 30%, transparent 60%),' +
            'linear-gradient(180deg, #060a1c 0%, #0a1030 38%, #121a46 72%, #1a2257 100%)',
        }}
      />
      {/* a faint milky band */}
      <div
        className="absolute -inset-x-1/4 top-[8%] h-[45%] -rotate-[18deg] opacity-40"
        style={{
          background:
            'radial-gradient(50% 40% at 50% 50%, rgba(140,160,230,0.16), transparent 70%)',
          filter: 'blur(10px)',
        }}
      />

      {/* stars — the whole field gently brightens once the music begins */}
      <motion.div
        className="absolute inset-x-0 top-0 h-[120%]"
        style={{ y: farY }}
        animate={{ opacity: bright ? 1 : 0.55 }}
        transition={{ duration: 2.4, ease: 'easeOut' }}
      >
        <StarLayer stars={far} />
      </motion.div>
      <motion.div
        className="absolute inset-x-0 top-0 h-[130%]"
        style={{ y: nearY }}
        animate={{ opacity: bright ? 1 : 0.65, scale: bright ? 1.02 : 1 }}
        transition={{ duration: 2.4, ease: 'easeOut' }}
      >
        <StarLayer stars={near} glow />
      </motion.div>

      {/* moon */}
      <motion.div
        className="absolute right-[9%] top-[7%] sm:right-[14%] sm:top-[9%]"
        style={{ y: moonY }}
      >
        <motion.div
          className="absolute left-1/2 top-1/2 h-[340px] w-[340px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              'radial-gradient(closest-side, rgba(220,226,255,0.22), rgba(150,170,240,0.08) 55%, transparent)',
          }}
          animate={{ opacity: bright ? 1 : 0.7, scale: bright ? 1.08 : 1 }}
          transition={{ duration: 3, ease: 'easeOut' }}
        />
        <div
          className="relative h-[62px] w-[62px] rounded-full sm:h-[92px] sm:w-[92px]"
          style={{
            background:
              'radial-gradient(circle at 35% 30%, #fbf8ee 0%, #ece6d3 45%, #cfc8b2 100%)',
            boxShadow:
              '0 0 24px rgba(240,235,215,0.55), 0 0 70px rgba(170,185,255,0.25), inset -8px -6px 14px rgba(120,115,95,0.35)',
          }}
        >
          <span className="absolute left-[24%] top-[46%] h-[18%] w-[18%] rounded-full bg-[#bdb59c]/50" />
          <span className="absolute left-[56%] top-[24%] h-[12%] w-[12%] rounded-full bg-[#bdb59c]/45" />
          <span className="absolute left-[52%] top-[62%] h-[22%] w-[22%] rounded-full bg-[#bdb59c]/35" />
        </div>
      </motion.div>

      {/* slow clouds */}
      <div className="cloud top-[11%] h-16 w-72" style={{ '--d': '170s', '--delay': '-40s' } as React.CSSProperties} />
      <div className="cloud top-[19%] h-10 w-56 opacity-70" style={{ '--d': '230s', '--delay': '-150s' } as React.CSSProperties} />
      <div className="cloud top-[34%] h-12 w-80 opacity-50" style={{ '--d': '260s', '--delay': '-90s' } as React.CSSProperties} />

      {/* Ararat — Masis and Sis — under the moon */}
      <motion.svg
        className="absolute inset-x-0 bottom-0 h-[30vh] w-full sm:h-[34vh]"
        viewBox="0 0 1440 320"
        preserveAspectRatio="xMidYMax slice"
        style={{ y: hillsY, opacity: hillsOpacity }}
      >
        <defs>
          <linearGradient id="mtn" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#1d2758" />
            <stop offset="1" stopColor="#070b1d" />
          </linearGradient>
          <linearGradient id="snow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#c9d4f2" stopOpacity="0.55" />
            <stop offset="1" stopColor="#8fa0d8" stopOpacity="0.12" />
          </linearGradient>
        </defs>
        <path
          d="M0 268 C 160 250 300 262 440 250 C 600 236 760 258 940 246 C 1120 236 1280 254 1440 244 L1440 320 L0 320 Z"
          fill="#0d1434"
          opacity="0.9"
        />
        <path
          d="M120 320 L 380 196 C 450 160 510 120 556 98 C 584 84 606 80 628 88 C 664 104 706 132 770 168 L 900 232 C 940 214 976 194 1004 188 C 1022 188 1046 202 1090 224 L 1310 300 L 1440 312 L 1440 320 Z"
          fill="url(#mtn)"
        />
        <path
          d="M520 116 C 548 98 586 82 612 82 C 634 84 656 98 694 120 L 680 126 L 666 117 L 652 131 L 638 119 L 622 133 L 606 120 L 590 132 L 576 121 L 560 131 L 546 122 L 532 128 Z"
          fill="url(#snow)"
        />
        <path
          d="M972 198 C 986 191 996 188 1005 188 C 1016 189 1028 196 1042 204 L 1030 207 L 1020 201 L 1010 209 L 998 201 L 986 207 Z"
          fill="url(#snow)"
        />
      </motion.svg>

      {/* vignette */}
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(120% 90% at 50% 40%, transparent 55%, rgba(3,5,15,0.55) 100%)' }}
      />
    </div>
  )
}
