"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MoonIcon, Sun01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useTheme } from "next-themes";

export function PreferencesCard() {
  const { theme, setTheme } = useTheme();

  return (
    <Card>
      <CardHeader className="border-b">
        <div className="flex items-center gap-2">
          <CardTitle>Preferências</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="font-medium text-sm">Tema do sistema</p>
            <p className="text-xs text-muted-foreground">
              Escolha entre o modo claro e escuro para o painel admin.
            </p>
          </div>
          <div className="flex bg-muted p-1 ">
            <button
              type="button"
              onClick={() => setTheme("light")}
              className={`p-2 transition-all ${
                theme === "light"
                  ? "bg-background shadow-sm text-primary"
                  : "text-muted-foreground"
              }`}
              aria-label="Ativar tema claro"
            >
              <HugeiconsIcon icon={Sun01Icon} size={18} />
            </button>
            <button
              type="button"
              onClick={() => setTheme("dark")}
              className={`p-2 transition-all ${
                theme === "dark"
                  ? "bg-background shadow-sm text-primary"
                  : "text-muted-foreground"
              }`}
              aria-label="Ativar tema escuro"
            >
              <HugeiconsIcon icon={MoonIcon} size={18} />
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
