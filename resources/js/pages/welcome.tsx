import { Head } from '@inertiajs/react';
import { ExternalLink, MapPin, X } from 'lucide-react';
import { useState } from 'react';
import { CartSidebar } from '@/components/cart-sidebar';
import { DrinkCard } from '@/components/drink-card';
import { HeroSection } from '@/components/hero-section';
import { CartProvider } from '@/contexts/cart-context';
import type { GardenImage, Product } from '@/types';

export default function Welcome({
    products = [],
    gardenImages = [],
    extras = [],
}: {
    products?: Product[];
    gardenImages?: GardenImage[];
    extras?: Array<{
        id: number;
        name: string;
        slug: string;
        price: number;
        is_active: boolean;
    }>;
}) {
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
    const hasPastOrder =
        localStorage.getItem('lastOrderUrl') !== null ||
        localStorage.getItem('customerPhone') !== null;

    return (
        <CartProvider>
            <Head title="Taman Ana — Your Garden Drink Escape" />

            <div className="bg-zinc-950 text-zinc-100">
                <HeroSection hasPastOrder={hasPastOrder} />

                <section id="menu" className="relative px-4 py-24">
                    <div className="mx-auto max-w-7xl">
                        <div className="mb-12 text-center">
                            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                                Our{' '}
                                <span className="text-amber-400">
                                    Signature Menu
                                </span>
                            </h2>
                            <p className="mt-3 text-zinc-400">
                                Handcrafted beverages made with love
                            </p>
                        </div>

                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {products.map((product) => (
                                <DrinkCard key={product.id} product={product} extras={extras} />
                            ))}
                        </div>
                    </div>
                </section>

                {gardenImages.length > 0 && (
                    <section className="relative px-4 py-24">
                        <div className="mx-auto max-w-7xl">
                            <div className="mb-12 text-center">
                                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                                    Our{' '}
                                    <span className="text-amber-400">
                                        Garden
                                    </span>
                                </h2>
                                <p className="mt-3 text-zinc-400">
                                    Relax in the serene beauty of Taman Ana
                                </p>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                {gardenImages.map((image, index) => (
                                    <button
                                        key={image.id}
                                        onClick={() => setLightboxIndex(index)}
                                        className="group relative aspect-[4/3] overflow-hidden rounded-xl"
                                    >
                                        <div className="absolute inset-0 animate-pulse bg-zinc-800" />
                                        <img
                                            src={image.image_url}
                                            alt={
                                                image.caption ?? 'Garden image'
                                            }
                                            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            loading="lazy"
                                            onError={(e) => {
                                                (
                                                    e.target as HTMLImageElement
                                                ).style.display = 'none';
                                            }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                                        {image.caption && (
                                            <p className="absolute right-4 bottom-4 left-4 text-sm text-white opacity-0 transition-opacity group-hover:opacity-100">
                                                {image.caption}
                                            </p>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                <section className="relative px-4 py-24">
                    <div className="mx-auto max-w-7xl">
                        <div className="mb-12 text-center">
                            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                                <span className="text-amber-400">Contact</span>{' '}
                                Us
                            </h2>
                            <p className="mt-3 text-zinc-400">
                                We'd love to hear from you
                            </p>
                        </div>

                        <div className="grid gap-8 lg:grid-cols-2">
                            <div className="space-y-6">
                                <div>
                                    <h3 className="mb-2 text-lg font-semibold text-zinc-100">
                                        Get in Touch
                                    </h3>
                                    <p className="text-zinc-400">
                                        Reach out to Puan Ana directly for any
                                        inquiries
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    <a
                                        href="https://wa.me/601131791108"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-4 rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 transition-all hover:border-green-500/50 hover:bg-zinc-900"
                                    >
                                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500/10">
                                            <svg
                                                className="h-6 w-6 text-green-400"
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                            >
                                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                            </svg>
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-medium text-zinc-100">
                                                WhatsApp
                                            </p>
                                            <p className="text-sm text-zinc-400">
                                                Chat with Puan Ana
                                            </p>
                                        </div>
                                        <ExternalLink className="h-5 w-5 text-zinc-500" />
                                    </a>

                                    <a
                                        href="tel:+601131791108"
                                        className="flex items-center gap-4 rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 transition-all hover:border-blue-500/50 hover:bg-zinc-900"
                                    >
                                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/10">
                                            <svg
                                                className="h-6 w-6 text-blue-400"
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                            >
                                                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                                            </svg>
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-medium text-zinc-100">
                                                Phone
                                            </p>
                                            <p className="text-sm text-zinc-400">
                                                +60 11-3179 1108
                                            </p>
                                        </div>
                                        <ExternalLink className="h-5 w-5 text-zinc-500" />
                                    </a>
                                </div>

                                <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
                                    <div className="flex items-start gap-3">
                                        <MapPin className="mt-0.5 h-5 w-5 text-amber-400" />
                                        <div>
                                            <p className="font-medium text-zinc-100">
                                                Location
                                            </p>
                                            <p className="mt-1 text-sm text-zinc-400">
                                                2°48'58.6"N 101°38'05.4"E
                                            </p>
                                            <p className="text-sm text-zinc-500">
                                                Lot 12260 Jalan Perak Kanan,
                                                Bukit Changgang, 42700 Banting,
                                                Selangor.
                                            </p>
                                            <a
                                                href="https://www.google.com/maps?q=2.816278,101.634833"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="mt-2 inline-flex items-center gap-1 text-sm text-amber-400 hover:text-amber-300"
                                            >
                                                Open in Google Maps
                                                <ExternalLink className="h-3 w-3" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="overflow-hidden rounded-xl border border-zinc-800">
                                <iframe
                                    src="https://maps.google.com/maps?q=2.816278,101.634833&z=17&output=embed"
                                    width="100%"
                                    height="100%"
                                    style={{ minHeight: '300px' }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Taman Ana Location"
                                    className="opacity-80 grayscale transition-all hover:opacity-100"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                <footer className="border-t border-zinc-800 px-4 py-8">
                    <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
                        <p className="text-sm text-zinc-500">
                            &copy; {new Date().getFullYear()} Taman Ana. All
                            rights reserved.
                        </p>
                        <div className="flex items-center gap-4 text-sm text-zinc-500">
                            <span>Made with love in Banting</span>
                        </div>
                    </div>
                </footer>
            </div>

            <CartSidebar />

            {lightboxIndex !== null && gardenImages[lightboxIndex] && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
                    onClick={() => setLightboxIndex(null)}
                >
                    <button
                        onClick={() => setLightboxIndex(null)}
                        className="absolute top-4 right-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
                    >
                        <X className="h-6 w-6" />
                    </button>

                    <div className="relative max-h-[90vh] max-w-[90vw]">
                        <img
                            src={gardenImages[lightboxIndex].image_url}
                            alt={
                                gardenImages[lightboxIndex].caption ??
                                'Garden image'
                            }
                            className="max-h-[85vh] rounded-lg object-contain"
                            onError={(e) => {
                                (e.target as HTMLImageElement).style.display =
                                    'none';
                            }}
                        />
                        {gardenImages[lightboxIndex].caption && (
                            <p className="mt-4 text-center text-sm text-zinc-300">
                                {gardenImages[lightboxIndex].caption}
                            </p>
                        )}
                    </div>

                    <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 gap-3">
                        {gardenImages.map((_, index) => (
                            <button
                                key={index}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setLightboxIndex(index);
                                }}
                                className={`h-2 w-2 rounded-full transition-all ${
                                    index === lightboxIndex
                                        ? 'w-6 bg-amber-400'
                                        : 'bg-zinc-600 hover:bg-zinc-400'
                                }`}
                            />
                        ))}
                    </div>
                </div>
            )}
        </CartProvider>
    );
}
