import { createClient } from "@/lib/supabase/server"
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
    <div className="min-h-screen bg-white p-0">
      <div className="grid grid-cols-12 gap-0">
        {/* Hero block - coral */}
        <div className="col-span-6 md:col-span-4 box box-coral min-h-[400px] flex flex-col justify-center">
          <div className="text-xs font-black mb-3 opacity-70">TEAM</div>
          <h1 className="text-7xl md:text-9xl font-display font-black leading-none">
            DAS
            <br />
            GANZE
            <br />
            TEAM
          </h1>
        </div>

        {/* Description block - lime */}
        <div className="col-span-6 md:col-span-5 box box-lime min-h-[400px] flex items-center">
          <p className="text-xl md:text-2xl font-black leading-tight">
            Wir sind ein Team aus kreativen FLINTAQ-Personen mit unterschiedlichen gestalterischen Hintergründen. Uns
            verbindet die Freude am Experimentieren und Wissen weiterzugeben.
          </p>
        </div>

        {/* Accent block - purple */}
        <div className="col-span-12 md:col-span-3 box box-purple min-h-[400px] flex items-center justify-center">
          <div className="text-9xl font-display font-black opacity-20">★</div>
        </div>

        {/* Team members - different colors for each */}
        {teamMembers && teamMembers.length > 0 ? (
          teamMembers.map((member, index) => {
            const colors = ["box-yellow", "box-mint", "box-blue", "box-pink", "box-orange", "box-teal"]
            const colorClass = colors[index % colors.length]
            return (
              <div
                key={member.id}
                className={`col-span-6 md:col-span-4 box ${colorClass} min-h-[300px] hover:scale-[1.02] transition-transform`}
              >
                <div className="h-full flex flex-col justify-between">
                  <div>
                    <div className="text-xs font-black mb-3 opacity-70">{String(index + 1).padStart(2, "0")}</div>
                    <h3 className="text-4xl md:text-5xl font-display font-black leading-none mb-3">{member.name}</h3>
                    <p className="text-sm font-black uppercase mb-4">{member.role}</p>
                    <p className="text-sm leading-relaxed font-bold">{member.bio}</p>
                  </div>
                  {member.email && (
                    <div className="mt-6">
                      <a
                        href={`mailto:${member.email}`}
                        className="inline-block text-xs font-black uppercase underline hover:no-underline"
                      >
                        Kontakt →
                      </a>
                    </div>
                  )}
                </div>
              </div>
            )
          })
        ) : (
          <div className="col-span-12 box box-white min-h-[400px] flex items-center justify-center">
            <div className="text-center">
              <p className="text-3xl font-display font-black uppercase">Keine Teammitglieder gefunden</p>
              <p className="mt-2 text-sm font-bold">Schauen Sie bald wieder vorbei!</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
