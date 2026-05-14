import { Head } from '@inertiajs/react';
import { CheckCircle, Clock, CookingPot, MapPin, Truck } from 'lucide-react';
import { useEffect } from 'react';
import type { Order } from '@/types';

const statusConfig: Record<
    string,
    {
        label: string;
        color: string;
        icon: React.ComponentType<{ className?: string }>;
    }
> = {
    pending: {
        label: 'Pending',
        color: 'bg-amber-500/10 text-amber-400',
        icon: Clock,
    },
    'in-progress': {
        label: 'In Progress',
        color: 'bg-blue-500/10 text-blue-400',
        icon: CookingPot,
    },
    completed: {
        label: 'Completed',
        color: 'bg-green-500/10 text-green-400',
        icon: CheckCircle,
    },
};

const sweetnessLabels: Record<string, string> = {
    regular: 'Regular',
    less: 'Less Sweet',
    none: 'No Sugar',
};

const toppingLabels: Record<string, string> = {
    extra_milk: 'Extra Milk',
    oreo_crumbles: 'Oreo Crumbles',
    whipping_cream: 'Whipping Cream',
};

export default function OrderTrack({ trackOrder }: { trackOrder: Order }) {
    const order = trackOrder;
    const StatusIcon = statusConfig[order.status]?.icon ?? Clock;
    const statusStyle =
        statusConfig[order.status]?.color ?? 'bg-zinc-500/10 text-zinc-400';

    useEffect(() => {
        localStorage.setItem('lastOrderId', String(order.id));
        localStorage.setItem('lastOrderUrl', `/orders/${order.id}/track`);
    }, [order.id]);

    return (
        <>
            <Head title={`Order #${order.id}`} />

            <div className="min-h-screen bg-zinc-950 text-zinc-100">
                <div className="mx-auto max-w-lg px-4 py-12">
                    <div className="mb-8 text-center">
                        <h1 className="text-3xl font-bold">
                            Order{' '}
                            <span className="text-amber-400">#{order.id}</span>
                        </h1>
                        <p className="mt-2 text-zinc-400">
                            Thank you for your order! Track its status below.
                        </p>
                    </div>

                    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
                        <div className="mb-6 flex items-center justify-between">
                            <span
                                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium ${statusStyle}`}
                            >
                                <StatusIcon className="h-4 w-4" />
                                {statusConfig[order.status]?.label ??
                                    order.status}
                            </span>
                            <span className="text-lg font-bold text-amber-400">
                                RM {order.total_price.toFixed(2)}
                            </span>
                        </div>

                        <div className="mb-6 space-y-2 text-sm">
                            <div className="flex items-center gap-2 text-zinc-400">
                                <MapPin className="h-4 w-4 text-zinc-500" />
                                <span className="capitalize">
                                    {order.order_type === 'delivery'
                                        ? `Delivery to ${order.delivery_area}`
                                        : 'Self Pickup'}
                                </span>
                            </div>
                            {order.order_type === 'delivery' &&
                                order.customer_address && (
                                    <p className="pl-6 text-zinc-500">
                                        {order.customer_address}
                                    </p>
                                )}
                            <div className="flex items-center gap-2 text-zinc-400">
                                <Truck className="h-4 w-4 text-zinc-500" />
                                <span>
                                    {order.payment_method === 'duitnow'
                                        ? 'Online Banking / DuitNow'
                                        : 'Cash'}
                                </span>
                            </div>
                            <p className="text-xs text-zinc-600">
                                Ordered on{' '}
                                {new Date(order.created_at).toLocaleString()}
                            </p>
                        </div>

                        <div className="space-y-3">
                            <h3 className="text-sm font-medium text-zinc-400">
                                Items
                            </h3>
                            {order.items.map((item) => (
                                <div
                                    key={item.id}
                                    className="rounded-xl border border-zinc-800 bg-zinc-900 p-3"
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="font-medium text-zinc-100">
                                            {item.quantity}x {item.product_name}
                                        </span>
                                        <span className="text-sm text-amber-400">
                                            RM {item.subtotal.toFixed(2)}
                                        </span>
                                    </div>
                                    <div className="mt-1.5 flex flex-wrap gap-1">
                                        <span
                                            className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs ${
                                                item.temperature === 'hot'
                                                    ? 'bg-orange-500/10 text-orange-400'
                                                    : 'bg-cyan-500/10 text-cyan-400'
                                            }`}
                                        >
                                            {item.temperature === 'hot'
                                                ? 'Hot'
                                                : 'Cold'}
                                        </span>
                                        <span className="inline-flex items-center rounded-full bg-amber-500/10 px-2 py-0.5 text-xs text-amber-400">
                                            {sweetnessLabels[item.sweetness] ??
                                                item.sweetness}
                                        </span>
                                        {(() => {
                                            const allExtras: string[] = [];

                                            if (item.extra_milk) {
                                                allExtras.push('extra_milk');
                                            }

                                            if (item.toppings) {
                                                allExtras.push(
                                                    ...item.toppings,
                                                );
                                            }

                                            return allExtras.map((slug) => (
                                                <span
                                                    key={slug}
                                                    className="inline-flex items-center rounded-full bg-amber-500/10 px-2 py-0.5 text-xs text-amber-400"
                                                >
                                                    {toppingLabels[slug] ??
                                                        slug}
                                                </span>
                                            ));
                                        })()}
                                    </div>
                                    {item.remark && (
                                        <p className="mt-1 text-xs text-zinc-500 italic">
                                            &quot;{item.remark}&quot;
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>

                        {order.notes && (
                            <div className="mt-4 rounded-xl border border-zinc-800 bg-zinc-900/50 p-3">
                                <p className="text-xs text-zinc-500">
                                    Notes: {order.notes}
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="mt-8 space-y-4 text-center">
                        <a
                            href={`/orders/${order.id}/receipt`}
                            className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-6 py-3 text-sm font-semibold text-black hover:bg-amber-400"
                        >
                            <svg
                                className="h-4 w-4"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                <polyline points="14 2 14 8 20 8" />
                                <line x1="16" y1="13" x2="8" y2="13" />
                                <line x1="16" y1="17" x2="8" y2="17" />
                                <polyline points="10 9 9 9 8 9" />
                            </svg>
                            Download Receipt (PDF)
                        </a>
                        <br />
                        <a
                            href="/dashboard"
                            className="text-sm text-amber-400 hover:text-amber-300"
                        >
                            &larr; Back to Menu
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}
