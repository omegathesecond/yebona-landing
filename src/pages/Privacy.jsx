import LegalDocument, { Section } from '../components/LegalDocument'

const DESCRIPTION =
  'How Yebona collects, uses, and protects your personal information across its China–Africa trade marketplace, including waitlist sign-ups, provider verification (KYC), and escrow payments.'

export default function Privacy() {
  return (
    <LegalDocument title="Privacy Policy" description={DESCRIPTION} lastUpdated="19 June 2026">
      <p>
        This Privacy Policy explains how Yebona ("Yebona", "we", "us", or "our")
        collects, uses, shares, and protects your personal information when you
        use our website, mobile applications, and related services (together, the
        "Services"). Yebona is operated by Omevision, headquartered in Mbabane,
        Eswatini. By using the Services you agree to the practices described here.
      </p>

      <Section title="1. Who we are">
        <p>
          Yebona is a marketplace that connects African importers with verified
          China-trade service providers — covering currency exchange, sourcing
          agents, factory verification, freight forwarding, customs clearing,
          translation, and trade consulting — with escrow protection on
          transactions. Yebona is part of the Omevision family of products.
        </p>
      </Section>

      <Section title="2. Information we collect">
        <p>We collect the following categories of information:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong className="text-white">Contact and waitlist details</strong> —
            your name, phone number (including WhatsApp number), country, and the
            services you are interested in, when you join our waitlist or create
            an account.
          </li>
          <li>
            <strong className="text-white">Identity & verification (KYC) data</strong> —
            for service providers and, where required, for buyers: government
            identification, business registration documents, and related details
            we collect to verify identity and prevent fraud.
          </li>
          <li>
            <strong className="text-white">Transaction & escrow data</strong> —
            quotes, orders, payment status, and records needed to operate escrow
            and resolve disputes. Card and mobile-money details are processed by
            our payment provider; we do not store full payment-card numbers.
          </li>
          <li>
            <strong className="text-white">Communications</strong> — messages,
            reviews, and support requests you send through or to Yebona.
          </li>
          <li>
            <strong className="text-white">Usage & device data</strong> — IP
            address, device and browser type, pages viewed, and similar analytics
            collected automatically (for example, via Google Analytics) to
            operate and improve the Services.
          </li>
        </ul>
      </Section>

      <Section title="3. How we use your information">
        <ul className="list-disc pl-6 space-y-2">
          <li>To provide, operate, and maintain the Services and your account.</li>
          <li>To match buyers with providers and facilitate quotes and orders.</li>
          <li>To verify identity (KYC), assess risk, and prevent fraud and abuse.</li>
          <li>To process payments and operate escrow, including disputes and refunds.</li>
          <li>To send you transactional and service messages — for example, via SMS, WhatsApp, or email — including waitlist and launch notifications.</li>
          <li>To provide customer support and respond to your requests.</li>
          <li>To comply with legal, regulatory, and anti-money-laundering obligations.</li>
          <li>To analyse usage and improve the security, reliability, and features of the Services.</li>
        </ul>
      </Section>

      <Section title="4. How we share information">
        <p>We share personal information only as needed to run the Services:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong className="text-white">Between buyers and providers</strong> —
            the information necessary to deliver a requested service (for example,
            your name and order details are shared with a provider you transact
            with).
          </li>
          <li>
            <strong className="text-white">Service providers we rely on</strong> —
            payment processing and invoicing, communications delivery (SMS,
            WhatsApp, email), identity verification, hosting, and analytics
            providers, who process data on our behalf under appropriate
            safeguards.
          </li>
          <li>
            <strong className="text-white">Within the Omevision group</strong> —
            for shared infrastructure such as identity, payments, and messaging.
          </li>
          <li>
            <strong className="text-white">Legal and safety</strong> — where
            required by law, regulation, or legal process, or to protect the
            rights, property, or safety of Yebona, our users, or the public.
          </li>
        </ul>
        <p>We do not sell your personal information.</p>
      </Section>

      <Section title="5. International transfers">
        <p>
          Yebona connects parties across Africa and China, so operating the
          Services necessarily involves transferring information across borders —
          including to providers, processors, and infrastructure located outside
          your home country. Where we make such transfers, we take steps to ensure
          your information remains protected in line with this Policy.
        </p>
      </Section>

      <Section title="6. Data retention">
        <p>
          We keep personal information for as long as needed to provide the
          Services and for legitimate business purposes, such as complying with
          legal, tax, accounting, and anti-money-laundering obligations, resolving
          disputes, and enforcing our agreements. When information is no longer
          needed, we delete or anonymise it.
        </p>
      </Section>

      <Section title="7. Security">
        <p>
          We use technical and organisational measures to protect your
          information against unauthorised access, loss, or misuse. No method of
          transmission or storage is completely secure, however, and we cannot
          guarantee absolute security.
        </p>
      </Section>

      <Section title="8. Your rights">
        <p>
          Subject to applicable law, you may request access to, correction of, or
          deletion of your personal information, and you may object to or restrict
          certain processing. You can opt out of marketing messages at any time by
          following the unsubscribe instructions or contacting us. To exercise
          these rights, contact us using the details below.
        </p>
      </Section>

      <Section title="9. Children">
        <p>
          The Services are intended for businesses and adults. They are not
          directed to children, and we do not knowingly collect personal
          information from anyone under the age of 18.
        </p>
      </Section>

      <Section title="10. Changes to this Policy">
        <p>
          We may update this Privacy Policy from time to time. When we do, we will
          revise the "Last updated" date above and, where appropriate, provide
          additional notice. Your continued use of the Services after changes take
          effect constitutes acceptance of the updated Policy.
        </p>
      </Section>

      <Section title="11. Contact us">
        <p>
          If you have questions about this Privacy Policy or how we handle your
          information, contact us at{' '}
          <a href="mailto:privacy@yebona.com" className="text-blue-400 hover:underline">
            privacy@yebona.com
          </a>
          . Yebona is operated by Omevision, Mbabane, Eswatini.
        </p>
      </Section>
    </LegalDocument>
  )
}
