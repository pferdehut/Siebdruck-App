import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import { BookingForm } from "@/components/booking-form"

export const revalidate = 60

interface WorkshopDetailPageProps {
  params: Promise<{ id: string }>
}

export default async function WorkshopDetailPage({ params }: WorkshopDetailPageProps) {
  const { id } = await params
  const supabase = await createClient()

  const { data: workshop, error } = await supabase.from("workshops").select("*").eq("id", id).single()

  if (error || !workshop) {
    notFound()
  }

  const { data: teamMembers } = await supabase.from("team_members").select("id, name, role, image_url").limit(4)

  return (
    <div className="min-h-screen bg-white p-0">
      <div className="grid grid-cols-12 gap-0">
        {/* Workshop title block - hot pink */}
        <div className="col-span-12 md:col-span-7 box box-pink min-h-[400px] flex flex-col justify-between">
          <div>
            <div className="text-xs font-black mb-3 opacity-70">{workshop.location}</div>
            <h1 className="text-6xl md:text-8xl font-display font-black leading-none uppercase">{workshop.name}</h1>
          </div>
          <p className="text-lg md:text-xl font-bold leading-tight max-w-2xl mt-8">{workshop.description}</p>
        </div>

        {/* Details grid - multiple colors */}
        <div className="col-span-4 md:col-span-2 box box-yellow min-h-[200px] md:min-h-[400px] flex flex-col justify-center">
          <div className="text-xs font-black mb-2 uppercase opacity-70">Dauer</div>
          <p className="text-xl md:text-2xl font-black leading-tight">
            {workshop.duration_from}
            <br />-<br />
            {workshop.duration_to}
          </p>
        </div>

        <div className="col-span-4 md:col-span-2 box box-mint min-h-[200px] md:min-h-[400px] flex flex-col justify-center">
          <div className="text-xs font-black mb-2 uppercase opacity-70">Max.</div>
          <p className="text-xl md:text-2xl font-black leading-tight">
            {workshop.max_participants}
            <br />
            Pers.
          </p>
        </div>

        <div className="col-span-4 md:col-span-1 box box-orange min-h-[200px] md:min-h-[400px] flex flex-col justify-center">
          <div className="text-xs font-black mb-2 uppercase opacity-70">CHF</div>
          <p className="text-3xl md:text-4xl font-black">{workshop.price}</p>
        </div>

        {/* For teachers block - teal */}
        <div className="col-span-12 md:col-span-5 box box-teal min-h-[350px]">
          <div className="text-xs font-black mb-3 opacity-70">FÜR LEHRPERSONEN</div>
          <h2 className="text-3xl md:text-4xl font-display font-black uppercase mb-6">Infos</h2>
          <p className="text-sm font-bold mb-6 leading-relaxed">
            Schreibe uns mit gewünschtem Format, Gruppengrössen, Datum und allfälligen Vorkentnissen. Wir melden uns mit
            einem Vorschlag
          </p>
          <ul className="space-y-2 text-xs font-bold">
            <li>→ Wir bieten klare Vorabinfos (Ablauf, Ziele, Vorbereitung).</li>
            <li>→ Lehrplanbezüge auf Wunsch (Gestalten, Prozesskompetenzen, Teamarbeit).</li>
            <li>→ Begleitunterlagen: kurze Checkliste und Materialliste auf Anfrage.</li>
          </ul>
        </div>

        {/* Team members block - purple */}
        {teamMembers && teamMembers.length > 0 && (
          <div className="col-span-12 md:col-span-7 box box-purple min-h-[350px]">
            <div className="text-xs font-black mb-3 opacity-70">DEINE KURSLEITER*INNEN</div>
            <div className="grid grid-cols-2 gap-4 mt-6">
              {teamMembers.slice(0, 2).map((member) => (
                <div key={member.id} className="border-4 border-white bg-black text-white p-4">
                  <p className="text-lg font-black uppercase mb-1">{member.name}</p>
                  <p className="text-xs font-bold">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Booking form block - sky */}
        <div className="col-span-12 box box-sky min-h-[500px]">
          <div className="text-xs font-black mb-3 opacity-70">BUCHEN</div>
          <h2 className="text-4xl md:text-5xl font-display font-black uppercase mb-6">Buche deinen Platz</h2>
          <p className="text-sm font-bold mb-8">Reserviere deinen Platz in diesem Workshop</p>
          <div className="max-w-2xl">
            <BookingForm workshopId={workshop.id} workshopPrice={workshop.price} />
          </div>
        </div>
      </div>
    </div>
  )
}
