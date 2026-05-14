import { Link, router, usePage } from '@inertiajs/react';
import { Coffee, LogOut, MapPin, Phone } from 'lucide-react';
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
        <section className="relative flex min-h-[92svh] flex-col overflow-hidden px-4 pt-6 pb-8 sm:min-h-screen sm:items-center sm:justify-center sm:py-16">
            <div className="absolute inset-0 bg-zinc-950" />
            <div className="absolute inset-x-0 top-0 h-[52svh] bg-[linear-gradient(180deg,rgba(245,158,11,0.2),rgba(39,39,42,0.45),rgba(9,9,11,0))]" />

            <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-1 flex-col justify-center text-center">
                <div className="mb-5 flex justify-center sm:mb-6">
                    <div className="flex h-18 w-18 items-center justify-center rounded-full bg-amber-500/10 ring-1 ring-amber-500/20 sm:h-24 sm:w-24">
                        <Coffee className="h-9 w-9 text-amber-400 sm:h-12 sm:w-12" />
                    </div>
                </div>

                <h1 className="mb-3 bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 bg-clip-text text-5xl font-bold tracking-tight text-transparent sm:mb-4 sm:text-6xl lg:text-7xl">
                    Taman Ana
                </h1>

                <p className="mx-auto mb-7 max-w-xs text-lg leading-7 text-zinc-300 sm:mb-8 sm:max-w-none sm:text-2xl">
                    Your Garden Drink Escape
                </p>

                <div className="mx-auto grid w-full max-w-sm gap-3 sm:max-w-none sm:auto-cols-max sm:grid-flow-col sm:justify-center sm:gap-4">
                    <a
                        href="#menu"
                        className="inline-flex min-h-13 items-center justify-center gap-2 rounded-2xl bg-amber-500 px-5 text-base font-semibold text-black transition-all hover:bg-amber-400 hover:shadow-lg hover:shadow-amber-500/25 active:scale-95 sm:rounded-full sm:px-8"
                    >
                        <Coffee className="h-5 w-5" />
                        Order Now
                    </a>

                    {hasPastOrder && (
                        <a
                            href="/past-orders"
                            className="inline-flex min-h-13 items-center justify-center gap-2 rounded-2xl border border-amber-500/50 bg-amber-500/10 px-5 text-base font-semibold text-amber-400 transition-all hover:border-amber-400 hover:bg-amber-500/20 active:scale-95 sm:rounded-full sm:px-8"
                        >
                            <MapPin className="h-5 w-5" />
                            My Orders
                        </a>
                    )}

                    {user ? (
                        <button
                            onClick={handleLogout}
                            className="inline-flex min-h-13 items-center justify-center gap-2 rounded-2xl border border-red-800 px-5 text-base font-semibold text-red-400 transition-all hover:border-red-600 hover:bg-red-500/10 active:scale-95 sm:rounded-full sm:px-8"
                        >
                            <LogOut className="h-5 w-5" />
                            Logout
                        </button>
                    ) : (
                        <>
                            <Link
                                href={login()}
                                className="inline-flex min-h-13 items-center justify-center gap-2 rounded-2xl border border-zinc-700 px-5 text-base font-semibold text-zinc-300 transition-all hover:border-zinc-500 hover:text-zinc-100 active:scale-95 sm:rounded-full sm:px-8"
                            >
                                Sign In
                            </Link>
                            {canRegister && (
                                <Link
                                    href={register()}
                                    className="inline-flex min-h-13 items-center justify-center gap-2 rounded-2xl border border-amber-600 px-5 text-base font-semibold text-amber-400 transition-all hover:border-amber-500 hover:bg-amber-500/10 active:scale-95 sm:rounded-full sm:px-8"
                                >
                                    Register
                                </Link>
                            )}
                        </>
                    )}
                </div>

                <div className="mt-8 flex items-center justify-center gap-3 text-sm text-zinc-500 sm:mt-12 sm:gap-8 sm:text-zinc-600">
                    <a
                        href="https://wa.me/601131791108"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex min-h-10 items-center gap-2 rounded-full border border-zinc-800 px-4 hover:text-amber-400 sm:min-h-0 sm:border-0 sm:px-0"
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
                        className="flex min-h-10 items-center gap-2 rounded-full border border-zinc-800 px-4 hover:text-amber-400 sm:min-h-0 sm:border-0 sm:px-0"
                    >
                        <Phone className="h-4 w-4" />
                        Call
                    </a>
                </div>
            </div>
        </section>
    );
}
