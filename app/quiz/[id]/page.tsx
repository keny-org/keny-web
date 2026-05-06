"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function QuizRedirect() {
  const { id } = useParams();

  const appSchemeUrl = `keny-mobile://quiz/${id}`;
  const storeUrl =
    "https://play.google.com/store/apps/details?id=com.keny.mobile";

  useEffect(() => {
    window.location.href = appSchemeUrl;
  }, [appSchemeUrl]);

  const handleOpenApp = () => {
    window.location.href = appSchemeUrl;
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-center p-6 text-center">
      <div className="mb-8">
        <Image
          src="/logo.png"
          alt="Keny Logo"
          width={100}
          height={100}
          className="mx-auto mb-4"
        />
        <h1 className="text-3xl font-bold mb-2">KENY</h1>
        <p className="text-zinc-400">Transforma os teus estudos com IA</p>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl max-w-sm w-full shadow-2xl">
        <h2 className="text-xl font-semibold mb-6">Pronto para o Quiz?</h2>

        <button
          onClick={handleOpenApp}
          className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 rounded-2xl transition-colors mb-4 text-lg"
        >
          Abrir na App
        </button>

        <p className="text-sm text-zinc-500">
          Se a aplicação não abrir automaticamente, clica no botão acima.
        </p>
      </div>

      <div className="mt-12">
        <p className="text-zinc-500 mb-4 text-sm">Ainda não tens o Keny?</p>
        <div className="flex gap-4 justify-center">
          <a href={storeUrl} target="_blank" rel="noopener noreferrer">
            <Image
              src="/google-play.svg"
              alt="Google Play"
              width={140}
              height={42}
            />
          </a>
          {/* Add Apple Store Link when available */}
        </div>
      </div>
    </div>
  );
}
