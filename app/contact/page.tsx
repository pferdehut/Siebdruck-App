import { ContactForm } from "@/components/contact-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="border-b bg-muted/50 px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <Badge variant="outline" className="mb-4 border-2">
            Kontakt
          </Badge>
          <h1 className="text-6xl font-bold tracking-tight text-balance sm:text-7xl">Anfragen & Buchungen</h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground text-pretty">
            Hast du Fragen zu unseren Workshops? Möchtest du genaueres darüber erfahren, was wir anbieten? Schreibe uns.
            Wir melden uns baldmöglichst bei dir.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="px-6 py-16">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2">
          {/* Contact Form */}
          <div>
            <Card className="bg-muted/80 border-2">
              <CardHeader>
                <CardTitle>Sende uns eine Nachricht</CardTitle>
                <CardDescription>
                  Fülle das Formular aus und wir melden uns innerhalb der nächsten 72h bei dir.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ContactForm />
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <Card className="bg-muted/80 border-2">
              <CardHeader>
                <CardTitle>Workshop Orte</CardTitle>
                <CardDescription>Hier finden unsere Workshops statt</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                    />
                  </svg>
                  <div>
                    <p className="font-medium">Addressen</p>
                    <p className="text-sm text-muted-foreground">
                      Jugendkulturhaus Dynamo
                      <br />
                      Wasserwerkstrasse 15
                      <br />
                      Zürich
                      <br />
                      <br />
                      oder bei euch vor Ort
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                    />
                  </svg>
                  <div>
                    <p className="font-medium">Email</p>
                    <a
                      href="mailto:hello@workshopstudio.com"
                      className="text-sm text-muted-foreground hover:text-foreground"
                    >
                      hello@workshopstudio.com
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-muted/80 border-2">
              <CardHeader>
                <CardTitle>Workshop Stunden</CardTitle>
                <CardDescription>Wir sind (meistens) an diesen Tagen für Workshops verfügbar.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Samstag - Dienstag</span>
                  <span className="font-medium">ganztags</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Mittwoch - Freitag</span>
                  <span className="font-medium">selten</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-muted/80 border-2">
              <CardHeader>
                <CardTitle>FAQ</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="font-medium text-sm">Wie viel Vorerfahrung braucht es?</p>
                  <p className="text-sm text-muted-foreground mt-1">Keine. Wir holen die Gruppe da ab, wo sie steht.</p>
                </div>
                <div>
                  <p className="font-medium text-sm">Dürfen Lernende eigene Motive mitbringen?</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Gerne. Wir prüfen vor Ort was technisch sinnvoll umsetzbar ist.
                  </p>
                </div>
                <div>
                  <p className="font-medium text-sm">Gibt es Unterlagen für Schulen?</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Ja, wir senden auf Wunsch eine kurze Übersicht (Ablauf, Ziele, Material).
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
