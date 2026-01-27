import { motion } from 'motion/react';
import { Camera, Aperture, Film, Zap } from 'lucide-react';

interface LabProps {
  darkMode: boolean;
}

const stickers = [
  {
    icon: Camera,
    text: 'ALMA ANÁLOGA',
    rotation: -5,
    position: { top: '10%', left: '10%' }
  },
  {
    icon: Aperture,
    text: 'F/1.4 VIDA',
    rotation: 8,
    position: { top: '15%', right: '15%' }
  },
  {
    icon: Film,
    text: '35MM FOREVER',
    rotation: -3,
    position: { bottom: '25%', left: '20%' }
  },
  {
    icon: Zap,
    text: 'CAPTURA CAOS',
    rotation: 5,
    position: { bottom: '20%', right: '25%' }
  },
  {
    icon: Camera,
    text: 'MONOCROMÁTICO',
    rotation: -8,
    position: { top: '45%', left: '5%' }
  },
  {
    icon: Aperture,
    text: 'SIN FILTRO',
    rotation: 12,
    position: { top: '50%', right: '8%' }
  },
];

export function Lab({ darkMode }: LabProps) {
  return (
    <section id="lab" className="min-h-screen py-24 md:py-32 px-4 md:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold tracking-[0.2em] mb-4">
            LAB
          </h2>
          <div className="w-24 h-px bg-current opacity-30" />
          <p className="mt-8 text-sm tracking-[0.2em] opacity-60 max-w-2xl">
            FOTOGRAFÍA EXPERIMENTAL / INVESTIGACIÓN VISUAL / CAOS CREATIVO
          </p>
        </motion.div>

        <div className="relative min-h-[600px] border border-current border-opacity-20 p-8 md:p-12">
          {/* Stickers scattered around */}
          {stickers.map((sticker, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0, rotate: 0 }}
              whileInView={{ opacity: 1, scale: 1, rotate: sticker.rotation }}
              viewport={{ once: true }}
              transition={{ 
                delay: index * 0.15, 
                duration: 0.6,
                type: 'spring',
                stiffness: 200
              }}
              whileHover={{ 
                scale: 1.1, 
                rotate: sticker.rotation + 5,
                zIndex: 50
              }}
              className="absolute cursor-pointer"
              style={{
                ...sticker.position,
              }}
              data-hover
            >
              <div 
                className="relative px-6 py-4 border-2 border-current backdrop-blur-sm"
                style={{
                  backgroundColor: darkMode ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.8)',
                  boxShadow: '4px 4px 0 rgba(0,0,0,0.2)',
                  filter: 'url(#torn-paper)',
                }}
              >
                <div className="flex items-center gap-3">
                  <sticker.icon size={20} />
                  <span className="text-xs md:text-sm font-bold tracking-[0.2em] whitespace-nowrap">
                    {sticker.text}
                  </span>
                </div>
                
                {/* Torn paper effect simulation with decorative lines */}
                <div 
                  className="absolute -top-1 left-0 right-0 h-1"
                  style={{
                    background: darkMode 
                      ? 'linear-gradient(90deg, transparent 0%, transparent 10%, black 10%, black 20%, transparent 20%, transparent 30%, black 30%, black 35%, transparent 35%)' 
                      : 'linear-gradient(90deg, transparent 0%, transparent 10%, white 10%, white 20%, transparent 20%, transparent 30%, white 30%, white 35%, transparent 35%)',
                  }}
                />
              </div>
            </motion.div>
          ))}

          {/* Central content */}
          <div className="flex flex-col items-center justify-center min-h-[400px] relative z-10">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-center"
            >
              <div className="text-6xl md:text-8xl mb-8 opacity-10">
                &
              </div>
              <h3 className="text-2xl md:text-4xl font-bold tracking-[0.3em] mb-6">
                EXPERIMENTACIÓN
              </h3>
              <p className="text-sm tracking-[0.2em] opacity-60 max-w-xl mx-auto">
                DONDE LA TÉCNICA ENCUENTRA LA REBELDÍA /<br />
                EMPUJANDO LÍMITES / ROMPIENDO REGLAS
              </p>
              
              <div className="mt-12 flex justify-center gap-8">
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">500+</div>
                  <div className="text-xs tracking-[0.2em] opacity-60">PROYECTOS</div>
                </div>
                <div className="w-px bg-current opacity-20" />
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">35MM</div>
                  <div className="text-xs tracking-[0.2em] opacity-60">PELÍCULA</div>
                </div>
                <div className="w-px bg-current opacity-20" />
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">RAW</div>
                  <div className="text-xs tracking-[0.2em] opacity-60">FORMATO</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Grid of experimental work previews */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {[1, 2, 3, 4].map((item, index) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="aspect-square border border-current border-opacity-20 flex items-center justify-center group hover:border-opacity-100 transition-all duration-500"
              data-hover
            >
              <span className="text-4xl opacity-10 group-hover:opacity-30 transition-opacity duration-500">
                {String(item).padStart(2, '0')}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      <svg width="0" height="0">
        <defs>
          <filter id="torn-paper">
            <feTurbulence baseFrequency="0.05" numOctaves="3" result="noise" seed="2" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" />
          </filter>
        </defs>
      </svg>
    </section>
  );
}
