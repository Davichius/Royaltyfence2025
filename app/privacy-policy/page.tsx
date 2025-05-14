import type { Metadata } from "next"
import { FooterWithInfo } from "@/components/footer-with-info"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Privacy Policy | Royalty Fence",
  description: "Privacy policy for Royalty Fence - how we collect, use, and protect your personal information.",
}

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen">
      <div className="container py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-8">Privacy Policy</h1>

          <div className="prose prose-lg max-w-none">
            <p className="text-lg">Last Updated: April 19, 2024</p>

            <h2>1. Introduction</h2>
            <p>
              Royalty Fence ("we," "our," or "us") respects your privacy and is committed to protecting your personal
              information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information
              when you visit our website or use our services.
            </p>

            <h2>2. Information We Collect</h2>
            <p>We may collect the following types of information:</p>
            <ul>
              <li>
                <strong>Personal Information:</strong> Name, email address, phone number, mailing address, and other
                contact details you provide when requesting quotes, scheduling consultations, or contacting us.
              </li>
              <li>
                <strong>Property Information:</strong> Details about your property relevant to fence installation or
                repair services.
              </li>
              <li>
                <strong>Usage Data:</strong> Information about how you use our website, including IP address, browser
                type, pages visited, time spent on pages, and other analytics data.
              </li>
              <li>
                <strong>Communications:</strong> Records of correspondence if you contact us.
              </li>
            </ul>

            <h2>3. How We Use Your Information</h2>
            <p>We may use the information we collect for various purposes, including to:</p>
            <ul>
              <li>Provide, maintain, and improve our services</li>
              <li>Process and fulfill your requests for quotes or services</li>
              <li>Communicate with you about our services, promotions, and events</li>
              <li>Respond to your inquiries and provide customer support</li>
              <li>Monitor and analyze usage patterns and trends</li>
              <li>Protect against, identify, and prevent fraud and other illegal activities</li>
              <li>Comply with legal obligations</li>
            </ul>

            <h2>4. Sharing Your Information</h2>
            <p>We may share your information with:</p>
            <ul>
              <li>
                <strong>Service Providers:</strong> Third-party vendors who perform services on our behalf, such as
                payment processing, data analysis, email delivery, and customer service.
              </li>
              <li>
                <strong>Professional Advisors:</strong> Lawyers, auditors, and insurers where necessary.
              </li>
              <li>
                <strong>Legal Requirements:</strong> When required by law or to protect our rights.
              </li>
              <li>
                <strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets.
              </li>
            </ul>

            <h2>5. Cookies and Tracking Technologies</h2>
            <p>
              We use cookies and similar tracking technologies to track activity on our website and hold certain
              information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being
              sent.
            </p>

            <h2>6. Data Security</h2>
            <p>
              We implement appropriate security measures to protect your personal information. However, no method of
              transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute
              security.
            </p>

            <h2>7. Your Rights</h2>
            <p>
              Depending on your location, you may have certain rights regarding your personal information, including:
            </p>
            <ul>
              <li>Access to your personal information</li>
              <li>Correction of inaccurate or incomplete information</li>
              <li>Deletion of your personal information</li>
              <li>Restriction or objection to processing</li>
              <li>Data portability</li>
            </ul>

            <h2>8. Children's Privacy</h2>
            <p>
              Our services are not directed to children under 13. We do not knowingly collect personal information from
              children under 13. If you believe we have collected information from a child under 13, please contact us.
            </p>

            <h2>9. Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
              Privacy Policy on this page and updating the "Last Updated" date.
            </p>

            <h2>10. Contact Us</h2>
            <p>If you have questions about this Privacy Policy, please contact us at:</p>
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
