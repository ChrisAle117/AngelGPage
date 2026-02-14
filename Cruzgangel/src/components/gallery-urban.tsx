import { useState } from 'react';
import { motion } from 'motion/react';
import { ProjectItem } from '../lib/types';
import { ImageWithFallback } from './ui/ImageWithFallback';

interface GalleryUrbanProps {
  darkMode: boolean;
  data?: ProjectItem[];
}

export function GalleryUrban({ darkMode, data = [] }: GalleryUrbanProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const urbanPhotos = data.length > 0 ? data : [];

  if (urbanPhotos.length === 0) return null;
  return (
    <section className="min-h-screen py-24 md:py-32 px-4 md:px-8 relative" data-cursor-target>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold tracking-[0.2em] mb-4">
            URBANO
          </h2>
          <div className="w-24 h-px bg-current opacity-30" />
          <p className="mt-6 text-sm tracking-[0.2em] opacity-80">
            JUNGLA DE CONCRETO / HISTORIAS CALLEJERAS / LÍNEAS ARQUITECTÓNICAS
          </p>
        </motion.div>

        {/* Masonry-style grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[200px]">
          {urbanPhotos.map((photo, index) => {
            const aspect = photo.layout === 'Destacado' ? 'wide' : 'square';
            const aspectClasses = {
              wide: 'md:col-span-2',
              tall: 'row-span-2',
              square: ''
            };

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "100px" }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
                className={`relative overflow-hidden border border-current border-opacity-10 group ${aspectClasses[aspect as keyof typeof aspectClasses]}`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                data-hover
                style={{ willChange: 'transform, opacity' }}
              >
                <ImageWithFallback
                  src={photo.media_url}
                  alt={photo.titulo}
                  darkMode={darkMode}
                  className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:scale-110"
                  decoding="async"
                  style={{
                    filter: hoveredIndex === index
                      ? 'grayscale(0) contrast(1.1)'
                      : 'grayscale(1) contrast(1.1)',
                    // Mix-blend-mode solo se aplica si es realmente necesario o simplificado
                    mixBlendMode: (hoveredIndex === index) ? (darkMode ? 'lighten' : 'darken') : 'normal',
                  }}
                />

                <div
                  className="absolute inset-0 transition-opacity duration-500 pointer-events-none"
                  style={{
                    backgroundColor: darkMode ? 'white' : 'black',
                    opacity: 0,
                    mixBlendMode: 'difference'
                  }}
                />

                <div className="absolute inset-0 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-black/40 to-transparent">
                  <div
                    className="text-xs tracking-[0.2em] font-bold text-white uppercase"
                  >
                    {photo.titulo}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
