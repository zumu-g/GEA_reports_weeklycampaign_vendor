import type { Metadata } from 'next';
import Script from 'next/script';
import WelcomeTour from '@/components/vendor/WelcomeTour';

export const metadata: Metadata = {
  title: 'Your Property Campaign — Grant Estate Agency',
  description: 'Your personalised property campaign dashboard from Grant Estate Agency.',
  robots: { index: false, follow: false },
};

export default async function VendorLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;

  return (
    <>
      {children}
      <WelcomeTour token={token} />
      <Script id="sw-register" strategy="afterInteractive">{`
        if ('serviceWorker' in navigator) {
          navigator.serviceWorker.register('/sw.js', { scope: '/vendor/' })
            .catch(() => {});
        }
      `}</Script>
    </>
  );
}
