import { HugeiconsIcon } from "@hugeicons/react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: IconSvgElement;
  variant: "info" | "primary" | "warning" | "secondary";
}

type IconSvgElement = readonly (readonly [
  string,
  {
    readonly [key: string]: string | number;
  },
])[];

export function StatCard({ title, value, icon, variant }: StatCardProps) {
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
