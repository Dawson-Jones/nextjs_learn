import '@/app/ui/global.css'; // add it to top-level component.
import { inter } from '@/app/ui/fonts';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
      template: '%s | Acme Dashboard',
      default: 'Acme Dashboard'
    },
    description: 'Next.js 13 with Tailwind CSS',
    metadataBase: new URL('https://example.com'),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
