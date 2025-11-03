import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"

export default function SetupPage() {
  return (
    <div className="min-h-screen px-6 py-16">
      <div className="mx-auto max-w-4xl">
        <Badge variant="secondary" className="mb-4">
          Datenbank Setup
        </Badge>
        <h1 className="text-4xl font-bold tracking-tight text-balance sm:text-5xl mb-4">Setup Anleitung</h1>
        <p className="text-lg text-muted-foreground text-pretty mb-8">
          Folge diesen Schritten, um deine Workshop-Buchungsdatenbank zu initialisieren.
        </p>

        <Alert className="mb-8">
          <AlertTitle>Wichtig</AlertTitle>
          <AlertDescription>
            Du musst die SQL-Skripte im <code className="text-sm bg-muted px-1 py-0.5 rounded">scripts/</code> Ordner
            ausführen, um die Datenbanktabellen zu erstellen und initiale Daten zu laden.
          </AlertDescription>
        </Alert>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Schritt 1: SQL-Skripte ausführen</CardTitle>
              <CardDescription>Führe die Skripte in der angegebenen Reihenfolge aus</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Die folgenden SQL-Skripte sind im <code>scripts/</code> Ordner verfügbar:
              </p>
              <ol className="list-decimal list-inside space-y-2 text-sm">
                <li>
                  <code className="bg-muted px-1 py-0.5 rounded">001_create_workshops_table.sql</code> - Erstellt die
                  Workshops-Tabelle
                </li>
                <li>
                  <code className="bg-muted px-1 py-0.5 rounded">002_create_team_members_table.sql</code> - Erstellt die
                  Team-Mitglieder-Tabelle
                </li>
                <li>
                  <code className="bg-muted px-1 py-0.5 rounded">003_create_availability_slots_table.sql</code> -
                  Erstellt die Verfügbarkeits-Tabelle
                </li>
                <li>
                  <code className="bg-muted px-1 py-0.5 rounded">004_create_bookings_table.sql</code> - Erstellt die
                  Buchungs-Tabelle
                </li>
                <li>
                  <code className="bg-muted px-1 py-0.5 rounded">005_seed_initial_data.sql</code> - Lädt initiale Daten
                  (Workshops und Team-Mitglieder)
                </li>
                <li>
                  <code className="bg-muted px-1 py-0.5 rounded">006_create_team_member_workshops_table.sql</code> -
                  Erstellt die Team-Workshop-Zuordnungs-Tabelle
                </li>
                <li>
                  <code className="bg-muted px-1 py-0.5 rounded">007_update_team_member_images.sql</code> - Aktualisiert
                  Team-Mitglieder-Bilder
                </li>
                <li>
                  <code className="bg-muted px-1 py-0.5 rounded">008_update_workshops_schema.sql</code> - Aktualisiert
                  Workshop-Schema (Dauer und Standort)
                </li>
                <li>
                  <code className="bg-muted px-1 py-0.5 rounded">009_create_locations_system.sql</code> - Erstellt das
                  Standort-System (Tabellen und Migration)
                </li>
              </ol>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Schritt 2: Setup überprüfen</CardTitle>
              <CardDescription>Prüfe, ob alles korrekt funktioniert</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">Nach dem Ausführen der Skripte, überprüfe dass:</p>
              <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                <li>Die Workshops-Seite verschiedene Workshop-Typen anzeigt</li>
                <li>Die Team-Seite die Team-Mitglieder zeigt</li>
                <li>Du zu einzelnen Workshop-Seiten navigieren und Buchungsformulare sehen kannst</li>
                <li>Die Admin-Seiten für Workshops, Team, Verfügbarkeit und Standorte funktionieren</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Schritt 3: Verfügbarkeit konfigurieren</CardTitle>
              <CardDescription>Richte die Verfügbarkeit der Team-Mitglieder ein</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Besuche die <code className="bg-muted px-1 py-0.5 rounded">/admin/availability</code> Seite um:
              </p>
              <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                <li>Team-Mitglieder und Workshops auszuwählen</li>
                <li>Verfügbarkeitsdaten festzulegen</li>
                <li>Sicherzustellen, dass mindestens 2 Instruktoren für jeden Workshop-Termin verfügbar sind</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Schritt 4: Standorte verwalten</CardTitle>
              <CardDescription>Füge Workshop-Standorte hinzu</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Besuche die <code className="bg-muted px-1 py-0.5 rounded">/admin/locations</code> Seite um:
              </p>
              <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                <li>Neue Standorte hinzuzufügen (z.B. "dynamo", "vor Ort")</li>
                <li>Workshops mehrere Standorte zuzuweisen</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
