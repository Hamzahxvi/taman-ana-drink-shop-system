import { Head } from '@inertiajs/react';
import { CheckCircle, Clock, CookingPot } from 'lucide-react';
import { useEffect, useState } from 'react';
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
        label: 'Preparing',
        color: 'bg-blue-500/10 text-blue-400',
        icon: CookingPot,
    },
    completed: {
        label: 'Completed',
        color: 'bg-green-500/10 text-green-400',
        icon: CheckCircle,
    },
};

export default function PastOrders() {
    const [orders, setOrders] = useState<Order[] | null>(null);

    useEffect(() => {
        const phone = localStorage.getItem('customerPhone');

        let cancelled = false;

        const fetchOrders = (phoneNumber: string) => {
        fetch(`/orders/lookup?phone=${encodeURIComponent(phone)}`, {
            headers: { Accept: 'application/json' },
        })
                .then((r) => r.json())
                .then((data) => {
                    if (!cancelled) {
                        setOrders(data.orders ?? []);
                    }
                })
                .catch(() => {
                    if (!cancelled) {
                        setOrders([]);
                    }
                });
        };

        if (phone) {
            fetchOrders(phone);
        } else {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setOrders([]);
        }

        return () => {
            cancelled = true;
        };
    }, []);

    const isLoading = orders === null;

    return (
        <>
            <Head title="My Orders" />

            <div className="min-h-screen bg-zinc-950 text-zinc-100">
                <div className="mx-auto max-w-lg px-4 py-12">
                    <div className="mb-8 text-center">
                        <h1 className="text-3xl font-bold">
                            My{' '}
                            <span className="text-amber-400">Orders</span>
                        </h1>
                        <p className="mt-2 text-zinc-400">
                            Your order history
                        </p>
                    </div>

                    {isLoading ? (
                        <p className="text-center text-zinc-500">
                            Loading...
                        </p>
                    ) : orders.length === 0 ? (
                        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8 text-center">
                            <p className="text-zinc-400">No orders found</p>
                            <p className="mt-1 text-sm text-zinc-500">
                                Orders placed with your phone number will appear
                                here
                            </p>
                        </div>
                    ) : (
                        <>
                            {(() => {
                                const activeOrders = orders.filter(
                                    (o) => o.status !== 'completed',
                                );
                                const pastOrders = orders.filter(
                                    (o) => o.status === 'completed',
                                );

                                const renderOrder = (order: Order) => {
                                    const StatusIcon =
                                        statusConfig[order.status]?.icon ??
                                        Clock;
                                    const statusStyle =
                                        statusConfig[order.status]?.color ??
                                        'bg-zinc-500/10 text-zinc-400';

                                    return (
                                        <a
                                            key={order.id}
                                            href={`/orders/${order.id}/track`}
                                            className="block rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5 transition-all hover:border-amber-500/50"
                                        >
                                            <div className="mb-3 flex items-start justify-between">
                                                <div>
                                                    <div className="flex items-center gap-3">
                                                        <span className="text-sm font-medium text-zinc-400">
                                                            Order #{order.id}
                                                        </span>
                                                        <span
                                                            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${statusStyle}`}
                                                        >
                                                            <StatusIcon className="h-3 w-3" />
                                                            {statusConfig[order.status]
                                                                ?.label ??
                                                                order.status}
                                                        </span>
                                                        <span className="text-xs text-zinc-500 capitalize">
                                                            {order.order_type ===
                                                            'delivery'
                                                                ? 'Delivery'
                                                                : 'Pickup'}
                                                        </span>
                                                    </div>
                                                    <p className="mt-1 text-xs text-zinc-600">
                                                        {new Date(
                                                            order.created_at,
                                                        ).toLocaleString()}
                                                    </p>
                                                </div>
                                                <span className="text-lg font-bold text-amber-400">
                                                    RM{' '}
                                                    {order.total_price.toFixed(
                                                        2,
                                                    )}
                                                </span>
                                            </div>
                                            <div className="space-y-1">
                                                {order.items.map((item) => (
                                                    <div
                                                        key={item.id}
                                                        className="flex items-center justify-between text-sm"
                                                    >
                                                        <span className="text-zinc-300">
                                                            {item.quantity}x{' '}
                                                            {item.product_name}
                                                        </span>
                                                        <span className="text-zinc-400">
                                                            RM{' '}
                                                            {item.subtotal.toFixed(
                                                                2,
                                                            )}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </a>
                                    );
                                };

                                return (
                                    <div className="space-y-6">
                                        {activeOrders.length > 0 && (
                                            <div>
                                                <h2 className="mb-3 text-sm font-semibold text-amber-400">
                                                    Active Orders
                                                </h2>
                                                <div className="space-y-4">
                                                    {activeOrders.map(
                                                        renderOrder,
                                                    )}
                                                </div>
                                            </div>
                                        )}

                                        {pastOrders.length > 0 && (
                                            <div>
                                                <h2 className="mb-3 text-sm font-semibold text-zinc-500">
                                                    Past Orders
                                                </h2>
                                                <div className="space-y-4">
                                                    {pastOrders.map(
                                                        renderOrder,
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            })()}
                        </>
                    )}

                    <div className="mt-8 text-center">
                        <a
                            href="/"
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
