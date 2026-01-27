import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 50, stiffness: 1000, mass: 0.1 };
  const trailSpringConfig = { damping: 30, stiffness: 300, mass: 0.5 };

  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  const trailX = useSpring(cursorX, trailSpringConfig);
  const trailY = useSpring(cursorY, trailSpringConfig);

  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('button') ||
        target.closest('a') ||
        target.getAttribute('role') === 'button'
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Trailing element (smoother alternative to dropping dots) */}
      <motion.div
        className="fixed pointer-events-none z-[9999] inverse-blend"
        style={{
          left: trailX,
          top: trailY,
        }}
      >
        <div className="w-4 h-4 rounded-full bg-white/20 -translate-x-1/2 -translate-y-1/2 blur-[1px]" />
      </motion.div>

      {/* Main cursor */}
      <motion.div
        className="fixed pointer-events-none z-[10000] inverse-blend"
        style={{
          left: smoothX,
          top: smoothY,
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{
          scale: { duration: 0.2 } // Only animate scale via React state change
        }}
      >
        {/* Crosshair cursor */}
        <div className="relative -translate-x-1/2 -translate-y-1/2">
          {/* Center circle */}
          <div className="w-6 h-6 border-2 border-white rounded-full" />

          {/* Crosshair lines */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            {/* Horizontal line */}
            <div className="absolute w-12 h-[2px] bg-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            {/* Vertical line */}
            <div className="absolute h-12 w-[2px] bg-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>

          {/* Corner marks */}
          <div className="absolute -top-2 -left-2 w-2 h-2 border-t-2 border-l-2 border-white" />
          <div className="absolute -top-2 -right-2 w-2 h-2 border-t-2 border-r-2 border-white" />
          <div className="absolute -bottom-2 -left-2 w-2 h-2 border-b-2 border-l-2 border-white" />
          <div className="absolute -bottom-2 -right-2 w-2 h-2 border-b-2 border-r-2 border-white" />
        </div>
      </motion.div>
    </>
  );
}
