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

export const revalidate = 0

async function addTeamMember(formData: FormData) {
  "use server"

  const supabase = createAdminClient()

  const name = formData.get("name") as string
  const role = formData.get("role") as string
  const bio = formData.get("bio") as string
  const email = formData.get("email") as string
  const image_url = formData.get("image_url") as string

  const { error } = await supabase.from("team_members").insert({
    name,
    role,
    bio,
    email,
    image_url: image_url || "/placeholder.svg?height=400&width=400",
  })

  if (error) {
    console.error("[v0] Error adding team member:", error)
    throw new Error(`Failed to add team member: ${error.message}`)
  }

  revalidatePath("/admin/team")
  revalidatePath("/team")
}

async function deleteTeamMember(formData: FormData) {
  "use server"

  const supabase = createAdminClient()
  const id = formData.get("id") as string

  // First, delete all availability slots for this team member
  const { error: slotsError } = await supabase.from("availability_slots").delete().eq("team_member_id", id)

  if (slotsError) {
    console.error("[v0] Error deleting availability slots:", slotsError)
    throw new Error(`Failed to delete availability slots: ${slotsError.message}`)
  }

  // Then delete the team member
  const { error } = await supabase.from("team_members").delete().eq("id", id)

  if (error) {
    console.error("[v0] Error deleting team member:", error)
    throw new Error(`Failed to delete team member: ${error.message}`)
  }

  revalidatePath("/admin/team")
  revalidatePath("/team")
}

async function updateTeamMember(formData: FormData) {
  "use server"

  const supabase = createAdminClient()

  const id = formData.get("id") as string
  const name = formData.get("name") as string
  const role = formData.get("role") as string
  const bio = formData.get("bio") as string
  const email = formData.get("email") as string
  const image_url = formData.get("image_url") as string

  const { error } = await supabase
    .from("team_members")
    .update({
      name,
      role,
      bio,
      email,
      image_url: image_url || "/placeholder.svg?height=400&width=400",
    })
    .eq("id", id)

  if (error) {
    console.error("[v0] Error updating team member:", error)
    throw new Error(`Failed to update team member: ${error.message}`)
  }

  revalidatePath("/admin/team")
  revalidatePath("/team")
}

export default async function TeamManagementPage() {
  const supabase = await createClient()

  const { data: teamMembers } = await supabase
    .from("team_members")
    .select("*")
    .order("created_at", { ascending: false })

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
            Team-Verwaltung
          </Badge>
          <h1 className="font-display text-5xl font-black tracking-tight text-foreground">Team-Mitglieder verwalten</h1>
          <p className="mt-4 max-w-2xl font-body text-lg font-medium">
            Neue Instruktoren hinzufügen oder bestehende bearbeiten
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Add Team Member Form */}
          <Card className="border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <CardHeader>
              <CardTitle className="font-display text-3xl font-black">Neues Team-Mitglied</CardTitle>
              <CardDescription className="font-body text-base">
                Fülle die Details aus, um einen neuen Instruktor hinzuzufügen
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form action={addTeamMember} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="font-bold">
                    Name *
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    required
                    placeholder="Max Mustermann"
                    className="border-2 border-foreground font-medium"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role" className="font-bold">
                    Rolle *
                  </Label>
                  <Input
                    id="role"
                    name="role"
                    required
                    placeholder="Siebdruck-Experte"
                    className="border-2 border-foreground font-medium"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="font-bold">
                    E-Mail *
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="max@workshop.com"
                    className="border-2 border-foreground font-medium"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio" className="font-bold">
                    Bio *
                  </Label>
                  <Textarea
                    id="bio"
                    name="bio"
                    required
                    placeholder="Kurze Beschreibung der Erfahrung und Expertise..."
                    rows={4}
                    className="border-2 border-foreground font-medium"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image_url" className="font-bold">
                    Bild-URL (optional)
                  </Label>
                  <Input
                    id="image_url"
                    name="image_url"
                    type="url"
                    placeholder="https://example.com/bild.jpg"
                    className="border-2 border-foreground font-medium"
                  />
                  <p className="text-sm text-muted-foreground">Leer lassen für Standard-Platzhalter</p>
                </div>

                <Button
                  type="submit"
                  className="w-full border-2 border-foreground font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                >
                  Team-Mitglied hinzufügen
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Current Team Members */}
          <Card className="border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <CardHeader>
              <CardTitle className="font-display text-3xl font-black">Aktuelle Team-Mitglieder</CardTitle>
              <CardDescription className="font-body text-base">
                {teamMembers?.length || 0} Team-Mitglied(er)
              </CardDescription>
            </CardHeader>
            <CardContent>
              {teamMembers && teamMembers.length > 0 ? (
                <div className="space-y-4">
                  {teamMembers.map((member) => (
                    <details
                      key={member.id}
                      className="group rounded-2xl border-2 border-foreground bg-card shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                    >
                      <summary className="flex cursor-pointer items-start justify-between p-4 list-none">
                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <p className="font-display text-lg font-bold">{member.name}</p>
                            <Badge className="border-2 border-foreground font-bold">{member.role}</Badge>
                          </div>
                          <p className="mt-1 font-body text-sm text-muted-foreground">{member.email}</p>
                          <p className="mt-2 font-body text-sm line-clamp-2">{member.bio}</p>
                        </div>
                        <div className="flex gap-2">
                          <Pencil className="h-4 w-4 text-muted-foreground group-open:rotate-180 transition-transform" />
                        </div>
                      </summary>
                      <div className="border-t-2 border-foreground p-4">
                        <form action={updateTeamMember} className="space-y-4">
                          <input type="hidden" name="id" value={member.id} />

                          <div className="space-y-2">
                            <Label htmlFor={`name-${member.id}`} className="font-bold text-xs">
                              Name
                            </Label>
                            <Input
                              id={`name-${member.id}`}
                              name="name"
                              defaultValue={member.name}
                              required
                              className="border-2 border-foreground font-medium"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor={`role-${member.id}`} className="font-bold text-xs">
                              Rolle
                            </Label>
                            <Input
                              id={`role-${member.id}`}
                              name="role"
                              defaultValue={member.role}
                              required
                              className="border-2 border-foreground font-medium"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor={`email-${member.id}`} className="font-bold text-xs">
                              E-Mail
                            </Label>
                            <Input
                              id={`email-${member.id}`}
                              name="email"
                              type="email"
                              defaultValue={member.email}
                              required
                              className="border-2 border-foreground font-medium"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor={`bio-${member.id}`} className="font-bold text-xs">
                              Bio
                            </Label>
                            <Textarea
                              id={`bio-${member.id}`}
                              name="bio"
                              defaultValue={member.bio}
                              required
                              rows={3}
                              className="border-2 border-foreground font-medium"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor={`image-${member.id}`} className="font-bold text-xs">
                              Bild-URL
                            </Label>
                            <Input
                              id={`image-${member.id}`}
                              name="image_url"
                              type="url"
                              defaultValue={member.image_url}
                              className="border-2 border-foreground font-medium"
                            />
                          </div>

                          <div className="flex gap-2">
                            <Button
                              type="submit"
                              className="flex-1 border-2 border-foreground font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                            >
                              Team-Mitglied aktualisieren
                            </Button>
                            <form action={deleteTeamMember} className="contents">
                              <input type="hidden" name="id" value={member.id} />
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
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground">Noch keine Team-Mitglieder</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
