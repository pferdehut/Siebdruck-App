"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

interface TeamMember {
  id: string
  name: string
}

interface Workshop {
  id: string
  name: string
  type: string
}

interface AvailabilitySlot {
  id: string
  team_member_id: string
  workshop_id: string
  date: string
  is_available: boolean
  team_members: { name: string }
  workshops: { name: string }
}

interface AvailabilityManagerProps {
  teamMembers: TeamMember[]
  workshops: Workshop[]
  existingAvailability: AvailabilitySlot[]
}

export function AvailabilityManager({ teamMembers, workshops, existingAvailability }: AvailabilityManagerProps) {
  const [selectedTeamMember, setSelectedTeamMember] = useState("")
  const [selectedWorkshop, setSelectedWorkshop] = useState("")
  const [selectedDate, setSelectedDate] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage(null)

    const supabase = createClient()

    try {
      // Check if availability already exists
      const { data: existing } = await supabase
        .from("availability_slots")
        .select("*")
        .eq("team_member_id", selectedTeamMember)
        .eq("workshop_id", selectedWorkshop)
        .eq("date", selectedDate)
        .single()

      if (existing) {
        setMessage({ type: "error", text: "Availability already set for this combination" })
        setIsLoading(false)
        return
      }

      // Insert new availability
      const { error } = await supabase.from("availability_slots").insert({
        team_member_id: selectedTeamMember,
        workshop_id: selectedWorkshop,
        date: selectedDate,
        is_available: true,
      })

      if (error) throw error

      setMessage({ type: "success", text: "Availability added successfully!" })
      setSelectedTeamMember("")
      setSelectedWorkshop("")
      setSelectedDate("")

      // Refresh the page data
      router.refresh()
    } catch (error) {
      console.error("[v0] Error adding availability:", error)
      setMessage({ type: "error", text: "Failed to add availability" })
    } finally {
      setIsLoading(false)
    }
  }

  const handleRemove = async (slotId: string) => {
    const supabase = createClient()

    try {
      const { error } = await supabase.from("availability_slots").delete().eq("id", slotId)

      if (error) throw error

      setMessage({ type: "success", text: "Availability removed successfully!" })
      router.refresh()
    } catch (error) {
      console.error("[v0] Error removing availability:", error)
      setMessage({ type: "error", text: "Failed to remove availability" })
    }
  }

  // Group availability by date
  const availabilityByDate = existingAvailability.reduce(
    (acc, slot) => {
      if (!acc[slot.date]) {
        acc[slot.date] = []
      }
      acc[slot.date].push(slot)
      return acc
    },
    {} as Record<string, AvailabilitySlot[]>,
  )

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      {/* Add Availability Form */}
      <Card>
        <CardHeader>
          <CardTitle>Add Availability</CardTitle>
          <CardDescription>Set when a team member is available for a workshop</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="teamMember">Team Member</Label>
              <select
                id="teamMember"
                value={selectedTeamMember}
                onChange={(e) => setSelectedTeamMember(e.target.value)}
                required
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option value="">Select a team member</option>
                {teamMembers.map((member) => (
                  <option key={member.id} value={member.id}>
                    {member.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="workshop">Workshop</Label>
              <select
                id="workshop"
                value={selectedWorkshop}
                onChange={(e) => setSelectedWorkshop(e.target.value)}
                required
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option value="">Select a workshop</option>
                {workshops.map((workshop) => (
                  <option key={workshop.id} value={workshop.id}>
                    {workshop.name} ({workshop.type})
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                required
                min={new Date().toISOString().split("T")[0]}
              />
            </div>

            {message && (
              <div
                className={`rounded-lg p-4 text-sm ${
                  message.type === "success"
                    ? "bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-200"
                    : "bg-red-50 text-red-800 dark:bg-red-900/20 dark:text-red-200"
                }`}
              >
                {message.text}
              </div>
            )}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Adding..." : "Add Availability"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Current Availability */}
      <Card>
        <CardHeader>
          <CardTitle>Current Availability</CardTitle>
          <CardDescription>Team members available for workshops</CardDescription>
        </CardHeader>
        <CardContent>
          {Object.keys(availabilityByDate).length > 0 ? (
            <div className="space-y-6">
              {Object.entries(availabilityByDate)
                .sort(([dateA], [dateB]) => new Date(dateA).getTime() - new Date(dateB).getTime())
                .map(([date, slots]) => (
                  <div key={date} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">{new Date(date).toLocaleDateString()}</h3>
                      <span className="text-sm text-muted-foreground">{slots.length} available</span>
                    </div>
                    <div className="space-y-2">
                      {slots.map((slot) => (
                        <div key={slot.id} className="flex items-center justify-between rounded-lg border p-3">
                          <div>
                            <p className="text-sm font-medium">{slot.team_members.name}</p>
                            <p className="text-xs text-muted-foreground">{slot.workshops.name}</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemove(slot.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            Remove
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <p className="text-center text-sm text-muted-foreground">No availability set yet</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
