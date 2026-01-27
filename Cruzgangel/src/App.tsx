import { useState, useEffect } from 'react';
import { CustomCursor } from './components/custom-cursor';
import { TheReel } from './components/the-reel';
import { Visuals } from './components/visuals';
import { GalleryPortraits } from './components/gallery-portraits';
import { GalleryUrban } from './components/gallery-urban';
import { GalleryCinematic } from './components/gallery-cinematic';
import { VideoShowcase } from './components/video-showcase';
import { Lab } from './components/lab';
import { Contact } from './components/contact';
import { Navigation } from './components/navigation';

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate initial load with chalk blueprint effect
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`relative min-h-screen w-full overflow-x-hidden ${darkMode ? 'bg-black text-white' : 'bg-[#F5F5F5] text-black'} transition-colors duration-500`}>
      <CustomCursor darkMode={darkMode} />
      <Navigation darkMode={darkMode} setDarkMode={setDarkMode} />

      {loading ? (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="chalk-loader">
            <svg width="200" height="100" className="overflow-visible">
              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-4xl tracking-[0.3em]"
                style={{
                  fontFamily: "'League Spartan', sans-serif",
                  fontWeight: 600,
                  fill: 'none',
                  stroke: darkMode ? 'white' : 'black',
                  strokeWidth: 2,
                  strokeDasharray: 1000,
                  strokeDashoffset: 1000,
                  animation: 'drawText 2s ease-out forwards'
                }}
              >
                CRUZG
              </text>
            </svg>
          </div>
        </div>
      ) : (
        <>
          <TheReel darkMode={darkMode} />
          <Visuals darkMode={darkMode} />
          <GalleryPortraits darkMode={darkMode} />
          <GalleryUrban darkMode={darkMode} />
          <VideoShowcase darkMode={darkMode} />
          <GalleryCinematic darkMode={darkMode} />
          <Lab darkMode={darkMode} />
          <Contact darkMode={darkMode} />
        </>
      )}

      <style>{`
        @keyframes drawText {
          to {
            stroke-dashoffset: 0;
          }
        }
        
        body {
          cursor: none;
        }
        
        * {
          cursor: none !important;
        }
      `}</style>

      <svg width="0" height="0">
        <defs>
          <filter id="chalk">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" />
            <feColorMatrix type="saturate" values="0" />
            <feComponentTransfer>
              <feFuncA type="table" tableValues="0 0 1 1" />
            </feComponentTransfer>
            <feGaussianBlur stdDeviation="0.5" />
          </filter>

          <filter id="film-grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" result="noise" />
            <feColorMatrix in="noise" type="saturate" values="0" />
            <feBlend in="SourceGraphic" in2="noise" mode="multiply" />
          </filter>
        </defs>
      </svg>
    </div>
  );
}
