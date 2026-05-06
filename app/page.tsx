import { Button } from "@/components/ui/button";
import {
  BrainIcon,
  CloudAngledRainZapIcon,
  CoinsBitcoinIcon,
  Upload05Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <header className="border-b border-white/10 bg-zinc-950/80 backdrop-blur-md fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Google Play"
              width={180}
              height={100}
              className="hover:scale-105 transition w-8 h-8"
            />
          </div>

          <nav className="hidden md:flex gap-8 text-sm">
            <Link href="#home" className="hover:text-emerald-400 transition">
              Home
            </Link>
            <Link
              href="#features"
              className="hover:text-emerald-400 transition"
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="hover:text-emerald-400 transition"
            >
              How it Works
            </Link>
            <Link href="#pricing" className="hover:text-emerald-400 transition">
              Pricing
            </Link>
          </nav>

          <Button className="bg-white text-black hover:bg-white/90">
            Download
          </Button>
        </div>
      </header>

      {/* HERO */}
      <section
        id="home"
        className="pt-28 pb-20 bg-linear-to-br from-zinc-950 via-zinc-900 to-emerald-950 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-size-[70px_70px]" />

        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 pt-8">
            <h1 className="text-5xl md:text-6xl font-black leading-tight tracking-tighter">
              Validar o que sabes
              <br />é tão importante
              <br />
              quanto estudar
            </h1>

            <p className="text-xl text-zinc-400 max-w-md">
              Transforma teus apontamentos, PDFs e fotos do caderno em quizzes
              inteligentes gerados por IA.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button>
                <Image
                  src="/google-play.svg"
                  alt="Google Play"
                  width={180}
                  height={52}
                  className="hover:scale-105 transition w-5 h-5"
                />
                Google Play
              </Button>
              <Button>
                <Image
                  src="/app-store.svg"
                  alt="Google Play"
                  width={180}
                  height={52}
                  className="hover:scale-105 transition w-5 h-5"
                />
                Google Play
              </Button>
            </div>

            <div className="text-sm text-emerald-400 flex items-center gap-2">
              ✓ Acesso ilimitado ao sistema de quizzes
            </div>
          </div>

          <div className="relative flex justify-center">
            <div className="relative">
              <Image
                src="/mockup.png"
                alt="KENY App Mockup"
                width={380}
                height={720}
                className="rounded-[3rem]"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-20 bg-zinc-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-3">
              Simples. Inteligente. Eficiente.
            </h2>
            <p className="text-zinc-400">
              Tudo que precisas para validar teu conhecimento
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-zinc-800/50 border border-white/5 rounded-2xl p-8 hover:border-emerald-500/30 transition">
              <HugeiconsIcon
                icon={Upload05Icon}
                size={24}
                color="currentColor"
                strokeWidth={1.5}
                className="w-12 h-12 text-emerald-500 mb-6"
              />

              <h3 className="text-xl font-semibold mb-2">Upload Rápido</h3>
              <p className="text-zinc-400">
                PDF, foto do caderno ou texto colado
              </p>
            </div>

            <div className="bg-zinc-800/50 border border-white/5 rounded-2xl p-8 hover:border-emerald-500/30 transition">
              <HugeiconsIcon
                icon={BrainIcon}
                size={24}
                color="currentColor"
                strokeWidth={1.5}
                className="w-12 h-12 text-emerald-500 mb-6"
              />

              <h3 className="text-xl font-semibold mb-2">IA Inteligente</h3>
              <p className="text-zinc-400">
                Gera quizzes personalizados automaticamente
              </p>
            </div>

            <div className="bg-zinc-800/50 border border-white/5 rounded-2xl p-8 hover:border-emerald-500/30 transition">
              <HugeiconsIcon
                icon={CloudAngledRainZapIcon}
                size={24}
                color="currentColor"
                strokeWidth={1.5}
                className="w-12 h-12 text-emerald-500 mb-6"
              />
              <h3 className="text-xl font-semibold mb-2">Feedback Imediato</h3>
              <p className="text-zinc-400">
                Sabe exatamente onde precisas melhorar
              </p>
            </div>

            <div className="bg-zinc-800/50 border border-white/5 rounded-2xl p-8 hover:border-emerald-500/30 transition">
              <HugeiconsIcon
                icon={CoinsBitcoinIcon}
                size={24}
                color="currentColor"
                strokeWidth={1.5}
                className="w-12 h-12 text-emerald-500 mb-6"
              />
              <h3 className="text-xl font-semibold mb-2">Assinaturas</h3>
              <p className="text-zinc-400">Acesso total sem limites</p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">
                Transforma estudo em validação real
              </h2>
              <div className="space-y-8">
                <div className="flex gap-5">
                  <div className="text-emerald-500 font-mono text-4xl">01</div>
                  <div>
                    <h4 className="font-semibold mb-1">Envia teu material</h4>
                    <p className="text-zinc-400">PDF, foto ou texto</p>
                  </div>
                </div>
                <div className="flex gap-5">
                  <div className="text-emerald-500 font-mono text-4xl">02</div>
                  <div>
                    <h4 className="font-semibold mb-1">IA gera o quiz</h4>
                    <p className="text-zinc-400">
                      Perguntas adaptadas ao teu conteúdo
                    </p>
                  </div>
                </div>
                <div className="flex gap-5">
                  <div className="text-emerald-500 font-mono text-4xl">03</div>
                  <div>
                    <h4 className="font-semibold mb-1">Testa e evolui</h4>
                    <p className="text-zinc-400">
                      Recebe relatório detalhado e evolui
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <Image
                src="/mockup-2.png"
                alt="App Interface"
                width={420}
                height={680}
              />
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-linear-to-r from-emerald-600 to-teal-600 py-20 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-6">
            Pronto para validar teu conhecimento?
          </h2>
          <p className="text-xl mb-10 text-white/90">
            Acesso ilimitado a todos os recursos
          </p>
          <Button size={"lg"}>Descarregar KENY Grátis</Button>
        </div>
      </section>
      <footer className="py-12 bg-zinc-950 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-zinc-500 text-sm">
            KENY © {new Date().getFullYear()} • Todos os direitos reservados
          </p>
          <div className="flex gap-6 text-sm">
            <Link href="/privacy-policy" className="text-zinc-400 hover:text-emerald-400 transition">
              Política de Privacidade
            </Link>
            <Link href="/account-deletion" className="text-zinc-400 hover:text-emerald-400 transition">
              Excluir Conta
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
