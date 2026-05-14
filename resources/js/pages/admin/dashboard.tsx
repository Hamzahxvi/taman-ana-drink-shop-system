import { Head, Link, router } from '@inertiajs/react';
import { ClipboardList, Coffee, LogOut, ShoppingBag, TrendingUp } from 'lucide-react';

export default function AdminDashboard({
    stats,
    popularItems,
}: {
    stats: {
        ordersToday: number;
        totalOrders: number;
        pendingOrders: number;
        totalRevenue: number;
    };
    popularItems: Record<string, number>;
}) {
    const cards = [
        {
            label: 'Orders Today',
            value: stats.ordersToday,
            icon: ClipboardList,
            color: 'text-blue-400 bg-blue-500/10',
        },
        {
            label: 'Pending Orders',
            value: stats.pendingOrders,
            icon: ShoppingBag,
            color: 'text-amber-400 bg-amber-500/10',
        },
        {
            label: 'Total Orders',
            value: stats.totalOrders,
            icon: TrendingUp,
            color: 'text-green-400 bg-green-500/10',
        },
        {
            label: 'Total Revenue',
            value: `RM ${stats.totalRevenue.toFixed(2)}`,
            icon: Coffee,
            color: 'text-purple-400 bg-purple-500/10',
        },
    ];

    return (
        <>
            <Head title="Admin Dashboard" />

            <div className="p-6">
                <div className="mb-8 flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-zinc-100">
                        Admin Dashboard
                    </h1>
                    <button
                        onClick={() =>
                            router.post('/logout', {}, {
                                onFinish: () => window.location.href = '/',
                            })
                        }
                        className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-200 transition hover:border-red-500/50 hover:bg-red-500/10 hover:text-red-400"
                    >
                        <LogOut className="h-4 w-4" />
                        Logout
                    </button>
                </div>

                <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {cards.map((card) => {
                        const Icon = card.icon;

                        return (
                            <div
                                key={card.label}
                                className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5"
                            >
                                <div className="mb-3 flex items-center gap-3">
                                    <div
                                        className={`flex h-10 w-10 items-center justify-center rounded-lg ${card.color}`}
                                    >
                                        <Icon className="h-5 w-5" />
                                    </div>
                                    <span className="text-sm text-zinc-400">
                                        {card.label}
                                    </span>
                                </div>
                                <p className="text-2xl font-bold text-zinc-100">
                                    {card.value}
                                </p>
                            </div>
                        );
                    })}
                </div>

                <div className="grid gap-6 lg:grid-cols-2">
                    <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
                        <h2 className="mb-4 text-lg font-semibold text-zinc-100">
                            Popular Items
                        </h2>
                        {Object.keys(popularItems).length > 0 ? (
                            <div className="space-y-3">
                                {Object.entries(popularItems).map(
                                    ([name, count], index) => (
                                        <div
                                            key={name}
                                            className="flex items-center justify-between"
                                        >
                                            <div className="flex items-center gap-3">
                                                <span className="text-sm text-zinc-500">
                                                    #{index + 1}
                                                </span>
                                                <span className="text-zinc-200">
                                                    {name}
                                                </span>
                                            </div>
                                            <span className="text-sm text-zinc-400">
                                                {count} sold
                                            </span>
                                        </div>
                                    ),
                                )}
                            </div>
                        ) : (
                            <p className="text-sm text-zinc-500">
                                No orders yet
                            </p>
                        )}
                    </div>

                    <div className="space-y-4">
                        <Link
                            href="/admin/products"
                            className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900/50 p-5 transition-all hover:border-amber-500/50"
                        >
                            <div>
                                <h3 className="font-semibold text-zinc-100">
                                    Manage Menu
                                </h3>
                                <p className="text-sm text-zinc-400">
                                    Add, edit, or remove drink items
                                </p>
                            </div>
                            <span className="text-2xl">☕</span>
                        </Link>

                        <Link
                            href="/admin/orders"
                            className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900/50 p-5 transition-all hover:border-amber-500/50"
                        >
                            <div>
                                <h3 className="font-semibold text-zinc-100">
                                    View Orders
                                </h3>
                                <p className="text-sm text-zinc-400">
                                    Manage incoming orders
                                </p>
                            </div>
                            <span className="text-2xl">📋</span>
                        </Link>

                        <Link
                            href="/admin/extras"
                            className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900/50 p-5 transition-all hover:border-amber-500/50"
                        >
                            <div>
                                <h3 className="font-semibold text-zinc-100">
                                    Manage Extras
                                </h3>
                                <p className="text-sm text-zinc-400">
                                    Add-ons & toppings
                                </p>
                            </div>
                            <span className="text-2xl">✨</span>
                        </Link>

                        <Link
                            href="/admin/garden"
                            className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900/50 p-5 transition-all hover:border-amber-500/50"
                        >
                            <div>
                                <h3 className="font-semibold text-zinc-100">
                                    Garden Gallery
                                </h3>
                                <p className="text-sm text-zinc-400">
                                    Manage garden photos
                                </p>
                            </div>
                            <span className="text-2xl">🌿</span>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}

AdminDashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: '/admin',
        },
    ],
};
