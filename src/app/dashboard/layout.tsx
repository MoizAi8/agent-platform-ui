import { Dock } from "@/components/navigation/Dock"
import { TopBar } from "@/components/navigation/TopBar"
import { AIAssistant } from "@/components/ai/AIAssistant"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen pb-24">
      <TopBar />
      <main className="pt-16 px-6 max-w-7xl mx-auto">{children}</main>
      <Dock />
      <AIAssistant />
    </div>
  )
}
