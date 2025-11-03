import { createClient } from "@/lib/supabase/server"
import { createAdminClient } from "@/lib/supabase/admin"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
import { revalidatePath } from "next/cache"
import { Trash2, ArrowLeft, Pencil } from "lucide-react"

export const revalidate = 0

async function addWorkshop(formData: FormData) {
  "use server"

  const supabase = createAdminClient()

  const name = formData.get("name") as string
  const description = formData.get("description") as string
  const duration_from = formData.get("duration_from") as string
  const duration_to = formData.get("duration_to") as string
  const max_participants = Number.parseInt(formData.get("max_participants") as string)
  const price = Number.parseFloat(formData.get("price") as string)

  const { data: workshop, error: workshopError } = await supabase
    .from("workshops")
    .insert({
      name,
      description,
      duration_from,
      duration_to,
      max_participants,
      price,
    })
    .select()
    .single()

  if (workshopError) {
    console.error("[v0] Error adding workshop:", workshopError)
    throw new Error(`Failed to add workshop: ${workshopError.message}`)
  }

  const locationIds = formData.getAll("locations") as string[]
  if (locationIds.length > 0) {
    const workshopLocations = locationIds.map((locationId) => ({
      workshop_id: workshop.id,
      location_id: locationId,
    }))

    const { error: locationsError } = await supabase.from("workshop_locations").insert(workshopLocations)

    if (locationsError) {
      console.error("[v0] Error adding workshop locations:", locationsError)
      throw new Error(`Failed to add workshop locations: ${locationsError.message}`)
    }
  }

  revalidatePath("/admin/workshops")
  revalidatePath("/workshops")
  revalidatePath("/")
}

async function updateWorkshop(formData: FormData) {
  "use server"

  const supabase = createAdminClient()

  const id = formData.get("id") as string
  const name = formData.get("name") as string
  const description = formData.get("description") as string
  const duration_from = formData.get("duration_from") as string
  const duration_to = formData.get("duration_to") as string
  const max_participants = Number.parseInt(formData.get("max_participants") as string)
  const price = Number.parseFloat(formData.get("price") as string)

  const { error } = await supabase
    .from("workshops")
    .update({
      name,
      description,
      duration_from,
      duration_to,
      max_participants,
      price,
    })
    .eq("id", id)

  if (error) {
    console.error("[v0] Error updating workshop:", error)
    throw new Error(`Failed to update workshop: ${error.message}`)
  }

  await supabase.from("workshop_locations").delete().eq("workshop_id", id)

  const locationIds = formData.getAll("locations") as string[]
  if (locationIds.length > 0) {
    const workshopLocations = locationIds.map((locationId) => ({
      workshop_id: id,
      location_id: locationId,
    }))

    const { error: locationsError } = await supabase.from("workshop_locations").insert(workshopLocations)

    if (locationsError) {
      console.error("[v0] Error updating workshop locations:", locationsError)
      throw new Error(`Failed to update workshop locations: ${locationsError.message}`)
    }
  }

  revalidatePath("/admin/workshops")
  revalidatePath("/workshops")
  revalidatePath("/")
}

async function deleteWorkshop(formData: FormData) {
  "use server"

  const supabase = createAdminClient()
  const id = formData.get("id") as string

  // First, delete all availability slots for this workshop
  const { error: slotsError } = await supabase.from("availability_slots").delete().eq("workshop_id", id)

  if (slotsError) {
    console.error("[v0] Error deleting availability slots:", slotsError)
    throw new Error(`Failed to delete availability slots: ${slotsError.message}`)
  }

  // Delete all bookings for this workshop
  const { error: bookingsError } = await supabase.from("bookings").delete().eq("workshop_id", id)

  if (bookingsError) {
    console.error("[v0] Error deleting bookings:", bookingsError)
    throw new Error(`Failed to delete bookings: ${bookingsError.message}`)
  }

  // Then delete the workshop
  const { error } = await supabase.from("workshops").delete().eq("id", id)

  if (error) {
    console.error("[v0] Error deleting workshop:", error)
    throw new Error(`Failed to delete workshop: ${error.message}`)
  }

  revalidatePath("/admin/workshops")
  revalidatePath("/workshops")
  revalidatePath("/")
}

export default async function WorkshopsManagementPage() {
  const supabase = await createClient()

  const { data: workshops } = await supabase
    .from("workshops")
    .select(
      `
      *,
      workshop_locations (
        location_id,
        locations (
          id,
          name
        )
      )
    `,
    )
    .order("created_at", { ascending: false })

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
            Workshop-Verwaltung
          </Badge>
          <h1 className="font-display text-5xl font-black tracking-tight text-foreground">Workshops verwalten</h1>
          <p className="mt-4 max-w-2xl font-body text-lg font-medium">
            Neue Workshops hinzufügen oder bestehende bearbeiten
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Add Workshop Form */}
          <Card className="border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <CardHeader>
              <CardTitle className="font-display text-3xl font-black">Neuer Workshop</CardTitle>
              <CardDescription className="font-body text-base">
                Fülle die Details aus, um einen neuen Workshop zu erstellen
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form action={addWorkshop} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="font-bold">
                    Workshop-Name *
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    required
                    placeholder="Siebdruck Basics"
                    className="border-2 border-foreground font-medium"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="font-bold">
                    Beschreibung *
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    required
                    placeholder="Lerne die Grundlagen des Siebdrucks..."
                    rows={4}
                    className="border-2 border-foreground font-medium"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="font-bold">Standorte * (mindestens einen auswählen)</Label>
                  <div className="space-y-2 rounded-lg border-2 border-foreground p-4">
                    {locations?.map((location) => (
                      <div key={location.id} className="flex items-center space-x-2">
                        <Checkbox id={`location-${location.id}`} name="locations" value={location.id} />
                        <label
                          htmlFor={`location-${location.id}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {location.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="max_participants" className="font-bold">
                      Max. Teilnehmer *
                    </Label>
                    <Input
                      id="max_participants"
                      name="max_participants"
                      type="number"
                      required
                      min="1"
                      defaultValue="12"
                      className="border-2 border-foreground font-medium"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="price" className="font-bold">
                      Preis (CHF) *
                    </Label>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      step="0.01"
                      required
                      min="0"
                      placeholder="299.00"
                      className="border-2 border-foreground font-medium"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="duration_from" className="font-bold">
                      Von (Uhrzeit) *
                    </Label>
                    <Input
                      id="duration_from"
                      name="duration_from"
                      type="time"
                      required
                      defaultValue="09:00"
                      className="border-2 border-foreground font-medium"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="duration_to" className="font-bold">
                      Bis (Uhrzeit) *
                    </Label>
                    <Input
                      id="duration_to"
                      name="duration_to"
                      type="time"
                      required
                      defaultValue="17:00"
                      className="border-2 border-foreground font-medium"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full border-2 border-foreground font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                >
                  Workshop hinzufügen
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Current Workshops */}
          <Card className="border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <CardHeader>
              <CardTitle className="font-display text-3xl font-black">Aktuelle Workshops</CardTitle>
              <CardDescription className="font-body text-base">
                {workshops?.length || 0} Workshop(s) verfügbar
              </CardDescription>
            </CardHeader>
            <CardContent>
              {workshops && workshops.length > 0 ? (
                <div className="space-y-4">
                  {workshops.map((workshop) => {
                    const workshopLocations =
                      workshop.workshop_locations?.map((wl: any) => wl.locations?.name).filter(Boolean) || []

                    return (
                      <details
                        key={workshop.id}
                        className="group rounded-2xl border-2 border-foreground bg-card shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                      >
                        <summary className="flex cursor-pointer items-start justify-between p-4 list-none">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <p className="font-display text-lg font-bold">{workshop.name}</p>
                              {workshopLocations.map((loc: string) => (
                                <Badge key={loc} className="bg-primary/20 text-primary border-primary">
                                  {loc}
                                </Badge>
                              ))}
                            </div>
                            <p className="mt-1 font-body text-sm text-muted-foreground">
                              CHF {workshop.price} • {workshop.duration_from} - {workshop.duration_to} • Max{" "}
                              {workshop.max_participants} Personen
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Pencil className="h-4 w-4 text-muted-foreground group-open:rotate-180 transition-transform" />
                          </div>
                        </summary>
                        <div className="border-t-2 border-foreground p-4">
                          <form action={updateWorkshop} className="space-y-4">
                            <input type="hidden" name="id" value={workshop.id} />

                            <div className="space-y-2">
                              <Label htmlFor={`name-${workshop.id}`} className="font-bold text-xs">
                                Workshop-Name
                              </Label>
                              <Input
                                id={`name-${workshop.id}`}
                                name="name"
                                defaultValue={workshop.name}
                                required
                                className="border-2 border-foreground font-medium"
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor={`description-${workshop.id}`} className="font-bold text-xs">
                                Beschreibung
                              </Label>
                              <Textarea
                                id={`description-${workshop.id}`}
                                name="description"
                                defaultValue={workshop.description}
                                required
                                rows={3}
                                className="border-2 border-foreground font-medium"
                              />
                            </div>

                            <div className="space-y-2">
                              <Label className="font-bold text-xs">Standorte</Label>
                              <div className="space-y-2 rounded-lg border-2 border-foreground p-3">
                                {locations?.map((location) => {
                                  const isChecked = workshopLocations.includes(location.name)
                                  return (
                                    <div key={location.id} className="flex items-center space-x-2">
                                      <Checkbox
                                        id={`location-${workshop.id}-${location.id}`}
                                        name="locations"
                                        value={location.id}
                                        defaultChecked={isChecked}
                                      />
                                      <label
                                        htmlFor={`location-${workshop.id}-${location.id}`}
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                      >
                                        {location.name}
                                      </label>
                                    </div>
                                  )
                                })}
                              </div>
                            </div>

                            <div className="grid gap-3 sm:grid-cols-2">
                              <div className="space-y-2">
                                <Label htmlFor={`max-${workshop.id}`} className="font-bold text-xs">
                                  Max. Teilnehmer
                                </Label>
                                <Input
                                  id={`max-${workshop.id}`}
                                  name="max_participants"
                                  type="number"
                                  defaultValue={workshop.max_participants}
                                  required
                                  min="1"
                                  className="border-2 border-foreground font-medium"
                                />
                              </div>

                              <div className="space-y-2">
                                <Label htmlFor={`price-${workshop.id}`} className="font-bold text-xs">
                                  Preis (CHF)
                                </Label>
                                <Input
                                  id={`price-${workshop.id}`}
                                  name="price"
                                  type="number"
                                  step="0.01"
                                  defaultValue={workshop.price}
                                  required
                                  min="0"
                                  className="border-2 border-foreground font-medium"
                                />
                              </div>
                            </div>

                            <div className="grid gap-3 sm:grid-cols-2">
                              <div className="space-y-2">
                                <Label htmlFor={`from-${workshop.id}`} className="font-bold text-xs">
                                  Von (Uhrzeit)
                                </Label>
                                <Input
                                  id={`from-${workshop.id}`}
                                  name="duration_from"
                                  type="time"
                                  defaultValue={workshop.duration_from}
                                  required
                                  className="border-2 border-foreground font-medium"
                                />
                              </div>

                              <div className="space-y-2">
                                <Label htmlFor={`to-${workshop.id}`} className="font-bold text-xs">
                                  Bis (Uhrzeit)
                                </Label>
                                <Input
                                  id={`to-${workshop.id}`}
                                  name="duration_to"
                                  type="time"
                                  defaultValue={workshop.duration_to}
                                  required
                                  className="border-2 border-foreground font-medium"
                                />
                              </div>
                            </div>

                            <div className="flex gap-2">
                              <Button
                                type="submit"
                                className="flex-1 border-2 border-foreground font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                              >
                                Workshop aktualisieren
                              </Button>
                              <form action={deleteWorkshop} className="contents">
                                <input type="hidden" name="id" value={workshop.id} />
                                <Button
                                  type="submit"
                                  variant="destructive"
                                  className="border-2 border-foreground font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </form>
                            </div>
                          </form>
                        </div>
                      </details>
                    )
                  })}
                </div>
              ) : (
                <p className="text-center text-muted-foreground">Noch keine Workshops</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
