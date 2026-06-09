"use client"

import { Bot, Package, TrendingUp, Zap } from "lucide-react"
import { MetricCard } from "./MetricCard"

const metrics = [
  { title: "Active Agents", value: "24", change: "+12%", trend: "up" as const, icon: <Bot className="h-5 w-5" /> },
  { title: "Orders Processed", value: "8,421", change: "+8.2%", trend: "up" as const, icon: <Package className="h-5 w-5" /> },
  { title: "System Uptime", value: "99.97%", change: "+0.02%", trend: "up" as const, icon: <Zap className="h-5 w-5" /> },
  { title: "Avg Response Time", value: "47ms", change: "-3.1%", trend: "down" as const, icon: <TrendingUp className="h-5 w-5" /> },
]

export function MetricsPanel() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric, i) => <MetricCard key={metric.title} {...metric} index={i} />)}
    </div>
  )
}
