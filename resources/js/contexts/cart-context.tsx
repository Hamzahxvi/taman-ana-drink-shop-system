import {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useState,
} from 'react';
import type { CartItem, Product } from '@/types';

export type AddItemOptions = {
    temperature: 'hot' | 'cold';
    sweetness: 'regular' | 'less' | 'none';
    extraMilk: boolean;
    toppings: string[];
    remark: string;
};

type CartContextType = {
    items: CartItem[];
    addItem: (product: Product, options: AddItemOptions) => void;
    removeItem: (index: number) => void;
    updateQuantity: (index: number, quantity: number) => void;
    clearCart: () => void;
    totalItems: number;
    totalPrice: number;
};

const CartContext = createContext<CartContextType | null>(null);

function computeUnitPrice(basePrice: number, options: AddItemOptions): number {
    let price = basePrice;

    if (options.extraMilk) {
        price += 0.5;
    }

    if (options.toppings.includes('oreo_crumbles')) {
        price += 0.5;
    }

    if (options.toppings.includes('whipping_cream')) {
        price += 0.5;
    }

    return price;
}

function itemFingerprint(productId: number, options: AddItemOptions): string {
    return `${productId}|${options.temperature}|${options.sweetness}|${options.extraMilk ? '1' : '0'}|${options.toppings.sort().join(',')}|`;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);

    const addItem = useCallback((product: Product, options: AddItemOptions) => {
        setItems((prev) => {
            const fingerprint = itemFingerprint(product.id, options);
            const existing = prev.find(
                (item) =>
                    itemFingerprint(item.product.id, {
                        temperature: item.temperature,
                        sweetness: item.sweetness,
                        extraMilk: item.extraMilk,
                        toppings: item.toppings,
                        remark: '', // remark doesn't affect fingerprint
                    }) === fingerprint,
            );

            if (existing) {
                return prev.map((item) =>
                    item === existing
                        ? { ...item, quantity: item.quantity + 1 }
                        : item,
                );
            }

            const unitPrice = computeUnitPrice(product.price, options);

            return [
                ...prev,
                {
                    product,
                    quantity: 1,
                    temperature: options.temperature,
                    sweetness: options.sweetness,
                    extraMilk: options.extraMilk,
                    toppings: options.toppings,
                    remark: options.remark,
                    unitPrice,
                },
            ];
        });
    }, []);

    const removeItem = useCallback((index: number) => {
        setItems((prev) => prev.filter((_, i) => i !== index));
    }, []);

    const updateQuantity = useCallback((index: number, quantity: number) => {
        setItems((prev) =>
            quantity <= 0
                ? prev.filter((_, i) => i !== index)
                : prev.map((item, i) =>
                      i === index ? { ...item, quantity } : item,
                  ),
        );
    }, []);

    const clearCart = useCallback(() => {
        setItems([]);
    }, []);

    const totalItems = useMemo(
        () => items.reduce((sum, item) => sum + item.quantity, 0),
        [items],
    );

    const totalPrice = useMemo(
        () =>
            items.reduce(
                (sum, item) => sum + item.unitPrice * item.quantity,
                0,
            ),
        [items],
    );

    return (
        <CartContext.Provider
            value={{
                items,
                addItem,
                removeItem,
                updateQuantity,
                clearCart,
                totalItems,
                totalPrice,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);

    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }

    return context;
}
