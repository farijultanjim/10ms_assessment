import type { Metadata } from 'next';
import './globals.css';
import { Header, LanguageProvider } from '@/components/Header';

export const metadata: Metadata = {
  title: '10MinuteSchool Course',
  description: 'IELTS Course Page',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>
          <Header />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}