import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — Sana Food Scanner",
  description:
    "Learn how Sana protects your data and complies with POPIA (South Africa).",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100">
        <div className="mx-auto max-w-3xl px-6 py-5 flex items-center justify-between">
          <span className="text-xl font-bold tracking-tight text-gray-900">
            Sana
          </span>
          <span className="text-xs text-gray-400 hidden sm:inline">
            Food Scanner
          </span>
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-3xl px-6 py-10 sm:py-14">
        {/* Title */}
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
          Privacy Policy
        </h1>
        <p className="text-sm text-gray-500 mb-10">
          <strong>Effective Date:</strong> February 7, 2026
        </p>

        {/* Sections */}
        <div className="space-y-10 text-gray-700 leading-relaxed text-[15px] sm:text-base">
          {/* 1 */}
          <section>
            <h2 className="font-serif text-xl sm:text-2xl font-semibold text-gray-900 mb-3">
              1. Introduction
            </h2>
            <p>
              Sana (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;)
              operates the Sana Food Scanner mobile application. We are
              committed to protecting your privacy and complying with the{" "}
              <strong>
                Protection of Personal Information Act (POPIA)
              </strong>{" "}
              of South Africa.
            </p>
            <p className="mt-3">
              This policy explains how we process the personal information of
              parents (&ldquo;Guardians&rdquo;) and the data related to their
              children (&ldquo;Child Profiles&rdquo;).
            </p>
          </section>

          {/* 2 */}
          <section>
            <h2 className="font-serif text-xl sm:text-2xl font-semibold text-gray-900 mb-3">
              2. Important Notice: Not a Medical Device
            </h2>
            <p className="mb-3">Before using Sana, please note:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Educational Use Only:</strong> All data provided by this
                app (including &ldquo;Toxic Scores&rdquo; and ingredient
                analysis) is for informational purposes only.
              </li>
              <li>
                <strong>No Medical Advice:</strong> We do not provide medical
                diagnoses. The collection of health-related data (e.g.,
                &ldquo;Gut Health Goal&rdquo;) is solely used to filter food
                search results and does not constitute a medical record.
              </li>
            </ul>
          </section>

          {/* 3 */}
          <section>
            <h2 className="font-serif text-xl sm:text-2xl font-semibold text-gray-900 mb-3">
              3. The Data We Collect
            </h2>
            <p className="mb-4">
              To provide our &ldquo;Neuro-Shield&rdquo; and &ldquo;Safe
              Swap&rdquo; services, we collect the following:
            </p>

            {/* A */}
            <h3 className="font-semibold text-gray-900 mb-2">
              A. Guardian Information (You)
            </h3>
            <ul className="list-disc pl-5 space-y-2 mb-5">
              <li>
                Email address (for authentication via Google/Apple).
              </li>
              <li>
                Payment history (processed securely by Apple App Store/Google
                Play; we do not store credit card details).
              </li>
            </ul>

            {/* B */}
            <h3 className="font-semibold text-gray-900 mb-2">
              B. Child Data (Special Personal Information)
            </h3>
            <ul className="list-disc pl-5 space-y-2 mb-5">
              <li>
                <em>Nickname/First Name:</em> To personalize the dashboard.
              </li>
              <li>
                <em>Age:</em> To adjust nutritional relevance.
              </li>
              <li>
                <em>Dietary Goals:</em> Specific focus areas (e.g., &ldquo;Avoid
                Red 40&rdquo;, &ldquo;Focus&rdquo;, &ldquo;Sleep&rdquo;)
                selected by the Guardian.
              </li>
              <li>
                <em>Legal Basis:</em> By creating a Child Profile, you, as the
                Competent Person, explicitly consent to the processing of this
                data for the sole purpose of product filtering.
              </li>
            </ul>

            {/* C */}
            <h3 className="font-semibold text-gray-900 mb-2">
              C. Usage Data
            </h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                Barcodes scanned and product images uploaded.
              </li>
              <li>
                Approximate location (City level) to identify local product
                availability (e.g., &ldquo;Woolworths vs.&nbsp;Checkers&rdquo;).
              </li>
            </ul>
          </section>

          {/* 4 */}
          <section>
            <h2 className="font-serif text-xl sm:text-2xl font-semibold text-gray-900 mb-3">
              4. How We Use Your Data
            </h2>
            <p className="mb-3">We use your data strictly to:</p>
            <ol className="list-decimal pl-5 space-y-2">
              <li>
                <strong>Analyze Ingredients:</strong> Compare scanned barcodes
                against our toxicity database.
              </li>
              <li>
                <strong>Improve the Database:</strong> User-uploaded photos of
                local South African products help us expand our coverage.
              </li>
              <li>
                <strong>Authentication:</strong> Verify your identity and sync
                your preferences across devices.
              </li>
            </ol>
          </section>

          {/* 5 */}
          <section>
            <h2 className="font-serif text-xl sm:text-2xl font-semibold text-gray-900 mb-3">
              5. Data Sharing &amp; Third Parties
            </h2>
            <p className="mb-3">
              We do not sell your personal data to advertisers. We share data
              only with the following trusted processors:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Supabase (Database):</strong> Stores encrypted user
                profiles.
              </li>
              <li>
                <strong>Google Cloud (AI &amp; Vision):</strong> Processes images
                for text extraction.
              </li>
              <li>
                <strong>Open Food Facts:</strong> We query this public database
                for product details. (Note: We do not send user-identifiable
                data to Open Food Facts, only anonymous barcodes).
              </li>
            </ul>
          </section>

          {/* 6 */}
          <section>
            <h2 className="font-serif text-xl sm:text-2xl font-semibold text-gray-900 mb-3">
              6. Data Retention &amp; Deletion
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Retention:</strong> We retain your profile data as long
                as your account is active.
              </li>
              <li>
                <strong>Right to Delete:</strong> You may delete your account and
                all associated Child Profiles at any time by going to{" "}
                <strong>
                  Settings &gt; Danger Zone &gt; Delete Account
                </strong>
                . This action is irreversible and immediately wipes your data
                from our servers.
              </li>
            </ul>
          </section>

          {/* 7 */}
          <section>
            <h2 className="font-serif text-xl sm:text-2xl font-semibold text-gray-900 mb-3">
              7. Children&apos;s Privacy
            </h2>
            <p>
              Sana is intended for use by parents and guardians. We do not
              knowingly collect personal data directly from children under 18
              without parental consent. If we become aware that a child has
              provided us with personal data without parental consent, we will
              take steps to delete such information.
            </p>
          </section>

          {/* 8 */}
          <section>
            <h2 className="font-serif text-xl sm:text-2xl font-semibold text-gray-900 mb-3">
              8. International Transfers
            </h2>
            <p>
              Your information, including Personal Data, may be transferred
              to&mdash;and maintained on&mdash;computers located outside of
              South Africa (e.g., cloud servers in the EU or US). By using the
              App, you consent to this transfer, provided those jurisdictions
              offer data protection laws compatible with POPIA.
            </p>
          </section>

          {/* 9 */}
          <section>
            <h2 className="font-serif text-xl sm:text-2xl font-semibold text-gray-900 mb-3">
              9. Contact Us
            </h2>
            <p className="mb-3">
              If you have questions about this Privacy Policy or wish to
              exercise your POPIA rights (Access, Correction, Deletion), please
              contact our Information Officer:
            </p>
            <ul className="list-none space-y-1">
              <li>
                <strong>Email:</strong>{" "}
                <a
                  href="mailto:Eric.neuraflow1@gmail.com"
                  className="text-orange-500 underline underline-offset-2 hover:text-orange-600 transition-colors"
                >
                  Eric.neuraflow1@gmail.com
                </a>
              </li>
              <li>
                <strong>Address:</strong> Centurion, Gauteng, South Africa
              </li>
            </ul>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100">
        <div className="mx-auto max-w-3xl px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-400">
          <p>Last Updated: February 7, 2026</p>
          <p>
            Questions?{" "}
            <a
              href="mailto:Eric.neuraflow1@gmail.com"
              className="text-gray-500 underline underline-offset-2 hover:text-gray-700 transition-colors"
            >
              Eric.neuraflow1@gmail.com
            </a>
          </p>
          <p>&copy; 2026 Sana. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
