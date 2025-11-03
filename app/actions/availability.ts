"use server"

import { createAdminClient } from "@/lib/supabase/admin"
import { revalidatePath } from "next/cache"

export async function updateTeamMemberWorkshops(teamMemberId: string, workshopIds: string[]) {
  const supabase = createAdminClient()

  // Delete existing assignments
  await supabase.from("team_member_workshops").delete().eq("team_member_id", teamMemberId)

  // Insert new assignments
  if (workshopIds.length > 0) {
    const assignments = workshopIds.map((workshopId) => ({
      team_member_id: teamMemberId,
      workshop_id: workshopId,
    }))

    const { error } = await supabase.from("team_member_workshops").insert(assignments)

    if (error) {
      throw new Error(`Failed to update workshop assignments: ${error.message}`)
    }
  }

  revalidatePath("/admin/availability")
}

export async function updateTeamMemberAvailability(teamMemberId: string, dates: string[]) {
  const supabase = createAdminClient()

  // Get all workshop assignments for this team member
  const { data: assignments } = await supabase
    .from("team_member_workshops")
    .select("workshop_id")
    .eq("team_member_id", teamMemberId)

  if (!assignments || assignments.length === 0) {
    // If no workshops assigned, just delete all availability slots
    await supabase.from("availability_slots").delete().eq("team_member_id", teamMemberId)
    revalidatePath("/admin/availability")
    return
  }

  // Delete existing availability slots
  await supabase.from("availability_slots").delete().eq("team_member_id", teamMemberId)

  // Insert new availability slots for each workshop and date combination
  if (dates.length > 0) {
    const slots = []
    for (const workshopId of assignments.map((a) => a.workshop_id)) {
      for (const date of dates) {
        slots.push({
          team_member_id: teamMemberId,
          workshop_id: workshopId,
          date: date,
          is_available: true,
        })
      }
    }

    const { error } = await supabase.from("availability_slots").insert(slots)

    if (error) {
      throw new Error(`Failed to update availability: ${error.message}`)
    }
  }

  revalidatePath("/admin/availability")
}
