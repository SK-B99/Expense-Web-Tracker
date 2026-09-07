import Link from "next/link"

const sections = [
  {
    title: "1. Information We Collect",
    content: (
      <>
        <p>
          When you use our service, we may collect information you provide
          directly to us, including your name, email address, and information
          you enter into the application.
        </p>
        <p>
          This may include financial information such as income, expenses,
          transactions, categories, notes, dates, and amounts.
        </p>
        <p>
          We may also collect basic technical and usage information, such as
          your browser, device, and how you interact with the application.
        </p>
      </>
    ),
  },
  {
    title: "2. How We Use Your Information",
    content: (
      <>
        <p>We use your information to:</p>
        <ul>
          <li>Provide and operate the application.</li>
          <li>Track and organize your income and expenses.</li>
          <li>Generate financial summaries and reports.</li>
          <li>Save your preferences and account settings.</li>
          <li>Improve the performance and reliability of the service.</li>
          <li>Protect the security of the application.</li>
          <li>Communicate with you about your account or the service.</li>
        </ul>
        <p>
          We do not sell your personal or financial information.
        </p>
      </>
    ),
  },
  {
    title: "3. Your Financial Data",
    content: (
      <>
        <p>
          The financial information you enter into the application belongs to
          you.
        </p>
        <p>
          We process this information only as necessary to provide features
          such as transaction tracking, calculations, categorization, and
          financial summaries.
        </p>
        <p>
          Our application is a financial tracking and organization tool. It
          does not provide financial, investment, tax, accounting, or legal
          advice.
        </p>
      </>
    ),
  },
  {
    title: "4. Data Security",
    content: (
      <>
        <p>
          We use reasonable technical and organizational measures to protect
          your information against unauthorized access, loss, misuse, or
          disclosure.
        </p>
        <p>
          However, no internet-based service can guarantee absolute security.
          You are responsible for keeping your account credentials secure.
        </p>
      </>
    ),
  },
  {
    title: "5. Information Sharing",
    content: (
      <>
        <p>
          We may use trusted third-party providers for services such as
          hosting, authentication, storage, analytics, email, and other
          infrastructure required to operate the application.
        </p>
        <p>
          These providers may process information on our behalf and are
          expected to use it only for the purposes for which it was provided.
        </p>
        <p>
          We may also disclose information when required by law or when
          reasonably necessary to protect our users, service, or legal rights.
        </p>
      </>
    ),
  },
  {
    title: "6. Cookies",
    content: (
      <p>
        We may use cookies or similar technologies to keep you signed in,
        remember preferences, understand how the service is used, and improve
        the application. You can control cookies through your browser
        settings.
      </p>
    ),
  },
  {
    title: "7. Data Retention",
    content: (
      <p>
        We retain your information for as long as reasonably necessary to
        provide the service, maintain your account, comply with legal
        obligations, resolve disputes, and maintain security. When you delete
        your account, we will delete or anonymize your information within a
        reasonable period, except where retention is required by law.
      </p>
    ),
  },
  {
    title: "8. Your Choices",
    content: (
      <>
        <p>Depending on the features available, you may be able to:</p>
        <ul>
          <li>Access and review your information.</li>
          <li>Update or correct your account information.</li>
          <li>Delete transactions you have entered.</li>
          <li>Delete your account.</li>
          <li>Contact us about your personal information.</li>
        </ul>
        <p>
          For privacy-related requests, contact us at{" "}
          <a
            href="mailto:[Support Email]"
            className="font-medium text-foreground underline underline-offset-4"
          >
            [Support Email]
          </a>
          .
        </p>
      </>
    ),
  },
  {
    title: "9. Children's Privacy",
    content: (
      <p>
        Our service is not intended for children who are not legally permitted
        to use online services independently. We do not knowingly collect
        personal information from children in violation of applicable law.
      </p>
    ),
  },
  {
    title: "10. Changes to This Policy",
    content: (
      <p>
        We may update this Privacy Policy from time to time. When we make
        changes, we will update the date at the top of this page. Your
        continued use of the service after changes become effective means that
        you acknowledge the updated policy.
      </p>
    ),
  },
  {
    title: "11. Contact Us",
    content: (
      <p>
        If you have questions about this Privacy Policy or how we handle your
        information, contact us at{" "}
        <a
          href="mailto:[Support Email]"
          className="font-medium text-foreground underline underline-offset-4"
        >
          [Support Email]
        </a>
        .
      </p>
    ),
  },
]

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-4xl px-6 py-12 md:px-8 md:py-20">
        {/* Header */}
        <div className="mb-12">
          <Link
            href="/"
            className="mb-8 inline-flex items-center text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            ← Back to dashboard
          </Link>

          <div className="mb-4 inline-flex rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
            Legal
          </div>

          <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
            Privacy Policy
          </h1>

          <p className="mt-4 text-sm text-muted-foreground">
            Last updated: September 7, 2026
          </p>

          <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground">
            We respect your privacy. This policy explains what information we
            collect, how we use it, and how we protect it when you use our
            financial tracking application.
          </p>
        </div>

        {/* Content */}
        <div className="divide-y divide-border border-y border-border">
          {sections.map((section) => (
            <section key={section.title} className="py-8">
              <h2 className="text-lg font-semibold tracking-tight">
                {section.title}
              </h2>

              <div className="mt-4 space-y-4 text-sm leading-7 text-muted-foreground">
                {section.content}
              </div>
            </section>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-10 flex flex-col gap-4 border-t border-border pt-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 [App Name]. All rights reserved.</p>

          <div className="flex gap-4">
            <Link
              href="/terms"
              className="transition-colors hover:text-foreground"
            >
              Terms of Service
            </Link>
            <Link
              href="/"
              className="transition-colors hover:text-foreground"
            >
              Home
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
