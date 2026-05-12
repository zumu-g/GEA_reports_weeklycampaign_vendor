import type { Metadata } from 'next';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Your Property Campaign — Grant Estate Agency',
  description: 'Your personalised property campaign dashboard from Grant Estate Agency.',
  robots: { index: false, follow: false },
};

export default function VendorLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Script id="sw-register" strategy="afterInteractive">{`
        if ('serviceWorker' in navigator) {
          navigator.serviceWorker.register('/sw.js', { scope: '/vendor/' })
            .catch(() => {});
        }
      `}</Script>
    </>
  );
}
