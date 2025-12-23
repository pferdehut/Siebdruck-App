import type React from "react"
import type { Metadata } from "next"
import localFont from "next/font/local"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Navigation } from "@/components/navigation"
import "./globals.css"

const blueberry = localFont({
  src: "./fonts/BlueberryTRIAL-Regular.otf",
  variable: "--font-display",
  display: "swap",
})

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
      <body className={`${blueberry.variable} ${inter.variable} font-body antialiased break-words`}>
        <Navigation />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
