import { motion } from 'motion/react';
import { Camera, Cpu, Layers, Zap, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ProjectItem } from '../lib/types';

interface TeamMember {
    name: string;
    role: string;
    image: string;
    bio: string;
}

interface EquipmentItem {
    category: string;
    model: string;
    specs: string[];
    icon: any;
    image: string;
}

interface TeamProps {
    darkMode: boolean;
    data?: ProjectItem[];
}

export function Team({ darkMode, data = [] }: TeamProps) {
    const [hoveredMember, setHoveredMember] = useState<number | null>(null);
    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: 'start',
        slidesToScroll: 1,
        breakpoints: {
            '(min-width: 768px)': { slidesToScroll: 2 },
            '(min-width: 1024px)': { slidesToScroll: 3 }
        }
    });

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

    if (data.length === 0) return null;

    return (
        <section id="team" className="py-24 md:py-32 px-4 md:px-8 relative overflow-hidden" data-cursor-target>
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-16"
                >
                    <h2 className="text-4xl md:text-6xl font-bold tracking-[0.2em] mb-4 uppercase" style={{ fontFamily: "'League Spartan', sans-serif" }}>
                        NUESTRO EQUIPO
                    </h2>
                    <div className="w-24 h-px bg-current opacity-30" />
                    <p className="mt-8 text-sm tracking-[0.2em] opacity-80 max-w-2xl uppercase" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                        EL TALENTO HUMANO DETRÁS DE CADA TOMA Y LA VISIÓN QUE NOS ACOPLA.
                    </p>
                </motion.div>

                <div className="relative group/carousel">
                    <div className="overflow-hidden" ref={emblaRef}>
                        <div className="flex gap-6 md:gap-8">
                            {data.map((member, index) => {
                                // Split Historial into Role and Bio if possible
                                const parts = member.historial.split(' - ');
                                const role = parts[0] || '';
                                const bio = parts[1] || '';

                                return (
                                    <div key={index} className="flex-[0_0_80%] sm:flex-[0_0_45%] lg:flex-[0_0_30%] min-w-0" data-cursor-target>
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.6 }}
                                            onMouseEnter={() => setHoveredMember(index)}
                                            onMouseLeave={() => setHoveredMember(null)}
                                            className="group relative w-full h-full"
                                        >
                                                                                        <div className="relative w-full aspect-[3/4] overflow-hidden border border-current border-opacity-10 mb-6 bg-neutral-900 flex items-center justify-center" data-cursor-target>
                                                <img
                                                    src={member.media_url}
                                                    alt={member.titulo}
                                                    className="w-full h-full object-cover grayscale transition-all duration-700"
                                                                                                        data-cursor-target
                                                    style={{
                                                        filter: hoveredMember === index ? 'grayscale(0)' : 'grayscale(1)',
                                                        transform: hoveredMember === index ? 'scale(1.1)' : 'scale(1)',
                                                        display: 'block'
                                                    }}
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                                                    <p className="text-white text-[11px] tracking-[0.2em] leading-relaxed uppercase" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                                                        {bio || member.historial}
                                                    </p>
                                                </div>
                                            </div>
                                            <h3 className="text-sm font-bold tracking-[0.3em] mb-1 uppercase" style={{ fontFamily: "'League Spartan', sans-serif" }}>{member.titulo}</h3>
                                            <p className="text-[10px] tracking-[0.3em] opacity-70 uppercase" style={{ fontFamily: "'Quicksand', sans-serif" }}>{role}</p>
                                        </motion.div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <button
                        onClick={scrollPrev}
                        className="absolute -left-4 md:-left-12 top-1/2 -translate-y-1/2 w-10 h-10 border border-current border-opacity-20 flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300 bg-background/50 backdrop-blur-sm z-10"
                        data-hover
                        aria-label="Anterior"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <button
                        onClick={scrollNext}
                        className="absolute -right-4 md:-right-12 top-1/2 -translate-y-1/2 w-10 h-10 border border-current border-opacity-20 flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300 bg-background/50 backdrop-blur-sm z-10"
                        data-hover
                        aria-label="Siguiente"
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>
        </section>
    );
}

export function EquipmentSpecs({ darkMode, data = [] }: { darkMode: boolean, data?: ProjectItem[] }) {
    if (data.length === 0) return null;

    return (
        <section id="specs" className="py-24 md:py-32 px-4 md:px-8 relative overflow-hidden" data-cursor-target>
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-16"
                >
                    <h2 className="text-4xl md:text-6xl font-bold tracking-[0.2em] mb-4 uppercase" style={{ fontFamily: "'League Spartan', sans-serif" }}>
                        SPECS
                    </h2>
                    <div className="w-24 h-px bg-current opacity-30" />
                    <p className="mt-8 text-sm tracking-[0.2em] opacity-80 max-w-2xl uppercase" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                        TECNOLOGÍA DE VANGUARDIA QUE HACEN POSIBLE LO IMPOSIBLE.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {data.map((item, index) => {
                        // Parse Category|Spec1, Spec2... from Historial
                        const parts = item.historial.split('|');
                        const category = parts[0] || '';
                        const specs = parts[1] ? parts[1].split(',').map(s => s.trim()) : [];

                        // Map category to icon
                        let Icon = Camera;
                        if (category.includes('ÓPTICA')) Icon = Layers;
                        if (category.includes('DRONES')) Icon = Zap;
                        if (category.includes('ESTABILIZACIÓN')) Icon = Cpu;

                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group/eq space-y-6"
                            >
                                <div className="relative aspect-video overflow-hidden border border-current border-opacity-10 bg-neutral-900 shadow-xl">
                                    <img
                                        src={item.media_url}
                                        alt={item.titulo}
                                        className="w-full h-full object-cover grayscale transition-all duration-700 group-hover/eq:grayscale-0 group-hover/eq:scale-110"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <div className="w-8 h-8 rounded-sm border border-white/20 flex items-center justify-center bg-black/40 backdrop-blur-md">
                                            <Icon size={14} className="text-white/80" />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4 px-1">
                                    <div>
                                        <span className="text-[11px] tracking-[0.6em] text-white font-black uppercase block mb-2" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                                            {category}
                                        </span>
                                        <h4 className="text-sm font-bold tracking-[0.2em] uppercase" style={{ fontFamily: "'League Spartan', sans-serif" }}>{item.titulo}</h4>
                                    </div>

                                    <div className="h-px w-full bg-current opacity-10" />

                                    <ul className="space-y-3">
                                        {specs.map((spec, sIdx) => (
                                            <li key={sIdx} className="flex items-start gap-3 text-[10px] tracking-[0.2em] opacity-70 leading-relaxed font-medium uppercase" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                                                <div className="w-1 h-1 bg-current opacity-30 rounded-full mt-1.5" />
                                                <span>{spec}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}

export function TeamEquipment({ darkMode, teamData, gearData }: { darkMode: boolean, teamData?: ProjectItem[], gearData?: ProjectItem[] }) {
    return (
        <>
            <Team darkMode={darkMode} data={teamData} />
            <EquipmentSpecs darkMode={darkMode} data={gearData} />
        </>
    );
}
