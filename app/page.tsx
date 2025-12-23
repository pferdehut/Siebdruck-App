import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white p-0">
      {/* Ultra-boxy grid layout - each section is a distinct colored box */}
      <div className="grid grid-cols-12 gap-0">
        <div className="col-span-6 md:col-span-3 box box-yellow min-h-[250px] md:min-h-[350px] flex items-center justify-center">
          <Link href="/" className="relative w-full h-full z-10">
            <img src="/bleedproof.svg" alt="Bleedproof Logo" className="w-full h-full" />
          </Link>
        </div>

        <div className="col-span-6 md:col-span-5 box box-blue min-h-[250px] md:min-h-[350px] flex flex-col justify-center">
          <h1 className="text-6xl md:text-8xl font-display mb-4">
            Druckwerkstatt
          </h1>
        </div>

        <div className="col-span-12 md:col-span-4 box box-pink min-h-[200px] md:min-h-[350px] flex items-center">
          <p className="text-lg md:text-xl font-bold leading-tight">
            Von Siebdruck über Stencil und Linoldruck bis hin zu Pop-up-Karten: Gemeinsam entwickeln wir kleine
            Projekte.
          </p>
        </div>

        <Link
          href="/workshops"
          className="col-span-6 md:col-span-4 box box-mint min-h-[280px] hover:scale-[1.02] transition-transform"
        >
          <div className="h-full flex flex-col justify-between">
            <div>
              <div className="text-sm font-black mb-2 opacity-70">01</div>
              <h2 className="text-5xl md:text-7xl font-display font-black leading-none">
                Workshops
              </h2>
            </div>
            <p className="text-sm font-bold mt-4">Alle unsere Workshops →</p>
          </div>
        </Link>

        <Link
          href="/team"
          className="col-span-6 md:col-span-3 box box-coral min-h-[280px] hover:scale-[1.02] transition-transform"
        >
          <div className="h-full flex flex-col justify-between">
            <div>
              <div className="text-sm font-black mb-2 opacity-70">02</div>
              <h2 className="text-5xl md:text-7xl font-display font-black leading-none">Team</h2>
            </div>
            <p className="text-sm font-bold mt-4">Wer bietet die Workshops an →</p>
          </div>
        </Link>

        <div className="col-span-12 md:col-span-5 box box-teal min-h-[300px] p-0 border-4 border-black">
          <img
            src="/images/design-mode/66aa0e25-4680-413d-b9a9.jpg"
            alt="Workshop"
            className="w-full h-full object-cover"
          />
        </div>

        <Link
          href="/contact"
          className="col-span-6 md:col-span-4 box box-peach min-h-[250px] hover:scale-[1.02] transition-transform"
        >
          <div className="h-full flex flex-col justify-between">
            <div>
              <div className="text-sm font-black mb-2 opacity-70">03</div>
              <h2 className="text-5xl md:text-6xl font-display font-black leading-none">
                Kontakt
              </h2>
            </div>
            <p className="text-sm font-bold mt-4">Schreibe uns →</p>
          </div>
        </Link>

        <Link
          href="/impressions"
          className="col-span-6 md:col-span-3 box box-purple min-h-[250px] hover:scale-[1.02] transition-transform"
        >
          <div className="h-full flex flex-col justify-between">
            <div>
              <div className="text-sm font-black mb-2 opacity-70">04</div>
              <h2 className="text-4xl md:text-5xl font-display font-black leading-none">
                Impressionen
              </h2>
            </div>
            <p className="text-sm font-bold mt-4">Was wir bisher gemacht haben →</p>
          </div>
        </Link>

        <div className="col-span-12 md:col-span-5 box box-lime min-h-[200px] flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-2xl md:text-3xl font-black leading-tight max-w-md">Bereit für deinen ersten Workshop?</p>
          <Button
            asChild
            size="lg"
            className="bg-black text-white hover:bg-black/90 border-4 border-black text-lg font-black px-8 py-6"
          >
            <Link href="/workshops">los geht's →</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
