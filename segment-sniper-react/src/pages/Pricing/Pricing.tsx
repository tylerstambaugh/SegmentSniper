import { PricingTable } from '@clerk/clerk-react';

export default function PricingPage() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 1rem' }}>
      <PricingTable newSubscriptionRedirectUrl="/billing/success" />
    </div>
  );
}
