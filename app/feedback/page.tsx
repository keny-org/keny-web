"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Feedback, feedbackService } from "@/services/feedback";
import {
  Message01Icon,
  SentIcon,
  Tick01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useState } from "react";
import { toast } from "sonner";

export default function FeedbackPage() {
  const [formData, setFormData] = useState<Feedback>({
    userName: "",
    email: "",
    message: "",
    type: "BUG",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await feedbackService.submit(formData);
      setIsSuccess(true);
      toast.success("Feedback enviado com sucesso!");
    } catch (error) {
      toast.error("Erro ao enviar feedback.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-muted/30">
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
            <Button
              className="w-full"
              onClick={() => {
                setIsSuccess(false);
                setFormData({
                  userName: "",
                  email: "",
                  message: "",
                  type: "BUG",
                });
              }}
            >
              Enviar outro feedback
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-muted/30">
      <Card className="w-full max-w-xl border-none shadow-2xl overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-primary" />
        <CardHeader className="pt-10 pb-6 text-center">
          <div className="mx-auto w-12 h-12 bg-primary/10  flex items-center justify-center mb-4">
            <HugeiconsIcon
              icon={Message01Icon}
              size={24}
              className="text-primary"
            />
          </div>
          <CardTitle className="text-2xl font-bold">
            Feedback do Usuário
          </CardTitle>
          <CardDescription>
            Sua opinião é fundamental para melhorarmos o KENY.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="userName">Seu Nome (Opcional)</Label>
                <Input
                  id="userName"
                  placeholder="Como gostaria de ser chamado"
                  value={formData.userName}
                  onChange={(e) =>
                    setFormData({ ...formData, userName: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Seu Email (Opcional)</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="exemplo@email.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Tipo de Feedback</Label>
              <Select
                value={formData.type}
                onValueChange={(value: any) =>
                  setFormData({ ...formData, type: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="BUG">Reportar um Erro</SelectItem>
                  <SelectItem value="SUGGESTION">Sugerir Melhoria</SelectItem>
                  <SelectItem value="OTHER">Outros</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Mensagem</Label>
              <Textarea
                id="message"
                placeholder="Descreva detalhadamente seu problema ou sugestão..."
                className="min-h-[150px] resize-none"
                required
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
              />
            </div>

            <Button
              type="submit"
              className="w-full h-12 text-lg font-bold gap-2 group"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                "Enviando..."
              ) : (
                <>
                  Enviar Feedback
                  <HugeiconsIcon
                    icon={SentIcon}
                    size={20}
                    className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                  />
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
