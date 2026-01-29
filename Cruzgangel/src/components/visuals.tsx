import { useState } from 'react';
import { motion } from 'motion/react';
import { ProjectItem } from '../lib/types';

interface VisualsProps {
  darkMode: boolean;
  data?: ProjectItem[];
}

export function Visuals({ darkMode, data = [] }: VisualsProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const photos = data.length > 0 ? data : [];

  if (photos.length === 0) return null;

  return (
    <section id="visuals" className="min-h-screen py-24 md:py-32 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold tracking-[0.2em] mb-4">
            VISUALES
          </h2>
          <div className="w-24 h-px bg-current opacity-30" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {photos.map((photo, index) => {
            const aspect = photo.layout === 'Destacado' ? 'landscape' : 'square';
            const aspectClasses = {
              portrait: 'md:row-span-2',
              landscape: 'md:col-span-2',
              square: ''
            };

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "100px" }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
                className={`relative overflow-hidden group ${aspectClasses[aspect as keyof typeof aspectClasses]}`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                data-hover
                style={{ willChange: 'transform, opacity' }}
              >
                <div className="relative aspect-square md:aspect-auto md:h-full">
                  <img
                    src={photo.media_url}
                    alt={photo.titulo}
                    className="w-full h-full object-cover grayscale transition-all duration-700"
                    decoding="async"
                    style={{
                      filter: hoveredIndex === index
                        ? 'grayscale(0) contrast(1.1)'
                        : 'grayscale(1) contrast(1.1)',
                      transform: hoveredIndex === index
                        ? 'scale(1.05)'
                        : 'scale(1)',
                      mixBlendMode: (hoveredIndex === index) ? (darkMode ? 'lighten' : 'darken') : 'normal',
                    }}
                  />

                  {/* Hover overlay with inverse blend */}
                  <div
                    className="absolute inset-0 transition-opacity duration-500 pointer-events-none"
                    style={{
                      backgroundColor: darkMode ? 'white' : 'black',
                      opacity: hoveredIndex === index ? 0.1 : 0,
                      mixBlendMode: 'difference'
                    }}
                  />

                  {/* Title overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <div
                      className="text-xs md:text-sm tracking-[0.3em] font-bold"
                      style={{
                        mixBlendMode: 'difference',
                        color: darkMode ? 'white' : 'black'
                      }}
                    >
                      {photo.titulo}
                    </div>
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
