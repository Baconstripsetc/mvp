"use client"

import { ArrowLeft } from "lucide-react"

interface TermsPageProps {
  onBack: () => void
}

export function TermsPage({ onBack }: TermsPageProps) {
  return (
    <div className="flex min-h-screen flex-col" style={{ background: "linear-gradient(180deg, #f5f0ed 0%, #fff 100%)" }}>
      {/* Header */}
      <div className="sticky top-0 z-10 flex items-center justify-between p-4 pb-4" style={{ background: "rgba(245, 240, 237, 0.95)", backdropFilter: "blur(20px)" }}>
        <button
          onClick={onBack}
          className="flex h-10 w-10 items-center justify-center text-muted-foreground transition-all hover:text-foreground"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-xl font-bold text-foreground">Terms & Privacy</h1>
        <div className="w-10" />
      </div>

      {/* Content */}
      <div className="flex-1 px-4 pb-8">
        <div
          className="rounded-2xl p-6"
          style={{
            background: "rgba(255, 255, 255, 0.7)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.8)",
          }}
        >
          {/* Terms of Service */}
          <div className="prose prose-sm max-w-none">
            <h2 className="mb-4 text-2xl font-bold text-foreground">Terms of Service</h2>
            
            <p className="mb-2 text-sm text-muted-foreground">
              <strong>Last Updated:</strong> February 4, 2026
            </p>

            <h3 className="mb-3 mt-6 text-lg font-semibold text-foreground">1. EDUCATIONAL PURPOSE (NON-MEDICAL DISCLAIMER)</h3>
            <p className="mb-3 text-sm leading-relaxed text-foreground">
              Sana Food Scanner ("the App") is strictly an <strong>educational and informational tool</strong>. The "Toxic Scores," "Neuro-Trigger Alerts," and "Safe Swaps" provided are based on algorithmic analysis of public data and independent laboratory studies.
            </p>
            <p className="mb-3 text-sm leading-relaxed text-foreground">
              <strong>The App does NOT provide medical advice, diagnosis, or treatment.</strong>
            </p>
            <ul className="mb-4 ml-5 list-disc space-y-2 text-sm text-foreground">
              <li><strong>Consult a Professional:</strong> Always seek the advice of your physician or qualified pediatric health provider regarding any medical condition or dietary change.</li>
              <li><strong>Emergency:</strong> In case of a medical emergency, call your doctor or emergency services immediately.</li>
              <li><strong>No Doctor-Patient Relationship:</strong> Use of this App does not establish a doctor-patient relationship between you and Sana.</li>
            </ul>

            <h3 className="mb-3 mt-6 text-lg font-semibold text-foreground">2. DATA ACCURACY & LIABILITY</h3>
            <p className="mb-3 text-sm leading-relaxed text-foreground">
              We aggregate data from Open Food Facts and independent sources. While we strive for accuracy:
            </p>
            <ul className="mb-4 ml-5 list-disc space-y-2 text-sm text-foreground">
              <li><strong>No Warranty:</strong> We do not warrant that ingredient lists or "Ghost Label" warnings are 100% accurate, complete, or current. Product formulations change without notice.</li>
              <li><strong>Verification:</strong> You are responsible for reading the physical product label before consumption.</li>
              <li><strong>Liability:</strong> To the fullest extent permitted by the Consumer Protection Act (CPA) of South Africa, Sana shall not be liable for any direct, indirect, or consequential damages resulting from the use of this App.</li>
            </ul>

            <h3 className="mb-3 mt-6 text-lg font-semibold text-foreground">3. SUBSCRIPTIONS & CANCELLATIONS</h3>
            <ul className="mb-4 ml-5 list-disc space-y-2 text-sm text-foreground">
              <li><strong>Billing:</strong> Subscriptions (Monthly/Yearly) are billed in advance via your Apple ID or Google Play account.</li>
              <li><strong>Free Trials:</strong> Uncancelled trials automatically convert to paid subscriptions after the trial period ends.</li>
              <li><strong>Refunds:</strong> All refund requests must be directed to the Apple App Store or Google Play Store.</li>
            </ul>

            <h3 className="mb-3 mt-6 text-lg font-semibold text-foreground">4. GOVERNING LAW</h3>
            <p className="mb-3 text-sm leading-relaxed text-foreground">
              These Terms are governed by the laws of the <strong>Republic of South Africa</strong>. Any disputes shall be resolved in the courts of Gauteng.
            </p>

            <h3 className="mb-3 mt-6 text-lg font-semibold text-foreground">5. CONTACT</h3>
            <ul className="mb-6 ml-5 list-disc space-y-2 text-sm text-foreground">
              <li><strong>Email:</strong> Eric.neuraflow1@gmail.com</li>
              <li><strong>Location:</strong> Centurion, Gauteng, South Africa</li>
            </ul>

            <div className="my-8 h-px bg-muted/30" />

            {/* Privacy Policy */}
            <h2 className="mb-4 text-2xl font-bold text-foreground">Privacy Policy</h2>
            
            <p className="mb-2 text-sm text-muted-foreground">
              <strong>Last Updated:</strong> February 4, 2026
            </p>

            <h3 className="mb-3 mt-6 text-lg font-semibold text-foreground">1. COMPLIANCE WITH POPIA</h3>
            <p className="mb-3 text-sm leading-relaxed text-foreground">
              Sana is committed to protecting your privacy in accordance with the <strong>Protection of Personal Information Act (POPIA)</strong> of South Africa. We act as the "Responsible Party" for the data you provide.
            </p>

            <h3 className="mb-3 mt-6 text-lg font-semibold text-foreground">2. CHILDREN'S DATA (SPECIAL PERSONAL INFORMATION)</h3>
            <p className="mb-3 text-sm leading-relaxed text-foreground">
              To provide our service, we process data related to minors (Name, Age, Dietary Goals).
            </p>
            <ul className="mb-4 ml-5 list-disc space-y-2 text-sm text-foreground">
              <li><strong>Parental Consent:</strong> By creating a child profile, you, as the Competent Person (Parent/Guardian), explicitly consent to the processing of this data for the sole purpose of nutritional analysis.</li>
              <li><strong>Security:</strong> This data is encrypted using Row Level Security (RLS) and is never sold to third-party data brokers.</li>
            </ul>

            <h3 className="mb-3 mt-6 text-lg font-semibold text-foreground">3. INFORMATION WE COLLECT</h3>
            <ul className="mb-4 ml-5 list-disc space-y-2 text-sm text-foreground">
              <li><strong>Profile Data:</strong> Child's name, age, gender, and health goals (e.g., "Gut Health").</li>
              <li><strong>Scan History:</strong> Barcodes scanned and products viewed.</li>
              <li><strong>Device Data:</strong> Approximate location to determine local product availability.</li>
            </ul>

            <h3 className="mb-3 mt-6 text-lg font-semibold text-foreground">4. YOUR RIGHTS</h3>
            <p className="mb-3 text-sm leading-relaxed text-foreground">
              You have the right to:
            </p>
            <ul className="mb-4 ml-5 list-disc space-y-2 text-sm text-foreground">
              <li><strong>Access:</strong> Request a copy of the personal data we hold about you.</li>
              <li><strong>Correction:</strong> Update incorrect information via the App settings.</li>
              <li><strong>Deletion:</strong> Delete your account and all associated child data permanently via the "Delete Account" function in Settings.</li>
            </ul>

            <h3 className="mb-3 mt-6 text-lg font-semibold text-foreground">5. CONTACT INFORMATION OFFICER</h3>
            <p className="mb-6 text-sm leading-relaxed text-foreground">
              For privacy inquiries:<br />
              <strong>Email:</strong> Eric.neuraflow1@gmail.com
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
