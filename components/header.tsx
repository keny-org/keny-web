"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export function Header() {
  return (
    <header className="border-b border-border bg-background/80 backdrop-blur-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="Keny Logo"
            width={32}
            height={32}
            className="w-8 h-8"
          />
          <span className="text-xl font-black tracking-tighter">KENY</span>
        </Link>

        <nav className="hidden md:flex gap-8 text-sm font-medium">
          <Link href="/#home" className="hover:text-primary transition">
            Home
          </Link>
          <Link href="/#features" className="hover:text-primary transition">
            Features
          </Link>
          <Link href="/#how-it-works" className="hover:text-primary transition">
            How it Works
          </Link>
          <Link href="/#faq" className="hover:text-primary transition">
            FAQ
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Button variant="ghost" className="hidden sm:flex" asChild>
            <Link href="/#download">Download</Link>
          </Button>
          <Button asChild>
            <Link href="/#download">Get Started</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
