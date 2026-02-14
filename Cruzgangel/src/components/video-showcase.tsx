import { motion } from 'motion/react';
import { Play, Circle } from 'lucide-react';
import { useState } from 'react';
import { ProjectItem } from '../lib/types';

interface VideoShowcaseProps {
  darkMode: boolean;
  data?: ProjectItem[];
}

const provideYoutubeUrl = (url: string) => {
  if (!url) return '';

  // Si ya es un embed con parámetros, no agregamos más
  if (url.includes('autoplay=')) return url;

  let videoId = '';
  if (url.includes('v=')) {
    videoId = url.split('v=')[1].split('&')[0];
  } else if (url.includes('youtu.be/')) {
    videoId = url.split('youtu.be/')[1].split('?')[0];
  } else if (url.includes('embed/')) {
    videoId = url.split('embed/')[1].split('?')[0];
  }

  if (videoId) {
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&modestbranding=1&rel=0&enablejsapi=1`;
  }

  return url;
};

export function VideoShowcase({ darkMode, data = [] }: VideoShowcaseProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const videoProjects = data.length > 0 ? data : [];

  if (videoProjects.length === 0) return null;

  return (
    <section className="min-h-screen py-24 md:py-32 px-4 md:px-8 relative overflow-hidden" data-cursor-target>
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
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "100px" }}
          transition={{ duration: 0.8 }}
          className="mb-12 md:mb-16 relative aspect-video overflow-hidden border-2 border-current border-opacity-20 group"
          data-hover
          onMouseEnter={() => setHoveredIndex(-1)}
          onMouseLeave={() => setHoveredIndex(null)}
          style={{ willChange: 'transform, opacity' }}
        >
          {videoProjects[0].type === 'youtube' ? (
            <iframe
              src={provideYoutubeUrl(videoProjects[0].media_url)}
              className="w-full h-full object-cover grayscale transition-all duration-700 pointer-events-none"
              style={{
                filter: hoveredIndex === -1
                  ? 'grayscale(0) contrast(1.1)'
                  : 'grayscale(1) contrast(1.1)',
                transform: hoveredIndex === -1 ? 'scale(1.6)' : 'scale(1.5)',
                border: 0
              }}
              allow="autoplay; encrypted-media; fullscreen"
              title={videoProjects[0].titulo}
            />
          ) : videoProjects[0].type === 'video' ? (
            <video
              src={videoProjects[0].media_url}
              className="w-full h-full object-cover grayscale transition-all duration-700"
              autoPlay
              muted
              loop
              playsInline
              style={{
                filter: hoveredIndex === -1
                  ? 'grayscale(0) contrast(1.1)'
                  : 'grayscale(1) contrast(1.1)',
                mixBlendMode: (hoveredIndex === -1) ? (darkMode ? 'lighten' : 'darken') : 'normal',
                transform: hoveredIndex === -1 ? 'scale(1.05)' : 'scale(1)',
              }}
            />
          ) : (
            <img
              src={videoProjects[0].media_url}
              alt={videoProjects[0].titulo}
              className="w-full h-full object-cover grayscale transition-all duration-700"
              decoding="async"
              style={{
                filter: hoveredIndex === -1
                  ? 'grayscale(1) contrast(1.3)'
                  : 'grayscale(1) contrast(1.1)',
                mixBlendMode: (hoveredIndex === -1) ? (darkMode ? 'lighten' : 'darken') : 'normal',
                transform: hoveredIndex === -1 ? 'scale(1.05)' : 'scale(1)',
              }}
            />
          )}

          {/* Video overlay elements (Solo texto inferior) */}
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-gradient-to-t from-black/60 to-transparent">
            <div className="text-white text-xl md:text-3xl font-bold tracking-[0.2em] mb-2">
              {videoProjects[0].titulo}
            </div>
            <div className="text-white text-sm tracking-[0.2em] opacity-80">
              {videoProjects[0].seccion}
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
              viewport={{ once: true, margin: "100px" }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="relative aspect-video overflow-hidden border border-current border-opacity-20 group"
              data-hover
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{ willChange: 'transform, opacity' }}
            >
              {video.type === 'youtube' ? (
                <iframe
                  src={provideYoutubeUrl(video.media_url)}
                  className="w-full h-full object-cover grayscale transition-all duration-700 pointer-events-none"
                  style={{
                    filter: hoveredIndex === index
                      ? 'grayscale(0) contrast(1.1)'
                      : 'grayscale(1) contrast(1.1)',
                    transform: hoveredIndex === index ? 'scale(1.6)' : 'scale(1.5)',
                    border: 0
                  }}
                  allow="autoplay; encrypted-media; fullscreen"
                  title={video.titulo}
                />
              ) : video.type === 'video' ? (
                <video
                  src={video.media_url}
                  className="w-full h-full object-cover grayscale transition-all duration-700"
                  autoPlay
                  muted
                  loop
                  playsInline
                  style={{
                    filter: hoveredIndex === index
                      ? 'grayscale(0) contrast(1.1)'
                      : 'grayscale(1) contrast(1.1)',
                    mixBlendMode: (hoveredIndex === index) ? (darkMode ? 'lighten' : 'darken') : 'normal',
                    transform: hoveredIndex === index ? 'scale(1.1)' : 'scale(1)',
                  }}
                />
              ) : (
                <img
                  src={video.media_url}
                  alt={video.titulo}
                  className="w-full h-full object-cover grayscale transition-all duration-700"
                  decoding="async"
                  style={{
                    filter: hoveredIndex === index
                      ? 'grayscale(0) contrast(1.1)'
                      : 'grayscale(1) contrast(1.1)',
                    mixBlendMode: (hoveredIndex === index) ? (darkMode ? 'lighten' : 'darken') : 'normal',
                    transform: hoveredIndex === index ? 'scale(1.1)' : 'scale(1)',
                  }}
                />
              )}

              {/* Play icon redundant, removed */}

              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                <div className="text-sm font-bold tracking-[0.2em] mb-1 text-white">
                  {video.titulo}
                </div>
                <div className="flex justify-between items-center text-xs tracking-[0.2em] opacity-80 text-white">
                  <span>{video.seccion}</span>
                </div>
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
