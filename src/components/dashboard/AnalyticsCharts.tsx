"use client"

import { motion } from "framer-motion"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3, TrendingUp } from "lucide-react"

const barData = [
  { label: "Mon", inbound: 340, outbound: 280, accuracy: 98 },
  { label: "Tue", inbound: 420, outbound: 350, accuracy: 97 },
  { label: "Wed", inbound: 380, outbound: 410, accuracy: 99 },
  { label: "Thu", inbound: 510, outbound: 390, accuracy: 98 },
  { label: "Fri", inbound: 470, outbound: 430, accuracy: 97 },
  { label: "Sat", inbound: 290, outbound: 310, accuracy: 99 },
  { label: "Sun", inbound: 180, outbound: 220, accuracy: 98 },
]

export function AnalyticsCharts() {
  return (
    <div className="rounded-xl border border-border/50 bg-card shadow-sm">
      <div className="flex items-center justify-between border-b border-border/30 px-5 py-3">
        <div className="flex items-center gap-2"><BarChart3 className="h-4 w-4 text-muted-foreground" /><h3 className="text-sm font-semibold">Analytics</h3></div>
        <Tabs defaultValue="7d" className="h-7">
          <TabsList className="h-7 p-0.5">
            <TabsTrigger value="24h" className="text-[10px] px-2 py-1 h-full">24H</TabsTrigger>
            <TabsTrigger value="7d" className="text-[10px] px-2 py-1 h-full">7D</TabsTrigger>
            <TabsTrigger value="30d" className="text-[10px] px-2 py-1 h-full">30D</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="p-5">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-6">
            <div>
              <div className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-accent" /><span className="text-[11px] text-muted-foreground">Inbound</span></div>
              <p className="text-lg font-bold text-foreground">2,590</p>
              <div className="flex items-center gap-1"><TrendingUp className="h-3 w-3 text-success" /><span className="text-[11px] text-success font-medium">+8.3%</span></div>
            </div>
            <div>
              <div className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-primary" /><span className="text-[11px] text-muted-foreground">Outbound</span></div>
              <p className="text-lg font-bold text-foreground">2,390</p>
              <div className="flex items-center gap-1"><TrendingUp className="h-3 w-3 text-success" /><span className="text-[11px] text-success font-medium">+5.1%</span></div>
            </div>
            <div>
              <div className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-success" /><span className="text-[11px] text-muted-foreground">Accuracy</span></div>
              <p className="text-lg font-bold text-foreground">98.2%</p>
              <div className="flex items-center gap-1"><TrendingUp className="h-3 w-3 text-success" /><span className="text-[11px] text-success font-medium">+0.4%</span></div>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="flex items-end justify-between gap-1.5 h-32">
            {barData.map((d, i) => (
              <div key={d.label} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                <div className="flex gap-0.5 w-full h-full items-end">
                  <motion.div initial={{ height: 0 }} animate={{ height: `${(d.inbound / 550) * 100}%` }} transition={{ duration: 0.6, delay: i * 0.05, ease: "easeOut" }} className="flex-1 rounded-t-sm bg-accent/60" />
                  <motion.div initial={{ height: 0 }} animate={{ height: `${(d.outbound / 550) * 100}%` }} transition={{ duration: 0.6, delay: i * 0.08, ease: "easeOut" }} className="flex-1 rounded-t-sm bg-primary/60" />
                </div>
                <span className="text-[10px] text-muted-foreground">{d.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
