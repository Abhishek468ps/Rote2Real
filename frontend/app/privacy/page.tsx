
 export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-4xl mx-auto px-6 py-12">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-semibold text-gray-900">
            Privacy Policy
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            Brain Train Consultancy Services LLP · Last updated. 23 December 2025
          </p>
        </div>

        {/* Content Card */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 space-y-8">

          <p className="text-sm text-gray-700 leading-relaxed">
            Brain Train Consultancy Services LLP respects your privacy. This
            Privacy Policy explains how we collect, use, store, and protect
            your personal information when you use our platform.
          </p>

          {/* Section */}
          <section>
            <h2 className="text-base font-semibold text-gray-900 mb-3">
              1. Information We Collect
            </h2>
            <p className="text-sm text-gray-700 mb-3">
              We may collect the following information during registration and
              platform usage.
            </p>
            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
              <li>Full name</li>
              <li>Email address</li>
              <li>GitHub profile link</li>
              <li>Country and availability details</li>
              <li>Technical and onboarding related information</li>
              <li>System metadata such as IP address and browser type</li>
            </ul>
          </section>

          <hr className="border-gray-200" />

          <section>
            <h2 className="text-base font-semibold text-gray-900 mb-3">
              2. How We Use Information
            </h2>
            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
              <li>Onboarding and verification</li>
              <li>Skill evaluation and assignment allocation</li>
              <li>Communication regarding platform access</li>
              <li>Internal analytics and security monitoring</li>
            </ul>
          </section>

          <hr className="border-gray-200" />

          <section>
            <h2 className="text-base font-semibold text-gray-900 mb-3">
              3. Data Storage and Security
            </h2>
            <p className="text-sm text-gray-700 leading-relaxed">
              We implement reasonable technical and organizational safeguards to
              protect your data. Access to personal data is restricted to
              authorized personnel only.
            </p>
          </section>

          <hr className="border-gray-200" />

          <section>
            <h2 className="text-base font-semibold text-gray-900 mb-3">
              4. Data Sharing
            </h2>
            <p className="text-sm text-gray-700 leading-relaxed">
              We do not sell, rent, or trade personal information to third
              parties. Data may be shared only when required by law or internal
              compliance processes.
            </p>
          </section>

          <hr className="border-gray-200" />

          <section>
            <h2 className="text-base font-semibold text-gray-900 mb-3">
              5. Data Retention
            </h2>
            <p className="text-sm text-gray-700 leading-relaxed">
              Personal data is retained only as long as necessary for onboarding,
              evaluation, and organizational operations, or as required by
              applicable laws.
            </p>
          </section>

          <hr className="border-gray-200" />

          <section>
            <h2 className="text-base font-semibold text-gray-900 mb-3">
              6. Your Rights
            </h2>
            <p className="text-sm text-gray-700 leading-relaxed">
              You may request access, correction, or deletion of your personal
              data by contacting the organization. Certain data may be retained
              where legally required.
            </p>
          </section>

          <hr className="border-gray-200" />

          <section>
            <h2 className="text-base font-semibold text-gray-900 mb-3">
              7. Cookies and Tracking
            </h2>
            <p className="text-sm text-gray-700 leading-relaxed">
              The platform may use cookies or similar technologies strictly for
              authentication, session management, and security purposes.
            </p>
          </section>

          <hr className="border-gray-200" />

          <section>
            <h2 className="text-base font-semibold text-gray-900 mb-3">
              8. Policy Updates
            </h2>
            <p className="text-sm text-gray-700 leading-relaxed">
              This Privacy Policy may be updated periodically. Continued use of
              the platform indicates acceptance of the updated policy.
            </p>
          </section>

          <hr className="border-gray-200" />

          <section>
            <h2 className="text-base font-semibold text-gray-900 mb-3">
              9. Contact
            </h2>
            <p className="text-sm text-gray-700 leading-relaxed">
              For privacy-related concerns, contact Brain Train Consultancy
              Services LLP through official communication channels.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
