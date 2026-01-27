import { motion } from 'motion/react';
import { Play, Circle } from 'lucide-react';
import { useState } from 'react';

interface VideoShowcaseProps {
  darkMode: boolean;
}

const videoProjects = [
  {
    thumbnail: 'https://images.unsplash.com/photo-1759662232715-c0b0c6d597fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMHdoaXRlJTIwY2FyJTIwZXZlbnQlMjBwaG90b2dyYXBoeXxlbnwxfHx8fDE3Njk1MzA5MTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'SUPERCAR SHOWDOWN',
    year: '2025',
    duration: '3:45',
    category: 'EVENTO AUTOMOTRIZ'
  },
  {
    thumbnail: 'https://images.unsplash.com/photo-1629121796177-084f3ceae7e0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMHdoaXRlJTIwcmFjaW5nJTIwY2FyfGVufDF8fHx8MTc2OTUzMDkxN3ww&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'CIRCUIT RUSH',
    year: '2024',
    duration: '5:20',
    category: 'EVENTO DE CARRERAS'
  },
  {
    thumbnail: 'https://images.unsplash.com/photo-1662978261408-8f3d84f08b27?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMHdoaXRlJTIwY2xhc3NpYyUyMGNhcnxlbnwxfHx8fDE3Njk1MzA5MTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'ELEGANCIA VINTAGE',
    year: '2024',
    duration: '4:12',
    category: 'SHOW DE AUTOS CLÁSICOS'
  },
  {
    thumbnail: 'https://images.unsplash.com/photo-1689007973635-98449b62c5b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb25vY2hyb21lJTIwbW90b3JjeWNsZSUyMHNob3d8ZW58MXx8fHwxNzY5NTMwOTE3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'DOS RUEDAS TRUENO',
    year: '2024',
    duration: '2:58',
    category: 'EXPO DE MOTOCICLETAS'
  },
  {
    thumbnail: 'https://images.unsplash.com/photo-1761572415962-836d6c56ba3b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb25vY2hyb21lJTIwdmVoaWNsZSUyMGV2ZW50fGVufDF8fHx8MTc2OTUzMDkxOHww&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'CULTURA CUSTOM',
    year: '2025',
    duration: '6:30',
    category: 'BUILDS PERSONALIZADOS'
  },
  {
    thumbnail: 'https://images.unsplash.com/photo-1754490792059-ee4a0cbbae4f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxub2lyJTIwYXV0b21vdGl2ZSUyMHBob3RvZ3JhcGh5fGVufDF8fHx8MTc2OTUzMDkxN3ww&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'RIDERS DE MEDIANOCHE',
    year: '2024',
    duration: '4:05',
    category: 'EVENTO NOCTURNO'
  },
];

export function VideoShowcase({ darkMode }: VideoShowcaseProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="min-h-screen py-24 md:py-32 px-4 md:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold tracking-[0.2em] mb-4">
            PROYECTOS DE VIDEO
          </h2>
          <div className="w-24 h-px bg-current opacity-30" />
          <p className="mt-6 text-sm tracking-[0.2em] opacity-60">
            EVENTOS AUTOMOTRICES / COBERTURA DE ALTO OCTANAJE / HISTORIAS EN MOVIMIENTO
          </p>
        </motion.div>

        {/* Featured large video */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12 md:mb-16 relative aspect-video overflow-hidden border-2 border-current border-opacity-20 group"
          data-hover
          onMouseEnter={() => setHoveredIndex(-1)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <img
            src={videoProjects[0].thumbnail}
            alt={videoProjects[0].title}
            className="w-full h-full object-cover grayscale transition-all duration-700"
            style={{
              filter: hoveredIndex === -1 
                ? 'grayscale(1) contrast(1.3)' 
                : 'grayscale(1) contrast(1.1)',
              mixBlendMode: darkMode ? 'lighten' : 'darken',
              transform: hoveredIndex === -1 ? 'scale(1.05)' : 'scale(1)',
            }}
          />
          
          {/* Video overlay elements */}
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="text-center">
              <div className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-4 rounded-full border-2 border-white flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Play size={32} className="text-white ml-1" fill="white" />
              </div>
              <div className="text-white text-xl md:text-2xl font-bold tracking-[0.2em] mb-2">
                {videoProjects[0].title}
              </div>
              <div className="text-white text-sm tracking-[0.2em] opacity-80">
                {videoProjects[0].category} / {videoProjects[0].duration}
              </div>
            </div>
          </div>
          
          {/* Recording indicator */}
          <div className="absolute top-6 right-6 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <Circle size={12} className="text-white fill-white animate-pulse" />
            <span className="text-white text-xs tracking-[0.2em]">REC</span>
          </div>
          
          {/* Film strip effect on sides */}
          <div className="absolute top-0 left-0 bottom-0 w-8 opacity-20 pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <div key={i} className="h-[5%] border-b border-current" />
            ))}
          </div>
          <div className="absolute top-0 right-0 bottom-0 w-8 opacity-20 pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <div key={i} className="h-[5%] border-b border-current" />
            ))}
          </div>
        </motion.div>

        {/* Grid of other videos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {videoProjects.slice(1).map((video, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="relative aspect-video overflow-hidden border border-current border-opacity-20 group"
              data-hover
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-full object-cover grayscale transition-all duration-700"
                style={{
                  filter: hoveredIndex === index 
                    ? 'grayscale(1) contrast(1.3)' 
                    : 'grayscale(1) contrast(1.1)',
                  mixBlendMode: darkMode ? 'lighten' : 'darken',
                  transform: hoveredIndex === index ? 'scale(1.1)' : 'scale(1)',
                }}
              />
              
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="w-16 h-16 rounded-full border-2 border-white flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Play size={24} className="text-white ml-1" fill="white" />
                </div>
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                <div className="text-sm font-bold tracking-[0.2em] mb-1 text-white">
                  {video.title}
                </div>
                <div className="flex justify-between items-center text-xs tracking-[0.2em] opacity-80 text-white">
                  <span>{video.category}</span>
                  <span>{video.duration}</span>
                </div>
              </div>
              
              {/* Year badge */}
              <div className="absolute top-4 left-4 px-3 py-1 border border-white border-opacity-60 backdrop-blur-sm">
                <span className="text-white text-xs tracking-[0.2em]">{video.year}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Video reel stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-16 pt-16 border-t border-current border-opacity-20"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">50+</div>
              <div className="text-xs tracking-[0.2em] opacity-60">EVENTOS CUBIERTOS</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">200+</div>
              <div className="text-xs tracking-[0.2em] opacity-60">HORAS FILMADAS</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">4K</div>
              <div className="text-xs tracking-[0.2em] opacity-60">RESOLUCIÓN</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">HD</div>
              <div className="text-xs tracking-[0.2em] opacity-60">CALIDAD CINEMATOGRÁFICA</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
