"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BrainIcon,
  CheckmarkCircle01Icon,
  GlobalIcon,
  ZapIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

const features = [
  {
    title: "Performance",
    description:
      "A simple and efficient platform to learn better and track your progress in real-time.",
    icon: BrainIcon,
  },
  {
    title: "Efficient",
    description:
      "Save time with automated quiz generation from any study material you have.",
    icon: CheckmarkCircle01Icon,
  },
  {
    title: "Fast",
    description:
      "Instant feedback and quick results to keep your study flow uninterrupted.",
    icon: ZapIcon,
  },
  {
    title: "High Performance",
    description:
      "Optimized for speed and reliability, ensuring a seamless educational experience.",
    icon: GlobalIcon,
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 bg-muted/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-sm font-bold tracking-widest uppercase text-primary mb-4">
            Features
          </h2>
          <p className="text-4xl md:text-5xl font-black tracking-tight max-w-2xl mx-auto">
            Simple. Intelligent. Efficient.
          </p>
          <p className="mt-6 text-xl text-muted-foreground">
            Everything you need to validate your knowledge.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="bg-background border-border hover:border-primary/50 transition-colors"
            >
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 flex items-center justify-center mb-4 border border-primary/20">
                  <HugeiconsIcon
                    icon={feature.icon}
                    size={24}
                    className="text-primary"
                  />
                </div>
                <CardTitle className="text-xl font-bold">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
