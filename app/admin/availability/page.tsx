import { createClient } from "@/lib/supabase/server"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { TeamMemberAvailability } from "@/components/team-member-availability"

export const revalidate = 0

export default async function AvailabilityPage() {
  const supabase = await createClient()

  // Fetch team members
  const { data: teamMembers } = await supabase.from("team_members").select("*").order("name", { ascending: true })

  // Fetch workshops
  const { data: workshops } = await supabase.from("workshops").select("*").order("name", { ascending: true })

  // Fetch team member workshop assignments
  const { data: assignments } = await supabase.from("team_member_workshops").select("team_member_id, workshop_id")

  // Fetch availability slots
  const { data: availabilitySlots } = await supabase
    .from("availability_slots")
    .select("*")
    .order("date", { ascending: true })

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="border-b bg-muted/50 px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center justify-between">
            <div>
              <Badge variant="secondary" className="mb-4">
                Availability Management
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight">Team Availability</h1>
              <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
                Assign workshops to team members and set their availability calendar.
              </p>
            </div>
            <Button asChild variant="outline">
              <Link href="/admin">Back to Dashboard</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Team Member Availability */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-7xl space-y-8">
          {teamMembers && teamMembers.length > 0 ? (
            teamMembers.map((member) => (
              <TeamMemberAvailability
                key={member.id}
                teamMember={member}
                workshops={workshops || []}
                assignments={assignments?.filter((a) => a.team_member_id === member.id) || []}
                availabilitySlots={availabilitySlots?.filter((s) => s.team_member_id === member.id) || []}
              />
            ))
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>No Team Members</CardTitle>
                <CardDescription>Add team members first to manage their availability.</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild>
                  <Link href="/admin/team">Go to Team Management</Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </section>
    </div>
  )
}
