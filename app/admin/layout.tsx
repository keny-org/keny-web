import { AppSidebar } from "@/components/admin/app-sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Notification01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar />
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="flex justify-between h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger />
          <Sheet>
            <SheetTrigger>
              <Button variant={"outline"}>
                <HugeiconsIcon
                  icon={Notification01Icon}
                  size={24}
                  color="currentColor"
                  strokeWidth={1.5}
                />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Notificações</SheetTitle>
              </SheetHeader>
              <div className="p-3 bg-muted">Hoje</div>
              <div className="p-3">
                <Card>
                  <CardContent>
                    <div className="flex gap-3">
                      <Avatar>
                        <AvatarImage></AvatarImage>
                        <AvatarFallback>AJ</AvatarFallback>
                      </Avatar>
                      <div>
                        <h2 className="font-bold">Adão joão</h2>
                        <label className="text-muted-foreground text-xs">
                          Send you the file Bring a story.text
                        </label>
                        <div className="flex gap-2">
                          <Button variant={"destructive"}>Decline</Button>
                          <Button>Save to Assets</Button>
                        </div>
                      </div>
                      <label>Just now</label>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </SheetContent>
          </Sheet>
        </header>
        <main className="flex-1 overflow-auto bg-background p-8">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
