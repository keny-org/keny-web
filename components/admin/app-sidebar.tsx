"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useAdmin } from "@/hooks/admin/use-admin";
import {
  CreditCard,
  Image as ImageIcon,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  Settings,
  ShieldUser,
  UserX,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const items = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Banners",
    url: "/admin/banners",
    icon: ImageIcon,
  },
  {
    title: "Usuários",
    url: "/admin/users",
    icon: Users,
  },
  {
    title: "Planos",
    url: "/admin/plans",
    icon: CreditCard,
  },
  {
    title: "Subscrições",
    url: "/admin/subscriptions",
    icon: CreditCard,
  },
  {
    title: "Apagar Conta",
    url: "/admin/account-deletion",
    icon: UserX,
  },
  {
    title: "Feedback",
    url: "/admin/feedback",
    icon: MessageSquare,
  },
  {
    title: "Administradores",
    url: "/admin/admins",
    icon: ShieldUser,
  },
  {
    title: "Configurações",
    url: "/admin/settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { profile } = useAdmin();

  const handleLogout = () => {
    Cookies.remove("keny_token");
    router.push("/auth/login");
  };

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <Link href="/admin" className="flex items-end gap-2">
          <span className="text-xl font-black tracking-tighter">KENY</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.url}>
                    <Link href={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex items-center gap-3 p-2">
              <Avatar className="h-8 w-8 border">
                <AvatarImage src={""} />
                <AvatarFallback>
                  {profile?.fullName?.charAt(0) || "A"}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-1 flex-col text-left text-sm leading-tight overflow-hidden">
                <span className="truncate font-semibold">
                  {profile?.fullName || "Administrador"}
                </span>
                <span className="truncate text-xs text-muted-foreground">
                  @{profile?.username || "admin"}
                </span>
              </div>
            </div>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={handleLogout} className="text-destructive hover:text-destructive hover:bg-destructive/10">
              <LogOut className="h-4 w-4" />
              <span>Sair da conta</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
