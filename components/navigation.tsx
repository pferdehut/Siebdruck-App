"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Menu, X } from "lucide-react"
import { useState } from "react"

const navItems = [
  { href: "/", label: "Home" },
  { href: "/workshops", label: "Workshops" },
  { href: "/team", label: "Team" },
  { href: "/impressions", label: "Impressionen" },
  { href: "/contact", label: "Kontakt" },
]

export function Navigation() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 right-0 z-50 p-4 md:p-6">
      <nav className="flex items-center justify-end gap-4">
        <ul className="hidden md:flex items-center gap-1 bg-background/95 backdrop-blur border-4 border-foreground px-4 py-2">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "px-4 py-2 text-sm font-bold uppercase transition-colors hover:bg-primary",
                  pathname === item.href ? "bg-foreground text-background" : "text-foreground",
                )}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <button
          className="md:hidden p-3 bg-background/95 backdrop-blur border-4 border-foreground hover:bg-primary transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {mobileMenuOpen && (
        <div className="md:hidden mt-2 border-4 border-foreground bg-background/95 backdrop-blur">
          <ul className="flex flex-col">
            {navItems.map((item) => (
              <li key={item.href} className="border-b-2 border-foreground last:border-b-0">
                <Link
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "block px-6 py-4 text-base font-bold uppercase transition-colors hover:bg-primary",
                    pathname === item.href ? "bg-foreground text-background" : "text-foreground",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}
