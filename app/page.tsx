import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Features } from "@/components/features";
import { Download } from "@/components/download";
import { FAQ } from "@/components/faq";
import { Feedback } from "@/components/feedback";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Hero />
        <Features />
        <Download />
        <FAQ />
        <Feedback />
      </main>
      <Footer />
    </div>
  );
}
