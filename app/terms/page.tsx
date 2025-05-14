import type { Metadata } from "next"
import { FooterWithInfo } from "@/components/footer-with-info"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Terms of Service | Royalty Fence",
  description: "Terms and conditions for using Royalty Fence services and website.",
}

export default function TermsPage() {
  return (
    <main className="min-h-screen">
      <div className="container py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-8">Terms of Service</h1>

          <div className="prose prose-lg max-w-none">
            <p className="text-lg">Last Updated: April 19, 2024</p>

            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing or using the Royalty Fence website and services, you agree to be bound by these Terms of
              Service. If you do not agree to all the terms and conditions, you may not access or use our services.
            </p>

            <h2>2. Services</h2>
            <p>
              Royalty Fence provides fence installation, repair, and related services in Volusia County, Florida. All
              services are subject to availability, and we reserve the right to refuse service to anyone for any reason.
            </p>

            <h2>3. Quotes and Estimates</h2>
            <p>
              Quotes and estimates provided by Royalty Fence are valid for 30 days from the date of issuance, unless
              otherwise specified. Prices are subject to change based on material costs, site conditions, and other
              factors discovered during the initial consultation or installation process.
            </p>

            <h2>4. Payment Terms</h2>
            <p>
              Payment terms will be outlined in your service agreement. Typically, we require a deposit before beginning
              work, with the balance due upon completion. We accept various payment methods as specified in your
              agreement.
            </p>

            <h2>5. Cancellation Policy</h2>
            <p>
              If you need to cancel a scheduled service, please notify us at least 48 hours in advance. Cancellations
              with less notice may incur a fee. Deposits may be non-refundable as specified in your service agreement.
            </p>

            <h2>6. Warranties</h2>
            <p>
              Royalty Fence provides warranties on workmanship and materials as specified in your service agreement.
              These warranties are subject to proper maintenance and normal use conditions. Natural weathering, acts of
              God, and damage caused by third parties are typically not covered.
            </p>

            <h2>7. Property Access and Preparation</h2>
            <p>
              You are responsible for ensuring that Royalty Fence has proper access to your property on scheduled
              service dates. You must also inform us of any underground utilities, irrigation systems, or other
              obstacles that might affect installation.
            </p>

            <h2>8. Permits and Regulations</h2>
            <p>
              Royalty Fence will obtain necessary permits for fence installation as required by local regulations.
              However, it is your responsibility to ensure compliance with homeowners association rules, deed
              restrictions, and property line boundaries.
            </p>

            <h2>9. Intellectual Property</h2>
            <p>
              All content on the Royalty Fence website, including text, graphics, logos, images, and software, is the
              property of Royalty Fence and is protected by copyright and other intellectual property laws. You may not
              reproduce, distribute, or create derivative works without our express permission.
            </p>

            <h2>10. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, Royalty Fence shall not be liable for any indirect, incidental,
              special, consequential, or punitive damages resulting from your use of our services or any products
              installed.
            </p>

            <h2>11. Indemnification</h2>
            <p>
              You agree to indemnify and hold harmless Royalty Fence and its employees, contractors, and agents from any
              claims, damages, liabilities, costs, or expenses arising from your violation of these Terms or your use of
              our services.
            </p>

            <h2>12. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the State of Florida,
              without regard to its conflict of law provisions. Any disputes arising under these Terms shall be resolved
              in the courts of Volusia County, Florida.
            </p>

            <h2>13. Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms at any time. We will provide notice of significant changes by
              posting the updated Terms on our website. Your continued use of our services after such changes
              constitutes your acceptance of the new Terms.
            </p>

            <h2>14. Contact Information</h2>
            <p>If you have questions about these Terms, please contact us at:</p>
            <p>
              Royalty Fence
              <br />
              Phone: (386) 479-8379
              <br />
              Email: royaltyfenceorangecity@gmail.com
            </p>
          </div>

          <div className="mt-8">
            <Link href="/" className="inline-flex items-center text-royal-blue hover:text-royal-gold transition-colors">
              &larr; Back to Home
            </Link>
          </div>
        </div>
      </div>
      <FooterWithInfo />
    </main>
  )
}
