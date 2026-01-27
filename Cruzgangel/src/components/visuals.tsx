import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

interface VisualsProps {
  darkMode: boolean;
}

const photos = [
  {
    url: 'https://images.unsplash.com/photo-1658525914952-c02cbe697dc8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMHdoaXRlJTIwcG9ydHJhaXQlMjBwaG90b2dyYXBoeXxlbnwxfHx8fDE3Njk0ODk1MTl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'RETRATO 01',
    aspect: 'portrait'
  },
  {
    url: 'https://images.unsplash.com/photo-1701221146846-294650d72955?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb25vY2hyb21lJTIwdXJiYW4lMjBzdHJlZXQlMjBwaG90b2dyYXBoeXxlbnwxfHx8fDE3Njk1Mjk5ODB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'URBANO 01',
    aspect: 'landscape'
  },
  {
    url: 'https://images.unsplash.com/photo-1620483474144-23931ab57ecd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMHdoaXRlJTIwYXJjaGl0ZWN0dXJlJTIwcGhvdG9ncmFwaHl8ZW58MXx8fHwxNzY5NTExMDY0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'ARQUITECTURA 01',
    aspect: 'portrait'
  },
  {
    url: 'https://images.unsplash.com/photo-1652985808809-08b53267628b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxub2lyJTIwZmFzaGlvbiUyMHBob3RvZ3JhcGh5fGVufDF8fHx8MTc2OTUyOTk4MXww&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'MODA 01',
    aspect: 'square'
  },
  {
    url: 'https://images.unsplash.com/photo-1707613424186-7889b3686c3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMHdoaXRlJTIwbmF0dXJlJTIwcGhvdG9ncmFwaHl8ZW58MXx8fHwxNzY5NTI5OTgxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'NATURALEZA 01',
    aspect: 'landscape'
  },
  {
    url: 'https://images.unsplash.com/photo-1691933477608-b946c1375dc2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb25vY2hyb21lJTIwYWJzdHJhY3QlMjBwaG90b2dyYXBoeXxlbnwxfHx8fDE3Njk1Mjk5ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'ABSTRACTO 01',
    aspect: 'square'
  },
  {
    url: 'https://images.unsplash.com/photo-1643904524951-2a3a58856745?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMHdoaXRlJTIwYXJ0aXN0aWMlMjBwb3J0cmFpdHxlbnwxfHx8fDE3Njk1Mjk5ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'RETRATO 02',
    aspect: 'portrait'
  },
  {
    url: 'https://images.unsplash.com/photo-1568659672931-c98d3639a4b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxub2lyJTIwY2l0eSUyMHBob3RvZ3JhcGh5fGVufDF8fHx8MTc2OTUyOTk4Mnww&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'CIUDAD 01',
    aspect: 'landscape'
  },
];

export function Visuals({ darkMode }: VisualsProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

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
            const aspectClasses = {
              portrait: 'md:row-span-2',
              landscape: 'md:col-span-2',
              square: ''
            };

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className={`relative overflow-hidden group ${aspectClasses[photo.aspect as keyof typeof aspectClasses]}`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                data-hover
              >
                <div className="relative aspect-square md:aspect-auto md:h-full">
                  <img
                    src={photo.url}
                    alt={photo.title}
                    className="w-full h-full object-cover grayscale transition-all duration-700"
                    style={{
                      filter: hoveredIndex === index 
                        ? 'grayscale(1) contrast(1.2)' 
                        : 'grayscale(1) contrast(1.1)',
                      transform: hoveredIndex === index 
                        ? 'scale(1.05)' 
                        : `scale(${1 + Math.sin(Date.now() / 2000 + index) * 0.02})`,
                      mixBlendMode: darkMode ? 'lighten' : 'darken',
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
                      {photo.title}
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
