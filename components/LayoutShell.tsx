"use client";
import React from 'react';
import { Header } from './Header.tsx';
import { BackgroundEffects } from './BackgroundEffects.tsx';
import { WinampPlayer } from './WinampPlayer.tsx';
import { Navigation } from './Navigation.tsx';
import { FooterTimestamp } from './FooterTimestamp.tsx';
import { SectionProvider } from './SectionContext.tsx';
import { usePerformanceMonitor } from './hooks.ts';
import { ErrorBoundary } from './ErrorBoundary.tsx';

// Lazy load sections for better performance
const HomeSection = React.lazy(() => import('./HomeSection.tsx'));
const BlogSection = React.lazy(() => import('./BlogSection.tsx'));
const PhotoSection = React.lazy(() => import('./PhotoSection.tsx'));
const VideoSection = React.lazy(() => import('./VideoSection.tsx'));
const Renders3DSection = React.lazy(() => import('./Renders3DSection.tsx'));
const WebdevSection = React.lazy(() => import('./WebdevSection.tsx'));
const MiscSection = React.lazy(() => import('./MiscSection.tsx'));

// Placeholder removed (unused) to avoid lint warning

const Inner: React.FC = () => {
  usePerformanceMonitor();
  React.useEffect(() => {
    const handler = (e: MouseEvent) => {
      const tgt = e.target as HTMLElement | null;
      if (tgt) {
        console.log('[LayoutShell] document click on', tgt.tagName, tgt.className, tgt.id);
      }
    };
    document.addEventListener('click', handler, true);
    return () => document.removeEventListener('click', handler, true);
  }, []);
  
  return (
    <>
      <BackgroundEffects />
      <div className="site-container">
        <Header />
        <WinampPlayer />
        <Navigation />
        <main id="content-area" role="main">
          <ErrorBoundary>
            <React.Suspense fallback={<div>Loading section...</div>}>
              <HomeSection />
              <VideoSection />
              <PhotoSection />
              <Renders3DSection />
              <WebdevSection />
              <BlogSection />
              <MiscSection />
            </React.Suspense>
          </ErrorBoundary>
        </main>
        <footer>
          <div className="footer-content">
            <div className="footer-left">
              <FooterTimestamp />
              <span className="footer-status">[ ONLINE ]</span>
            </div>
            <div className="footer-center">
              <span>© 2025 nefas.tv</span>
            </div>
            <div className="footer-right">
              <span className="footer-terminal">terminal_active.exe</span>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export const LayoutShell: React.FC = () => {
  return (
    <SectionProvider>
      <Inner />
    </SectionProvider>
  );
};
