import { useId } from 'react'

type Props = {
  size?: number
  flap?: number // seconds per wingbeat
  hue?: 'blue' | 'pale'
  className?: string
  still?: boolean
}

/** A delicate blue butterfly, viewed from above. Wings flap via CSS. */
export default function Butterfly({ size = 34, flap = 0.9, hue = 'blue', className, still }: Props) {
  const id = useId().replace(/:/g, '')
  const inner = hue === 'blue' ? '#d6e4ff' : '#eef3ff'
  const mid = hue === 'blue' ? '#7d9ff0' : '#a9bff5'
  const edge = hue === 'blue' ? '#2a4396' : '#4d64ad'
  const wingStyle = { '--flap': `${flap}s`, animationPlayState: still ? 'paused' : undefined } as React.CSSProperties

  return (
    <svg
      width={size}
      height={size * 0.8}
      viewBox="-50 -40 100 80"
      className={className}
      style={{ overflow: 'visible', filter: 'drop-shadow(0 0 6px rgba(143,180,255,0.55))' }}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id={`w${id}`} cx="0" cy="0" r="50" gradientUnits="userSpaceOnUse">
          <stop offset="0.05" stopColor={inner} />
          <stop offset="0.55" stopColor={mid} />
          <stop offset="1" stopColor={edge} />
        </radialGradient>
      </defs>
      <g className="wing-left" style={wingStyle}>
        <path d="M-2 -2 C -10 -30 -40 -40 -46 -22 C -50 -9 -30 -1 -2 2 Z" fill={`url(#w${id})`} />
        <path d="M-2 3 C -20 5 -36 15 -30 27 C -24 35 -8 22 -2 7 Z" fill={`url(#w${id})`} opacity="0.85" />
        <path d="M-4 -2 C -14 -14 -26 -22 -38 -24 M-4 1 C -16 -4 -30 -6 -42 -12" stroke="#fff" strokeOpacity="0.25" strokeWidth="0.8" fill="none" />
      </g>
      <g className="wing-right" style={wingStyle}>
        <path d="M2 -2 C 10 -30 40 -40 46 -22 C 50 -9 30 -1 2 2 Z" fill={`url(#w${id})`} />
        <path d="M2 3 C 20 5 36 15 30 27 C 24 35 8 22 2 7 Z" fill={`url(#w${id})`} opacity="0.85" />
        <path d="M4 -2 C 14 -14 26 -22 38 -24 M4 1 C 16 -4 30 -6 42 -12" stroke="#fff" strokeOpacity="0.25" strokeWidth="0.8" fill="none" />
      </g>
      <ellipse cx="0" cy="3" rx="2" ry="12" fill="#1b2450" />
      <path d="M-1 -8 C -4 -18 -8 -22 -11 -24 M1 -8 C 4 -18 8 -22 11 -24" stroke="#1b2450" strokeWidth="1" fill="none" strokeLinecap="round" />
    </svg>
  )
}
