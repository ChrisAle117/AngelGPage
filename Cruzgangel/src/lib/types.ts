export interface ProjectItem {
    seccion: string;
    titulo: string;
    media_url: string;
    historial: string;
    prioridad: number;
    layout: 'Destacado' | 'Normal';
    type: 'image' | 'video' | 'youtube';
}

export interface PortfolioData {
    [key: string]: ProjectItem[];
}
