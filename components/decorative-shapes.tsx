export function DecorativeShapes() {
  return (
    <>
      {/* Floating organic shapes - reduced opacity for better content visibility */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden -z-10">
        {/* Top left green blob */}
        <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />

        {/* Top right yellow circle */}
        <div className="absolute top-20 right-10 h-32 w-32 rounded-full bg-primary/15" />

        {/* Middle left pink blob */}
        <div className="absolute top-1/3 -left-16 h-48 w-48 rounded-full bg-secondary/15 blur-2xl" />

        {/* Middle right blue circle */}
        <div className="absolute top-1/2 right-20 h-40 w-40 rounded-full bg-blue-400/10 blur-xl" />

        {/* Bottom left yellow blob */}
        <div className="absolute bottom-32 left-10 h-56 w-56 rounded-full bg-primary/15 blur-3xl" />

        {/* Bottom right coral blob */}
        <div className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-secondary/15 blur-3xl" />

        {/* Small accent circles */}
        <div className="absolute top-1/4 right-1/4 h-16 w-16 rounded-full bg-accent/20" />
        <div className="absolute bottom-1/4 left-1/3 h-20 w-20 rounded-full bg-primary/20" />
      </div>
    </>
  )
}

export function FloatingStars() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Star decorations */}
      <svg className="absolute top-20 left-1/4 h-6 w-6 text-primary/60" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
      <svg className="absolute top-1/3 right-1/4 h-8 w-8 text-secondary/50" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
      <svg className="absolute bottom-1/4 left-1/3 h-5 w-5 text-accent/60" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    </div>
  )
}
