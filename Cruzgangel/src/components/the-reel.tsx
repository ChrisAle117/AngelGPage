import { useState } from 'react';
import { motion } from 'motion/react';
import { GL } from './gl';

interface TheReelProps {
  darkMode: boolean;
}

export function TheReel({ darkMode }: TheReelProps) {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <section
      id="reel"
      className={`relative min-h-screen flex items-center justify-center overflow-hidden transition-colors duration-500 ${darkMode ? 'bg-black' : 'bg-[#F5F5F5]'}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      data-cursor-target
    >
      {/* R3F Advanced Particle System */}
      <GL hovering={isHovering} darkMode={darkMode} />

      <div className="relative z-20 text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <h1
            className={`text-[15vw] md:text-[12vw] tracking-[0.2em] leading-none -mb-4 md:-mb-10 relative transition-colors duration-500 ${darkMode ? 'text-white' : 'text-black'}`}
            style={{ fontFamily: "'League Spartan', sans-serif", fontWeight: 600 }}
            data-cursor-target
          >
            CRUZG
          </h1>
          <p
            className="text-[5vw] md:text-2xl tracking-[0.4em] relative inline-block transition-colors duration-500"
            style={{
              fontFamily: "'Quicksand', sans-serif",
              fontWeight: 500,
              WebkitTextStroke: darkMode ? '1.5px white' : '1.5px black',
              WebkitTextFillColor: 'transparent',
              color: 'transparent',
              paintOrder: 'stroke fill',
            }}
            data-cursor-target
          >
            PHOTOGRAPHY
          </p>
        </motion.div>

        {/* Agrupamos DESPLAZAR y ARTE TECH-NOIR secuencialmente */}
        <div className="flex flex-col items-center mt-8 md:mt-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <p className={`text-xs md:text-sm tracking-[0.3em] max-w-2xl mx-auto px-4 transition-colors duration-500 ${darkMode ? 'text-white/70' : 'text-black/70'}`}>
              ARTE TECH-NOIR / MINIMALISMO BRUTALISTA
            </p>
            <div className="mt-8 flex justify-center gap-4 mb-10">
              <div className={`w-12 h-px transition-colors duration-500 ${darkMode ? 'bg-white opacity-30' : 'bg-black opacity-30'}`} />
              <div className={`w-24 h-px transition-colors duration-500 ${darkMode ? 'bg-white opacity-60' : 'bg-black opacity-60'}`} />
              <div className={`w-12 h-px transition-colors duration-500 ${darkMode ? 'bg-white opacity-30' : 'bg-black opacity-30'}`} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
