"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Bot, CheckCircle2, AlertTriangle, Info, ArrowRight } from "lucide-react"

interface LogEntry { id: string; type: "success" | "warning" | "info" | "error"; agent: string; message: string; time: string }

const logs: LogEntry[] = [
  { id: "1", type: "success", agent: "Atlas", message: "Inventory sync completed — 1,284 units verified", time: "2m ago" },
  { id: "2", type: "info", agent: "Nexus", message: "Rerouting order #ORD-4821 to Dock 4", time: "5m ago" },
  { id: "3", type: "warning", agent: "Pulse", message: "Demand spike detected in Zone B (+34%)", time: "8m ago" },
  { id: "4", type: "success", agent: "Vector", message: "Fleet rebalanced — 12 drones dispatched", time: "12m ago" },
  { id: "5", type: "error", agent: "Echo", message: "Connection timeout to relay node 7", time: "15m ago" },
  { id: "6", type: "info", agent: "Aegis", message: "Quality check batch #8840 — 99.2% pass rate", time: "18m ago" },
  { id: "7", type: "success", agent: "Atlas", message: "Restock alert sent for SKU-3342", time: "22m ago" },
]

const typeConfig = {
  success: { icon: CheckCircle2, color: "text-success", bg: "bg-success/10" },
  warning: { icon: AlertTriangle, color: "text-warning", bg: "bg-warning/10" },
  info: { icon: Info, color: "text-info", bg: "bg-info/10" },
  error: { icon: AlertTriangle, color: "text-destructive", bg: "bg-destructive/10" },
}

export function ActivityLog() {
  return (
    <div className="rounded-xl border border-border/50 bg-card shadow-sm">
      <div className="flex items-center justify-between border-b border-border/30 px-5 py-3">
        <div className="flex items-center gap-2"><Bot className="h-4 w-4 text-muted-foreground" /><h3 className="text-sm font-semibold">Activity Log</h3></div>
        <Badge variant="secondary" className="text-[10px]">Live</Badge>
      </div>
      <ScrollArea className="h-[320px]">
        <div className="space-y-1 p-2">
          {logs.map((log, i) => {
            const config = typeConfig[log.type]
            const Icon = config.icon
            return (
              <motion.div key={log.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                className="group flex items-start gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-muted/50"
              >
                <div className={cn("flex h-7 w-7 shrink-0 items-center justify-center rounded-full", config.bg)}>
                  <Icon className={cn("h-3.5 w-3.5", config.color)} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-foreground">{log.agent}</span>
                    <ArrowRight className="h-2.5 w-2.5 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground truncate">{log.message}</span>
                  </div>
                </div>
                <span className="shrink-0 text-[11px] text-muted-foreground">{log.time}</span>
              </motion.div>
            )
          })}
        </div>
      </ScrollArea>
    </div>
  )
}
