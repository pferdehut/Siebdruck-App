import { createClient } from "@/lib/supabase/server"
import { WorkshopCard } from "@/components/workshop-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const revalidate = 60

export default async function WorkshopsPage() {
  const supabase = await createClient()

  const { data: workshops, error } = await supabase
    .from("workshops")
    .select(
      `
      *,
      workshop_locations (
        locations (
          id,
          name
        )
      )
    `,
    )
    .order("name", { ascending: true })

  if (error) {
    return (
      <div className="min-h-screen px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <Alert variant="destructive">
            <AlertTitle>Datenbankfehler</AlertTitle>
            <AlertDescription className="mt-2">
              <p className="mb-4">
                {error.message.includes("relation") || error.message.includes("does not exist")
                  ? "Die Datenbanktabellen wurden noch nicht eingerichtet. Bitte führe die SQL-Skripte aus, um die Datenbank zu initialisieren."
                  : `Fehler beim Laden der Workshops: ${error.message}`}
              </p>
              <Button asChild variant="outline">
                <Link href="/setup">Zu den Setup-Anweisungen</Link>
              </Button>
            </AlertDescription>
          </Alert>
        </div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen">
      <div className="relative z-10">
        <section className="relative px-6 py-16">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <div className="space-y-6">
                <div className="flex flex-wrap items-center gap-3">
                  <Badge variant="outline" className="mb-4 border-2">
                    Workshops
                  </Badge>
                </div>
                <h1 className="text-6xl font-bold tracking-tight text-balance lg:text-7xl">
                  Was wir
                  <br />
                  anbieten.
                </h1>
                <div className="text-lg text-muted-foreground text-pretty max-w-xl space-y-4">
                  <p className="font-semibold">Für Schulen, Gruppen und Einzelpersonen</p>
                  <p>
                    Unsere Workshops vermitteln solide Grundlagen und lassen bewusst Raum für eigene Ideen. Inhalte,
                    Dauer und Tiefe passen wir an Niveau und Gruppengrösse an.
                  </p>

                  <Card className="flex flex-col gap-2 bg-card/20 border-secondary/20 border-2 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="font-semibold mb-2">Ziele</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-custom list-inside space-y-1 ml-2">
                        <li>Technik verstehen (Abläufe, Material, Sicherheit)</li>
                        <li>eigenständig ein kleines Projekt realisieren</li>
                        <li>Experimente zulassen und Ergebnisse mitnehmen</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="flex flex-col gap-2 bg-card/20 backdrop-blur-sm border-2 border-secondary/20">
                    <CardHeader>
                      <CardTitle>Formate</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-custom list-inside space-y-1 ml-2">
                        <li>
                          Schulklassen (Sek I/Primar): 2–4 Stunden oder Projekthalbtag; Fokus auf Prozess & gemeinsames
                          Produkt
                        </li>
                        <li>Gruppen/Teams: 3–6 Stunden; von Einführung bis Mini-Edition</li>
                        <li>Einzelpersonen: nach Absprache; projektorientiert</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 py-16">
          <div className="mx-auto max-w-7xl">
            {workshops && workshops.length > 0 ? (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {workshops.map((workshop) => (
                  <WorkshopCard key={workshop.id} workshop={workshop} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="rounded-full bg-muted/80 p-12 mb-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-16 w-16 text-muted-foreground"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
                    />
                  </svg>
                </div>
                <p className="text-lg font-medium">Momentan sind keine Workshops verfügbar.</p>
                <p className="mt-2 text-sm text-muted-foreground">Komme bald wieder zurück!</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}
