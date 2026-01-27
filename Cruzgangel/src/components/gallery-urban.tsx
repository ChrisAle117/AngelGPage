import { motion } from 'motion/react';

interface GalleryUrbanProps {
  darkMode: boolean;
}

const urbanPhotos = [
  {
    url: 'https://images.unsplash.com/photo-1701221146846-294650d72955?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb25vY2hyb21lJTIwdXJiYW4lMjBzdHJlZXQlMjBwaG90b2dyYXBoeXxlbnwxfHx8fDE3Njk1Mjk5ODB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'URBANO 01',
    aspect: 'wide'
  },
  {
    url: 'https://images.unsplash.com/photo-1620483474144-23931ab57ecd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMHdoaXRlJTIwYXJjaGl0ZWN0dXJlJTIwcGhvdG9ncmFwaHl8ZW58MXx8fHwxNzY5NTExMDY0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'ARQUITECTURA 01',
    aspect: 'tall'
  },
  {
    url: 'https://images.unsplash.com/photo-1568659672931-c98d3639a4b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxub2lyJTIwY2l0eSUyMHBob3RvZ3JhcGh5fGVufDF8fHx8MTc2OTUyOTk4Mnww&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'CIUDAD 01',
    aspect: 'wide'
  },
  {
    url: 'https://images.unsplash.com/photo-1667739251254-f2df0e1f45b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxub2lyJTIwc3RyZWV0JTIwc2NlbmV8ZW58MXx8fHwxNzY5NTMwNDk0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'CALLE 01',
    aspect: 'square'
  },
  {
    url: 'https://images.unsplash.com/photo-1750620770887-d4b32b98b5b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxub2lyJTIwYXJjaGl0ZWN0dXJhbCUyMGRldGFpbHN8ZW58MXx8fHwxNzY5NTMwNDk2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'DETALLES 01',
    aspect: 'square'
  },
  {
    url: 'https://images.unsplash.com/photo-1753104068210-8ab82974e269?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMHdoaXRlJTIwdXJiYW4lMjBleHBsb3JhdGlvbnxlbnwxfHx8fDE3Njk1MzA0OTd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'EXPLORACIÓN 01',
    aspect: 'tall'
  },
  {
    url: 'https://images.unsplash.com/photo-1648676978657-794747ca57e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMHdoaXRlJTIwbGlmZXN0eWxlJTIwcGhvdG9ncmFwaHl8ZW58MXx8fHwxNzY5NTMwNDk2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'LIFESTYLE 01',
    aspect: 'square'
  },
  {
    url: 'https://images.unsplash.com/photo-1631973719677-b467640b8d3c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMHdoaXRlJTIwZG9jdW1lbnRhcnklMjBwaG90b2dyYXBoeXxlbnwxfHx8fDE3Njk1MzA0OTN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'DOCUMENTAL 01',
    aspect: 'wide'
  },
];

export function GalleryUrban({ darkMode }: GalleryUrbanProps) {
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
            URBANO
          </h2>
          <div className="w-24 h-px bg-current opacity-30" />
          <p className="mt-6 text-sm tracking-[0.2em] opacity-60">
            JUNGLA DE CONCRETO / HISTORIAS CALLEJERAS / LÍNEAS ARQUITECTÓNICAS
          </p>
        </motion.div>

        {/* Masonry-style grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[200px]">
          {urbanPhotos.map((photo, index) => {
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
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.6 }}
                className={`relative overflow-hidden border border-current border-opacity-10 group ${aspectClasses[photo.aspect as keyof typeof aspectClasses]}`}
                data-hover
              >
                <img
                  src={photo.url}
                  alt={photo.title}
                  className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:scale-110"
                  style={{
                    filter: 'grayscale(1) contrast(1.1)',
                    mixBlendMode: darkMode ? 'lighten' : 'darken',
                  }}
                />
                
                <div 
                  className="absolute inset-0 transition-opacity duration-500"
                  style={{
                    backgroundColor: darkMode ? 'white' : 'black',
                    opacity: 0,
                    mixBlendMode: 'difference'
                  }}
                />
                
                <div className="absolute inset-0 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="text-xs tracking-[0.2em] font-bold">
                    {photo.title}
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
