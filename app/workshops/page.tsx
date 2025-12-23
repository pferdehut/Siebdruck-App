import { createClient } from "@/lib/supabase/server"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import Link from "next/link"

export const revalidate = 60

export default async function WorkshopsPage() {
  const supabase = await createClient()

  const { data: workshops, error } = await supabase.from("workshops").select("*").order("name", { ascending: true })

  if (error) {
    // Check if it's a connection error (521, 502, 503, etc.)
    const isConnectionError =
      error.message.includes("fetch") ||
      error.message.includes("FetchError") ||
      error.message.includes("521") ||
      error.message.includes("502") ||
      error.message.includes("503")

    return (
      <div className="min-h-screen px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <Alert variant="destructive">
            <AlertTitle>{isConnectionError ? "Datenbankverbindung nicht verfügbar" : "Datenbankfehler"}</AlertTitle>
            <AlertDescription className="mt-2 space-y-4">
              {isConnectionError ? (
                <>
                  <p>Die Datenbank ist momentan nicht erreichbar. Dies kann folgende Gründe haben:</p>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <li>Das Supabase-Projekt wurde pausiert (bei kostenlosen Projekten nach 7 Tagen Inaktivität)</li>
                    <li>Temporäre Wartungsarbeiten</li>
                    <li>Netzwerkprobleme</li>
                  </ul>
                  <p className="font-semibold mt-4">
                    Bitte gehe zu deinem{" "}
                    <a
                      href="https://supabase.com/dashboard"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline"
                    >
                      Supabase Dashboard
                    </a>{" "}
                    und stelle das Projekt wieder her.
                  </p>
                </>
              ) : (
                <p>
                  {error.message.includes("relation") || error.message.includes("does not exist")
                    ? "Die Datenbanktabellen wurden noch nicht eingerichtet. Bitte führe die SQL-Skripte aus, um die Datenbank zu initialisieren."
                    : `Fehler beim Laden der Workshops: ${error.message}`}
                </p>
              )}
            </AlertDescription>
          </Alert>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white p-0">
      <div className="grid grid-cols-12 gap-0">
        {/* Hero title block - electric blue */}
        <div className="col-span-12 md:col-span-5 box box-blue min-h-[350px] flex flex-col justify-center">
          <div className="text-xs font-black mb-3 opacity-70">WORKSHOPS</div>
          <h1 className="text-7xl md:text-9xl font-display font-black leading-none">
            WAS
            <br />
            WIR
            <br />
            ANBIE
            <br />
            TEN
          </h1>
        </div>

        {/* Description block - neon yellow */}
        <div className="col-span-12 md:col-span-4 box box-yellow min-h-[350px] flex items-center">
          <div>
            <p className="text-sm font-black mb-4 uppercase">Für Schulen, Gruppen und Einzelpersonen</p>
            <p className="text-base leading-relaxed font-bold">
              Unsere Workshops vermitteln solide Grundlagen und lassen bewusst Raum für eigene Ideen. Inhalte, Dauer und
              Tiefe passen wir an Niveau und Gruppengrösse an.
            </p>
          </div>
        </div>

        {/* Goals block - hot pink */}
        <div className="col-span-12 md:col-span-3 box box-pink min-h-[350px]">
          <div className="text-xs font-black mb-3 opacity-70">01</div>
          <h2 className="text-4xl md:text-5xl font-display font-black leading-none mb-6">ZIELE</h2>
          <ul className="space-y-3 text-sm font-bold leading-relaxed">
            <li>→ Technik verstehen (Abläufe, Material, Sicherheit)</li>
            <li>→ eigenständig ein kleines Projekt realisieren</li>
            <li>→ Experimente zulassen und Ergebnisse mitnehmen</li>
          </ul>
        </div>

        {/* Formats block - mint green */}
        <div className="col-span-12 box box-mint min-h-[250px]">
          <div className="text-xs font-black mb-3 opacity-70">02</div>
          <h2 className="text-4xl md:text-5xl font-display font-black leading-none mb-8">FORMATE</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <p className="text-sm font-black mb-2 uppercase">Schulklassen</p>
              <p className="text-xs leading-relaxed font-bold">
                (Sek I/Primar): 2–4 Stunden oder Projekthalbtag; Fokus auf Prozess & gemeinsames Produkt
              </p>
            </div>
            <div>
              <p className="text-sm font-black mb-2 uppercase">Gruppen/Teams</p>
              <p className="text-xs leading-relaxed font-bold">3–6 Stunden; von Einführung bis Mini-Edition</p>
            </div>
            <div>
              <p className="text-sm font-black mb-2 uppercase">Einzelpersonen</p>
              <p className="text-xs leading-relaxed font-bold">nach Absprache; projektorientiert</p>
            </div>
          </div>
        </div>

        {/* Workshop cards section - white background */}
        <div className="col-span-12 box box-white min-h-[400px]">
          {workshops && workshops.length > 0 ? (
            <div className="grid gap-0 md:grid-cols-2 lg:grid-cols-3">
              {workshops.map((workshop, index) => {
                const colors = ["box-coral", "box-purple", "box-teal", "box-peach", "box-lime", "box-sky"]
                const colorClass = colors[index % colors.length]
                return (
                  <Link
                    key={workshop.id}
                    href={`/workshops/${workshop.id}`}
                    className={`box ${colorClass} min-h-[300px] hover:scale-[1.02] transition-transform`}
                  >
                    <div className="h-full flex flex-col justify-between">
                      <div>
                        <div className="text-xs font-black mb-2 opacity-70">{String(index + 1).padStart(2, "0")}</div>
                        <h3 className="text-3xl md:text-4xl font-display font-black leading-none mb-4">
                          {workshop.name}
                        </h3>
                        <p className="text-sm leading-relaxed font-bold line-clamp-3">{workshop.description}</p>
                      </div>
                      <div className="mt-6 space-y-2">
                        <p className="text-xs font-black uppercase">
                          {workshop.duration_from} - {workshop.duration_to} Uhr
                        </p>
                        <p className="text-lg font-black">CHF {workshop.price}</p>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          ) : (
            <div className="flex min-h-[400px] items-center justify-center">
              <div className="text-center">
                <p className="text-3xl font-display font-black uppercase">Momentan keine Workshops verfügbar</p>
                <p className="mt-2 text-sm font-bold">Komme bald wieder zurück!</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
