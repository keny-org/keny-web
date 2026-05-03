import Image from "next/image";

export default function AccountDeletion() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white py-12 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-10">
          <div>
            <Image
              src="/logo.png"
              alt="Google Play"
              width={180}
              height={100}
              className="hover:scale-105 transition w-8 h-8"
            />
          </div>
          <h1 className="text-3xl font-bold">KENY</h1>
        </div>

        <h2 className="text-4xl font-bold mb-8">Eliminar Conta</h2>

        <div className="prose prose-invert max-w-none text-zinc-300">
          <p className="text-lg">
            Se desejar eliminar a sua conta KENY, pode fazê-lo diretamente na
            aplicação.
          </p>

          <h3 className="text-2xl font-semibold mt-10 mb-4">
            Como eliminar a sua conta:
          </h3>

          <ol className="list-decimal pl-6 space-y-4 text-lg">
            <li>
              Abra a aplicação <strong>KENY</strong>
            </li>
            <li>
              Vá ao seu <strong>Perfil</strong> (ícone no canto inferior
              direito)
            </li>
            <li>
              Toque em <strong>&quot;Eliminar Conta&quot;</strong>
            </li>
            <li>Escolha o motivo da eliminação</li>
            <li>Confirme a eliminação</li>
          </ol>

          <div className="mt-10 p-6 bg-zinc-900 rounded-2xl border border-red-500/20">
            <p className="text-red-400 font-medium">
              Esta ação é irreversível. Após a eliminação, não poderá recuperar
              os seus dados.
            </p>
          </div>

          <h3 className="text-2xl font-semibold mt-12 mb-4">
            Quais dados são eliminados?
          </h3>

          <ul className="list-disc pl-6 space-y-3">
            <li>Os seus dados de perfil (nome, email, foto)</li>
            <li>Histórico de quizzes realizados</li>
            <li>Relatórios de desempenho</li>
            <li>Documentos e conteúdos carregados</li>
            <li>Saldo de K-Coins</li>
          </ul>

          <h3 className="text-2xl font-semibold mt-12 mb-4">
            Dados que podemos manter temporariamente:
          </h3>
          <ul className="list-disc pl-6 space-y-3">
            <li>Registros de logs técnicos (por até 30 dias)</li>
            <li>Dados anonimizados para melhoria do serviço</li>
          </ul>

          <p className="mt-10 text-sm text-zinc-500">
            A eliminação da conta é processada imediatamente, mas pode demorar
            até 30 dias para que todos os dados sejam completamente removidos
            dos nossos backups.
          </p>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 text-center text-sm text-zinc-500">
          <p>
            Qualquer dúvida, entre em contacto connosco através do email:{" "}
            <a
              href="mailto:suporte@keny.app"
              className="text-emerald-400 hover:underline"
            >
              suporte@keny.app
            </a>
          </p>
          <p className="mt-6">
            KENY © {new Date().getFullYear()} • Todos os direitos reservados
          </p>
        </div>
      </div>
    </div>
  );
}
