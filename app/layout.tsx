import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import LocalFont from "next/font/local";
import { Analytics } from './components/analytics';

export const metadata: Metadata = {
  title: {
    default: "The Next Data Scientist",
    template: "%s | The Next Data Scientist",
  },
  description: 'Your one-stop solution to becoming the next data scientist! Unlock the world of data science at "The Next Data Scientist" - Your ultimate resource for mastering the art of data science through insightful blogs and engaging YouTube tutorials.',
  openGraph: {
    title: "The Next Data Scientist",
    description: "Your ultimate resource for mastering the art of data science through insightful blogs and engaging YouTube tutorials.",
    url: process.env.SITE_URL || "http://localhost.com/3000",
    siteName: "The Next Data Scientist",
    images: [
      {
        url: `${process.env.SITE_URL}/og.png` || "http://localhost.com/3000/og.png",
        width: 1920,
        height: 1080,
      },
    ],
    locale: "en-US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: "The Next Data Scientist",
    card: "summary_large_image",
  },
  icons: {
    shortcut: "/favicon.png",  // Replace with the path to your favicon
  },
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const calSans = LocalFont({
  src: "../public/fonts/CalSans-SemiBold.ttf",
  variable: "--font-calsans",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={[inter.variable, calSans.variable].join(" ")}>
      <head>
        <Analytics />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body
        className={`bg-black ${process.env.NODE_ENV === "development" ? "debug-screens" : undefined
          }`}
      >
        {children}
      </body>
    </html>
  );
}
