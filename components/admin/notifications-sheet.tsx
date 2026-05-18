"use client";

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
import { Notification01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useEffect, useState } from "react";

const mockNotifications = [
  {
    id: "1",
    user: {
      name: "Adão João",
      avatar: "",
      initials: "AJ",
    },
    title: "Enviou um arquivo",
    description: "Bring a story.text",
    time: "Agora",
    actions: [
      { label: "Recusar", variant: "destructive" as const },
      { label: "Salvar", variant: "default" as const },
    ],
  },
  {
    id: "2",
    user: {
      name: "Maria Silva",
      avatar: "",
      initials: "MS",
    },
    title: "Nova subscrição",
    description: "Plano Premium assinado",
    time: "2h atrás",
  },
];

export function NotificationsSheet() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant={"outline"} size="icon" className="relative">
        <HugeiconsIcon
          icon={Notification01Icon}
          size={24}
          color="currentColor"
          strokeWidth={1.5}
        />
        <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
      </Button>
    );
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={"outline"} size="icon" className="relative">
          <HugeiconsIcon
            icon={Notification01Icon}
            size={24}
            color="currentColor"
            strokeWidth={1.5}
          />
          <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader className="pb-4">
          <SheetTitle className="text-xl font-bold">Notificações</SheetTitle>
        </SheetHeader>

        <div className="space-y-6">
          <div>
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 p-4 py-2 bg-muted">
              Hoje
            </div>
            <div className="space-y-3">
              {mockNotifications.map((notification) => (
                <Card key={notification.id}>
                  <CardContent>
                    <div className="flex gap-3">
                      <Avatar>
                        <AvatarImage src={notification.user.avatar} />
                        <AvatarFallback>
                          {notification.user.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-1">
                        <div className="flex justify-between items-start">
                          <h4 className="font-semibold text-sm">
                            {notification.user.name}
                          </h4>
                          <span className="text-[10px] text-muted-foreground">
                            {notification.time}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {notification.title}{" "}
                          <span className="font-medium text-foreground">
                            {notification.description}
                          </span>
                        </p>
                        {notification.actions && (
                          <div className="flex gap-2 pt-2">
                            {notification.actions.map((action) => (
                              <Button
                                key={action.label}
                                variant={action.variant}
                                size="sm"
                                className="h-8 text-[10px] px-3"
                              >
                                {action.label}
                              </Button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
