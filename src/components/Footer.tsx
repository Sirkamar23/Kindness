import Reveal from './Reveal'

export default function Footer() {
  return (
    <footer className="mx-auto max-w-md px-6 pb-[max(3rem,env(safe-area-inset-bottom))] pt-24 text-center">
      <Reveal>
        <p className="font-armenian text-[18px] text-moon">Բարի գիշեր 🌙</p>
        <p className="mt-3 text-[14.5px] leading-relaxed text-silver-dim">
          Nothing to buy, nothing to sign up for. Just a small hello from one Armenian to another.
        </p>
        <p className="mt-8 text-[12px] leading-relaxed text-silver-dim/70">
          Song: «Գիշերվա աստղազարդ նկարում» by Ruben Hakhverdyan, covered by Vahag Rush.
        </p>
      </Reveal>
    </footer>
  )
}
