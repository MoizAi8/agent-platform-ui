"use client"

import { AgentCard } from "./AgentCard"

const agents = [
  { id: "1", name: "Atlas", role: "Inventory Manager", status: "active" as const, uptime: "12h 34m", tasksCompleted: 1284, workload: 72, accuracy: 98 },
  { id: "2", name: "Nexus", role: "Order Router", status: "processing" as const, uptime: "8h 12m", tasksCompleted: 3421, workload: 88, accuracy: 96 },
  { id: "3", name: "Pulse", role: "Demand Forecaster", status: "active" as const, uptime: "24h 00m", tasksCompleted: 567, workload: 45, accuracy: 94 },
  { id: "4", name: "Aegis", role: "Quality Inspector", status: "idle" as const, uptime: "6h 45m", tasksCompleted: 892, workload: 15, accuracy: 99 },
  { id: "5", name: "Vector", role: "Fleet Coordinator", status: "active" as const, uptime: "18h 22m", tasksCompleted: 2156, workload: 63, accuracy: 97 },
  { id: "6", name: "Echo", role: "Communication Relay", status: "error" as const, uptime: "2h 10m", tasksCompleted: 423, workload: 0, accuracy: 88 },
]

export function AgentStatusGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {agents.map((agent, i) => <AgentCard key={agent.id} agent={agent} index={i} />)}
    </div>
  )
}
