import Papa from 'papaparse';
import { ProjectItem, PortfolioData } from './types';

export const fetchPortfolioData = async (sheetUrl: string): Promise<PortfolioData> => {
    try {
        const response = await fetch(sheetUrl);
        const csvData = await response.text();

        return new Promise((resolve, reject) => {
            Papa.parse(csvData, {
                header: true,
                skipEmptyLines: true,
                complete: (results: Papa.ParseResult<any>) => {
                    const rawData = results.data;

                    const processedData: PortfolioData = rawData.reduce((acc: PortfolioData, row: any) => {
                        // Limpiar espacios en blanco de las llaves y valores
                        const item: any = {};
                        Object.keys(row).forEach(key => {
                            item[key.trim()] = typeof row[key] === 'string' ? row[key].trim() : row[key];
                        });

                        const seccion = item.Seccion || 'Otros';
                        const rawUrl = item.Media_URL || '';

                        const projectItem: ProjectItem = {
                            seccion: seccion,
                            titulo: item.Título || '',
                            media_url: optimizeUrl(rawUrl),
                            historial: item.Historial || '',
                            prioridad: parseInt(item.Prioridad) || 0,
                            layout: item.Layout === 'Destacado' ? 'Destacado' : 'Normal',
                            type: detectMediaType(rawUrl)
                        };

                        if (!acc[seccion]) {
                            acc[seccion] = [];
                        }

                        acc[seccion].push(projectItem);
                        return acc;
                    }, {});

                    // Sort items in each section by priority
                    Object.keys(processedData).forEach(section => {
                        processedData[section].sort((a, b) => b.prioridad - a.prioridad);
                    });

                    resolve(processedData);
                },
                error: (error: any) => {
                    reject(error);
                }
            });
        });
    } catch (error) {
        console.error('Error fetching Google Sheet data:', error);
        throw error;
    }
};

const optimizeUrl = (url: string): string => {
    if (!url) return '';

    // Optimización para Cloudinary
    if (url.includes('cloudinary.com')) {

        if (url.includes('/upload/q_auto') || url.includes('/upload/f_auto') || url.includes('/s--')) return url;


        // return url.replace('/upload/', '/upload/f_auto,q_auto,w_1200,c_limit/');
        return url;
    }

    // Optimización para Unsplash
    if (url.includes('images.unsplash.com')) {
        // Si ya tiene parámetros, quitamos el tamaño para forzar uno optimizado
        const baseUrl = url.split('?')[0];
        return `${baseUrl}?q=80&w=1200&auto=format&fit=crop`;
    }

    // Soporte para YouTube (convertir a embed)
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
        let videoId = '';
        if (url.includes('v=')) {
            videoId = url.split('v=')[1].split('&')[0];
        } else if (url.includes('youtu.be/')) {
            videoId = url.split('youtu.be/')[1].split('?')[0];
        } else if (url.includes('embed/')) {
            videoId = url.split('embed/')[1].split('?')[0];
        }

        if (videoId) {
            return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&modestbranding=1&rel=0`;
        }
    }

    return url;
};

const detectMediaType = (url: string): 'image' | 'video' | 'youtube' => {
    if (!url) return 'image';

    // Detectar YouTube
    if (url.includes('youtube.com') || url.includes('youtu.be')) return 'youtube';

    const cleanUrl = url.split('?')[0].split('#')[0];
    const extension = cleanUrl.split('.').pop()?.toLowerCase();
    const videoExtensions = ['mp4', 'webm', 'ogg', 'mov', 'avi', 'mkv'];

    if (url.includes('/video/upload/')) return 'video';

    return videoExtensions.includes(extension || '') ? 'video' : 'image';
};
