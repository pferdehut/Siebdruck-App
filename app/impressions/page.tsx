export default function ImpressionsPage() {
  const galleryImages = [
    {
      id: 1,
      src: "/woodworking-workshop-students-learning.jpg",
      alt: "Students learning woodworking techniques",
      category: "Workshop",
      size: "large", // Hero image
    },
    {
      id: 2,
      src: "/finished-wooden-furniture-piece.jpg",
      alt: "Beautiful finished wooden furniture",
      category: "Projects",
      size: "medium",
    },
    {
      id: 3,
      src: "/woodworking-tools-and-equipment.jpg",
      alt: "Professional woodworking tools",
      category: "Studio",
      size: "small",
    },
    {
      id: 4,
      src: "/instructor-teaching-joinery-techniques.jpg",
      alt: "Instructor demonstrating joinery",
      category: "Workshop",
      size: "medium",
    },
    {
      id: 5,
      src: "/handcrafted-wooden-chair.jpg",
      alt: "Handcrafted wooden chair",
      category: "Projects",
      size: "large",
    },
    {
      id: 6,
      src: "/workshop-studio-space-with-natural-light.jpg",
      alt: "Our workshop studio space",
      category: "Studio",
      size: "small",
    },
    {
      id: 7,
      src: "/group-of-students-working-on-projects.jpg",
      alt: "Students collaborating on projects",
      category: "Workshop",
      size: "medium",
    },
    {
      id: 8,
      src: "/detailed-wood-carving-close-up.jpg",
      alt: "Detailed wood carving work",
      category: "Projects",
      size: "small",
    },
    {
      id: 9,
      src: "/organized-woodworking-workshop.jpg",
      alt: "Organized workshop environment",
      category: "Studio",
      size: "medium",
    },
  ]

  return (
    <div className="min-h-screen bg-white p-0">
      <div className="grid grid-cols-12 gap-0">
        {/* Hero block - purple */}
        <div className="col-span-12 md:col-span-5 box box-purple min-h-[350px] flex flex-col justify-center">
          <div className="text-xs font-black mb-3 opacity-70">IMPRESSIONEN</div>
          <h1 className="text-7xl md:text-9xl font-display font-black leading-none">
            WORK
            <br />
            SHOP
            <br />
            EIN
            <br />
            DRÜCKE
          </h1>
        </div>

        {/* Description block - yellow */}
        <div className="col-span-12 md:col-span-7 box box-yellow min-h-[350px] flex items-center">
          <p className="text-2xl md:text-3xl font-black leading-tight">
            Eine Reise durch unsere Arbeiten und bisherigen Workshops.
          </p>
        </div>

        {/* Gallery - each image in its own colored box */}
        <div className="col-span-12 md:col-span-6 box box-coral min-h-[400px] p-0">
          <img
            src={galleryImages[0].src || "/placeholder.svg"}
            alt={galleryImages[0].alt}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="col-span-6 md:col-span-3 box box-mint min-h-[400px] p-0">
          <img
            src={galleryImages[2].src || "/placeholder.svg"}
            alt={galleryImages[2].alt}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="col-span-6 md:col-span-3 box box-blue min-h-[400px] p-0">
          <img
            src={galleryImages[1].src || "/placeholder.svg"}
            alt={galleryImages[1].alt}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="col-span-6 md:col-span-4 box box-pink min-h-[350px] p-0">
          <img
            src={galleryImages[4].src || "/placeholder.svg"}
            alt={galleryImages[4].alt}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="col-span-6 md:col-span-4 box box-orange min-h-[350px] p-0">
          <img
            src={galleryImages[5].src || "/placeholder.svg"}
            alt={galleryImages[5].alt}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="col-span-12 md:col-span-4 box box-teal min-h-[300px] p-0">
          <img
            src={galleryImages[7].src || "/placeholder.svg"}
            alt={galleryImages[7].alt}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="col-span-12 md:col-span-6 box box-peach min-h-[300px] p-0">
          <img
            src={galleryImages[3].src || "/placeholder.svg"}
            alt={galleryImages[3].alt}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="col-span-12 box box-sky min-h-[250px] p-0">
          <img
            src={galleryImages[8].src || "/placeholder.svg"}
            alt={galleryImages[8].alt}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  )
}
