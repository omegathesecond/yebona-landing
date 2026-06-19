import LegalDocument, { Section } from '../components/LegalDocument'

const DESCRIPTION =
  'The terms governing your use of Yebona — the China–Africa trade marketplace connecting importers with verified service providers, with escrow-protected transactions.'

export default function Terms() {
  return (
    <LegalDocument title="Terms of Service" description={DESCRIPTION} lastUpdated="19 June 2026">
      <p>
        These Terms of Service ("Terms") govern your access to and use of Yebona's
        website, mobile applications, and related services (together, the
        "Services"). Yebona ("Yebona", "we", "us", or "our") is operated by
        Omevision, headquartered in Mbabane, Eswatini. By accessing or using the
        Services, you agree to be bound by these Terms. If you do not agree, do
        not use the Services.
      </p>

      <Section title="1. The Services">
        <p>
          Yebona is a marketplace that connects African importers ("buyers") with
          China-trade service providers ("providers") offering services such as
          currency exchange, sourcing, factory verification, freight forwarding,
          customs clearing, translation, and trade consulting. Yebona facilitates
          discovery, quoting, communication, and escrow-protected payment between
          buyers and providers. Yebona is itself a platform and is not a party to
          the underlying service contracts between buyers and providers.
        </p>
      </Section>

      <Section title="2. Eligibility & accounts">
        <p>
          You must be at least 18 years old and able to form a binding contract to
          use the Services. You agree to provide accurate information, to keep your
          account credentials secure, and to be responsible for all activity under
          your account. Providers and, where required, buyers must complete
          identity verification (KYC) before transacting.
        </p>
      </Section>

      <Section title="3. Provider verification & buyer responsibility">
        <p>
          Yebona verifies providers to reduce risk, but verification is not a
          guarantee of any provider's performance, quality, or honesty. You are
          responsible for evaluating providers and the suitability of any service
          before transacting. Ratings, reviews, and verification badges are
          informational and do not constitute an endorsement or warranty by
          Yebona.
        </p>
      </Section>

      <Section title="4. Payments & escrow">
        <p>
          Payments on Yebona are processed through our payment provider, and funds
          for eligible transactions are held in escrow and released when agreed
          conditions are met. You agree to pay all amounts due for services you
          request, including any applicable fees. Refunds, where applicable, are
          handled under the escrow and dispute processes described in the
          Services. Yebona does not store full payment-card details.
        </p>
      </Section>

      <Section title="5. Disputes between buyers and providers">
        <p>
          If a dispute arises over a transaction, you agree to first use Yebona's
          dispute-resolution process. Yebona may, at its discretion, mediate,
          request evidence from both parties, and make decisions about the release
          or refund of escrowed funds based on the available information. Such
          decisions are intended to be fair but are made on a best-effort basis
          and do not make Yebona liable for the underlying transaction.
        </p>
      </Section>

      <Section title="6. Acceptable use">
        <p>You agree not to:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Use the Services for any unlawful, fraudulent, or deceptive purpose.</li>
          <li>Trade in goods or services that are illegal or prohibited under applicable law (including sanctioned, counterfeit, or restricted goods).</li>
          <li>Circumvent Yebona's escrow or fees by moving transactions off-platform.</li>
          <li>Provide false information, impersonate others, or misuse another user's account.</li>
          <li>Interfere with, disrupt, or attempt to gain unauthorised access to the Services or related systems.</li>
          <li>Post unlawful, infringing, abusive, or misleading content, including fake reviews.</li>
        </ul>
      </Section>

      <Section title="7. User content">
        <p>
          You retain ownership of content you submit (such as listings, messages,
          and reviews), and you grant Yebona a non-exclusive, worldwide,
          royalty-free licence to host, display, and use that content as needed to
          operate and promote the Services. You are responsible for your content
          and confirm you have the rights to share it.
        </p>
      </Section>

      <Section title="8. Intellectual property">
        <p>
          The Services, including the Yebona name, logo, software, and design, are
          owned by Yebona / Omevision and protected by intellectual-property laws.
          Except as expressly permitted, you may not copy, modify, distribute, or
          create derivative works from the Services without our prior written
          consent.
        </p>
      </Section>

      <Section title="9. Disclaimers">
        <p>
          The Services are provided "as is" and "as available" without warranties
          of any kind, whether express or implied, including warranties of
          merchantability, fitness for a particular purpose, and non-infringement.
          Yebona does not warrant that the Services will be uninterrupted,
          error-free, or secure, or that any provider will perform as expected.
        </p>
      </Section>

      <Section title="10. Limitation of liability">
        <p>
          To the maximum extent permitted by law, Yebona and Omevision will not be
          liable for any indirect, incidental, special, consequential, or punitive
          damages, or for any loss of profits, revenue, data, or goodwill, arising
          out of or related to your use of the Services. Our total liability for
          any claim relating to the Services will not exceed the fees you paid to
          Yebona for the transaction giving rise to the claim.
        </p>
      </Section>

      <Section title="11. Indemnification">
        <p>
          You agree to indemnify and hold harmless Yebona, Omevision, and their
          officers, employees, and agents from any claims, losses, liabilities,
          and expenses (including reasonable legal fees) arising from your use of
          the Services, your content, or your breach of these Terms.
        </p>
      </Section>

      <Section title="12. Suspension & termination">
        <p>
          We may suspend or terminate your access to the Services at any time if
          you breach these Terms, create risk or legal exposure, or for other
          legitimate business reasons. You may stop using the Services at any time.
          Provisions that by their nature should survive termination will survive.
        </p>
      </Section>

      <Section title="13. Governing law">
        <p>
          These Terms are governed by the laws of the Kingdom of Eswatini, without
          regard to its conflict-of-laws rules. Subject to any mandatory rights you
          have under applicable law, disputes relating to these Terms will be
          handled in the courts of Eswatini.
        </p>
      </Section>

      <Section title="14. Changes to these Terms">
        <p>
          We may update these Terms from time to time. When we do, we will revise
          the "Last updated" date above and, where appropriate, provide additional
          notice. Your continued use of the Services after changes take effect
          constitutes acceptance of the updated Terms.
        </p>
      </Section>

      <Section title="15. Contact us">
        <p>
          Questions about these Terms? Contact us at{' '}
          <a href="mailto:support@yebona.com" className="text-blue-400 hover:underline">
            support@yebona.com
          </a>
          . Yebona is operated by Omevision, Mbabane, Eswatini. See also our{' '}
          <a href="/privacy" className="text-blue-400 hover:underline">Privacy Policy</a>.
        </p>
      </Section>
    </LegalDocument>
  )
}
