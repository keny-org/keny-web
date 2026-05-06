"use client";

import { Button } from "@/components/ui/button";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    title: "Intelligent Study",
    description:
      "Optimize your learning with our AI-driven system that identifies your gaps.",
    image: "/mockup.png",
  },
  {
    title: "Real-time Analytics",
    description:
      "Track your progress with detailed charts and performance metrics.",
    image: "/mockup-2.png",
  },
  {
    title: "Global Community",
    description:
      "Connect with students and professionals from all over the world.",
    image: "/mockup-3.png",
  },
  {
    title: "Verified Excellence",
    description:
      "Get certified for your knowledge and stand out in the market.",
    image: "/mockup-4.png",
  },
];

function HeroHeader() {
  return (
    <section className="relative h-[80vh] flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
          style={{
            backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
            color: "var(--primary)",
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 text-center space-y-6">
        <div className="space-y-4">
          <div className="overflow-hidden">
            <h2 className="animate-mask-inner text-sm font-bold tracking-[0.2em] uppercase text-primary">
              Empowering Education
            </h2>
          </div>
          <div className="overflow-hidden text-center">
            <h1 className="animate-mask-inner text-3xl md:text-5xl lg:text-7xl font-black leading-tight tracking-tight">
              Validate what you know <br /> is as important as studying
            </h1>
          </div>
        </div>

        <div className="animate-fade max-w-2xl mx-auto">
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            High performance to connect you with qualified professionals,
            optimize educational management and facilitate the purchase of
            school materials.
          </p>
        </div>

        <div className="animate-fade flex flex-wrap gap-3 justify-center pt-4">
          <Button size="lg" className="h-12 px-10 text-base font-bold" asChild>
            <Link href="#download">Download Now</Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="h-12 px-10 text-base font-bold "
            asChild
          >
            <Link href="#features">Learn More</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

function FeatureScroll() {
  const scrollSectionRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<(HTMLDivElement | null)[]>([]);
  const textItemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!scrollSectionRef.current) return;

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: scrollSectionRef.current,
          start: "top top",
          end: `+=${features.length * 100}%`,
          pin: true,
          scrub: 0.5,
          onUpdate: (self) => {
            const step = Math.min(
              Math.floor(self.progress * (features.length - 0.01)),
              features.length - 1,
            );
            setActiveStep(step);
          },
        },
      });

      features.forEach((_, index) => {
        if (index === 0) return;

        const label = `step-${index}`;

        // Image Transition
        scrollTl.to(
          imagesRef.current[index - 1],
          {
            opacity: 0,
            scale: 0.95,
            duration: 1,
          },
          label,
        );

        scrollTl.fromTo(
          imagesRef.current[index],
          { opacity: 0, scale: 1.05 },
          { opacity: 1, scale: 1, duration: 1 },
          label,
        );

        // Text Transition
        scrollTl.to(
          textItemsRef.current[index - 1],
          {
            opacity: 0,
            y: -30,
            duration: 1,
          },
          label,
        );

        scrollTl.fromTo(
          textItemsRef.current[index],
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1 },
          label,
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="features"
      ref={scrollSectionRef}
      className="relative h-screen flex items-center overflow-hidden border-t border-border"
    >
      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
        {/* Left: Text Content */}
        <div className="relative h-75 flex flex-col justify-center">
          {features.map((feature, index) => (
            <div
              key={`text-${index}`}
              ref={(el) => {
                textItemsRef.current[index] = el;
              }}
              className={`absolute inset-0 flex flex-col justify-center space-y-6 transition-opacity duration-500 ${activeStep === index ? "opacity-100" : "opacity-0 pointer-events-none"}`}
            >
              <h3 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter uppercase leading-none">
                {feature.title}
              </h3>
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-md">
                {feature.description}
              </p>
              <div className="w-16 h-1 bg-primary " />
            </div>
          ))}
        </div>

        {/* Right: Mockup Image */}
        <div className="relative aspect-9/16 h-[50vh] md:h-[70vh] mx-auto lg:mx-0 w-full max-w-100">
          <div className="absolute inset-0 bg-primary/5 blur-3xl opacity-20 pointer-events-none" />

          <div className="relative h-full w-full overflow-hidden">
            {features.map((feature, index) => (
              <div
                key={`img-${index}`}
                ref={(el) => {
                  imagesRef.current[index] = el;
                }}
                className={`absolute inset-0 ${index === 0 ? "opacity-100" : "opacity-0"}`}
              >
                <Image
                  src={feature.image}
                  alt={feature.title}
                  fill
                  className="object-contain"
                  priority={index === 0}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance Animations
      const tl = gsap.timeline();
      tl.from(".animate-mask-inner", {
        y: "100%",
        duration: 1,
        stagger: 0.1,
        ease: "power4.out",
      });
      tl.from(
        ".animate-fade",
        {
          opacity: 0,
          y: 20,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.6",
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-background">
      <HeroHeader />
      <FeatureScroll />
    </div>
  );
}
