import { useState, useEffect } from 'react';
import { CustomCursor } from './components/custom-cursor';
import { TheReel } from './components/the-reel';
import { Visuals } from './components/visuals';
import { GalleryPortraits } from './components/gallery-portraits';
import { GalleryUrban } from './components/gallery-urban';
import { GalleryCinematic } from './components/gallery-cinematic';
import { VideoShowcase } from './components/video-showcase';
import { Lab } from './components/lab';
import { TeamEquipment } from './components/team-equipment';
import { Contact } from './components/contact';
import { Navigation } from './components/navigation';
import { fetchPortfolioData } from './lib/sheets';
import { PortfolioData } from './lib/types';

const SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQFvTdII0q1BnfVdzuNMOugCE6fKbMSHxL6r8cv9XMBBIyRES-0bsUpWXt_QAUvTBi6g-havF6gPjBI/pub?output=csv';

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [loading, setLoading] = useState(true);
  const [portfolioData, setPortfolioData] = useState<PortfolioData>({});

  useEffect(() => {
    let scrollingTimeout: NodeJS.Timeout;
    const handleScroll = () => {
      document.body.classList.add('is-scrolling');
      clearTimeout(scrollingTimeout);
      scrollingTimeout = setTimeout(() => {
        document.body.classList.remove('is-scrolling');
      }, 150);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    const loadData = async () => {
      try {
        if (SHEET_URL && SHEET_URL.includes('docs.google.com')) {
          const data = await fetchPortfolioData(SHEET_URL);
          setPortfolioData(data);

          // Get all photo URLs
          const allUrls: string[] = [];
          Object.values(data).forEach(section => {
            section.forEach(item => {
              if (item.media_url && item.type === 'image') {
                allUrls.push(item.media_url);
              }
            });
          });

          // Preload and Decode (Ensures they are ready to paint)
          const preloadPromises = allUrls.map(url => {
            return new Promise((resolve) => {
              const img = new Image();
              // .decode() ensures the browser has decompressed the image
              if ('decode' in img && typeof img.decode === 'function') {
                img.src = url;
                img.decode().then(resolve).catch(resolve);
              } else {
                img.onload = resolve;
                img.onerror = resolve;
                img.src = url;
              }
            });
          });

          await Promise.all(preloadPromises);
        }
      } catch (error) {
        console.error("Error loading portfolio data:", error);
      } finally {
        // Wait a bit more to ensure everything is stable
        setTimeout(() => setLoading(false), 1200);
      }
    };

    loadData();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollingTimeout);
    };
  }, []);

  useEffect(() => {
    // Update document class for Tailwind dark mode
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Update body background to prevent white flashes on overscroll
    document.body.style.backgroundColor = darkMode ? 'black' : '#F5F5F5';
  }, [darkMode]);

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
        <main>
          <TheReel darkMode={darkMode} />
          <Visuals darkMode={darkMode} data={portfolioData['Visuales']} />
          <GalleryPortraits darkMode={darkMode} data={portfolioData['Retratos']} />
          <GalleryUrban darkMode={darkMode} data={portfolioData['Urbano']} />
          <VideoShowcase darkMode={darkMode} data={portfolioData['Video']} />
          <GalleryCinematic darkMode={darkMode} data={portfolioData['Cinematic']} />
          <Lab darkMode={darkMode} />
          <TeamEquipment
            darkMode={darkMode}
            teamData={portfolioData['Equipo']}
            gearData={portfolioData['Specs']}
          />
          <Contact darkMode={darkMode} />
        </main>
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
