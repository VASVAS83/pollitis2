import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Pollitis - Παρακολούθηση Δήμων Θεσσαλονίκης',
  description: 'Δες τι λένε οι Δήμοι, ψήφισε, ρώτα AI',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="el">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
