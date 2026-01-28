import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { AnimatedGrid } from './animated-grid';

interface TheReelProps {
  darkMode: boolean;
}

export function TheReel({ darkMode }: TheReelProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      char: string;
      opacity: number;
    }> = [];

    // Create particles from "CRUZ" letters
    const letters = 'CRUZ'.split('');
    letters.forEach((char, index) => {
      for (let i = 0; i < 30; i++) {
        particles.push({
          x: canvas.width / 2 + (index - 1.5) * 100,
          y: canvas.height / 2,
          vx: (Math.random() - 0.5) * 3,
          vy: (Math.random() - 0.5) * 3,
          char,
          opacity: 1,
        });
      }
    });

    let animationFrame: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, index) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.opacity -= 0.002;

        if (particle.opacity > 0) {
          ctx.save();
          ctx.globalAlpha = particle.opacity;
          ctx.fillStyle = darkMode ? 'white' : 'black';
          ctx.font = 'bold 24px monospace';
          ctx.fillText(particle.char, particle.x, particle.y);
          ctx.restore();
        }
      });

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationFrame);
  }, [darkMode]);

  return (
    <section
      id="reel"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated grid background */}
      <AnimatedGrid darkMode={darkMode} />

      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-10"
      />

      <div className="relative z-20 text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <h1
            className="text-[15vw] md:text-[12vw] tracking-[0.2em] leading-none -mb-4 md:-mb-10 relative"
            style={{ fontFamily: "'League Spartan', sans-serif", fontWeight: 600 }}
          >
            CRUZG
          </h1>
          <p
            className="text-[5vw] md:text-2xl tracking-[0.4em] relative inline-block"
            style={{
              fontFamily: "'Quicksand', sans-serif",
              fontWeight: 500,
              WebkitTextStroke: darkMode ? '1.5px white' : '1.5px black',
              WebkitTextFillColor: 'transparent',
              color: 'transparent',
              paintOrder: 'stroke fill',
            }}
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
            <p className="text-xs md:text-sm tracking-[0.3em] max-w-2xl mx-auto px-4">
              ARTE TECH-NOIR / MINIMALISMO BRUTALISTA
            </p>
            <div className="mt-8 flex justify-center gap-4 mb-10">
              <div className="w-12 h-px bg-current opacity-30" />
              <div className="w-24 h-px bg-current opacity-60" />
              <div className="w-12 h-px bg-current opacity-30" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
