import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import { BookingForm } from "@/components/booking-form"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const revalidate = 60

interface WorkshopDetailPageProps {
  params: Promise<{ id: string }>
}

export default async function WorkshopDetailPage({ params }: WorkshopDetailPageProps) {
  const { id } = await params
  const supabase = await createClient()

  const { data: workshop, error } = await supabase.from("workshops").select("*").eq("id", id).single()

  if (error || !workshop) {
    notFound()
  }

  const { data: teamMembers } = await supabase.from("team_members").select("id, name, role, image_url").limit(4)

  return (
    <div className="min-h-screen">
      <section className="border-b bg-muted/50 px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <Badge className="mb-4 border-2">{workshop.location}</Badge>
          <h1 className="text-6xl font-bold tracking-tight text-balance sm:text-7xl">{workshop.name}</h1>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">{workshop.description}</p>

          <div className="mt-8 flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-5 w-5 text-muted-foreground"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6h4.5m4.5 0a9 9 0 1 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
                />
              </svg>
              <span className="text-sm">
                <strong>
                  {workshop.duration_from} - {workshop.duration_to} Uhr
                </strong>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-5 w-5 text-muted-foreground"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
                />
              </svg>
              <span className="text-sm">
                <strong>Max. {workshop.max_participants}</strong> Teilnehmer*innen
              </span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-5 w-5 text-muted-foreground"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <span className="text-sm">
                <strong>CHF {workshop.price}</strong>
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2">
          <div className="space-y-8">
            <Card className="bg-muted/80 border-2">
              <CardHeader>
                <CardTitle>Für Lehrpersonen</CardTitle>
                <CardDescription>
                  Schreibe uns mit gewünschtem Format, Gruppengrössen, Datum und allfälligen Vorkentnissen. Wir melden
                  uns mit einem Vorschlag
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="h-5 w-5 text-primary mt-0.5 flex-shrink-0"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                    <span>Wir bieten klare Vorabinfos (Ablauf, Ziele, Vorbereitung).</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="h-5 w-5 text-primary mt-0.5 flex-shrink-0"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                    <span>Lehrplanbezüge auf Wunsch (Gestalten, Prozesskompetenzen, Teamarbeit).</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="h-5 w-5 text-primary mt-0.5 flex-shrink-0"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                    <span>Begleitunterlagen: kurze Checkliste und Materialliste auf Anfrage.</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {teamMembers && teamMembers.length > 0 && (
              <Card className="bg-muted/80 border-2">
                <CardHeader>
                  <CardTitle>Deine Kursleiter*innen</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {teamMembers.slice(0, 2).map((member) => (
                      <div key={member.id} className="flex items-center gap-3">
                        <img
                          src={member.image_url || "/placeholder.svg?height=48&width=48"}
                          alt={member.name}
                          className="h-12 w-12 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-medium">{member.name}</p>
                          <p className="text-sm text-muted-foreground">{member.role}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          <div>
            <Card className="bg-muted/80 border-2">
              <CardHeader>
                <CardTitle>Buche deinen Platz</CardTitle>
                <CardDescription>Reserviere deinen Platz in diesem Workshop</CardDescription>
              </CardHeader>
              <CardContent>
                <BookingForm workshopId={workshop.id} workshopPrice={workshop.price} />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
