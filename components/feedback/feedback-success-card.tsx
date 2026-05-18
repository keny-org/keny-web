import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tick01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

interface FeedbackSuccessCardProps {
  onReset: () => void;
}

export function FeedbackSuccessCard({ onReset }: FeedbackSuccessCardProps) {
  return (
    <Card className="w-full max-w-md text-center py-8">
      <CardContent className="space-y-6">
        <div className="mx-auto w-16 h-16 bg-primary/10  flex items-center justify-center">
          <HugeiconsIcon
            icon={Tick01Icon}
            size={32}
            className="text-primary"
          />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Obrigado!</h2>
          <p className="text-muted-foreground">
            Seu feedback foi recebido e será analisado por nossa equipe.
          </p>
        </div>
        <Button className="w-full" onClick={onReset}>
          Enviar outro feedback
        </Button>
      </CardContent>
    </Card>
  );
}
