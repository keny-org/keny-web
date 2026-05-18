"use client";

import { useDashboard } from "@/hooks/admin/use-dashboard";
import {
  Clock01Icon,
  CreditCardIcon,
  UserIcon,
  UserMultipleIcon,
} from "@hugeicons/core-free-icons";
import { StatCard } from "@/components/admin/dashboard/stat-card";
import { UserGrowthChart } from "@/components/admin/dashboard/user-growth-chart";
import { PlanDistributionChart } from "@/components/admin/dashboard/plan-distribution-chart";
import { RecentRequestsCard } from "@/components/admin/dashboard/recent-requests-card";
import { DashboardSkeleton } from "@/components/admin/dashboard/dashboard-skeleton";

export default function DashboardPage() {
  const { stats, isLoading } = useDashboard();

  if (isLoading || !stats) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total de Usuários"
          value={stats.counts.totalUsers}
          icon={UserMultipleIcon}
          variant="info"
        />
        <StatCard
          title="Assinaturas Ativas"
          value={stats.counts.activeSubscriptions}
          icon={CreditCardIcon}
          variant="primary"
        />
        <StatCard
          title="Pedidos Pendentes"
          value={stats.counts.pendingSubscriptions}
          icon={Clock01Icon}
          variant="warning"
        />
        <StatCard
          title="Administradores"
          value={stats.counts.totalAdmins}
          icon={UserIcon}
          variant="secondary"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <UserGrowthChart data={stats.userGrowth} />
        <PlanDistributionChart data={stats.subscriptionStats} />
      </div>

      <RecentRequestsCard requests={stats.recentRequests} />
    </div>
  );
}
