import { useState } from 'react';
import { motion } from 'motion/react';
import { X } from 'lucide-react';

interface GalleryPortraitsProps {
  darkMode: boolean;
}

const portraits = [
  {
    url: 'https://images.unsplash.com/photo-1658525914952-c02cbe697dc8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMHdoaXRlJTIwcG9ydHJhaXQlMjBwaG90b2dyYXBoeXxlbnwxfHx8fDE3Njk0ODk1MTl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'RETRATO 01',
    category: 'ESTUDIO'
  },
  {
    url: 'https://images.unsplash.com/photo-1643904524951-2a3a58856745?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMHdoaXRlJTIwYXJ0aXN0aWMlMjBwb3J0cmFpdHxlbnwxfHx8fDE3Njk1Mjk5ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'RETRATO 02',
    category: 'ARTÍSTICO'
  },
  {
    url: 'https://images.unsplash.com/photo-1746733706320-bc3b55dfcd57?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb25vY2hyb21lJTIwcG9ydHJhaXQlMjBzdHVkaW98ZW58MXx8fHwxNzY5NTMwNDk0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'RETRATO 03',
    category: 'ESTUDIO'
  },
  {
    url: 'https://images.unsplash.com/photo-1675430663473-8f82a1fca63b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb25vY2hyb21lJTIwZHJhbWF0aWMlMjBwb3J0cmFpdHxlbnwxfHx8fDE3Njk1MzA0OTd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'RETRATO 04',
    category: 'DRAMÁTICO'
  },
  {
    url: 'https://images.unsplash.com/photo-1652985808809-08b53267628b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxub2lyJTIwZmFzaGlvbiUyMHBob3RvZ3JhcGh5fGVufDF8fHx8MTc2OTUyOTk4MXww&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'RETRATO 05',
    category: 'MODA'
  },
  {
    url: 'https://images.unsplash.com/photo-1637536701369-f815af927b59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMHdoaXRlJTIwZWRpdG9yaWFsJTIwZmFzaGlvbnxlbnwxfHx8fDE3Njk1MzA0OTV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'RETRATO 06',
    category: 'EDITORIAL'
  },
];

export function GalleryPortraits({ darkMode }: GalleryPortraitsProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

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
          <p className="mt-6 text-sm tracking-[0.2em] opacity-60">
            CAPTURANDO LA ESENCIA / EMOCIÓN HUMANA
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {portraits.map((portrait, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.6 }}
              className="relative aspect-[3/4] overflow-hidden border border-current border-opacity-10 group cursor-pointer"
              onClick={() => setSelectedImage(index)}
              data-hover
            >
              <img
                src={portrait.url}
                alt={portrait.title}
                className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:scale-105"
                style={{
                  filter: 'grayscale(1) contrast(1.15)',
                  mixBlendMode: darkMode ? 'lighten' : 'darken',
                }}
              />
              
              <div className="absolute inset-0 bg-current opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
              
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                <div className="text-xs tracking-[0.2em] font-bold mb-1">
                  {portrait.title}
                </div>
                <div className="text-xs tracking-[0.2em] opacity-60">
                  {portrait.category}
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
          >
            <X size={32} />
          </button>
          
          <motion.img
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            src={portraits[selectedImage].url}
            alt={portraits[selectedImage].title}
            className="max-w-full max-h-[90vh] object-contain grayscale"
            style={{ filter: 'grayscale(1) contrast(1.2)' }}
          />
          
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
            <div className="text-lg tracking-[0.3em] font-bold mb-2">
              {portraits[selectedImage].title}
            </div>
            <div className="text-sm tracking-[0.2em] opacity-60">
              {portraits[selectedImage].category}
            </div>
          </div>
        </motion.div>
      )}
    </section>
  );
}
