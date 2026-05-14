import { Link, router, usePage } from '@inertiajs/react';
import { ArrowDown, Coffee, LogOut, MapPin } from 'lucide-react';
import { login, register } from '@/routes';

export function HeroSection({ hasPastOrder }: { hasPastOrder?: boolean }) {
    const { auth } = usePage().props;
    const user = auth?.user;
    const canRegister =
        (usePage().props as Record<string, unknown>).canRegister === true;

    const handleLogout = () => {
        router.post('/logout');
    };

    return (
        <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4">
            <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-900/20 via-zinc-900/50 to-transparent" />

            <div className="relative z-10 mx-auto max-w-4xl text-center">
                <div className="mb-6 flex justify-center">
                    <div className="flex h-24 w-24 items-center justify-center rounded-full bg-amber-500/10 ring-1 ring-amber-500/20">
                        <Coffee className="h-12 w-12 text-amber-400" />
                    </div>
                </div>

                <h1 className="mb-4 bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 bg-clip-text text-5xl font-bold tracking-tight text-transparent sm:text-6xl lg:text-7xl">
                    Taman Ana
                </h1>

                <p className="mb-8 text-xl text-zinc-300 sm:text-2xl">
                    Your Garden Drink Escape
                </p>

                <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                    <a
                        href="#menu"
                        className="inline-flex items-center gap-2 rounded-full bg-amber-500 px-8 py-4 text-base font-semibold text-black transition-all hover:bg-amber-400 hover:shadow-lg hover:shadow-amber-500/25 active:scale-95"
                    >
                        <Coffee className="h-5 w-5" />
                        Order Your Drink Now
                    </a>

                    {hasPastOrder && (
                        <a
                            href="/past-orders"
                            className="inline-flex items-center gap-2 rounded-full border border-amber-500/50 bg-amber-500/10 px-8 py-4 text-base font-semibold text-amber-400 transition-all hover:border-amber-400 hover:bg-amber-500/20 active:scale-95"
                        >
                            <MapPin className="h-5 w-5" />
                            My Orders
                        </a>
                    )}

                    {user ? (
                        <button
                            onClick={handleLogout}
                            className="inline-flex items-center gap-2 rounded-full border border-red-800 px-8 py-4 text-base font-semibold text-red-400 transition-all hover:border-red-600 hover:bg-red-500/10 active:scale-95"
                        >
                            <LogOut className="h-5 w-5" />
                            Logout
                        </button>
                    ) : (
                        <>
                            <Link
                                href={login()}
                                className="inline-flex items-center gap-2 rounded-full border border-zinc-700 px-8 py-4 text-base font-semibold text-zinc-300 transition-all hover:border-zinc-500 hover:text-zinc-100 active:scale-95"
                            >
                                Sign In
                            </Link>
                            {canRegister && (
                                <Link
                                    href={register()}
                                    className="inline-flex items-center gap-2 rounded-full border border-amber-600 px-8 py-4 text-base font-semibold text-amber-400 transition-all hover:border-amber-500 hover:bg-amber-500/10 active:scale-95"
                                >
                                    Register
                                </Link>
                            )}
                        </>
                    )}
                </div>

                <div className="mt-12 flex items-center justify-center gap-8 text-sm text-zinc-600">
                    <a
                        href="https://wa.me/601131791108"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 hover:text-amber-400"
                    >
                        <svg
                            className="h-4 w-4"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                        >
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                        WhatsApp
                    </a>
                    <a
                        href="tel:+601131791108"
                        className="flex items-center gap-2 hover:text-amber-400"
                    >
                        <svg
                            className="h-4 w-4"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                        >
                            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                        </svg>
                        Call
                    </a>
                </div>
            </div>

            <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-bounce">
                <ArrowDown className="h-6 w-6 text-zinc-500" />
            </div>
        </section>
    );
}
