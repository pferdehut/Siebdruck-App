import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="relative z-10 flex min-h-screen flex-col">
        <section className="relative px-6 py-24">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
              {/* Text content */}
              <div className="space-y-8">
                <Badge variant="outline" className="mb-4 border-2">
                  🫆 Druck Workshops
                </Badge>
                <h1 className="text-8xl font-black tracking-tight text-balance sm:text-9xl lg:text-10xl leading-none">
                  Hallo.
                </h1>
                <p className="text-xl font-medium text-foreground/80 text-pretty max-w-xl leading-relaxed">
                  Unsere Workshops vermitteln die Grundlagen verschiedener Drucktechniken und bieten Raum für eigene
                  Ideen. Von Siebdruck über Stencil und Linoldruck bis hin zu Pop-up-Karten: Gemeinsam entwickeln wir
                  kleine Projekte, die mit nach Hause genommen werden können.
                </p>
                <div className="flex flex-wrap items-center gap-4">
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="rounded-full text-lg font-bold px-8 py-6 border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
                  >
                    <Link href="/workshops">Workshops</Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="rounded-full text-lg font-bold px-8 py-6 bg-secondary text-secondary-foreground border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
                  >
                    <Link href="/contact">Kontakt</Link>
                  </Button>
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-0 rounded-[3rem] bg-secondary/80 blur-2xl opacity-20" />
                <div className="relative rounded-[3rem] border-8 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
                  <img
                    src="/images/design-mode/66aa0e25-4680-413d-b9a9.jpg"
                    alt="Creative workshop illustration with DIY activities"
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative px-6 py-16">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <Link
                href="/workshops"
                className="group relative overflow-hidden rounded-3xl border-4 border-foreground bg-card/80 p-8 transition-all hover:scale-105 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[3px] hover:translate-y-[3px]"
              >
                <div className="flex absolute top-2 right-2 h-12 w-12 rounded-full border-2 glow bg-card/20 border-foreground items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="h-7 w-7"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
                    />
                  </svg>
                </div>
                <h3 className="w-4/5 text-4xl font-black">Workshops</h3>
                <p className="text-sm font-medium text-muted-foreground">
                  Hier geht es zu der Übersicht von all unseren Workshops
                </p>
              </Link>

              <Link
                href="/team"
                className="group relative overflow-hidden rounded-3xl border-4 border-foreground bg-card/80 p-8 transition-all hover:scale-105 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[3px] hover:translate-y-[3px]"
              >
                <div className="flex absolute top-2 right-2 h-12 w-12 rounded-full glow bg-card/20 border-2 border-foreground items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="h-7 w-7"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
                    />
                  </svg>
                </div>
                <h3 className="w-4/5 text-4xl font-black">Team</h3>
                <p className="text-sm font-medium text-muted-foreground">Wer bietet die Workshops an.</p>
              </Link>

              <Link
                href="/impressions"
                className="group relative overflow-hidden rounded-3xl border-4 border-foreground bg-card/80 p-8 transition-all hover:scale-105 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[3px] hover:translate-y-[3px]"
              >
                <div className="flex absolute top-2 right-2 h-12 w-12 rounded-full bg-card/20 glow border-2 border-foreground items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="h-7 w-7"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                    />
                  </svg>
                </div>
                <h3 className=" text-4xl font-black">Impressionen</h3>
                <p className="text-sm font-medium text-muted-foreground">Was wir bisher so gemacht haben.</p>
              </Link>

              <Link
                href="/contact"
                className="group relative overflow-hidden rounded-3xl border-4 border-foreground bg-card/80 p-8 transition-all hover:scale-105 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[3px] hover:translate-y-[3px]"
              >
                <div className="flex absolute top-2 right-2 h-12 w-12 rounded-full bg-card/20 glow border-2 border-foreground items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="h-7 w-7"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                    />
                  </svg>
                </div>
                <h3 className="w-4/5 text-4xl font-black">Kontakt</h3>
                <p className="text-sm font-medium text-muted-foreground">Schreibe uns</p>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
