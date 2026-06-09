import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider"
import { TooltipProvider } from "@/components/ui/tooltip"
import { NoiseOverlay } from "@/components/effects/NoiseOverlay"

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] })
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Warehouse OS — Multi-Agent Orchestration Platform",
  description: "Deploy, monitor, and scale autonomous agents that manage inventory, optimize workflows, and predict demand in real time.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}>
      <body className="min-h-full bg-background font-sans text-foreground selection:bg-accent/30 selection:text-foreground">
        <TooltipProvider>
          <SmoothScrollProvider>
            <NoiseOverlay />
            {children}
          </SmoothScrollProvider>
        </TooltipProvider>
      </body>
    </html>
  )
}
