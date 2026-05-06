"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";

export default function QuizRedirect() {
  const { id } = useParams();

  const appSchemeUrl = `keny-mobile://quiz/${id}`;
  const playStoreUrl =
    "https://play.google.com/store/apps/details?id=com.keny.mobile";

  useEffect(() => {
    window.location.href = appSchemeUrl;
  }, [appSchemeUrl]);

  const handleOpenApp = () => {
    window.location.href = appSchemeUrl;
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 flex flex-col items-center justify-center p-6 pt-32">
        <div className="max-w-md w-full text-center space-y-12">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
              Ready to <br />
              <span className="text-primary">validate your knowledge?</span>
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              A personalized quiz has been shared with you. Open the app to start the challenge!
            </p>
          </div>

          <Card className="border-border bg-card shadow-2xl overflow-hidden rounded-[2.5rem]">
            <CardContent className="p-10 space-y-8">
              <div className="w-24 h-24 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto border border-primary/20">
                <Image
                  src="/logo.png"
                  alt="Keny"
                  width={48}
                  height={48}
                  className="w-12 h-12"
                />
              </div>

              <div className="space-y-4">
                <Button
                  onClick={handleOpenApp}
                  size="lg"
                  className="w-full h-16 rounded-2xl text-lg font-bold shadow-lg shadow-primary/20"
                >
                  Open Quiz in App
                </Button>
                <p className="text-sm text-muted-foreground font-medium">
                  If the app doesn&apos;t open automatically, click the button above.
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase tracking-[0.2em] font-bold">
                <span className="bg-background px-6 text-muted-foreground">
                  New to KENY?
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="outline"
                size="lg"
                className="h-14 px-8 rounded-xl font-bold border-2"
                asChild
              >
                <Link href={playStoreUrl} target="_blank" rel="noopener noreferrer">
                  <Image
                    src="/google-play.svg"
                    alt="Google Play"
                    width={20}
                    height={20}
                    className="w-5 h-5 mr-3"
                  />
                  Google Play
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="h-14 px-8 rounded-xl font-bold border-2 opacity-50 cursor-not-allowed"
              >
                <Image
                  src="/app-store.svg"
                  alt="App Store"
                  width={20}
                  height={20}
                  className="w-5 h-5 mr-3"
                />
                App Store
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
