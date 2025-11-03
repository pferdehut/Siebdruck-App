"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { updateTeamMemberWorkshops, updateTeamMemberAvailability } from "@/app/actions/availability"
import { useRouter } from "next/navigation"

interface TeamMember {
  id: string
  name: string
  role: string
}

interface Workshop {
  id: string
  name: string
  type: string
}

interface Assignment {
  team_member_id: string
  workshop_id: string
}

interface AvailabilitySlot {
  id: string
  team_member_id: string
  date: string
}

interface TeamMemberAvailabilityProps {
  teamMember: TeamMember
  workshops: Workshop[]
  assignments: Assignment[]
  availabilitySlots: AvailabilitySlot[]
}

export function TeamMemberAvailability({
  teamMember,
  workshops,
  assignments,
  availabilitySlots,
}: TeamMemberAvailabilityProps) {
  const router = useRouter()
  const [selectedWorkshops, setSelectedWorkshops] = useState<string[]>(assignments.map((a) => a.workshop_id))
  const [selectedDates, setSelectedDates] = useState<Date[]>(availabilitySlots.map((slot) => new Date(slot.date)))
  const [isExpanded, setIsExpanded] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const handleWorkshopToggle = (workshopId: string) => {
    setSelectedWorkshops((prev) =>
      prev.includes(workshopId) ? prev.filter((id) => id !== workshopId) : [...prev, workshopId],
    )
  }

  const handleSave = async () => {
    setIsSaving(true)
    setMessage(null)

    try {
      // Update workshop assignments
      await updateTeamMemberWorkshops(teamMember.id, selectedWorkshops)

      // Update availability dates
      await updateTeamMemberAvailability(
        teamMember.id,
        selectedDates.map((date) => date.toISOString().split("T")[0]),
      )

      setMessage({ type: "success", text: "Availability updated successfully!" })
      router.refresh()
    } catch (error) {
      console.error("[v0] Error updating availability:", error)
      setMessage({ type: "error", text: "Failed to update availability" })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{teamMember.name}</CardTitle>
            <CardDescription>{teamMember.role}</CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? "Collapse" : "Expand"}
          </Button>
        </div>
      </CardHeader>

      {isExpanded && (
        <CardContent className="space-y-6">
          {/* Workshop Assignment */}
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold">Assigned Workshops</h3>
              <p className="text-sm text-muted-foreground">Select which workshops this team member can teach</p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {workshops.map((workshop) => (
                <div key={workshop.id} className="flex items-center space-x-2 rounded-lg border p-3">
                  <Checkbox
                    id={`${teamMember.id}-${workshop.id}`}
                    checked={selectedWorkshops.includes(workshop.id)}
                    onCheckedChange={() => handleWorkshopToggle(workshop.id)}
                  />
                  <Label htmlFor={`${teamMember.id}-${workshop.id}`} className="flex-1 cursor-pointer">
                    <div className="font-medium">{workshop.name}</div>
                    <div className="text-xs text-muted-foreground">{workshop.type}</div>
                  </Label>
                </div>
              ))}
            </div>

            {selectedWorkshops.length > 0 && (
              <div className="flex flex-wrap gap-2">
                <span className="text-sm text-muted-foreground">Selected:</span>
                {selectedWorkshops.map((workshopId) => {
                  const workshop = workshops.find((w) => w.id === workshopId)
                  return workshop ? (
                    <Badge key={workshopId} variant="secondary">
                      {workshop.name}
                    </Badge>
                  ) : null
                })}
              </div>
            )}
          </div>

          {/* Availability Calendar */}
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold">Availability Calendar</h3>
              <p className="text-sm text-muted-foreground">Select dates when this team member is available</p>
            </div>

            <div className="flex justify-center">
              <Calendar
                mode="multiple"
                selected={selectedDates}
                onSelect={(dates) => setSelectedDates(dates || [])}
                className="rounded-md border"
                disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
              />
            </div>

            {selectedDates.length > 0 && (
              <div className="space-y-2">
                <span className="text-sm font-medium">Selected Dates ({selectedDates.length}):</span>
                <div className="flex flex-wrap gap-2">
                  {selectedDates
                    .sort((a, b) => a.getTime() - b.getTime())
                    .slice(0, 10)
                    .map((date, index) => (
                      <Badge key={index} variant="outline">
                        {date.toLocaleDateString()}
                      </Badge>
                    ))}
                  {selectedDates.length > 10 && <Badge variant="outline">+{selectedDates.length - 10} more</Badge>}
                </div>
              </div>
            )}
          </div>

          {/* Message */}
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

          {/* Save Button */}
          <Button onClick={handleSave} disabled={isSaving} className="w-full">
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </CardContent>
      )}
    </Card>
  )
}
