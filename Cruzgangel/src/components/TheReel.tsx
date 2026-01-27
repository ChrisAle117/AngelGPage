import { motion } from 'motion/react';
import { useEffect, useState } from 'react';


export function TheReel({ darkMode }: { darkMode: boolean }) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden noise-effect">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-5">
        <div className="grid grid-cols-12 h-full">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="border-r border-white" />
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-4">
        {/* Logo Image */}
        <div className="flex items-center justify-center mb-8">
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.8,
              filter: 'blur(10px)'
            }}
            animate={isLoaded ? {
              opacity: 1,
              scale: 1,
              filter: 'blur(0px)'
            } : {}}
            transition={{
              duration: 1.5,
              ease: [0.34, 1.56, 0.64, 1], // easeOut
            }}
            className="relative w-[60vw] md:w-[40vw] max-w-[600px]"
          >

          </motion.div>
        </div>

        {/* Photography subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="overflow-hidden"
        >
          <motion.p
            className="text-2xl md:text-4xl tracking-[0.3em] uppercase relative inline-block"
            animate={{
              opacity: [1, 0.5, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            Photography
          </motion.p>
        </motion.div>

        {/* Version tag */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isLoaded ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-8"
        >
          <div className="inline-block border border-white px-4 py-2 text-sm tracking-widest inverse-blend">
            v4.01 — THE NOIR TECH-ART
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isLoaded ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-2"
          >
            <div className="w-[1px] h-12 bg-white" />
            <div className="text-xs tracking-widest rotate-90 uppercase">Scroll</div>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating fragments */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white opacity-60"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            scale: Math.random() * 2,
          }}
          animate={{
            y: [null, Math.random() * 100 - 50],
            x: [null, Math.random() * 100 - 50],
            opacity: [0.6, 0.1, 0.6],
            scale: [null, Math.random() * 2],
          }}
          transition={{
            duration: Math.random() * 5 + 3,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut',
          }}
        />
      ))}
    </section>
  );
}
