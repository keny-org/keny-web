"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { StarIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

const testimonials = [
  {
    name: "Alex Johnson",
    role: "Student",
    content: "KENY changed the way I study. Being able to generate quizzes from my own notes is a game changer!",
    avatar: "AJ",
  },
  {
    name: "Maria Silva",
    role: "Teacher",
    content: "An incredible tool for both students and educators. The AI-generated questions are surprisingly accurate and relevant.",
    avatar: "MS",
  },
  {
    name: "David Chen",
    role: "Medical Student",
    content: "Perfect for long study sessions. It helps me focus on what I really need to review.",
    avatar: "DC",
  },
];

export function Feedback() {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold tracking-widest uppercase text-primary mb-4">Feedback</h2>
          <p className="text-3xl md:text-4xl font-black tracking-tight">What our users say</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <Card key={i} className="bg-muted/30 border-none shadow-none">
              <CardContent className="pt-8 space-y-6">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <HugeiconsIcon key={i} icon={StarIcon} size={16} className="text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
                <p className="text-lg italic text-muted-foreground">&quot;{t.content}&quot;</p>
                <div className="flex items-center gap-4 pt-4 border-t border-border">
                  <Avatar>
                    <AvatarFallback>{t.avatar}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-bold">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
