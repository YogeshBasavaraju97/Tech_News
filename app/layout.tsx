import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Footer from './Component/Footer';
import Navbar from './Component/Navbar';
import { NextAuthProvider } from './Component/Providers';
import './globals.css';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Script
          src="https://widget.cloudinary.com/v2.0/global/all.js"
          strategy="beforeInteractive"
        />
        <NextAuthProvider>
          <div className="lg:max-w-[900px] lg:px-16  py-8 mx-auto  shadow-xl min-h-screen  flex flex-col ">
            <div>
              <Navbar />
            </div>
            <div className="flex-auto"> {children}</div>
            <div>
              <Footer />
            </div>
          </div>
        </NextAuthProvider>
      </body>
    </html>
  );
}
