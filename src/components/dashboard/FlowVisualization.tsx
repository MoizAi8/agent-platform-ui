"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { GitBranch, Bot, Package, Zap, Globe } from "lucide-react"

interface Node { id: string; label: string; type: "agent" | "process" | "zone" | "output"; x: number; y: number; status: "active" | "idle" | "warning" }
interface Edge { from: string; to: string; animated: boolean }

const nodes: Node[] = [
  { id: "n1", label: "Atlas", type: "agent", x: 10, y: 30, status: "active" },
  { id: "n2", label: "Nexus", type: "agent", x: 10, y: 55, status: "active" },
  { id: "n3", label: "Pulse", type: "agent", x: 10, y: 80, status: "idle" },
  { id: "n4", label: "Inbound", type: "process", x: 35, y: 25, status: "active" },
  { id: "n5", label: "Sorting", type: "process", x: 35, y: 50, status: "active" },
  { id: "n6", label: "Packing", type: "process", x: 35, y: 75, status: "idle" },
  { id: "n7", label: "Zone A", type: "zone", x: 60, y: 20, status: "active" },
  { id: "n8", label: "Zone B", type: "zone", x: 60, y: 45, status: "active" },
  { id: "n9", label: "Zone C", type: "zone", x: 60, y: 70, status: "warning" },
  { id: "n10", label: "Outbound", type: "output", x: 85, y: 50, status: "active" },
]

const edges: Edge[] = [
  { from: "n1", to: "n4", animated: true }, { from: "n1", to: "n5", animated: true },
  { from: "n2", to: "n5", animated: true }, { from: "n2", to: "n6", animated: true },
  { from: "n3", to: "n6", animated: true }, { from: "n4", to: "n7", animated: true },
  { from: "n5", to: "n8", animated: true }, { from: "n6", to: "n9", animated: true },
  { from: "n7", to: "n10", animated: true }, { from: "n8", to: "n10", animated: true },
  { from: "n9", to: "n10", animated: true },
]

const nodeIcons = { agent: Bot, process: Zap, zone: Package, output: Globe }
const statusColors = {
  active: { bg: "bg-success/20", border: "border-success/40", dot: "bg-success", pulse: "shadow-[0_0_12px_-2px_rgba(34,197,94,0.4)]" },
  idle: { bg: "bg-warning/15", border: "border-warning/30", dot: "bg-warning", pulse: "" },
  warning: { bg: "bg-destructive/15", border: "border-destructive/30", dot: "bg-destructive", pulse: "shadow-[0_0_12px_-2px_rgba(239,68,68,0.4)]" },
}

export function FlowVisualization() {
  const [dashOffset, setDashOffset] = useState(0)
  useEffect(() => {
    const interval = setInterval(() => setDashOffset((prev) => (prev + 1) % 100), 50)
    return () => clearInterval(interval)
  }, [])

  const getNodeCenter = (id: string) => {
    const node = nodes.find((n) => n.id === id)
    return node ? { x: node.x, y: node.y } : { x: 0, y: 0 }
  }

  return (
    <div className="rounded-xl border border-border/50 bg-card shadow-sm overflow-hidden">
      <div className="flex items-center justify-between border-b border-border/30 px-5 py-3">
        <div className="flex items-center gap-2"><GitBranch className="h-4 w-4 text-muted-foreground" /><h3 className="text-sm font-semibold">Flow Visualization</h3></div>
        <Badge variant="secondary" className="text-[10px]">Live</Badge>
      </div>
      <div className="relative p-5">
        <div className="relative w-full" style={{ height: 180 }}>
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
            {edges.map((edge) => {
              const from = getNodeCenter(edge.from)
              const to = getNodeCenter(edge.to)
              return <line key={`${edge.from}-${edge.to}`} x1={from.x} y1={from.y} x2={to.x} y2={to.y} stroke="rgb(39,39,42)" strokeWidth="0.4" strokeDasharray={edge.animated ? "2 3" : ""} strokeDashoffset={edge.animated ? -dashOffset : 0} className="transition-all" />
            })}
          </svg>
          {nodes.map((node) => {
            const Icon = nodeIcons[node.type]
            const style = statusColors[node.status]
            return (
              <motion.div key={node.id} initial={{ scale: 0 }} animate={{ scale: 1 }}
                className={cn("absolute flex items-center gap-1.5 rounded-lg border px-2 py-1 transition-all", style.bg, style.border, style.pulse)}
                style={{ left: `${node.x - 6}%`, top: `${node.y - 2.5}%` }}
              >
                <span className={cn("h-1.5 w-1.5 rounded-full", style.dot)} />
                <Icon className="h-2.5 w-2.5 text-muted-foreground" />
                <span className="text-[9px] font-medium text-foreground whitespace-nowrap">{node.label}</span>
              </motion.div>
            )
          })}
        </div>
        <div className="flex items-center gap-4 mt-4 pt-3 border-t border-border/30">
          <div className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-success" /><span className="text-[10px] text-muted-foreground">Active</span></div>
          <div className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-warning" /><span className="text-[10px] text-muted-foreground">Idle</span></div>
          <div className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-destructive" /><span className="text-[10px] text-muted-foreground">Warning</span></div>
          <div className="flex items-center gap-1.5 ml-auto"><Bot className="h-3 w-3 text-muted-foreground" /><span className="text-[10px] text-muted-foreground">Agent</span><Zap className="h-3 w-3 text-muted-foreground ml-1.5" /><span className="text-[10px] text-muted-foreground">Process</span></div>
        </div>
      </div>
    </div>
  )
}
