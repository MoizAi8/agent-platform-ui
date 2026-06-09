"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { GitBranch, Play, Pause, CheckCircle2, Clock } from "lucide-react"
import { useState } from "react"

interface Workflow { id: string; name: string; status: "running" | "paused" | "completed"; progress: number; agents: number; lastRun: string }

const workflows: Workflow[] = [
  { id: "1", name: "Inventory Reconciliation", status: "running", progress: 72, agents: 3, lastRun: "2m ago" },
  { id: "2", name: "Order Fulfillment Pipeline", status: "running", progress: 45, agents: 5, lastRun: "1m ago" },
  { id: "3", name: "Demand Forecasting Cycle", status: "paused", progress: 88, agents: 2, lastRun: "15m ago" },
  { id: "4", name: "Quality Assurance Batch", status: "completed", progress: 100, agents: 2, lastRun: "32m ago" },
]

const statusIcons = { running: Play, paused: Pause, completed: CheckCircle2 }

export function WorkflowPanel() {
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  return (
    <div className="rounded-xl border border-border/50 bg-card shadow-sm">
      <div className="flex items-center justify-between border-b border-border/30 px-5 py-3">
        <div className="flex items-center gap-2"><GitBranch className="h-4 w-4 text-muted-foreground" /><h3 className="text-sm font-semibold">Active Workflows</h3></div>
        <Badge variant="secondary" className="text-[10px]">{workflows.length} workflows</Badge>
      </div>
      <div className="divide-y divide-border/30">
        {workflows.map((wf, i) => {
          const StatusIcon = statusIcons[wf.status]
          return (
            <motion.div key={wf.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
              onMouseEnter={() => setHoveredId(wf.id)} onMouseLeave={() => setHoveredId(null)}
              className={cn("relative px-5 py-4 transition-all duration-200", hoveredId === wf.id && "bg-muted/30")}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <StatusIcon className={cn("h-4 w-4", wf.status === "running" && "text-success", wf.status === "paused" && "text-warning", wf.status === "completed" && "text-info")} />
                  <span className="text-sm font-medium text-foreground">{wf.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">{wf.agents} agents</span>
                  <Button variant="ghost" size="icon" className="h-7 w-7">
                    {wf.status === "running" ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
                  </Button>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Progress value={wf.progress} className="h-1.5 flex-1" />
                <span className="text-xs font-medium text-muted-foreground w-8 text-right">{wf.progress}%</span>
              </div>
              <div className="mt-1.5 flex items-center gap-1">
                <Clock className="h-3 w-3 text-muted-foreground" />
                <span className="text-[11px] text-muted-foreground">{wf.lastRun}</span>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
