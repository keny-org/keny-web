"use client";

import { Button } from "@/components/ui/button";
import { adminService } from "@/services/admin";
import {
  Clock01Icon,
  CreditCardIcon,
  User02Icon,
  UserIcon,
  UserMultipleIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const COLORS = ["var(--info)", "var(--primary)", "var(--warning)", "var(--destructive)"];

export default function DashboardPage() {
  const [stats, setStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await adminService.getStats();
        setStats(data);
      } catch (error) {
        console.error("Erro ao carregar estatísticas:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-64">Carregando...</div>
    );

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
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

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-card p-6 border">
          <h3 className="text-lg font-bold mb-6">
            Crescimento de Usuários (30 dias)
          </h3>
          <div className="h-75 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={stats.userGrowth}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                <XAxis dataKey="date" stroke="var(--muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="var(--info)"
                  strokeWidth={2}
                  dot={{ r: 4, fill: "var(--info)" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-card p-6 border">
          <h3 className="text-lg font-bold mb-6">Distribuição de Planos</h3>
          <div className="h-75 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stats.subscriptionStats}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} ${percent ? (percent * 100).toFixed(0) : 0}%`
                  }
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="count"
                  nameKey="plan"
                >
                  {stats.subscriptionStats.map((entry: any, index: number) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-card p-6 border">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold">Pedidos de Subscrição Recentes</h3>
          <Button variant="outline" size="sm" asChild>
            <Link href="/admin/subscriptions">Ver Todos</Link>
          </Button>
        </div>

        <div className="space-y-4">
          {stats.recentRequests.length === 0 ? (
            <p className="text-center py-10 text-muted-foreground">
              Nenhum pedido pendente.
            </p>
          ) : (
            stats.recentRequests.map((req: any) => (
              <div
                key={req.id}
                className="flex items-center justify-between p-4 bg-muted/50 border border-transparent hover:border-border transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 bg-primary/10 flex items-center justify-center">
                    <HugeiconsIcon
                      className="h-5 w-5 text-primary"
                      icon={User02Icon}
                    ></HugeiconsIcon>
                  </div>
                  <div>
                    <p className="font-bold text-sm">{req.user.fullName}</p>
                    <p className="text-xs text-muted-foreground">
                      {req.plan.title} • {req.plan.price}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">
                    {new Date(req.createdAt).toLocaleString()}
                  </p>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 border bg-warning/10 text-warning border-warning/20">
                    Pendente
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
  variant,
}: {
  title: string;
  value: string | number;
  icon: any;
  variant: "info" | "primary" | "warning" | "secondary";
}) {
  const variantClasses = {
    info: "bg-info/10 text-info border-info/20",
    primary: "bg-primary/10 text-primary border-primary/20",
    warning: "bg-warning/10 text-warning border-warning/20",
    secondary: "bg-secondary/10 text-secondary-foreground border-secondary/20",
  };

  return (
    <div className="bg-card p-6 border flex items-center gap-4">
      <div className={`p-3 border ${variantClasses[variant]}`}>
        <HugeiconsIcon icon={icon} size={24} />
      </div>
      <div>
        <p className="text-sm text-muted-foreground font-medium">{title}</p>
        <h4 className="text-2xl font-bold">{value}</h4>
      </div>
    </div>
  );
}
