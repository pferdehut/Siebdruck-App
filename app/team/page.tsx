import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const revalidate = 60

export default async function TeamPage() {
  const supabase = await createClient()

  const { data: teamMembers, error } = await supabase
    .from("team_members")
    .select("*")
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
                  ? "Die Datenbanktabellen wurden noch nicht eingerichtet. Bitte führen Sie die SQL-Skripte aus, um die Datenbank zu initialisieren."
                  : `Fehler beim Laden der Teammitglieder: ${error.message}`}
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
        {/* Header */}
        <section className="relative px-6 py-16">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <div className="space-y-6">
                <Badge variant="outline" className="mb-4 border-2">
                  Team
                </Badge>
                <h1 className="text-6xl font-bold tracking-tight text-balance lg:text-7xl">
                  Das ganze
                  <br />
                  <span className="text-secondary">Team</span>
                </h1>
                <p className="text-lg text-muted-foreground text-pretty max-w-xl">
                  Wir sind ein Team aus kreativen FLINTAQ-Personen mit unterschiedlichen gestalterischen Hintergründen.<br />
                  Uns verbindet die Freude am Experimentieren und Wissen weiterzugeben.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Grid */}
        <section className="px-6 py-16">
          <div className="mx-auto max-w-7xl">
            {teamMembers && teamMembers.length > 0 ? (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {teamMembers.map((member) => (
                  <Card
                    key={member.id}
                    className="group bg-muted/80 overflow-hidden rounded-3xl border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                  >
                    <CardHeader>
                      <CardTitle className="text-xl">{member.name}</CardTitle>
                      <CardDescription className="text-base">{member.role}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground leading-relaxed">{member.bio}</p>
                      {member.email && (
                        <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="h-4 w-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                            />
                          </svg>
                          <a href={`mailto:${member.email}`} className="hover:text-foreground transition-colors">
                            {member.email}
                          </a>
                        </div>
                      )}
                    </CardContent>
                  </Card>
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
                      d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
                    />
                  </svg>
                </div>
                <p className="text-lg font-medium">Keine Teammitglieder gefunden.</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Schauen Sie bald wieder vorbei, um unsere Kursleiter kennenzulernen!
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}
