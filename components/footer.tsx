"use client";

import Link from "next/link";

export function Footer() {
  return (
    <footer className="py-12 bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col items-center md:items-start gap-2">
          <p className="text-muted-foreground text-sm">
            KENY © {new Date().getFullYear()} • Validate what you know
          </p>
        </div>
        <div className="flex gap-8 text-sm font-medium">
          <Link href="/privacy-policy" className="text-muted-foreground hover:text-primary transition">
            Privacy Policy
          </Link>
          <Link href="/account-deletion" className="text-muted-foreground hover:text-primary transition">
            Delete Account
          </Link>
          <Link href="/#faq" className="text-muted-foreground hover:text-primary transition">
            FAQ
          </Link>
        </div>
      </div>
    </footer>
  );
}
