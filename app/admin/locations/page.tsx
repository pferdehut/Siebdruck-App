import { createClient } from "@/lib/supabase/server"
import { createAdminClient } from "@/lib/supabase/admin"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { revalidatePath } from "next/cache"
import { Trash2, ArrowLeft } from "lucide-react"

export const revalidate = 0

async function addLocation(formData: FormData) {
  "use server"

  const supabase = createAdminClient()
  const name = formData.get("name") as string

  const { error } = await supabase.from("locations").insert({ name })

  if (error) {
    console.error("[v0] Error adding location:", error)
    throw new Error(`Failed to add location: ${error.message}`)
  }

  revalidatePath("/admin/locations")
  revalidatePath("/admin/workshops")
}

async function deleteLocation(formData: FormData) {
  "use server"

  const supabase = createAdminClient()
  const id = formData.get("id") as string

  const { error } = await supabase.from("locations").delete().eq("id", id)

  if (error) {
    console.error("[v0] Error deleting location:", error)
    throw new Error(`Failed to delete location: ${error.message}`)
  }

  revalidatePath("/admin/locations")
  revalidatePath("/admin/workshops")
}

export default async function LocationsManagementPage() {
  const supabase = await createClient()

  const { data: locations } = await supabase.from("locations").select("*").order("name", { ascending: true })

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="border-b-4 border-foreground bg-primary px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <Button asChild variant="outline" className="mb-6 border-2 border-foreground font-bold bg-transparent">
            <Link href="/admin">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Zurück zum Dashboard
            </Link>
          </Button>
          <Badge variant="secondary" className="mb-4 border-2 border-foreground font-bold">
            Standort-Verwaltung
          </Badge>
          <h1 className="font-display text-5xl font-black tracking-tight text-foreground">Standorte verwalten</h1>
          <p className="mt-4 max-w-2xl font-body text-lg font-medium">
            Neue Standorte hinzufügen oder bestehende entfernen
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-6 py-12">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Add Location Form */}
          <Card className="border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <CardHeader>
              <CardTitle className="font-display text-3xl font-black">Neuer Standort</CardTitle>
              <CardDescription className="font-body text-base">
                Füge einen neuen Workshop-Standort hinzu
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form action={addLocation} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="font-bold">
                    Standort-Name *
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    required
                    placeholder="z.B. dynamo, vor Ort, Atelier"
                    className="border-2 border-foreground font-medium"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full border-2 border-foreground font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                >
                  Standort hinzufügen
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Current Locations */}
          <Card className="border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <CardHeader>
              <CardTitle className="font-display text-3xl font-black">Aktuelle Standorte</CardTitle>
              <CardDescription className="font-body text-base">
                {locations?.length || 0} Standort(e) verfügbar
              </CardDescription>
            </CardHeader>
            <CardContent>
              {locations && locations.length > 0 ? (
                <div className="space-y-4">
                  {locations.map((location) => (
                    <div
                      key={location.id}
                      className="flex items-center justify-between rounded-2xl border-2 border-foreground bg-card p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                    >
                      <p className="font-display text-lg font-bold">{location.name}</p>
                      <form action={deleteLocation}>
                        <input type="hidden" name="id" value={location.id} />
                        <Button
                          type="submit"
                          variant="destructive"
                          size="icon"
                          className="border-2 border-foreground font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </form>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground">Noch keine Standorte</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
