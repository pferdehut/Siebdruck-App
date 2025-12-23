import { ContactForm } from "@/components/contact-form"
import { createClient } from "@/lib/supabase/server"

export default async function ContactPage() {
  const supabase = await createClient()
  const { data: locations } = await supabase.from("locations").select("*").order("name", { ascending: true })

  return (
    <div className="min-h-screen bg-white p-0">
      <div className="grid grid-cols-12 gap-0">
        {/* Hero block - orange */}
        <div className="col-span-12 md:col-span-6 box box-orange min-h-[350px] flex flex-col justify-center">
          <div className="text-xs font-black mb-3 opacity-70">KONTAKT</div>
          <h1 className="text-7xl md:text-9xl font-display font-black leading-none">
            ANFRA
            <br />
            GEN &<br />
            BUCHUN
            <br />
            GEN
          </h1>
        </div>

        {/* Description block - sky */}
        <div className="col-span-12 md:col-span-6 box box-sky min-h-[350px] flex items-center">
          <div>
            <p className="text-lg md:text-xl font-black leading-tight mb-6">
              Hast du Fragen zu unseren Workshops? Möchtest du genaueres darüber erfahren, was wir anbieten?
            </p>
            <p className="text-base font-bold">Schreibe uns. Wir melden uns baldmöglichst bei dir.</p>
          </div>
        </div>

        {/* Contact form block - white */}
        <div className="col-span-12 md:col-span-7 box box-white min-h-[500px]">
          <h2 className="text-3xl md:text-4xl font-display font-black uppercase mb-6">Sende uns eine Nachricht</h2>
          <p className="text-sm font-bold mb-8">
            Fülle das Formular aus und wir melden uns innerhalb der nächsten 72h bei dir.
          </p>
          <ContactForm />
        </div>

        {/* Locations block - peach */}
        <div className="col-span-12 md:col-span-5 box box-peach min-h-[500px]">
          <div className="text-xs font-black mb-3 opacity-70">01</div>
          <h2 className="text-3xl md:text-4xl font-display font-black uppercase mb-6">Workshop Orte</h2>
          <div className="space-y-4">
            {locations && locations.length > 0 ? (
              locations.map((location) => (
                <div key={location.id} className="border-4 border-black bg-white p-4">
                  <p className="text-sm font-black uppercase mb-2">{location.name}</p>
                  {location.location_address && (
                    <p className="whitespace-pre-line text-xs font-bold">{location.location_address}</p>
                  )}
                </div>
              ))
            ) : (
              <p className="text-sm font-bold">Noch keine Standorte verfügbar</p>
            )}
          </div>
        </div>

        {/* Hours block - magenta */}
        <div className="col-span-6 md:col-span-4 box box-magenta min-h-[250px]">
          <div className="text-xs font-black mb-3 opacity-70">02</div>
          <h2 className="text-3xl font-display font-black uppercase mb-6">Workshop Stunden</h2>
          <p className="text-xs font-bold mb-6">Wir sind (meistens) an diesen Tagen für Workshops verfügbar.</p>
          <div className="space-y-3">
            <div className="flex justify-between text-sm font-black uppercase">
              <span>Sa - Di</span>
              <span>ganztags</span>
            </div>
            <div className="flex justify-between text-sm font-black uppercase">
              <span>Mi - Fr</span>
              <span>selten</span>
            </div>
          </div>
        </div>

        {/* FAQ block - teal */}
        <div className="col-span-6 md:col-span-4 box box-teal min-h-[250px]">
          <div className="text-xs font-black mb-3 opacity-70">03</div>
          <h2 className="text-3xl font-display font-black uppercase mb-6">FAQ</h2>
          <div className="space-y-4">
            <div>
              <p className="text-xs font-black uppercase mb-2">Wie viel Vorerfahrung braucht es?</p>
              <p className="text-xs font-bold">Keine. Wir holen die Gruppe da ab, wo sie steht.</p>
            </div>
            <div>
              <p className="text-xs font-black uppercase mb-2">Dürfen Lernende eigene Motive mitbringen?</p>
              <p className="text-xs font-bold">Gerne. Wir prüfen vor Ort was technisch sinnvoll umsetzbar ist.</p>
            </div>
          </div>
        </div>

        {/* CTA block - lime */}
        <div className="col-span-12 md:col-span-4 box box-lime min-h-[250px] flex items-center justify-center">
          <p className="text-2xl md:text-3xl font-black uppercase text-center leading-tight">
            Gibt es
            <br />
            Unterlagen
            <br />
            für Schulen?
          </p>
        </div>
      </div>
    </div>
  )
}
