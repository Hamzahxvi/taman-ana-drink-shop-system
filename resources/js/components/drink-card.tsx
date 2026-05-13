import { ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import { DrinkCustomizationDialog } from '@/components/drink-customization-dialog';
import { useCart } from '@/contexts/cart-context';
import type { Product } from '@/types';

export function DrinkCard({ product }: { product: Product }) {
    const { addItem } = useCart();
    const [dialogOpen, setDialogOpen] = useState(false);

    return (
        <>
            <div className="group relative overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/50 p-5 transition-all hover:border-amber-500/50 hover:shadow-lg hover:shadow-amber-500/5">
                <div className="mb-4 flex items-center justify-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-zinc-800/50 text-4xl transition-transform group-hover:scale-110">
                        {product.icon}
                    </div>
                </div>

                <h3 className="text-center text-lg font-semibold text-zinc-100">
                    {product.name}
                </h3>

                {product.description && (
                    <p className="mt-2 text-center text-sm leading-relaxed text-zinc-400">
                        {product.description}
                    </p>
                )}

                <div className="mt-4 flex items-center justify-between">
                    <span className="text-xl font-bold text-amber-400">
                        RM {product.price.toFixed(2)}
                    </span>

                    <button
                        onClick={() => setDialogOpen(true)}
                        className="flex items-center gap-2 rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-black transition-all hover:bg-amber-400 hover:shadow-lg hover:shadow-amber-500/25 active:scale-95"
                    >
                        <ShoppingCart className="h-4 w-4" />
                        Customize
                    </button>
                </div>
            </div>

            <DrinkCustomizationDialog
                product={product}
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
                onAdd={(options) => addItem(product, options)}
            />
        </>
    );
}
