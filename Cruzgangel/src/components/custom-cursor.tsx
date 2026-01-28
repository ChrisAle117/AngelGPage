import { useEffect, useState } from 'react';

interface CustomCursorProps {
  darkMode: boolean;
}

export function CustomCursor({ darkMode }: CustomCursorProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState<Array<{ x: number; y: number; id: number }>>([]);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if it's a touch device
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    setIsVisible(true);
    let trailId = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const newPosition = { x: e.clientX, y: e.clientY };
      setPosition(newPosition);

      // Add trail point
      setTrail(prev => {
        const newTrail = [...prev, { ...newPosition, id: trailId++ }];
        // Keep only last 15 trail points
        return newTrail.slice(-15);
      });

      // Check if hovering over interactive element
      const target = e.target as HTMLElement;
      const isInteractive = target.closest('a, button, [data-hover]');
      setIsHovering(!!isInteractive);
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Clear old trail points
    const interval = setInterval(() => {
      setTrail(prev => prev.slice(3));
    }, 50);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(interval);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Trail effect - ghosting */}
      {trail.map((point, index) => (
        <div
          key={point.id}
          className="fixed pointer-events-none z-[9999] rounded-full"
          style={{
            left: point.x,
            top: point.y,
            width: isHovering ? '48px' : '24px',
            height: isHovering ? '48px' : '24px',
            transform: 'translate(-50%, -50%)',
            mixBlendMode: darkMode ? 'difference' : 'normal',
            backgroundColor: darkMode ? 'white' : 'black',
            opacity: (index / trail.length) * 0.3,
            transition: 'width 0.2s, height 0.2s',
          }}
        />
      ))}


      {/* Main cursor - The Inverse Viewfinder */}
      <div
        className="fixed pointer-events-none z-[10000] rounded-full border-2 transition-all duration-200"
        style={{
          left: position.x,
          top: position.y,
          width: isHovering ? '48px' : '24px',
          height: isHovering ? '48px' : '24px',
          transform: 'translate(-50%, -50%)',
          mixBlendMode: darkMode ? 'difference' : 'normal',
          borderColor: darkMode ? 'white' : 'black',
        }}
      >
        {/* Crosshair */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ mixBlendMode: darkMode ? 'difference' : 'normal' }}
        >
          <div
            className="absolute w-px h-3"
            style={{ backgroundColor: darkMode ? 'white' : 'black' }}
          />
          <div
            className="absolute h-px w-3"
            style={{ backgroundColor: darkMode ? 'white' : 'black' }}
          />
        </div>
      </div>
    </>
  );
}
