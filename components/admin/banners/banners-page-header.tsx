import { Button } from "@/components/ui/button";
import { Add01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

interface BannersPageHeaderProps {
  onCreate: () => void;
}

export function BannersPageHeader({ onCreate }: BannersPageHeaderProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <h3 className="text-xl font-semibold">Gerenciar Banners</h3>
      </div>

      <Button className="gap-2" onClick={onCreate}>
        <HugeiconsIcon icon={Add01Icon} size={16} />
        Novo Banner
      </Button>
    </div>
  );
}
