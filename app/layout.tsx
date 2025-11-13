/* eslint-disable @next/next/no-page-custom-font */
import type { Metadata } from 'next';
import './globals.css';
import React from 'react';

export const metadata: Metadata = {
  title: 'nefas.tv - VISUALS, VIBES & VARIOUS EXPERIMENTS',
  description: 'A vaporwave-inspired personal website with retro aesthetics and interactive elements',
  keywords: ['vaporwave', 'retro', 'portfolio', 'personal-website', 'interactive', 'terminal', 'aesthetic', 'photography', 'webdev', '3d-renders'],
  authors: [{ name: 'nefas' }],
  creator: 'nefas',
  publisher: 'nefas.tv',
  openGraph: {
    title: 'nefas.tv - VISUALS, VIBES & VARIOUS EXPERIMENTS',
    description: 'A vaporwave-inspired personal website with retro aesthetics and interactive elements',
    url: 'https://nefas.tv',
    siteName: 'nefas.tv',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'nefas.tv - VISUALS, VIBES & VARIOUS EXPERIMENTS',
    description: 'A vaporwave-inspired personal website with retro aesthetics and interactive elements',
    creator: '@nefas', // Replace with actual Twitter handle if available
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Load VT323 from Google Fonts for the App Router (public/index.html is not used) */}
        <link href="https://fonts.googleapis.com/css2?family=VT323&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "nefas",
              "url": "https://nefas.tv",
              "sameAs": [
                // Add social media URLs if available
              ],
              "knowsAbout": [
                "Photography",
                "Web Development",
                "3D Rendering",
                "Vaporwave Aesthetics",
                "Interactive Design"
              ],
              "hasOccupation": {
                "@type": "Occupation",
                "name": "Creative Developer"
              }
            })
          }}
        />
      </head>
      <body style={{ fontFamily: 'VT323, monospace', background: 'linear-gradient(135deg,#0a0a0a 0%,#0a0a0f 25%,#0a0a0a 50%,#0f0a0f 75%,#0a0a0a 100%)', color: '#00ff9d' }}>
        {children}
      </body>
    </html>
  );
}
