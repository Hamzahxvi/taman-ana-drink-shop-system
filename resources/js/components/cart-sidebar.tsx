import { router, usePage } from '@inertiajs/react';
import { Minus, Plus, ShoppingCart, Trash2, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCart } from '@/contexts/cart-context';

const DELIVERY_AREAS = [
    'Bukit Changgang',
    'Labohan Dagang',
    'Olak Lempit',
    'RTB',
];

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

export function CartSidebar() {
    const {
        items,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
    } = useCart();
    const { auth } = usePage().props as {
        auth: { user?: { name?: string; phone?: string } | null };
    };
    const user = auth?.user ?? null;
    const [isOpen, setIsOpen] = useState(false);
    const [step, setStep] = useState<'order-type' | 'details' | 'cart'>(
        'order-type',
    );
    const [orderType, setOrderType] = useState<'pickup' | 'delivery'>('pickup');
    const [deliveryArea, setDeliveryArea] = useState('');
    const [customerName, setCustomerName] = useState(user?.name ?? '');
    const [customerContact, setCustomerContact] = useState(user?.phone ?? '');
    const [useRegisteredPhone, setUseRegisteredPhone] = useState(
        user?.phone ? true : false,
    );
    const [customerAddress, setCustomerAddress] = useState('');
    const [paymentMethod, setPaymentMethod] = useState<'duitnow' | 'cash' | ''>(
        '',
    );
    const [pickupTime, setPickupTime] = useState('');
    const [tableNumber, setTableNumber] = useState('');
    const [notes, setNotes] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const openCart = () => {
        if (items.length === 0) {
            return;
        }

        setStep('order-type');
        setIsOpen(true);
    };

    const handleOrderTypeNext = () => {
        setStep('details');
    };

    const handleDetailsNext = () => {
        setStep('cart');
    };

    const resetForm = () => {
        setCustomerName(user?.name ?? '');
        setCustomerContact(user?.phone ?? '');
        setUseRegisteredPhone(user?.phone ? true : false);
        setCustomerAddress('');
        setPickupTime('');
        setTableNumber('');
        setNotes('');
        setOrderType('pickup');
        setDeliveryArea('');
        setPaymentMethod('');
        setStep('order-type');
    };

    const handlePlaceOrder = () => {
        if (items.length === 0) {
            return;
        }

        setSubmitting(true);

        router.post(
            '/orders',
            {
                customer_name: customerName,
                customer_contact: useRegisteredPhone
                    ? (user?.phone ?? customerContact)
                    : customerContact,
                order_type: orderType,
                delivery_area: orderType === 'delivery' ? deliveryArea : null,
                customer_address:
                    orderType === 'delivery' ? customerAddress : null,
                pickup_time: pickupTime || null,
                table_number: tableNumber || null,
                payment_method: paymentMethod,
                notes: notes || null,
                items: items.map((item) => ({
                    product_id: item.product.id,
                    quantity: item.quantity,
                    temperature: item.temperature,
                    sweetness: item.sweetness,
                    extra_milk: item.extraMilk,
                    toppings: item.toppings,
                    remark: item.remark || null,
                    unit_price: item.unitPrice,
                })),
            },
            {
                preserveScroll: true,
                onSuccess: () => {
                    localStorage.setItem('customerPhone', customerContact);
                    clearCart();
                    setIsOpen(false);
                    resetForm();
                },
                onFinish: () => setSubmitting(false),
            },
        );
    };

    const isDetailsValid =
        (user || customerName.trim() !== '') &&
        customerContact.trim() !== '' &&
        paymentMethod !== '' &&
        (orderType === 'pickup' ||
            (deliveryArea !== '' && customerAddress.trim() !== ''));

    return (
        <>
            <button
                onClick={openCart}
                className="fixed right-4 bottom-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-amber-500 text-black shadow-lg shadow-amber-950/40 transition-all hover:scale-110 hover:bg-amber-400 active:scale-95 sm:right-6 sm:bottom-6"
                aria-label="Open cart"
            >
                <ShoppingCart className="h-6 w-6" />
                {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                        {totalItems}
                    </span>
                )}
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex">
                    <div
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={() => setIsOpen(false)}
                    />
                    <div className="relative mt-auto flex h-[92svh] w-full flex-col rounded-t-3xl bg-background shadow-2xl sm:mt-0 sm:ml-auto sm:h-full sm:max-w-md sm:rounded-none">
                        <div className="mx-auto mt-3 h-1.5 w-12 rounded-full bg-muted-foreground sm:hidden" />

                        <div className="flex items-center justify-between border-b border-border px-4 py-3 sm:px-6 sm:py-4">
                            <h2 className="text-lg font-semibold text-foreground">
                                {step === 'order-type' && 'Order Type'}
                                {step === 'details' && 'Your Details'}
                                {step === 'cart' && 'Your Order'}
                            </h2>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto px-4 py-4 sm:px-6">
                            {step === 'order-type' && (
                                <div className="flex min-h-full flex-col justify-center space-y-5 sm:space-y-6">
                                    <div className="text-center">
                                        <p className="text-lg font-medium text-foreground/90">
                                            How would you like to receive your
                                            order?
                                        </p>
                                        <p className="mt-1 text-sm text-muted-foreground">
                                            {orderType === 'delivery'
                                                ? 'Delivery only available for selected areas'
                                                : 'Come pick up your drinks at our shop'}
                                        </p>
                                    </div>

                                    <div className="grid gap-3 sm:gap-4">
                                        <button
                                            onClick={() =>
                                                setOrderType('pickup')
                                            }
                                            className={`rounded-2xl border-2 p-4 text-left transition-all sm:p-6 ${
                                                orderType === 'pickup'
                                                    ? 'border-amber-500 bg-amber-500/10'
                                                    : 'border-border bg-card hover:border-border'
                                            }`}
                                        >
                                            <p className="text-lg font-semibold text-foreground">
                                                Self Pickup
                                            </p>
                                            <p className="mt-1 text-sm text-muted-foreground">
                                                Collect your order at Taman Ana
                                            </p>
                                        </button>

                                        <button
                                            onClick={() =>
                                                setOrderType('delivery')
                                            }
                                            className={`rounded-2xl border-2 p-4 text-left transition-all sm:p-6 ${
                                                orderType === 'delivery'
                                                    ? 'border-amber-500 bg-amber-500/10'
                                                    : 'border-border bg-card hover:border-border'
                                            }`}
                                        >
                                            <p className="text-lg font-semibold text-foreground">
                                                Delivery
                                            </p>
                                            <p className="mt-1 text-sm text-muted-foreground">
                                                Available: Bukit Changgang,
                                                Labohan Dagang, Olak Lempit, RTB
                                            </p>
                                        </button>
                                    </div>

                                    {orderType === 'delivery' && (
                                        <div className="space-y-2">
                                            <Label className="text-sm text-muted-foreground">
                                                Delivery Area
                                            </Label>
                                            <select
                                                value={deliveryArea}
                                                onChange={(e) =>
                                                    setDeliveryArea(
                                                        e.target.value,
                                                    )
                                                }
                                                className="w-full rounded-xl border border-border bg-card px-4 py-3 text-foreground focus:border-amber-500 focus:outline-none"
                                            >
                                                <option
                                                    value=""
                                                    className="bg-card"
                                                >
                                                    Select your area
                                                </option>
                                                {DELIVERY_AREAS.map((area) => (
                                                    <option
                                                        key={area}
                                                        value={area}
                                                        className="bg-card"
                                                    >
                                                        {area}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    )}

                                    <Button
                                        onClick={handleOrderTypeNext}
                                        disabled={
                                            orderType === 'delivery' &&
                                            deliveryArea === ''
                                        }
                                        className="min-h-12 w-full bg-amber-500 text-base font-semibold text-black hover:bg-amber-400 disabled:opacity-50"
                                    >
                                        Continue
                                    </Button>
                                </div>
                            )}

                            {step === 'details' && (
                                <div className="space-y-4">
                                    {!user && (
                                        <div className="space-y-2">
                                            <Label className="text-sm text-muted-foreground">
                                                Your Name{' '}
                                                <span className="text-red-400">
                                                    *
                                                </span>
                                            </Label>
                                            <Input
                                                value={customerName}
                                                onChange={(e) =>
                                                    setCustomerName(
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="Enter your name"
                                                className="border-border bg-card text-foreground placeholder:text-muted-foreground"
                                            />
                                        </div>
                                    )}

                                    <div className="space-y-2">
                                        <Label className="text-sm text-muted-foreground">
                                            Phone Number{' '}
                                            <span className="text-red-400">
                                                *
                                            </span>
                                        </Label>
                                        {user?.phone ? (
                                            <div className="space-y-2">
                                                <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-border bg-card p-3">
                                                    <Checkbox
                                                        checked={
                                                            useRegisteredPhone
                                                        }
                                                        onCheckedChange={(
                                                            checked,
                                                        ) => {
                                                            setUseRegisteredPhone(
                                                                checked ===
                                                                    true,
                                                            );

                                                            if (
                                                                checked === true
                                                            ) {
                                                                setCustomerContact(
                                                                    user?.phone ??
                                                                        '',
                                                                );
                                                            }
                                                        }}
                                                        className="border-border"
                                                    />
                                                    <span className="text-sm text-foreground/90">
                                                        Use my registered number
                                                        ({user.phone})
                                                    </span>
                                                </label>
                                                {!useRegisteredPhone && (
                                                    <Input
                                                        value={customerContact}
                                                        onChange={(e) =>
                                                            setCustomerContact(
                                                                e.target.value,
                                                            )
                                                        }
                                                        placeholder="Enter other phone number"
                                                        className="border-border bg-card text-foreground placeholder:text-muted-foreground"
                                                    />
                                                )}
                                            </div>
                                        ) : (
                                            <Input
                                                value={customerContact}
                                                onChange={(e) =>
                                                    setCustomerContact(
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="e.g. 012-3456789"
                                                className="border-border bg-card text-foreground placeholder:text-muted-foreground"
                                            />
                                        )}
                                    </div>

                                    {orderType === 'delivery' && (
                                        <div className="space-y-2">
                                            <Label className="text-sm text-muted-foreground">
                                                Delivery Address{' '}
                                                <span className="text-red-400">
                                                    *
                                                </span>
                                            </Label>
                                            <textarea
                                                value={customerAddress}
                                                onChange={(e) =>
                                                    setCustomerAddress(
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="Your full delivery address"
                                                className="w-full resize-none rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-amber-500 focus:outline-none"
                                                rows={3}
                                            />
                                        </div>
                                    )}

                                    <div className="space-y-2">
                                        <Label className="text-sm text-muted-foreground">
                                            Payment Method{' '}
                                            <span className="text-red-400">
                                                *
                                            </span>
                                        </Label>
                                        <div className="grid grid-cols-2 gap-3">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setPaymentMethod('duitnow')
                                                }
                                                className={`rounded-xl border-2 px-4 py-3 text-sm font-medium transition-all ${
                                                    paymentMethod === 'duitnow'
                                                        ? 'border-amber-500 bg-amber-500/10 text-amber-400'
                                                        : 'border-border text-muted-foreground hover:border-border'
                                                }`}
                                            >
                                                Online Banking / DuitNow
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setPaymentMethod('cash')
                                                }
                                                className={`rounded-xl border-2 px-4 py-3 text-sm font-medium transition-all ${
                                                    paymentMethod === 'cash'
                                                        ? 'border-amber-500 bg-amber-500/10 text-amber-400'
                                                        : 'border-border text-muted-foreground hover:border-border'
                                                }`}
                                            >
                                                Cash
                                            </button>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="space-y-2">
                                            <Label className="text-sm text-muted-foreground">
                                                Pickup Time
                                            </Label>
                                            <Input
                                                value={pickupTime}
                                                onChange={(e) =>
                                                    setPickupTime(
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="e.g. 3:00 PM"
                                                className="border-border bg-card text-foreground placeholder:text-muted-foreground"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-sm text-muted-foreground">
                                                Table #
                                            </Label>
                                            <Input
                                                value={tableNumber}
                                                onChange={(e) =>
                                                    setTableNumber(
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="Optional"
                                                className="border-border bg-card text-foreground placeholder:text-muted-foreground"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label className="text-sm text-muted-foreground">
                                            Order Notes
                                        </Label>
                                        <Input
                                            value={notes}
                                            onChange={(e) =>
                                                setNotes(e.target.value)
                                            }
                                            placeholder="Any special requests?"
                                            className="border-border bg-card text-foreground placeholder:text-muted-foreground"
                                        />
                                    </div>

                                    <div className="sticky bottom-0 grid grid-cols-[0.8fr_1.2fr] gap-3 bg-background pt-3">
                                        <Button
                                            onClick={() =>
                                                setStep('order-type')
                                            }
                                            variant="outline"
                                            className="flex-1 border-border text-foreground/80 hover:bg-muted hover:text-foreground"
                                        >
                                            Back
                                        </Button>
                                        <Button
                                            onClick={handleDetailsNext}
                                            disabled={!isDetailsValid}
                                            className="min-h-12 bg-amber-500 text-base font-semibold text-black hover:bg-amber-400 disabled:opacity-50"
                                        >
                                            Review Order
                                        </Button>
                                    </div>
                                </div>
                            )}

                            {step === 'cart' && (
                                <div>
                                    {items.length === 0 ? (
                                        <div className="flex h-full flex-col items-center justify-center text-center text-muted-foreground">
                                            <ShoppingCart className="mb-4 h-12 w-12" />
                                            <p className="text-lg font-medium">
                                                Your cart is empty
                                            </p>
                                            <p className="mt-1 text-sm">
                                                Add drinks from the menu below
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="space-y-3">
                                            {items.map((item, index) => (
                                                <div
                                                    key={`${item.product.id}-${index}`}
                                                    className="rounded-lg bg-card p-3"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <span className="text-2xl">
                                                            {item.product.icon}
                                                        </span>
                                                        <div className="min-w-0 flex-1">
                                                            <p className="truncate font-medium text-foreground">
                                                                {
                                                                    item.product
                                                                        .name
                                                                }
                                                            </p>
                                                            <div className="mt-0.5 flex flex-wrap gap-1">
                                                                <span
                                                                    className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs ${
                                                                        item.temperature ===
                                                                        'hot'
                                                                            ? 'bg-orange-500/10 text-orange-400'
                                                                            : 'bg-cyan-500/10 text-cyan-400'
                                                                    }`}
                                                                >
                                                                    {item.temperature ===
                                                                    'hot'
                                                                        ? 'Hot'
                                                                        : 'Cold'}
                                                                </span>
                                                                <span className="inline-flex items-center rounded-full bg-amber-500/10 px-2 py-0.5 text-xs text-amber-400">
                                                                    {
                                                                        sweetnessLabels[
                                                                            item
                                                                                .sweetness
                                                                        ]
                                                                    }
                                                                </span>
                                                                {(() => {
                                                                    const allExtras: string[] =
                                                                        [];

                                                                    if (
                                                                        item.extraMilk
                                                                    ) {
                                                                        allExtras.push(
                                                                            'extra_milk',
                                                                        );
                                                                    }

                                                                    allExtras.push(
                                                                        ...item.toppings,
                                                                    );

                                                                    return allExtras.map(
                                                                        (
                                                                            slug,
                                                                        ) => (
                                                                            <span
                                                                                key={
                                                                                    slug
                                                                                }
                                                                                className="inline-flex items-center rounded-full bg-amber-500/10 px-2 py-0.5 text-xs text-amber-400"
                                                                            >
                                                                                {toppingLabels[
                                                                                    slug
                                                                                ] ??
                                                                                    slug}
                                                                            </span>
                                                                        ),
                                                                    );
                                                                })()}
                                                            </div>
                                                            {item.remark && (
                                                                <p className="mt-1 text-xs text-muted-foreground">
                                                                    &quot;
                                                                    {
                                                                        item.remark
                                                                    }
                                                                    &quot;
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="mt-2 flex items-center justify-between">
                                                        <span className="text-sm text-amber-400">
                                                            RM{' '}
                                                            {(
                                                                item.unitPrice *
                                                                item.quantity
                                                            ).toFixed(2)}
                                                        </span>
                                                        <div className="flex items-center gap-2">
                                                            <button
                                                                onClick={() =>
                                                                    updateQuantity(
                                                                        index,
                                                                        item.quantity -
                                                                            1,
                                                                    )
                                                                }
                                                                className="flex h-7 w-7 items-center justify-center rounded-full bg-muted text-foreground/80 hover:bg-muted/80"
                                                            >
                                                                <Minus className="h-3 w-3" />
                                                            </button>
                                                            <span className="w-6 text-center text-sm font-medium text-foreground">
                                                                {item.quantity}
                                                            </span>
                                                            <button
                                                                onClick={() =>
                                                                    updateQuantity(
                                                                        index,
                                                                        item.quantity +
                                                                            1,
                                                                    )
                                                                }
                                                                className="flex h-7 w-7 items-center justify-center rounded-full bg-muted text-foreground/80 hover:bg-muted/80"
                                                            >
                                                                <Plus className="h-3 w-3" />
                                                            </button>
                                                            <button
                                                                onClick={() =>
                                                                    removeItem(
                                                                        index,
                                                                    )
                                                                }
                                                                className="rounded-lg p-1.5 text-muted-foreground hover:bg-red-500/10 hover:text-red-400"
                                                            >
                                                                <Trash2 className="h-4 w-4" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}

                                            <div className="rounded-lg border border-border bg-card p-3">
                                                <h4 className="mb-2 text-sm font-medium text-muted-foreground">
                                                    Order Summary
                                                </h4>
                                                <div className="space-y-1 text-sm">
                                                    <div className="flex justify-between text-foreground/80">
                                                        <span>Type</span>
                                                        <span className="capitalize">
                                                            {orderType ===
                                                            'delivery'
                                                                ? `Delivery (${deliveryArea})`
                                                                : 'Self Pickup'}
                                                        </span>
                                                    </div>
                                                    <div className="flex justify-between text-foreground/80">
                                                        <span>Payment</span>
                                                        <span>
                                                            {paymentMethod ===
                                                            'duitnow'
                                                                ? 'Online Banking / DuitNow'
                                                                : 'Cash'}
                                                        </span>
                                                    </div>
                                                    <div className="flex justify-between text-foreground/80">
                                                        <span>Name</span>
                                                        <span>
                                                            {customerName}
                                                        </span>
                                                    </div>
                                                    <div className="flex justify-between text-foreground/80">
                                                        <span>Contact</span>
                                                        <span>
                                                            {customerContact}
                                                        </span>
                                                    </div>
                                                    {orderType === 'delivery' &&
                                                        customerAddress && (
                                                            <div className="flex justify-between text-foreground/80">
                                                                <span>
                                                                    Address
                                                                </span>
                                                                <span className="max-w-[180px] truncate text-right">
                                                                    {
                                                                        customerAddress
                                                                    }
                                                                </span>
                                                            </div>
                                                        )}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {step === 'cart' && items.length > 0 && (
                            <div className="border-t border-border px-4 py-4 pb-[calc(1rem+env(safe-area-inset-bottom))] sm:px-6">
                                <div className="flex items-center justify-between">
                                    <span className="text-lg font-semibold text-foreground">
                                        Total
                                    </span>
                                    <span className="text-xl font-bold text-amber-400">
                                        RM {totalPrice.toFixed(2)}
                                    </span>
                                </div>

                                <Button
                                    onClick={handlePlaceOrder}
                                    disabled={submitting}
                                    className="mt-4 min-h-13 w-full bg-amber-500 text-base font-semibold text-black hover:bg-amber-400 disabled:opacity-50"
                                >
                                    {submitting
                                        ? 'Placing Order...'
                                        : 'Place Order'}
                                </Button>

                                <div className="mt-2 flex gap-2">
                                    <button
                                        onClick={() => setStep('details')}
                                        className="flex-1 rounded-lg py-2 text-center text-sm text-muted-foreground hover:text-foreground/80"
                                    >
                                        Edit Details
                                    </button>
                                    <button
                                        onClick={clearCart}
                                        className="flex-1 rounded-lg py-2 text-center text-sm text-muted-foreground hover:text-foreground/80"
                                    >
                                        Clear Cart
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
