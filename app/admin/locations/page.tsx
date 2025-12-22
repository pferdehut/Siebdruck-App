import { createClient } from "@/lib/supabase/server"
import { createAdminClient } from "@/lib/supabase/admin"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
import { revalidatePath } from "next/cache"
import { Trash2, ArrowLeft, Pencil } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export const revalidate = 0

async function addLocation(formData: FormData) {
  "use server"

  const supabase = createAdminClient()
  const name = formData.get("name") as string
  const location_address = formData.get("location_address") as string

  const { error } = await supabase.from("locations").insert({
    name,
    location_address: location_address || null,
  })

  if (error) {
    throw new Error(`Failed to add location: ${error.message}`)
  }

  revalidatePath("/admin/locations")
  revalidatePath("/admin/workshops")
  revalidatePath("/contact")
}

async function updateLocation(formData: FormData) {
  "use server"

  const supabase = createAdminClient()
  const id = formData.get("id") as string
  const name = formData.get("name") as string
  const location_address = formData.get("location_address") as string

  const { error } = await supabase
    .from("locations")
    .update({
      name,
      location_address: location_address || null,
    })
    .eq("id", id)

  if (error) {
    throw new Error(`Failed to update location: ${error.message}`)
  }

  revalidatePath("/admin/locations")
  revalidatePath("/admin/workshops")
  revalidatePath("/contact")
}

async function deleteLocation(formData: FormData) {
  "use server"

  const supabase = createAdminClient()
  const id = formData.get("id") as string

  const { error } = await supabase.from("locations").delete().eq("id", id)

  if (error) {
    throw new Error(`Failed to delete location: ${error.message}`)
  }

  revalidatePath("/admin/locations")
  revalidatePath("/admin/workshops")
  revalidatePath("/contact")
}

export default async function LocationsManagementPage() {
  const supabase = await createClient()

  const { data: locations } = await supabase.from("locations").select("*").order("name", { ascending: true })

  return (
    <div className="min-h-screen bg-background">
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
            Neue Standorte hinzufügen oder bestehende bearbeiten
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-6 py-12">
        <div className="grid gap-8 lg:grid-cols-2">
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
                    placeholder="z.B. Dynamo, vor Ort, Atelier"
                    className="border-2 border-foreground font-medium"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location_address" className="font-bold">
                    Adresse
                  </Label>
                  <Textarea
                    id="location_address"
                    name="location_address"
                    placeholder="z.B. Musterstrasse 0, 0000 Ort"
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
                      className="rounded-2xl border-2 border-foreground bg-card p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                    >
                      <div className="mb-3">
                        <p className="font-display text-lg font-bold">{location.name}</p>
                        {location.location_address && (
                          <p className="text-sm text-muted-foreground mt-1 whitespace-pre-line">
                            {location.location_address}
                          </p>
                        )}
                      </div>

                      <div className="flex gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex-1 border-2 border-foreground font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] bg-transparent"
                            >
                              <Pencil className="h-4 w-4 mr-2" />
                              Bearbeiten
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                            <DialogHeader>
                              <DialogTitle className="font-display text-2xl font-black">
                                Standort bearbeiten
                              </DialogTitle>
                              <DialogDescription>Aktualisiere die Informationen für diesen Standort</DialogDescription>
                            </DialogHeader>
                            <form action={updateLocation} className="space-y-6">
                              <input type="hidden" name="id" value={location.id} />
                              <div className="space-y-2">
                                <Label htmlFor={`edit-name-${location.id}`} className="font-bold">
                                  Standort-Name *
                                </Label>
                                <Input
                                  id={`edit-name-${location.id}`}
                                  name="name"
                                  required
                                  defaultValue={location.name}
                                  className="border-2 border-foreground font-medium"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor={`edit-address-${location.id}`} className="font-bold">
                                  Adresse
                                </Label>
                                <Textarea
                                  id={`edit-address-${location.id}`}
                                  name="location_address"
                                  defaultValue={location.location_address || ""}
                                  className="border-2 border-foreground font-medium min-h-[80px]"
                                />
                              </div>
                              <Button
                                type="submit"
                                className="w-full border-2 border-foreground font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                              >
                                Änderungen speichern
                              </Button>
                            </form>
                          </DialogContent>
                        </Dialog>

                        <form action={deleteLocation}>
                          <input type="hidden" name="id" value={location.id} />
                          <Button
                            type="submit"
                            variant="destructive"
                            size="sm"
                            className="border-2 border-foreground font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </form>
                      </div>
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
