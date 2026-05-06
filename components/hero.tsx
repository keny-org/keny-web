"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    <section id="home" className="pt-32 pb-24 overflow-hidden bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center text-center space-y-8">
          <div className="space-y-4 max-w-4xl">
            <h2 className="text-sm font-bold tracking-[0.2em] uppercase text-primary mb-6">
              Empowering Education
            </h2>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight">
              Validate what you know <br className="hidden md:block" />
              is as important as studying
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed pt-4">
              High performance to connect you with qualified professionals,
              optimize educational management and facilitate the purchase of
              school materials.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 justify-center pt-8">
            <Button
              size="lg"
              className="h-14 px-8 rounded-full text-lg font-bold"
              asChild
            >
              <Link href="#download">Download Now</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-14 px-8 rounded-full text-lg font-bold"
              asChild
            >
              <Link href="#features">Learn More</Link>
            </Button>
          </div>

          <div className="relative mt-16 w-full max-w-5xl">
            <div className="absolute -inset-4 bg-primary/20 blur-3xl rounded-full opacity-30" />
            <div className="relative border border-border bg-card rounded-[2.5rem] p-4 shadow-2xl overflow-hidden">
              <Image
                src="/mockup.png"
                alt="KENY App Preview"
                width={1200}
                height={600}
                className="w-full h-auto rounded-[2rem]"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
