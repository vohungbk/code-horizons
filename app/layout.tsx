import { Toaster } from '@/components/ui/sonner';
import { AuthProvider } from '@/providers/AuthProvider';
import { NextSSRPlugin } from '@uploadthing/react/next-ssr-plugin';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { extractRouterConfig } from 'uploadthing/server';
import { ourFileRouter } from './api/uploadthing/core';
import { ThemeProvider } from './components/dashboard/ThemeProvider';

import './globals.css';

const poppinsSans = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-popins',
});

export const metadata: Metadata = {
  title: 'Code Horizons: Navigating the World of Development',
  description:
    'Insights, tips, and resources for developers striving to master web development, programming languages, and cutting-edge tech tools.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html lang="en">
        <body className={`${poppinsSans.className} antialiased`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
            {children}
            <Toaster richColors closeButton />
          </ThemeProvider>
        </body>
      </html>
    </AuthProvider>
  );
}
