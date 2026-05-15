import LoginForm from "@/components/auth/login-form";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen">
      <div className="hidden lg:flex lg:w-1/2 bg-primary relative items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-primary via-primary/80 to-background/20" />

        <div className="absolute top-0 -left-20 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 -right-20 w-96 h-96 bg-black/10 rounded-full blur-3xl" />

        <div className="relative z-10 text-center space-y-6 p-12">
          <h1 className="text-4xl font-black tracking-tight text-white">
            Bem-vindo ao Keny Admin
          </h1>
          <p className="text-primary-foreground/80 text-lg max-w-md mx-auto font-medium">
            Gerencie sua plataforma de estudos de forma simples e eficiente.
          </p>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md space-y-8">
          <div className="lg:hidden text-center mb-8">
            <Image
              src="/logo.svg"
              alt="Keny Logo"
              width={60}
              height={60}
              className="mx-auto mb-4"
            />
          </div>

          <div className="space-y-2 text-center lg:text-left">
            <h2 className="text-3xl font-bold tracking-tight">Login</h2>
            <p className="text-muted-foreground">
              Insira suas credenciais para aceder ao painel administrativo.
            </p>
          </div>

          <div className="bg-card p-0 lg:bg-transparent lg:p-0">
            <LoginForm />
          </div>

          <p className="text-center text-sm text-muted-foreground pt-8">
            &copy; {new Date().getFullYear()} Keny. Todos os direitos
            reservados.
          </p>
        </div>
      </div>
    </div>
  );
}
