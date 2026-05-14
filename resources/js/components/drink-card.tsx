import { ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import { DrinkCustomizationDialog } from '@/components/drink-customization-dialog';
import { useCart } from '@/contexts/cart-context';
import type { Product } from '@/types';

interface ExtraData {
    id: number;
    name: string;
    slug: string;
    price: number;
    is_active: boolean;
}

export function DrinkCard({
    product,
    extras = [],
}: {
    product: Product;
    extras?: ExtraData[];
}) {
    const { addItem } = useCart();
    const [dialogOpen, setDialogOpen] = useState(false);

    const productExtras = extras.filter(
        (e) => product.extra_ids?.includes(e.id) ?? true,
    );

    return (
        <>
            <div className="group relative overflow-hidden rounded-2xl border border-border bg-card p-4 transition-all hover:border-amber-500/50 hover:shadow-lg hover:shadow-amber-500/5 sm:p-5">
                <div className="flex items-start gap-4 sm:block">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-muted text-3xl transition-transform group-hover:scale-110 sm:mx-auto sm:mb-4 sm:h-20 sm:w-20 sm:rounded-full sm:text-4xl">
                        {product.icon}
                    </div>

                    <div className="min-w-0 flex-1 sm:text-center">
                        <h3 className="text-lg leading-tight font-semibold text-foreground">
                            {product.name}
                        </h3>

                        {product.description && (
                            <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-muted-foreground sm:mt-2 sm:line-clamp-none">
                                {product.description}
                            </p>
                        )}
                    </div>
                </div>

                <div className="mt-4 flex items-center justify-between gap-3">
                    <span className="text-xl font-bold text-amber-400">
                        RM {product.price.toFixed(2)}
                    </span>

                    <button
                        onClick={() => setDialogOpen(true)}
                        className="flex min-h-11 items-center gap-2 rounded-xl bg-amber-500 px-4 text-sm font-semibold text-black transition-all hover:bg-amber-400 hover:shadow-lg hover:shadow-amber-500/25 active:scale-95"
                    >
                        <ShoppingCart className="h-4 w-4" />
                        Add
                    </button>
                </div>
            </div>

            <DrinkCustomizationDialog
                product={product}
                extras={productExtras}
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
                onAdd={(options) => addItem(product, options)}
            />
        </>
    );
}
