import { SidebarTrigger } from "@/components/ui/sidebar";
import { NotificationsSheet } from "./notifications-sheet";

export function AdminHeader() {
  return (
    <header className="flex justify-between h-16 shrink-0 items-center gap-2 border-b px-4 bg-background">
      <div className="flex items-center gap-2">
        <SidebarTrigger />
      </div>
      <div className="flex items-center gap-4">
        <NotificationsSheet />
      </div>
    </header>
  );
}
