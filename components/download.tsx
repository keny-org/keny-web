"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export function Download() {
  return (
    <section
      id="download"
      className="py-24 bg-primary text-primary-foreground overflow-hidden relative"
    >
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-black/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
              Ready to elevate <br />
              your learning?
            </h2>
            <p className="text-xl text-primary-foreground/80 max-w-lg leading-relaxed">
              Download KENY now and start validating your knowledge with the
              power of artificial intelligence. Reliable, fast, and efficient.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Button
                size="lg"
                variant="secondary"
                className="h-16 px-8 text-lg font-bold group"
                asChild
              >
                <Link href="https://play.google.com/store/apps/details?id=com.keny.mobile">
                  <Image
                    src="/google-play.svg"
                    alt="Google Play"
                    width={24}
                    height={24}
                    className="mr-3 w-6 h-6"
                  />
                  Google Play
                </Link>
              </Button>
            </div>
            <p className="text-sm font-medium opacity-70">
              ✓ Reliable • ✓ Fast • ✓ High Performance
            </p>
          </div>

          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[320px]">
              <Image
                src="/mockup-2.png"
                alt="KENY Interface"
                width={320}
                height={640}
                className="w-full h-auto drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
