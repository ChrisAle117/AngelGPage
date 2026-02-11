import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { ProjectItem } from '../lib/types';
import { ImageWithFallback } from './ui/ImageWithFallback';

interface GalleryCinematicProps {
  darkMode: boolean;
  data?: ProjectItem[];
}

export function GalleryCinematic({ darkMode, data = [] }: GalleryCinematicProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const cinematicPhotos = data.length > 0 ? data : [];

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer || cinematicPhotos.length === 0) return;

    let scrollPosition = 0;
    const scrollSpeed = 0.5; // pixels per frame
    let animationFrameId: number;
    let isVisible = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );

    observer.observe(scrollContainer);

    const autoScroll = () => {
      if (isVisible) {
        scrollPosition += scrollSpeed;
        const contentWidth = scrollContainer.scrollWidth / 2;
        if (scrollPosition >= contentWidth) {
          scrollPosition = 0;
        }
        scrollContainer.scrollLeft = scrollPosition;
      }
      animationFrameId = requestAnimationFrame(autoScroll);
    };

    animationFrameId = requestAnimationFrame(autoScroll);

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
    };
  }, [cinematicPhotos.length]);

  // Duplicate the array for infinite loop effect
  const duplicatedPhotos = [...cinematicPhotos, ...cinematicPhotos];

  return (
    <section className="min-h-screen py-24 md:py-32 px-4 md:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >

          <h2 className="text-4xl md:text-6xl font-bold tracking-[0.2em] mb-4">
            CINEMATOGRAFÍA
          </h2>


          <div className="w-24 h-px bg-current opacity-30" />
          <p className="mt-6 text-sm tracking-[0.2em] opacity-80">
            NARRATIVA A TRAVÉS DE LA LUZ / COMPOSICIONES DRAMÁTICAS
          </p>


        </motion.div>

        {/* Infinite scroll gallery */}
        <div className="relative">
          <div
            ref={scrollRef}
            className="overflow-x-hidden pb-8 hide-scrollbar"
          >
            <div className="flex gap-6 md:gap-8" style={{ width: 'max-content' }}>
              {duplicatedPhotos.map((photo, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "100px" }}
                  transition={{ delay: (index % cinematicPhotos.length) * 0.1, duration: 0.6 }}
                  className="relative group"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  data-hover
                  style={{ width: '400px', height: '500px', flexShrink: 0, willChange: 'transform, opacity' }}
                >
                  <div className="relative w-full h-full overflow-hidden border-2 border-current border-opacity-20 group-hover:border-opacity-100 transition-all duration-500">
                    <ImageWithFallback
                      src={photo.media_url}
                      alt={photo.titulo}
                      darkMode={darkMode}
                      className="w-full h-full object-cover grayscale"
                      decoding="async"
                      style={{
                        filter: hoveredIndex === index
                          ? 'grayscale(0) contrast(1.1)'
                          : 'grayscale(1) contrast(1.2)',
                        mixBlendMode: (hoveredIndex === index) ? 'normal' : (darkMode ? 'lighten' : 'darken'),
                      }}
                    />

                    {/* Film grain overlay */}
                    <div
                      className="absolute inset-0 pointer-events-none opacity-30 group-hover:opacity-10 transition-opacity duration-500"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='6.5' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                      }}
                    />
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="text-sm tracking-[0.2em] font-bold mb-2 text-white">
                      {photo.titulo}
                    </div>
                    <div className="text-xs tracking-[0.2em] opacity-80 text-white">
                      {photo.historial}
                    </div>
                  </div>

                  {/* Frame corners */}
                  <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-current opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
                  <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-current opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-current opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-current opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mt-4 text-center text-xs tracking-[0.2em] opacity-40">
            Mira nuestros trabajos
          </div>
        </div>
      </div>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
