"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export function ContactForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setSuccess(true)
    setIsLoading(false)

    // Reset form after 3 seconds
    setTimeout(() => {
      setSuccess(false)
      ;(e.target as HTMLFormElement).reset()
    }, 3000)
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
        <h3 className="mt-4 text-lg font-semibold text-green-900 dark:text-green-100">Nachricht geschickt</h3>
        <p className="mt-2 text-sm text-green-700 dark:text-green-300">
          Danke für deine Nachricht. Wir werden uns baldmöglichst melden.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="firstName">Vorname</Label>
          <Input id="firstName" name="firstName" required placeholder="Vorname" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Nachname</Label>
          <Input id="lastName" name="lastName" required placeholder="Nachname" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" required placeholder="mail@example.com" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Telefonnummer (Optional)</Label>
        <Input id="phone" name="phone" type="tel" placeholder="+71 00 000 00 00" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="subject">Thema</Label>
        <Input id="subject" name="subject" required placeholder="Workshop Anfrage" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Nachricht</Label>
        <Textarea
          id="message"
          name="message"
          required
          placeholder="Was möchtest du von uns wissen oder uns erzählen?"
          className="min-h-[150px]"
        />
      </div>

      <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
        {isLoading ? "Senden..." : "Send Message"}
      </Button>
    </form>
  )
}
