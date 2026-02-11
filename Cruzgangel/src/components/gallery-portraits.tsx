import { useState } from 'react';
import { motion } from 'motion/react';
import { X } from 'lucide-react';
import { ProjectItem } from '../lib/types';
import { ImageWithFallback } from './ui/ImageWithFallback';

interface GalleryPortraitsProps {
  darkMode: boolean;
  data?: ProjectItem[];
}

export function GalleryPortraits({ darkMode, data = [] }: GalleryPortraitsProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Use data from props if available, otherwise empty array
  const portraits = data.length > 0 ? data : [];

  if (portraits.length === 0) return null;

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
            RETRATOS
          </h2>
          <div className="w-24 h-px bg-current opacity-30" />
          <p className="mt-6 text-sm tracking-[0.2em] opacity-80">
            CAPTURANDO LA ESENCIA / EMOCIÓN HUMANA
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {portraits.map((portrait, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "100px" }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
              className="relative aspect-[3/4] overflow-hidden border border-current border-opacity-10 group cursor-pointer"
              onClick={() => setSelectedImage(index)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              data-hover
              style={{ willChange: 'transform, opacity' }}
            >
              <ImageWithFallback
                src={portrait.media_url}
                alt={portrait.titulo}
                darkMode={darkMode}
                className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:scale-105"
                decoding="async"
                style={{
                  filter: hoveredIndex === index
                    ? 'grayscale(0) contrast(1.1)'
                    : 'grayscale(1) contrast(1.15)',
                  // Solo aplicamos mix-blend-mode si es necesario para reducir carga en scroll
                  mixBlendMode: (hoveredIndex === index) ? (darkMode ? 'lighten' : 'darken') : 'normal',
                }}
              />

              <div className="absolute inset-0 bg-current opacity-0 group-hover:opacity-10 transition-opacity duration-500" />

              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                <div
                  className="text-xs tracking-[0.2em] font-bold mb-1"
                  style={{ mixBlendMode: 'difference' }}
                >
                  {portrait.titulo}
                </div>
                <div
                  className="text-xs tracking-[0.2em] opacity-80"
                  style={{ mixBlendMode: 'difference' }}
                >
                  {portrait.seccion}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-95"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-8 right-8 p-2 hover:opacity-60 transition-opacity"
            onClick={() => setSelectedImage(null)}
            data-hover
            aria-label="Cerrar galería"
          >
            <X size={32} />
          </button>

          <motion.img
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            src={portraits[selectedImage].media_url}
            alt={portraits[selectedImage].titulo}
            className="max-w-full max-h-[90vh] object-contain grayscale"
            style={{ filter: 'grayscale(1) contrast(1.2)' }}
          />

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
            <div className="text-lg tracking-[0.3em] font-bold mb-2">
              {portraits[selectedImage].titulo}
            </div>
            <div className="text-sm tracking-[0.2em] opacity-80">
              {portraits[selectedImage].seccion}
            </div>
          </div>
        </motion.div>
      )}
    </section>
  );
}
