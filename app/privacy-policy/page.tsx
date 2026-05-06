import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 py-32 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-sm font-bold tracking-[0.2em] uppercase text-primary mb-4">Legal</h2>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-2">Privacy Policy</h1>
          <p className="text-muted-foreground mb-12 font-medium">
            Last updated: May 4, 2026
          </p>

          <div className="prose prose-zinc dark:prose-invert max-w-none space-y-12 text-muted-foreground leading-relaxed">
            <section>
              <p className="text-lg">
                Your privacy is important to us. This Privacy Policy explains how KENY collects, uses, stores, and protects your personal data.
              </p>
            </section>

            <section className="space-y-4">
              <h3 className="text-2xl font-bold text-foreground">1. Data We Collect</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Account information (name, email, profile photo)</li>
                <li>Authentication data (encrypted password)</li>
                <li>Uploaded content: PDFs, notebook photos, and text</li>
                <li>Quiz results and performance reports</li>
                <li>Subscription information</li>
                <li>Application usage data (interactions, completed quizzes)</li>
                <li>Technical information (device, OS version, IP)</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h3 className="text-2xl font-bold text-foreground">2. How We Use Your Data</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide and improve the AI quiz generation service</li>
                <li>Personalize your learning experience</li>
                <li>Manage your account and subscription plans</li>
                <li>Send important account notifications</li>
                <li>Analyze app usage for improvements</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h3 className="text-2xl font-bold text-foreground">3. Data Sharing</h3>
              <p>
                We do not sell your personal data. We may share data only in the following situations:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>With service providers (e.g., hosting, AI, payments)</li>
                <li>When required by law or competent authorities</li>
                <li>To protect the rights, safety, and property of KENY</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h3 className="text-2xl font-bold text-foreground">4. Data Security</h3>
              <p>
                We use appropriate technical and organizational measures to protect your data against unauthorized access, alteration, disclosure, or destruction.
              </p>
            </section>

            <section className="space-y-4">
              <h3 className="text-2xl font-bold text-foreground">5. Account Deletion</h3>
              <p>
                You can delete your account at any time directly in the application by going to <strong>Profile → Delete Account</strong>. After deletion, your personal data will be removed as described on the Account Deletion page.
              </p>
            </section>

            <section className="space-y-4">
              <h3 className="text-2xl font-bold text-foreground">6. Your Rights</h3>
              <p>As a user, you have the right to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access your personal data</li>
                <li>Rectify incorrect data</li>
                <li>Delete your account and data</li>
                <li>Revoke consent</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h3 className="text-2xl font-bold text-foreground">7. Contact</h3>
              <p>
                For any questions regarding this Privacy Policy or the processing of your data, please contact us:
              </p>
              <p className="mt-4">
                <strong>Email:</strong>{" "}
                <a
                  href="mailto:privacy@keny.app"
                  className="text-primary hover:underline font-bold"
                >
                  privacy@keny.app
                </a>
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
