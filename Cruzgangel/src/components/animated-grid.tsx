import { useEffect, useRef } from 'react';

interface AnimatedGridProps {
  darkMode: boolean;
}

export function AnimatedGrid({ darkMode }: AnimatedGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    const gridSize = 50;
    let offset = 0;

    const drawGrid = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)';
      ctx.lineWidth = 1;

      // Vertical lines
      for (let x = -gridSize; x < canvas.width + gridSize; x += gridSize) {
        ctx.beginPath();
        const offsetX = x + (offset % gridSize);
        ctx.moveTo(offsetX, 0);
        ctx.lineTo(offsetX, canvas.height);
        ctx.stroke();
      }

      // Horizontal lines
      for (let y = -gridSize; y < canvas.height + gridSize; y += gridSize) {
        ctx.beginPath();
        const offsetY = y + (offset % gridSize);
        ctx.moveTo(0, offsetY);
        ctx.lineTo(canvas.width, offsetY);
        ctx.stroke();
      }

      // Animated diagonal pattern
      ctx.strokeStyle = darkMode ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.03)';
      for (let x = -canvas.height; x < canvas.width + canvas.height; x += gridSize * 2) {
        ctx.beginPath();
        const offsetX = x + offset;
        ctx.moveTo(offsetX, 0);
        ctx.lineTo(offsetX - canvas.height, canvas.height);
        ctx.stroke();
      }

      offset += 0.3;
      requestAnimationFrame(drawGrid);
    };

    drawGrid();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
    };
  }, [darkMode]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none opacity-100"
    />
  );
}
