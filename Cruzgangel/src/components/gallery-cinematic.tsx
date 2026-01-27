import { motion } from 'motion/react';
import { useEffect, useRef } from 'react';

interface GalleryCinematicProps {
  darkMode: boolean;
}

const cinematicPhotos = [
  {
    url: 'https://images.unsplash.com/photo-1754490792059-ee4a0cbbae4f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxub2lyJTIwY2luZW1hdGljJTIwcGhvdG9ncmFwaHl8ZW58MXx8fHwxNzY5NTMwNDk3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'CINEMATOGRÁFICO 01',
    description: 'ILUMINACIÓN DRAMÁTICA'
  },
  {
    url: 'https://images.unsplash.com/photo-1691933477608-b946c1375dc2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb25vY2hyb21lJTIwYWJzdHJhY3QlMjBwaG90b2dyYXBoeXxlbnwxfHx8fDE3Njk1Mjk5ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'ABSTRACTO 01',
    description: 'POESÍA VISUAL'
  },
  {
    url: 'https://images.unsplash.com/photo-1621952291033-d9b1d57e6f1a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMHdoaXRlJTIwZmluZSUyMGFydCUyMHBob3RvZ3JhcGh5fGVufDF8fHx8MTc2OTUzMDQ5NXww&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'ARTE FINO 01',
    description: 'CONCEPTUAL'
  },
  {
    url: 'https://images.unsplash.com/photo-1524852939581-9575fa716402?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMHdoaXRlJTIwY29uY2VwdHVhbCUyMGFydHxlbnwxfHx8fDE3Njk1MzA0OTd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'CONCEPTUAL 01',
    description: 'EXPERIMENTAL'
  },
  {
    url: 'https://images.unsplash.com/photo-1707613424186-7889b3686c3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMHdoaXRlJTIwbmF0dXJlJTIwcGhvdG9ncmFwaHl8ZW58MXx8fHwxNzY5NTI5OTgxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'NATURALEZA 01',
    description: 'MINIMALISTA'
  },
  {
    url: 'https://images.unsplash.com/photo-1731351707982-d9cfb6c5b6e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb25vY2hyb21lJTIwbGFuZHNjYXBlJTIwcGhvdG9ncmFwaHl8ZW58MXx8fHwxNzY5NTMwNDk1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'PAISAJE 01',
    description: 'ATMOSFÉRICO'
  },
];

export function GalleryCinematic({ darkMode }: GalleryCinematicProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollPosition = 0;
    const scrollSpeed = 0.5; // pixels per frame
    let animationFrameId: number;

    const autoScroll = () => {
      scrollPosition += scrollSpeed;
      
      // Get the width of one set of images
      const contentWidth = scrollContainer.scrollWidth / 2;
      
      // Reset when we've scrolled past the first set
      if (scrollPosition >= contentWidth) {
        scrollPosition = 0;
      }
      
      scrollContainer.scrollLeft = scrollPosition;
      animationFrameId = requestAnimationFrame(autoScroll);
    };

    animationFrameId = requestAnimationFrame(autoScroll);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

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
            CINEMATOGRÁFICO
          </h2>
          <div className="w-24 h-px bg-current opacity-30" />
          <p className="mt-6 text-sm tracking-[0.2em] opacity-60">
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
                  viewport={{ once: true }}
                  transition={{ delay: (index % cinematicPhotos.length) * 0.1, duration: 0.6 }}
                  className="relative group"
                  data-hover
                  style={{ width: '400px', height: '500px', flexShrink: 0 }}
                >
                  <div className="relative w-full h-full overflow-hidden border-2 border-current border-opacity-20 group-hover:border-opacity-100 transition-all duration-500">
                    <img
                      src={photo.url}
                      alt={photo.title}
                      className="w-full h-full object-cover grayscale"
                      style={{
                        filter: 'grayscale(1) contrast(1.2)',
                        mixBlendMode: darkMode ? 'lighten' : 'darken',
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
                      {photo.title}
                    </div>
                    <div className="text-xs tracking-[0.2em] opacity-80 text-white">
                      {photo.description}
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
            LOOP INFINITO / AUTO-SCROLL
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
