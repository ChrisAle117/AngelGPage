import { Moon, Sun, Instagram } from 'lucide-react';

interface NavigationProps {
  darkMode: boolean;
  setDarkMode: (mode: boolean) => void;
}

export function Navigation({ darkMode, setDarkMode }: NavigationProps) {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 p-4 md:p-8">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <button
            onClick={() => scrollToSection('reel')}
            className="group relative overflow-hidden flex flex-col items-start md:flex-row md:items-baseline gap-0 md:gap-2 text-left"
            data-hover
          >
            <span
              className="text-xl md:text-2xl tracking-[0.3em] inline-block transition-transform duration-300 group-hover:scale-110"
              style={{ fontFamily: "'League Spartan', sans-serif", fontWeight: 600 }}
            >
              CRUZG
            </span>
            <span
              className="text-[10px] md:text-xs tracking-[0.4em] leading-none md:leading-normal"
              style={{
                fontFamily: "'Quicksand', sans-serif",
                fontWeight: 500,
                WebkitTextStroke: darkMode ? '1px white' : '1px black',
                WebkitTextFillColor: 'transparent',
                color: 'transparent',
                paintOrder: 'stroke fill',
              }}
            >
              PHOTOGRAPHY
            </span>
          </button>
        </div>

        <div className="flex items-center gap-6 md:gap-8">
          <button
            onClick={() => scrollToSection('visuals')}
            className="group relative text-sm tracking-[0.2em] hidden md:block"
            data-hover
          >
            <span className="opacity-60 group-hover:opacity-100 transition-opacity duration-300">GALERÍAS</span>
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-current transition-all duration-300 group-hover:w-full" />
          </button>
          <button
            onClick={() => scrollToSection('lab')}
            className="group relative text-xs md:text-sm tracking-[0.2em] hidden sm:block"
            data-hover
          >
            <span className="opacity-60 group-hover:opacity-100 transition-opacity duration-300">LAB</span>
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-current transition-all duration-300 group-hover:w-full" />
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="group relative text-xs md:text-sm tracking-[0.2em]"
            data-hover
          >
            <span className="opacity-60 group-hover:opacity-100 transition-opacity duration-300">CONTACTO</span>
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-current transition-all duration-300 group-hover:w-full" />
          </button>

          <div className="h-4 w-px bg-current opacity-20 hidden md:block" />

          <a
            href="https://www.instagram.com/cruzgphotography/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 opacity-60 hover:opacity-100 transition-all duration-300 hover:scale-110"
            data-hover
            aria-label="Instagram"
          >
            <Instagram size={18} />
          </a>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 hover:opacity-60 transition-opacity"
            data-hover
            aria-label="Toggle theme"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>
    </nav>
  );
}
