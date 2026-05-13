import type { Auth } from '@/types/auth';
import type { GardenImage, Product } from '@/types/shop';

declare module '@inertiajs/core' {
    export interface InertiaConfig {
        sharedPageProps: {
            name: string;
            auth: Auth;
            sidebarOpen: boolean;
            products?: Product[];
            gardenImages?: GardenImage[];
            flash?: {
                success?: string;
                error?: string;
            };
            [key: string]: unknown;
        };
    }
}
