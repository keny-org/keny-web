import { Card, CardContent } from "@/components/ui/card";
import { ShieldUserIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

interface AdminSummaryCardProps {
  totalAdmins: number;
}

export function AdminSummaryCard({ totalAdmins }: AdminSummaryCardProps) {
  return (
    <Card>
      <CardContent>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center  bg-primary/10">
            <HugeiconsIcon
              icon={ShieldUserIcon}
              size={20}
              className="text-primary"
            />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Total de admins</p>
            <p className="text-2xl font-bold">{totalAdmins}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
