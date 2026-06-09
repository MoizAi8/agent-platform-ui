"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ListTodo, ArrowRight, Package, ClipboardCheck, Truck, ScanLine } from "lucide-react"

interface Task { id: string; title: string; agent: string; priority: "high" | "medium" | "low"; status: "pending" | "in-progress" | "completed"; type: "pick" | "pack" | "ship" | "audit"; time: string }

const tasks: Task[] = [
  { id: "T-1024", title: "Pick SKU-4432 from Zone A3", agent: "Atlas", priority: "high", status: "in-progress", type: "pick", time: "1m ago" },
  { id: "T-1023", title: "Pack Order #ORD-4821", agent: "Nexus", priority: "high", status: "in-progress", type: "pack", time: "3m ago" },
  { id: "T-1022", title: "Ship Pallet to Dock 7", agent: "Vector", priority: "medium", status: "pending", type: "ship", time: "5m ago" },
  { id: "T-1021", title: "Audit Bin B12 Stock Count", agent: "Aegis", priority: "medium", status: "pending", type: "audit", time: "8m ago" },
  { id: "T-1020", title: "Restock Zone C Overflow", agent: "Atlas", priority: "low", status: "completed", type: "pick", time: "12m ago" },
  { id: "T-1019", title: "Verify Inbound Shipment", agent: "Aegis", priority: "high", status: "completed", type: "audit", time: "15m ago" },
]

const priorityColors = {
  high: "text-destructive border-destructive/30 bg-destructive/10",
  medium: "text-warning border-warning/30 bg-warning/10",
  low: "text-info border-info/30 bg-info/10",
}

const typeIcons = { pick: ScanLine, pack: Package, ship: Truck, audit: ClipboardCheck }

export function TaskQueuePanel() {
  return (
    <div className="rounded-xl border border-border/50 bg-card shadow-sm">
      <div className="flex items-center justify-between border-b border-border/30 px-5 py-3">
        <div className="flex items-center gap-2"><ListTodo className="h-4 w-4 text-muted-foreground" /><h3 className="text-sm font-semibold">Task Queue</h3><Badge variant="secondary" className="text-[10px] ml-1">{tasks.length}</Badge></div>
        <Button variant="ghost" size="sm" className="h-7 text-xs gap-1">View All <ArrowRight className="h-3 w-3" /></Button>
      </div>
      <ScrollArea className="h-[340px]">
        <div className="space-y-1 p-2">
          {tasks.map((task, i) => {
            const TypeIcon = typeIcons[task.type]
            return (
              <motion.div key={task.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}
                className="group flex items-start gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-muted/50"
              >
                <div className={cn("flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border", task.status === "completed" ? "border-success/30 bg-success/10 text-success" : "border-border/50 bg-muted/50 text-muted-foreground")}>
                  <TypeIcon className="h-3.5 w-3.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className={cn("text-xs font-medium", task.status === "completed" ? "text-muted-foreground line-through" : "text-foreground")}>{task.title}</span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[11px] text-muted-foreground">{task.id}</span><span className="text-[11px] text-muted-foreground">·</span>
                    <span className="text-[11px] text-muted-foreground">{task.agent}</span><span className="text-[11px] text-muted-foreground">·</span>
                    <span className={cn("text-[10px] font-medium px-1.5 py-0.5 rounded-full border", priorityColors[task.priority])}>{task.priority}</span>
                  </div>
                </div>
                <span className="shrink-0 text-[11px] text-muted-foreground">{task.time}</span>
              </motion.div>
            )
          })}
        </div>
      </ScrollArea>
    </div>
  )
}
