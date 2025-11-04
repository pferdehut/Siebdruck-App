import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Workshop {
  id: string
  name: string
  description: string
  duration_from: string
  duration_to: string
  max_participants: number
  price: number
  workshop_locations?: Array<{
    locations: {
      id: string
      name: string
    }
  }>
}

interface WorkshopCardProps {
  workshop: Workshop
}

const locationColors = {
  dynamo: "bg-secondary/0 text-secondary border-primary",
  "vor Ort": "bg-secondary/20 text-secondary-foreground border-secondary",
}

export function WorkshopCard({ workshop }: WorkshopCardProps) {
  const locations = workshop.workshop_locations?.map((wl) => wl.locations.name) || []

  return (
    <Card className="group relative overflow-hidden rounded-3xl border-2 transition-all hover:scale-105 hover:shadow-2xl">
      <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-primary/10 blur-2xl transition-all group-hover:bg-primary/20" />

      <CardHeader className="relative">
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex flex-wrap gap-2">
            {locations.map((location) => (
              <Badge
                key={location}
                className={`rounded-full border-2 ${locationColors[location as keyof typeof locationColors] || ""}`}
              >
                {location}
              </Badge>
            ))}
          </div>
          <span className="text-sm font-medium text-muted-foreground">
            {workshop.duration_from} - {workshop.duration_to}
          </span>
        </div>
        <CardTitle className="text-balance text-xl">{workshop.name}</CardTitle>
        <CardDescription className="text-pretty">{workshop.description}</CardDescription>
      </CardHeader>
      <CardContent className="relative flex-1">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
            />
          </svg>
          <span>Max. {workshop.max_participants} Teilnehmer*innen</span>
        </div>
      </CardContent>
      <CardFooter className="relative flex items-center justify-between">
        <div className="text-3xl font-bold text-primary">CHF {workshop.price}</div>
        <Button asChild className="rounded-full">
          <Link href={`/workshops/${workshop.id}`}>Erfahre mehr</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
