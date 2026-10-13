/**
 * A hand-drawn vintage cassette recorder — the kind that sat on a shelf
 * in every Yerevan apartment. Reels turn while the song is playing.
 */
export default function Recorder({ playing }: { playing: boolean }) {
  const reel = `reel ${playing ? 'is-playing' : ''}`
  return (
    <svg viewBox="0 0 360 250" className="h-auto w-full" role="img" aria-hidden="true">
      <defs>
        <linearGradient id="rec-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ece3cf" />
          <stop offset="0.55" stopColor="#d6c9ab" />
          <stop offset="1" stopColor="#b9a985" />
        </linearGradient>
        <linearGradient id="rec-glass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#262c48" />
          <stop offset="1" stopColor="#141829" />
        </linearGradient>
        <linearGradient id="rec-key" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f6f0e2" />
          <stop offset="1" stopColor="#cfc2a4" />
        </linearGradient>
        <radialGradient id="rec-speaker" cx="0.4" cy="0.35" r="0.75">
          <stop offset="0" stopColor="#5a4a3a" />
          <stop offset="1" stopColor="#2c231b" />
        </radialGradient>
        <pattern id="rec-grille" width="7" height="7" patternUnits="userSpaceOnUse">
          <circle cx="3.5" cy="3.5" r="1.55" fill="#17110c" />
        </pattern>
        <clipPath id="rec-window">
          <rect x="216" y="112" width="74" height="26" rx="13" />
        </clipPath>
        <filter id="rec-shadow" x="-20%" y="-50%" width="140%" height="200%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
        <radialGradient id="rec-led" r="0.5">
          <stop offset="0" stopColor="#fff1c9" />
          <stop offset="0.4" stopColor="#ffb85c" />
          <stop offset="1" stopColor="#ffb85c" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* shadow */}
      <ellipse cx="180" cy="238" rx="150" ry="7" fill="#000" opacity="0.45" filter="url(#rec-shadow)" />

      {/* handle */}
      <path d="M104 60 V40 Q104 24 120 24 H240 Q256 24 256 40 V60" fill="none" stroke="#8a7a5e" strokeWidth="10" strokeLinecap="round" />
      <path d="M108 56 V41 Q108 28 121 28 H239 Q252 28 252 41 V56" fill="none" stroke="#c7b893" strokeWidth="2" strokeLinecap="round" opacity="0.7" />

      {/* body */}
      <rect x="16" y="52" width="328" height="176" rx="24" fill="url(#rec-body)" stroke="#6e5f45" strokeOpacity="0.45" strokeWidth="1.5" />
      <rect x="26" y="58" width="308" height="9" rx="4.5" fill="#fff" opacity="0.28" />

      {/* brand plate */}
      <text x="40" y="80" fontFamily="'Noto Serif Armenian', serif" fontSize="9.5" letterSpacing="2.2" fill="#6e5f45">
        ԵՐԵՎԱՆ · 302
      </text>

      {/* speaker */}
      <circle cx="96" cy="146" r="62" fill="#a39274" />
      <circle cx="96" cy="146" r="58" fill="#cdbf9f" />
      <circle cx="96" cy="146" r="54" fill="url(#rec-speaker)" />
      <circle cx="96" cy="146" r="54" fill="url(#rec-grille)" />
      <path d="M58 118 A 48 48 0 0 1 120 102" fill="none" stroke="#fff" strokeOpacity="0.18" strokeWidth="3" strokeLinecap="round" />

      {/* LED */}
      <circle cx="166" cy="76" r="3.6" fill={playing ? '#ffcf7a' : '#6b4b2b'} style={{ transition: 'fill .6s' }} />
      {playing && <circle cx="166" cy="76" r="10" fill="url(#rec-led)" opacity="0.9" />}

      {/* cassette deck window */}
      <rect x="180" y="70" width="146" height="100" rx="10" fill="url(#rec-glass)" stroke="#8a7a5e" strokeWidth="3" />

      {/* cassette */}
      <rect x="189" y="79" width="128" height="82" rx="6" fill="#3a3f55" />
      <rect x="196" y="85" width="114" height="60" rx="3" fill="#f2e8d0" />
      {/* a nod to the tricolour */}
      <rect x="196" y="85" width="114" height="3" fill="#b8423c" />
      <rect x="196" y="88" width="114" height="3" fill="#2d4f8f" />
      <rect x="196" y="91" width="114" height="3" fill="#e0a040" />
      <text x="253" y="107" textAnchor="middle" fontFamily="'Noto Serif Armenian', serif" fontSize="12.5" fontWeight="500" fill="#2a2840">
        Գտնված երազ
      </text>
      <text x="201" y="142" fontFamily="'Noto Serif Armenian', serif" fontSize="7" fill="#8a6a50">Ա</text>

      {/* reel window */}
      <rect x="216" y="112" width="74" height="26" rx="13" fill="#11131c" />
      <g clipPath="url(#rec-window)">
        <circle cx="233" cy="125" r="17" fill="#4a2f22" />
        <circle cx="274" cy="125" r="11" fill="#4a2f22" />
      </g>
      {[233, 274].map((cx, i) => (
        <g key={cx} className={`${reel} ${i ? 'reel-slow' : ''}`}>
          <circle cx={cx} cy="125" r="7.5" fill="#f3eee2" />
          {[0, 60, 120, 180, 240, 300].map((a) => (
            <rect key={a} x={cx - 1.2} y={125 - 7.5} width="2.4" height="3.2" fill="#3a3f55" transform={`rotate(${a} ${cx} 125)`} />
          ))}
          <circle cx={cx} cy="125" r="2.6" fill="#3a3f55" />
        </g>
      ))}
      <path d="M210 161 L216 149 H290 L296 161 Z" fill="#2c3044" />
      <circle cx="226" cy="155" r="1.6" fill="#0f1119" />
      <circle cx="280" cy="155" r="1.6" fill="#0f1119" />

      {/* glass reflection */}
      <path d="M186 76 L230 76 L196 164 L186 164 Z" fill="#fff" opacity="0.06" />

      {/* piano keys */}
      {[
        { x: 182, icon: 'rec' },
        { x: 211, icon: 'rew' },
        { x: 240, icon: 'play' },
        { x: 269, icon: 'ff' },
        { x: 298, icon: 'stop' },
      ].map(({ x, icon }) => {
        const pressed = icon === 'play' && playing
        return (
          <g key={icon} transform={`translate(0 ${pressed ? 3 : 0})`} style={{ transition: 'transform .25s' }}>
            <rect x={x} y="182" width="26" height="22" rx="3" fill="#8a7a5e" opacity="0.5" transform="translate(0 3)" />
            <rect x={x} y="182" width="26" height="22" rx="3" fill={pressed ? '#d8ccb0' : 'url(#rec-key)'} stroke="#7d6e52" strokeWidth="1" />
            {icon === 'rec' && <circle cx={x + 13} cy="193" r="3.6" fill="#b8423c" />}
            {icon === 'play' && <path d={`M${x + 10} 188 L${x + 18} 193 L${x + 10} 198 Z`} fill="#3a3326" />}
            {icon === 'stop' && <rect x={x + 9} y="189" width="8" height="8" fill="#3a3326" />}
            {icon === 'rew' && <path d={`M${x + 13} 188 L${x + 7} 193 L${x + 13} 198 Z M${x + 20} 188 L${x + 14} 193 L${x + 20} 198 Z`} fill="#3a3326" />}
            {icon === 'ff' && <path d={`M${x + 6} 188 L${x + 12} 193 L${x + 6} 198 Z M${x + 13} 188 L${x + 19} 193 L${x + 13} 198 Z`} fill="#3a3326" />}
          </g>
        )
      })}

      {/* volume dial */}
      <circle cx="166" cy="206" r="8" fill="#a39274" />
      <circle cx="166" cy="206" r="6" fill="#e6dcc6" />
      <rect x="165" y="199.5" width="2" height="5" fill="#6e5f45" />

      {/* feet */}
      <rect x="44" y="226" width="40" height="7" rx="3" fill="#5e513b" />
      <rect x="276" y="226" width="40" height="7" rx="3" fill="#5e513b" />
    </svg>
  )
}
