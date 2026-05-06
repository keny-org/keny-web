import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function AccountDeletion() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 py-32 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-sm font-bold tracking-[0.2em] uppercase text-primary mb-4">Support</h2>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-12">Account Deletion</h1>

          <div className="prose prose-zinc dark:prose-invert max-w-none text-muted-foreground leading-relaxed space-y-12">
            <p className="text-lg">
              If you wish to delete your KENY account, you can do so directly within the application.
            </p>

            <section className="space-y-6">
              <h3 className="text-2xl font-bold text-foreground">How to delete your account:</h3>
              <ol className="list-decimal pl-6 space-y-4 text-lg">
                <li>
                  Open the <strong>KENY</strong> app
                </li>
                <li>
                  Go to your <strong>Profile</strong> (bottom right icon)
                </li>
                <li>
                  Tap on <strong>&quot;Delete Account&quot;</strong>
                </li>
                <li>Choose the reason for deletion</li>
                <li>Confirm the deletion</li>
              </ol>
            </section>

            <div className="p-8 bg-destructive/10 rounded-3xl border border-destructive/20">
              <p className="text-destructive font-bold text-lg">
                This action is irreversible. Once deleted, you will not be able to recover your data.
              </p>
            </div>

            <section className="space-y-6">
              <h3 className="text-2xl font-bold text-foreground">What data is deleted?</h3>
              <ul className="list-disc pl-6 space-y-3">
                <li>Your profile data (name, email, photo)</li>
                <li>History of completed quizzes</li>
                <li>Performance reports</li>
                <li>Uploaded documents and content</li>
                <li>Subscription information</li>
              </ul>
            </section>

            <section className="space-y-6">
              <h3 className="text-2xl font-bold text-foreground">Data we may retain temporarily:</h3>
              <ul className="list-disc pl-6 space-y-3">
                <li>Technical log records (for up to 30 days)</li>
                <li>Anonymized data for service improvement</li>
              </ul>
            </section>

            <p className="text-sm">
              Account deletion is processed immediately, but it may take up to 30 days for all data to be completely removed from our backups.
            </p>

            <div className="pt-8 border-t border-border">
              <p>
                If you have any questions, please contact us at:{" "}
                <a
                  href="mailto:support@keny.app"
                  className="text-primary hover:underline font-bold"
                >
                  support@keny.app
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
