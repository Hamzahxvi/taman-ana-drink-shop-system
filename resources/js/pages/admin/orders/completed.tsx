import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, CheckCircle, MapPin, Truck } from 'lucide-react';
import type { Order } from '@/types';

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

export default function AdminOrdersCompleted({
    orders = [],
}: {
    orders?: Order[];
}) {
    return (
        <>
            <Head title="Orders — Completed" />

            <div className="p-6">
                <Link
                    href="/admin"
                    className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition hover:text-foreground/90"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back
                </Link>

                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-foreground">
                        Completed Orders ({orders.length})
                    </h1>
                    <Link
                        href="/admin/orders"
                        className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-sm text-muted-foreground transition hover:border-ring hover:text-foreground/90"
                    >
                        ← In Progress
                    </Link>
                </div>

                <div className="space-y-4">
                    {orders.map((order) => (
                        <div
                            key={order.id}
                            className="rounded-xl border border-border bg-card p-5 opacity-75"
                        >
                            <div className="mb-4 flex items-start justify-between">
                                <div>
                                    <div className="flex items-center gap-3">
                                        <span className="text-sm font-medium text-muted-foreground">
                                            Order #{order.id}
                                        </span>
                                        <span className="inline-flex items-center gap-1 rounded-full bg-green-500/10 px-2.5 py-0.5 text-xs font-medium text-green-400">
                                            <CheckCircle className="h-3 w-3" />
                                            Completed
                                        </span>
                                        <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                                            <MapPin className="h-3 w-3" />
                                            <span className="capitalize">
                                                {order.order_type === 'delivery'
                                                    ? `Delivery${order.delivery_area ? ` — ${order.delivery_area}` : ''}`
                                                    : 'Pickup'}
                                            </span>
                                        </span>
                                    </div>
                                    <p className="mt-1 text-foreground">
                                        {order.customer_name || 'Guest'}
                                    </p>
                                    {order.customer_contact && (
                                        <p className="text-sm text-muted-foreground">
                                            {order.customer_contact}
                                        </p>
                                    )}
                                    {order.order_type === 'delivery' &&
                                        order.customer_address && (
                                            <p className="text-sm text-muted-foreground">
                                                {order.customer_address}
                                            </p>
                                        )}
                                    <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                                        {order.payment_method && (
                                            <span className="inline-flex items-center gap-1">
                                                <Truck className="h-3 w-3" />
                                                {order.payment_method ===
                                                'duitnow'
                                                    ? 'DuitNow'
                                                    : 'Cash'}
                                            </span>
                                        )}
                                        {order.pickup_time && (
                                            <span>
                                                Pickup: {order.pickup_time}
                                            </span>
                                        )}
                                        {order.table_number && (
                                            <span>
                                                Table: {order.table_number}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <span className="text-lg font-bold text-amber-400">
                                    RM {order.total_price.toFixed(2)}
                                </span>
                            </div>

                            <div className="mb-3 space-y-1">
                                {order.items.map((item) => (
                                    <div
                                        key={item.id}
                                        className="rounded-lg bg-muted p-2"
                                    >
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="font-medium text-foreground/80">
                                                {item.quantity}x{' '}
                                                {item.product_name}
                                            </span>
                                            <span className="text-muted-foreground">
                                                RM {item.subtotal.toFixed(2)}
                                            </span>
                                        </div>
                                        <div className="mt-1 flex flex-wrap gap-1">
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
                                                {sweetnessLabels[
                                                    item.sweetness
                                                ] ?? item.sweetness}
                                            </span>
                                            {(() => {
                                                const allExtras: string[] = [];

                                                if (item.extra_milk) {
                                                    allExtras.push(
                                                        'extra_milk',
                                                    );
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
                                            <p className="mt-1 text-xs text-muted-foreground italic">
                                                &quot;{item.remark}&quot;
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {order.notes && (
                                <p className="mb-3 rounded-lg bg-muted p-2 text-sm text-muted-foreground">
                                    Note: {order.notes}
                                </p>
                            )}

                            <p className="text-xs text-muted-foreground">
                                {new Date(order.created_at).toLocaleString()}
                            </p>
                        </div>
                    ))}

                    {orders.length === 0 && (
                        <div className="py-12 text-center text-muted-foreground">
                            <p className="text-lg">No completed orders</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

AdminOrdersCompleted.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/admin' },
        { title: 'Orders', href: '/admin/orders' },
        { title: 'Completed', href: '' },
    ],
};
