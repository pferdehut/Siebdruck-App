import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Users, Calendar, Wrench, MapPin } from "lucide-react"

export const revalidate = 0

export default async function AdminPage() {
  const supabase = await createClient()

  const { data: bookings } = await supabase
    .from("bookings")
    .select(
      `
      *,
      workshops (
        name
      )
    `,
    )
    .order("created_at", { ascending: false })

  const { data: availabilitySlots } = await supabase
    .from("availability_slots")
    .select(
      `
      *,
      team_members (name),
      workshops (name)
    `,
    )
    .eq("is_available", true)

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    confirmed: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    cancelled: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="border-b-4 border-foreground bg-primary px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <Badge variant="secondary" className="mb-4 border-2 border-foreground font-bold">
            Admin Dashboard
          </Badge>
          <h1 className="font-display text-5xl font-black tracking-tight text-foreground">Workshop-Verwaltung</h1>
          <p className="mt-4 max-w-2xl font-body text-lg font-medium">Buchungen und Team-Verfügbarkeit verwalten</p>
        </div>
      </section>

      {/* Navigation Menu */}
      <section className="border-b-2 border-foreground bg-background px-6 py-6">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap gap-3">
            <Button
              asChild
              variant="outline"
              className="border-2 border-foreground font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] bg-transparent"
            >
              <Link href="/admin/workshops">
                <Wrench className="mr-2 h-4 w-4" />
                Workshops verwalten
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-2 border-foreground font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] bg-transparent"
            >
              <Link href="/admin/team">
                <Users className="mr-2 h-4 w-4" />
                Team verwalten
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-2 border-foreground font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] bg-transparent"
            >
              <Link href="/admin/locations">
                <MapPin className="mr-2 h-4 w-4" />
                Standorte verwalten
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-2 border-foreground font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] bg-transparent"
            >
              <Link href="/admin/availability">
                <Calendar className="mr-2 h-4 w-4" />
                Verfügbarkeit verwalten
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="px-6 py-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="border-4 border-foreground shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <CardHeader className="pb-3">
                <CardDescription>Gesamt Buchungen</CardDescription>
                <CardTitle className="text-3xl">{bookings?.length || 0}</CardTitle>
              </CardHeader>
            </Card>
            <Card className="border-4 border-foreground shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <CardHeader className="pb-3">
                <CardDescription>Ausstehend</CardDescription>
                <CardTitle className="text-3xl">
                  {bookings?.filter((b) => b.status === "pending").length || 0}
                </CardTitle>
              </CardHeader>
            </Card>
            <Card className="border-4 border-foreground shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <CardHeader className="pb-3">
                <CardDescription>Bestätigt</CardDescription>
                <CardTitle className="text-3xl">
                  {bookings?.filter((b) => b.status === "confirmed").length || 0}
                </CardTitle>
              </CardHeader>
            </Card>
            <Card className="border-4 border-foreground shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <CardHeader className="pb-3">
                <CardDescription>Verfügbare Slots</CardDescription>
                <CardTitle className="text-3xl">{availabilitySlots?.length || 0}</CardTitle>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Bookings List */}
      <section className="px-6 py-8">
        <div className="mx-auto max-w-7xl">
          <Card className="border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <CardHeader>
              <CardTitle className="font-display text-3xl font-black">Neueste Buchungen</CardTitle>
              <CardDescription className="font-body text-base">Alle Workshop-Buchungsanfragen</CardDescription>
            </CardHeader>
            <CardContent>
              {bookings && bookings.length > 0 ? (
                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="flex items-center justify-between rounded-2xl border-2 border-foreground p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <p className="font-medium">{booking.participant_name}</p>
                          <Badge className={statusColors[booking.status as keyof typeof statusColors]}>
                            {booking.status}
                          </Badge>
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {booking.workshops?.name} - {new Date(booking.date).toLocaleDateString("de-CH")}
                        </p>
                        <p className="mt-1 text-sm text-muted-foreground">{booking.participant_email}</p>
                        {booking.notes && <p className="mt-2 text-sm italic text-muted-foreground">{booking.notes}</p>}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {new Date(booking.created_at).toLocaleDateString("de-CH")}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground">Noch keine Buchungen</p>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
