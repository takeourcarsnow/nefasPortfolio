"use client";
import { useEffect, useRef, useState } from 'react';
import { blogContent } from '../../components/blogContent.ts';

export const useTerminalTyping = (active: boolean, sectionId: string) => {
  const terminalRef = useRef<HTMLDivElement | null>(null);
  const [terminalDone, setTerminalDone] = useState(false);

  useEffect(() => {
    if (!active) return;
    const el = terminalRef.current;
    if (!el || el.childElementCount > 0) return;

    // Add typing class to hide content during typing
    const blogSection = document.getElementById(`${sectionId}-content`);
    if (blogSection) {
      blogSection.classList.add('typing-in-progress');
    }

    let cancelled = false;
    (async () => {
      for (const line of blogContent) {
        if (cancelled) return;
        const lineDiv = document.createElement('div');
        lineDiv.style.lineHeight = '1.1';
        lineDiv.style.margin = '0';
        lineDiv.style.padding = '0';
        if (line.color) lineDiv.style.color = line.color;
        el.appendChild(lineDiv);
        const span = document.createElement('span');
        lineDiv.appendChild(span);
        for (let i = 0; i < line.text.length; i++) {
          if (cancelled) return;
          span.textContent += line.text[i];
          await new Promise(r => setTimeout(r, 6));
        }
        await new Promise(r => setTimeout(r, line.delay));
      }
      // Remove typing class and show content
      if (blogSection) {
        blogSection.classList.remove('typing-in-progress');
      }
      setTerminalDone(true);
    })();
    return () => {
      cancelled = true;
      // Cleanup: remove typing class
      if (blogSection) {
        blogSection.classList.remove('typing-in-progress');
      }
    };
  }, [active, sectionId]);

  return { terminalRef, terminalDone };
};