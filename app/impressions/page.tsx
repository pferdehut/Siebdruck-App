import { Badge } from "@/components/ui/badge"

export default function ImpressionsPage() {
  const galleryImages = [
    {
      id: 1,
      src: "/pain-screen-yellow-street.jpg",
      alt: "pain",
      category: "Projekte",
      size: "large",
    },
    {
      id: 2,
      src: "/pain-screen-silhouette.jpg",
      alt: "pain",
      category: "Projekte",
      size: "medium",
    },
    {
      id: 3,
      src: "/pain-screens-washing.jpg",
      alt: "pain",
      category: "Projekte",
      size: "large",
    },
    {
      id: 4,
      src: "/pain-screen-closeup.jpg",
      alt: "pain",
      category: "Projekte",
      size: "medium",
    },
    {
      id: 5,
      src: "/pain-clothing-outdoor.jpg",
      alt: "pain",
      category: "Projekte",
      size: "small",
    },
    {
      id: 6,
      src: "/ceramic-3d-print-workshop-river.jpg",
      alt: "Keramik-3D-Druck am Fluss im Rahmen vom «Hitzefreiraum» im Dynamo.",
      category: "Workshops",
      size: "large",
    },
    {
      id: 7,
      src: "/ceramic-3d-print-closeup.jpg",
      alt: "Keramik-3D-Druck am Fluss im Rahmen vom «Hitzefreiraum» im Dynamo.",
      category: "Workshops",
      size: "medium",
    },
  ]

  return (
    <div className="relative min-h-screen overflow-hidden">
      <section className="relative z-10 px-6 py-24 md:py-32">
        <div className="mx-auto max-w-7xl">
          <Badge variant="outline" className="mb-4 border-2">
            Impressionen
          </Badge>
          <h1 className="text-6xl font-bold tracking-tight text-balance lg:text-7xl">
            Workshop
            <br />
            Eindrücke.
          </h1>
          <p className="mt-8 max-w-xl text-xl text-muted-foreground text-pretty md:text-2xl">
            Eine Reise durch unsere Arbeiten und bisherigen Workshops.
          </p>
        </div>
      </section>

      <section className="relative z-10 px-6 pb-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-12 gap-4 md:gap-6">
            {/* Large hero image */}
            <div className="group relative col-span-12 md:col-span-8 lg:col-span-7">
              <div className="relative aspect-[16/10] overflow-hidden rounded-3xl bg-muted shadow-2xl transition-all duration-500 hover:scale-[1.02] hover:shadow-primary/20">
                <img
                  src={galleryImages[2].src || "/placeholder.svg"}
                  alt={galleryImages[2].alt}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <Badge variant="secondary" className="mb-3 text-xs">
                      {galleryImages[2].category}
                    </Badge>
                    <p className="font-display text-2xl font-bold text-white md:text-3xl">{galleryImages[2].alt}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Small image top right */}
            <div className="group relative col-span-6 md:col-span-4 lg:col-span-5">
              <div className="relative aspect-square overflow-hidden rounded-3xl bg-muted shadow-xl transition-all duration-500 hover:scale-[1.02] hover:shadow-secondary/20 hover:rotate-1">
                <img
                  src={galleryImages[3].src || "/placeholder.svg"}
                  alt={galleryImages[3].alt}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100">
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <Badge variant="secondary" className="mb-2 text-xs">
                      {galleryImages[3].category}
                    </Badge>
                    <p className="text-sm font-medium text-white">{galleryImages[3].alt}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Medium image */}
            <div className="group relative col-span-6 md:col-span-6 lg:col-span-5">
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-muted shadow-xl transition-all duration-500 hover:scale-[1.02] hover:shadow-accent/20 hover:-rotate-1">
                <img
                  src={galleryImages[1].src || "/placeholder.svg"}
                  alt={galleryImages[1].alt}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100">
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <Badge variant="secondary" className="mb-2 text-xs">
                      {galleryImages[1].category}
                    </Badge>
                    <p className="text-sm font-medium text-white">{galleryImages[1].alt}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Another large image */}
            <div className="group relative col-span-12 md:col-span-6 lg:col-span-7">
              <div className="relative aspect-[2/3] overflow-hidden rounded-3xl bg-muted shadow-2xl transition-all duration-500 hover:scale-[1.02] hover:shadow-primary/20">
                <img
                  src={galleryImages[0].src || "/placeholder.svg"}
                  alt={galleryImages[0].alt}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0">
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <Badge variant="secondary" className="mb-3 text-xs">
                      {galleryImages[0].category}
                    </Badge>
                    <p className="font-display text-2xl font-bold text-white md:text-3xl">{galleryImages[0].alt}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Small images grid */}
            <div className="col-span-6 md:col-span-3 lg:col-span-3 space-y-4 md:space-y-6">
              <div className="group relative">
                <div className="relative aspect-square overflow-hidden rounded-3xl bg-muted shadow-xl transition-all duration-500 hover:scale-[1.02] hover:shadow-secondary/20">
                  <img
                    src={galleryImages[4].src || "/placeholder.svg"}
                    alt={galleryImages[4].alt}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
              </div>
            </div>

            {/* Medium images */}
            <div className="group relative col-span-12 md:col-span-4 lg:col-span-4">
              <div className="relative aspect-[3/4] overflow-hidden rounded-3xl bg-muted shadow-xl transition-all duration-500 hover:scale-[1.02] hover:shadow-primary/20 hover:rotate-1">
                <img
                  src={galleryImages[5].src || "/placeholder.svg"}
                  alt={galleryImages[5].alt}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent">
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <Badge variant="secondary" className="mb-2 text-xs">
                      {galleryImages[5].category}
                    </Badge>
                    <p className="text-sm font-medium text-white">{galleryImages[5].alt}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="group relative col-span-12 md:col-span-5 lg:col-span-5">
              <div className="relative aspect-[16/10] overflow-hidden rounded-3xl bg-muted shadow-xl transition-all duration-500 hover:scale-[1.02] hover:shadow-secondary/20">
                <img
                  src={galleryImages[6].src || "/placeholder.svg"}
                  alt={galleryImages[6].alt}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100">
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <Badge variant="secondary" className="mb-2 text-xs">
                      {galleryImages[6].category}
                    </Badge>
                    <p className="text-sm font-medium text-white">{galleryImages[6].alt}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
