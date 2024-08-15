import './globals.css';
import { Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import Header from './components/Header';
import type { Metadata } from "next";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Welcome to Nutrixa",
  description: "Generated by Nutrixa",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Header />
          <main className="flex flex-col min-h-screen bg-white">
            <div className="flex-grow flex flex-col items-center w-full px-4">
              {children}
            </div>

            <footer className="w-full bg-gray-200">
              <div className="flex justify-between items-center p-4 border-b">
                <div className="flex space-x-4">
                  <Link href="/footer/about" legacyBehavior>
                    <a className="text-xs hover:text-gray-700 text-custom-button-color">About Us</a>
                  </Link>
                </div>
              </div>
              <div className="text-xs text-center p-4 text-gray-600">
                &copy; 2024 Nutrixa. All rights reserved.
              </div>
            </footer>
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
