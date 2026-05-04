import Image from "next/image";

export default function PrivacyPolicy() {
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

        <h2 className="text-4xl font-bold mb-2">Política de Privacidade</h2>
        <p className="text-zinc-500 mb-12">
          Última atualização: 04 de Maio de 2026
        </p>

        <div className="prose prose-invert max-w-none text-zinc-300 space-y-10">
          <section>
            <p>
              A sua privacidade é importante para nós. Esta Política de
              Privacidade explica como a KENY recolhe, utiliza, armazena e
              protege os seus dados pessoais.
            </p>
          </section>

          <section>
            <h3 className="text-2xl font-semibold mb-4">
              1. Dados que Recolhemos
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Informações de conta (nome, email, foto de perfil)</li>
              <li>Dados de autenticação (senha encriptada)</li>
              <li>Conteúdos enviados: PDFs, fotos de cadernos e textos</li>
              <li>Resultados dos quizzes e relatórios de desempenho</li>
              <li>Saldo de K-Coins e histórico de transações</li>
              <li>
                Dados de uso da aplicação (interações, quizzes realizados)
              </li>
              <li>Informações técnicas (dispositivo, versão do SO, IP)</li>
            </ul>
          </section>

          <section>
            <h3 className="text-2xl font-semibold mb-4">
              2. Como Utilizamos os Seus Dados
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Fornecer e melhorar o serviço de geração de quizzes por IA
              </li>
              <li>Personalizar a sua experiência de aprendizagem</li>
              <li>Gerir a sua conta e saldo de K-Coins</li>
              <li>Enviar notificações importantes sobre a conta</li>
              <li>Analisar o uso da aplicação para melhorias</li>
              <li>Cumprir obrigações legais</li>
            </ul>
          </section>

          <section>
            <h3 className="text-2xl font-semibold mb-4">
              3. Partilha de Dados
            </h3>
            <p className="mb-4">
              Não vendemos os seus dados pessoais. Podemos partilhar dados
              apenas nas seguintes situações:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Com prestadores de serviços (ex: hospedagem, IA, pagamentos)
              </li>
              <li>Quando exigido por lei ou autoridades competentes</li>
              <li>
                Para proteger os direitos, segurança e propriedade da KENY
              </li>
            </ul>
          </section>

          <section>
            <h3 className="text-2xl font-semibold mb-4">
              4. Segurança dos Dados
            </h3>
            <p>
              Utilizamos medidas técnicas e organizacionais adequadas para
              proteger os seus dados contra acesso não autorizado, alteração,
              divulgação ou destruição.
            </p>
          </section>

          <section>
            <h3 className="text-2xl font-semibold mb-4">
              5. Eliminação da Conta
            </h3>
            <p>
              Pode eliminar a sua conta a qualquer momento diretamente na
              aplicação, indo ao <strong>Perfil → Eliminar Conta</strong>. Após
              a eliminação, os seus dados pessoais serão removidos conforme
              descrito na página de Eliminação de Conta.
            </p>
          </section>

          <section>
            <h3 className="text-2xl font-semibold mb-4">6. Seus Direitos</h3>
            <p className="mb-4">Como utilizador, tem o direito de:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Aceder aos seus dados pessoais</li>
              <li>Retificar dados incorretos</li>
              <li>Eliminar a sua conta e dados</li>
              <li>Revogar consentimentos</li>
            </ul>
          </section>

          <section>
            <h3 className="text-2xl font-semibold mb-4">7. Contacto</h3>
            <p>
              Para qualquer questão relacionada com esta Política de Privacidade
              ou tratamento dos seus dados, entre em contacto connosco:
            </p>
            <p className="mt-4">
              <strong>Email:</strong>{" "}
              <a
                href="mailto:privacidade@keny.app"
                className="text-emerald-400 hover:underline"
              >
                privacidade@keny.app
              </a>
            </p>
          </section>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 text-center text-sm text-zinc-500">
          <p>
            KENY © {new Date().getFullYear()} • Todos os direitos reservados
          </p>
        </div>
      </div>
    </div>
  );
}
