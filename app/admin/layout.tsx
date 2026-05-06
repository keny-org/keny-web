import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/admin/app-sidebar"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar />
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger />
          <h2 className="text-xl font-bold">Admin Dashboard</h2>
        </header>
        <main className="flex-1 overflow-auto bg-background p-8">
          {children}
        </main>
      </div>
    </SidebarProvider>
  )
}
