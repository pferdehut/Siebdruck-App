import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Navigation } from "@/components/navigation"
import "./globals.css"

// Using @font-face in globals.css instead for more reliable local font loading

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
})

export const metadata: Metadata = {
  title: "bleedprof",
  description: "Buche unsere Druckworkshops und beherrsche die Technik",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-body antialiased break-words`}>
        <Navigation />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
