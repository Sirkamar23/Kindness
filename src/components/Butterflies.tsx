import { useMemo } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import Butterfly from './Butterfly'
import { seeded } from '../random'

type Flight = {
  xs: string[]
  ys: string[]
  rot: number[]
  size: number
  duration: number
  delay: number
  flap: number
  opacity: number
  hue: 'blue' | 'pale'
}

function makeFlights(count: number): Flight[] {
  const r = seeded(1983)
  return Array.from({ length: count }, (_, i) => {
    const points = 5
    const xs: string[] = []
    const ys: string[] = []
    const rot: number[] = []
    for (let p = 0; p < points; p++) {
      xs.push(`${Math.round(-5 + r() * 100)}vw`)
      ys.push(`${Math.round(8 + r() * 80)}vh`)
      rot.push(Math.round(-25 + r() * 50))
    }
    const far = i % 3 === 0
    return {
      xs,
      ys,
      rot,
      size: far ? 16 + r() * 6 : 24 + r() * 14,
      duration: 34 + r() * 26,
      delay: -r() * 30,
      flap: far ? 0.7 + r() * 0.3 : 0.85 + r() * 0.5,
      opacity: far ? 0.45 : 0.85,
      hue: r() > 0.6 ? 'pale' : 'blue',
    }
  })
}

/** A handful of butterflies wandering slowly across the night. */
export default function Butterflies({ count = 6 }: { count?: number }) {
  const reduce = useReducedMotion()
  const flights = useMemo(() => makeFlights(count), [count])

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[1] overflow-hidden">
      {flights.map((f, i) =>
        reduce ? (
          <div key={i} className="absolute" style={{ left: f.xs[0], top: f.ys[0], opacity: f.opacity * 0.8 }}>
            <Butterfly size={f.size} hue={f.hue} still />
          </div>
        ) : (
          <motion.div
            key={i}
            className="absolute left-0 top-0 will-change-transform"
            style={{ opacity: f.opacity }}
            initial={{ x: f.xs[0], y: f.ys[0], rotate: f.rot[0] }}
            animate={{ x: f.xs, y: f.ys, rotate: f.rot }}
            transition={{
              duration: f.duration,
              delay: f.delay < 0 ? 0 : f.delay,
              repeat: Infinity,
              repeatType: 'mirror',
              ease: 'easeInOut',
            }}
          >
            <Butterfly size={f.size} flap={f.flap} hue={f.hue} />
          </motion.div>
        ),
      )}
    </div>
  )
}
