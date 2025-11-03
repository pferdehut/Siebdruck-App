"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

interface BookingFormProps {
  workshopId: string
  workshopPrice: number
}

interface DateAvailability {
  [date: string]: number // date string -> count of available instructors
}

export function BookingForm({ workshopId, workshopPrice }: BookingFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>()
  const [dateAvailability, setDateAvailability] = useState<DateAvailability>({})
  const [isLoadingAvailability, setIsLoadingAvailability] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchAvailability = async () => {
      setIsLoadingAvailability(true)
      const supabase = createClient()

      // Get all availability slots for this workshop
      const { data: availableSlots, error: availError } = await supabase
        .from("availability_slots")
        .select("date, team_member_id")
        .eq("workshop_id", workshopId)
        .eq("is_available", true)
        .gte("date", new Date().toISOString().split("T")[0]) // Only future dates

      if (availError) {
        console.error("[v0] Error fetching availability:", availError)
        setIsLoadingAvailability(false)
        return
      }

      // Count instructors per date
      const availability: DateAvailability = {}
      availableSlots?.forEach((slot) => {
        availability[slot.date] = (availability[slot.date] || 0) + 1
      })

      console.log("[v0] Availability data:", availability)
      setDateAvailability(availability)
      setIsLoadingAvailability(false)
    }

    fetchAvailability()
  }, [workshopId])

  const checkAvailability = async (date: Date) => {
    if (!date) return false

    const dateString = date.toISOString().split("T")[0]
    const instructorCount = dateAvailability[dateString] || 0

    // Need at least 2 team members available
    if (instructorCount < 2) {
      setError(
        `Dieses Datum ist nicht verfügbar. Wir benötigen mindestens 2 Kursleiter*innen für jeden Workshop. Aktuell ${instructorCount} Kursleiter*in verfügbar.`,
      )
      return false
    }

    setError(null)
    return true
  }

  const handleDateChange = async (date: Date | undefined) => {
    setSelectedDate(date)
    setError(null)
    if (date) {
      await checkAvailability(date)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    if (!selectedDate) {
      setError("Bitte wählen Sie ein Datum aus.")
      setIsLoading(false)
      return
    }

    const isAvailable = await checkAvailability(selectedDate)
    if (!isAvailable) {
      setIsLoading(false)
      return
    }

    const formData = new FormData(e.currentTarget)
    const supabase = createClient()

    try {
      const { error: bookingError } = await supabase.from("bookings").insert({
        workshop_id: workshopId,
        date: selectedDate.toISOString().split("T")[0],
        participant_name: formData.get("name") as string,
        participant_email: formData.get("email") as string,
        participant_phone: formData.get("phone") as string,
        notes: formData.get("notes") as string,
        status: "pending",
      })

      if (bookingError) throw bookingError

      setSuccess(true)
      setTimeout(() => {
        router.push("/workshops")
      }, 2000)
    } catch (err) {
      console.error("[v0] Booking error:", err)
      setError(err instanceof Error ? err.message : "Buchung fehlgeschlagen")
    } finally {
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <div className="rounded-lg bg-green-50 p-6 text-center dark:bg-green-900/20">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="mx-auto h-12 w-12 text-green-600 dark:text-green-400"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
        <h3 className="mt-4 text-lg font-semibold text-green-900 dark:text-green-100">Buchung eingereicht!</h3>
        <p className="mt-2 text-sm text-green-700 dark:text-green-300">
          Wir werden uns in Kürze mit Ihnen in Verbindung setzen, um Ihre Buchung zu bestätigen.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Vollständiger Name</Label>
        <Input id="name" name="name" required placeholder="Max Mustermann" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">E-Mail</Label>
        <Input id="email" name="email" type="email" required placeholder="max@beispiel.ch" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Telefonnummer</Label>
        <Input id="phone" name="phone" type="tel" placeholder="+41 79 123 45 67" />
      </div>

      <div className="space-y-2">
        <Label>Bevorzugtes Datum</Label>
        {isLoadingAvailability ? (
          <div className="flex items-center justify-center rounded-md border p-8">
            <p className="text-sm text-muted-foreground">Verfügbarkeit wird geladen...</p>
          </div>
        ) : (
          <div className="flex justify-center">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleDateChange}
              disabled={(date) => {
                // Disable past dates
                if (date < new Date(new Date().setHours(0, 0, 0, 0))) return true
                // Disable dates with no availability
                const dateString = date.toISOString().split("T")[0]
                return !dateAvailability[dateString] || dateAvailability[dateString] === 0
              }}
              modifiers={{
                twoOrMoreInstructors: (date) => {
                  const dateString = date.toISOString().split("T")[0]
                  return (dateAvailability[dateString] || 0) >= 2
                },
                oneInstructor: (date) => {
                  const dateString = date.toISOString().split("T")[0]
                  return dateAvailability[dateString] === 1
                },
              }}
              modifiersClassNames={{
                twoOrMoreInstructors:
                  "bg-green-100 dark:bg-green-900/30 text-green-900 dark:text-green-100 font-semibold hover:bg-green-200 dark:hover:bg-green-900/50",
                oneInstructor: "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-900 dark:text-yellow-100 opacity-50",
              }}
              className="rounded-md border"
            />
          </div>
        )}
        <div className="space-y-1 text-xs text-muted-foreground">
          <p>• Grün markierte Daten: 2+ Kursleiter*innen verfügbar (buchbar)</p>
          <p>• Gelb markierte Daten: Nur 1 Kursleiter*in verfügbar (nicht buchbar)</p>
          <p>• Graue Daten: Keine Kursleiter*innen verfügbar</p>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Zusätzliche Notizen (Optional)</Label>
        <Textarea
          id="notes"
          name="notes"
          placeholder="Besondere Anforderungen oder Fragen?"
          className="min-h-[100px]"
        />
      </div>

      {error && (
        <div className="rounded-lg bg-destructive/10 p-4 text-sm text-destructive">
          <p>{error}</p>
        </div>
      )}

      <div className="flex items-center justify-between rounded-lg bg-muted p-4">
        <span className="text-sm font-medium">Gesamtpreis:</span>
        <span className="text-2xl font-bold">CHF {workshopPrice}</span>
      </div>

      <Button type="submit" className="w-full" size="lg" disabled={isLoading || !selectedDate}>
        {isLoading ? "Wird gesendet..." : "Buchungsanfrage senden"}
      </Button>

      <p className="text-center text-xs text-muted-foreground">
        Mit dem Absenden stimmen Sie unseren Geschäftsbedingungen zu. Wir werden uns mit Ihnen in Verbindung setzen, um
        die Verfügbarkeit zu bestätigen.
      </p>
    </form>
  )
}
