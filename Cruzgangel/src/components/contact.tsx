import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Mail, Instagram, Twitter, Youtube, MessageCircle } from 'lucide-react';

interface ContactProps {
  darkMode: boolean;
}

export function Contact({ darkMode }: ContactProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;

      // Fill canvas with cover color on resize/init
      ctx.fillStyle = darkMode ? '#1a1a1a' : '#e5e5e5';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Set to erase mode
      ctx.globalCompositeOperation = 'destination-out';
      ctx.lineWidth = 40; // Thick brush for better reveal
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    return () => window.removeEventListener('resize', resizeCanvas);
  }, [darkMode]);

  // Helper function to get coordinates from mouse or touch event
  const getCoordinates = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const rect = canvas.getBoundingClientRect();

    if ('touches' in e) {
      // Touch event
      if (e.touches.length > 0) {
        return {
          x: e.touches[0].clientX - rect.left,
          y: e.touches[0].clientY - rect.top
        };
      }
      return null;
    } else {
      // Mouse event
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    }
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const coords = getCoordinates(e);
    if (!coords) return;

    ctx.beginPath();
    ctx.moveTo(coords.x, coords.y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const coords = getCoordinates(e);
    if (!coords) return;

    ctx.lineTo(coords.x, coords.y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Return to source-over to fill again
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = darkMode ? '#1a1a1a' : '#e5e5e5';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Switch back to erase mode
    ctx.globalCompositeOperation = 'destination-out';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the message
    alert('¡Mensaje enviado! (Modo demo)');
    setMessage('');
    clearCanvas();
  };

  return (
    <section id="contact" className="min-h-screen py-24 md:py-32 px-4 md:px-8" data-cursor-target>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold tracking-[0.2em] mb-4">
            CONTACTO
          </h2>
          <div className="w-24 h-px bg-current opacity-30" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          {/* Graffiti Wall Canvas */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-xl tracking-[0.2em] mb-6 font-bold">
              REVELADO ANALÓGICO
            </h3>
            <div
              className="relative border-2 border-current border-opacity-30 overflow-hidden bg-cover bg-center"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1658525914952-c02cbe697dc8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMHdoaXRlJTIwcG9ydHJhaXQlMjBwaG90b2dyYXBoeXxlbnwxfHx8fDE3Njk0ODk1MTl8MA&ixlib=rb-4.1.0&q=80&w=1080')`,
                filter: 'grayscale(1)'
              }}
            >
              <canvas
                ref={canvasRef}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={stopDrawing}
                className="relative z-10 w-full h-80 md:h-96"
                style={{
                  cursor: 'crosshair',
                  mixBlendMode: 'normal',
                  touchAction: 'none'
                }}
                data-hover
              />

              {/* Darkroom texture overlay */}
              <div
                className="absolute inset-0 pointer-events-none opacity-5 z-20"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")`,
                }}
              />
            </div>

            <button
              onClick={clearCanvas}
              className="mt-4 px-6 py-2 border border-current border-opacity-30 hover:border-opacity-100 transition-all duration-300 text-sm tracking-[0.2em]"
              data-hover
            >
              REINICIAR REVELADO
            </button>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-xl tracking-[0.2em] mb-6 font-bold">
              O ESCRÍBELO
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-xs tracking-[0.2em] mb-2 opacity-80">
                  NOMBRE
                </label>
                <input
                  type="text"
                  className="w-full bg-transparent border-b border-current border-opacity-30 focus:border-opacity-100 outline-none py-3 transition-all duration-300"
                  placeholder="INGRESA TU NOMBRE"
                  style={{ caretColor: darkMode ? 'white' : 'black' }}
                  data-hover
                />
              </div>

              <div>
                <label className="block text-xs tracking-[0.2em] mb-2 opacity-80">
                  EMAIL
                </label>
                <input
                  type="email"
                  className="w-full bg-transparent border-b border-current border-opacity-30 focus:border-opacity-100 outline-none py-3 transition-all duration-300"
                  placeholder="TU@EMAIL.COM"
                  style={{ caretColor: darkMode ? 'white' : 'black' }}
                  data-hover
                />
              </div>

              <div>
                <label className="block text-xs tracking-[0.2em] mb-2 opacity-80">
                  MENSAJE
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-transparent border border-current border-opacity-30 focus:border-opacity-100 outline-none py-3 px-4 h-32 resize-none transition-all duration-300"
                  placeholder="ESCRIBE TU MENSAJE AQUÍ..."
                  style={{ caretColor: darkMode ? 'white' : 'black' }}
                  data-hover
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 border-2 border-current hover:bg-current hover:text-[--bg] transition-all duration-500 text-sm tracking-[0.2em] font-bold"
                style={{
                  '--bg': darkMode ? '#000000' : '#F5F5F5'
                } as React.CSSProperties}
                data-hover
              >
                ENVIAR MENSAJE
              </button>
            </form>

            {/* Social Links */}
            <div className="mt-12 pt-12 border-t border-current border-opacity-20">
              <p className="text-xs tracking-[0.2em] mb-6 opacity-60">
                O ENCUÉNTRAME AQUÍ
              </p>
              <div className="flex flex-wrap gap-4 md:gap-6">
                <a
                  href="mailto:contact@cruzg.photography"
                  className="group relative p-4 border border-current border-opacity-20 transition-all duration-500 hover:border-opacity-100 overflow-hidden"
                  data-hover
                  aria-label="Email"
                >
                  <div className={`absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ${darkMode ? 'bg-white' : 'bg-black'}`} />
                  <Mail size={22} className={`relative z-10 transition-colors duration-500 ${darkMode ? 'text-white group-hover:text-black' : 'text-black group-hover:text-white'}`} />
                </a>
                <a
                  href="https://www.instagram.com/cruzgphotography/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative p-4 border border-current border-opacity-20 transition-all duration-500 hover:border-opacity-100 overflow-hidden"
                  data-hover
                  aria-label="Instagram"
                >
                  <div className={`absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ${darkMode ? 'bg-white' : 'bg-black'}`} />
                  <Instagram size={22} className={`relative z-10 transition-colors duration-500 ${darkMode ? 'text-white group-hover:text-black' : 'text-black group-hover:text-white'}`} />
                </a>
                <a
                  href="#"
                  className="group relative p-4 border border-current border-opacity-20 transition-all duration-500 hover:border-opacity-100 overflow-hidden"
                  data-hover
                  aria-label="YouTube"
                >
                  <div className={`absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ${darkMode ? 'bg-white' : 'bg-black'}`} />
                  <Youtube size={22} className={`relative z-10 transition-colors duration-500 ${darkMode ? 'text-white group-hover:text-black' : 'text-black group-hover:text-white'}`} />
                </a>
                <a
                  href="#"
                  className="group relative p-4 border border-current border-opacity-20 transition-all duration-500 hover:border-opacity-100 overflow-hidden"
                  data-hover
                  aria-label="Twitter"
                >
                  <div className={`absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ${darkMode ? 'bg-white' : 'bg-black'}`} />
                  <Twitter size={22} className={`relative z-10 transition-colors duration-500 ${darkMode ? 'text-white group-hover:text-black' : 'text-black group-hover:text-white'}`} />
                </a>
                <a
                  href="#"
                  className="group relative p-4 border border-current border-opacity-20 transition-all duration-500 hover:border-opacity-100 overflow-hidden"
                  data-hover
                  aria-label="WhatsApp"
                >
                  <div className={`absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ${darkMode ? 'bg-white' : 'bg-black'}`} />
                  <MessageCircle size={22} className={`relative z-10 transition-colors duration-500 ${darkMode ? 'text-white group-hover:text-black' : 'text-black group-hover:text-white'}`} />
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-24 pt-12 border-t border-current border-opacity-20 text-center"
        >
          <p className="text-xs tracking-[0.3em] opacity-80">
            CRUZGPHOTOGRAPHY / Productor cinematográfico / {new Date().getFullYear()}
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <div className="w-8 h-px bg-current opacity-20" />
            <div className="w-16 h-px bg-current opacity-40" />
            <div className="w-8 h-px bg-current opacity-20" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
