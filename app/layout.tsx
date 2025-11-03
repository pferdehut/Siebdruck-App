import type React from "react"
import type { Metadata } from "next"
import { Honk, Inter, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Navigation } from "@/components/navigation"
import "./globals.css"

const honk = Honk({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "Siebdruck App",
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
      <body className={`${honk.variable} ${inter.variable} ${geistMono.variable} font-body antialiased break-words`}>
        <Navigation />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
