import { Flame, Snowflake } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import type { AddItemOptions } from '@/contexts/cart-context';
import type { Product } from '@/types';

interface ExtraData {
    id: number;
    name: string;
    slug: string;
    price: number;
    is_active: boolean;
}

type Temperature = 'hot' | 'cold';
type Sweetness = 'regular' | 'less' | 'none';

interface DrinkCustomizationDialogProps {
    product: Product;
    extras?: ExtraData[];
    open: boolean;
    onClose: () => void;
    onAdd: (options: AddItemOptions) => void;
}

const TEA_SLUGS = ['tea', 'green-tea'];

const iconMap: Record<string, string> = {
    'extra-milk': '+',
    'oreo-crumbles': '+',
    'whipping-cream': '+',
};

const toppingSlugMap: Record<string, string> = {
    'oreo-crumbles': 'oreo_crumbles',
    'whipping-cream': 'whipping_cream',
};

export function DrinkCustomizationDialog({
    product,
    extras = [],
    open,
    onClose,
    onAdd,
}: DrinkCustomizationDialogProps) {
    const [temperature, setTemperature] = useState<Temperature>('hot');
    const [sweetness, setSweetness] = useState<Sweetness>('regular');
    const [selectedExtras, setSelectedExtras] = useState<Set<string>>(
        new Set(),
    );
    const [remark, setRemark] = useState('');

    const isPlainTea = TEA_SLUGS.includes(product.slug);
    const activeExtras = extras.filter((e) => e.is_active);

    const toggleExtra = (slug: string) => {
        setSelectedExtras((prev) => {
            const next = new Set(prev);

            if (next.has(slug)) {
                next.delete(slug);
            } else {
                next.add(slug);
            }

            return next;
        });
    };

    const unitPrice = useMemo(() => {
        let price = product.price;

        for (const slug of selectedExtras) {
            const extra = activeExtras.find((e) => e.slug === slug);

            if (extra) {
                price += extra.price;
            }
        }

        return price;
    }, [product.price, selectedExtras, activeExtras]);

    if (!open) {
        return null;
    }

    const handleAdd = () => {
        const extraMilk = selectedExtras.has('extra-milk');
        const toppingSlugs = Array.from(selectedExtras)
            .filter((s) => s !== 'extra-milk')
            .map((s) => toppingSlugMap[s] ?? s);

        onAdd({
            temperature,
            sweetness,
            extraMilk: isPlainTea ? false : extraMilk,
            toppings: isPlainTea ? [] : toppingSlugs,
            remark,
        });
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-4">
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            />
            <div className="relative max-h-[88svh] w-full max-w-md overflow-y-auto rounded-t-3xl border border-border bg-background p-4 pb-[calc(1rem+env(safe-area-inset-bottom))] shadow-2xl sm:max-h-[90vh] sm:rounded-2xl sm:p-6">
                <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-muted sm:hidden" />

                <div className="mb-5 flex items-center gap-4 sm:mb-6">
                    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-card text-3xl sm:text-4xl">
                        {product.icon}
                    </span>
                    <div>
                        <h3 className="text-lg leading-tight font-bold text-foreground sm:text-xl">
                            {product.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            RM {unitPrice.toFixed(2)}
                        </p>
                    </div>
                </div>

                <div className="space-y-5 sm:space-y-6">
                    <div>
                        <Label className="mb-3 block text-sm font-medium text-foreground/80">
                            Temperature
                        </Label>
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                type="button"
                                onClick={() => setTemperature('hot')}
                                className={`flex min-h-12 items-center justify-center gap-2 rounded-xl border px-4 text-sm font-medium transition-all ${
                                    temperature === 'hot'
                                        ? 'border-orange-500 bg-orange-500/10 text-orange-400'
                                        : 'border-border text-muted-foreground hover:border-border'
                                }`}
                            >
                                <Flame className="h-4 w-4" />
                                Hot
                            </button>
                            <button
                                type="button"
                                onClick={() => setTemperature('cold')}
                                className={`flex min-h-12 items-center justify-center gap-2 rounded-xl border px-4 text-sm font-medium transition-all ${
                                    temperature === 'cold'
                                        ? 'border-cyan-500 bg-cyan-500/10 text-cyan-400'
                                        : 'border-border text-muted-foreground hover:border-border'
                                }`}
                            >
                                <Snowflake className="h-4 w-4" />
                                Cold
                            </button>
                        </div>
                    </div>

                    <div>
                        <Label className="mb-3 block text-sm font-medium text-foreground/80">
                            Sweetness
                        </Label>
                        <div className="grid grid-cols-3 gap-2">
                            {(
                                [
                                    ['regular', 'Regular'],
                                    ['less', 'Less Sweet'],
                                    ['none', 'No Sugar'],
                                ] as const
                            ).map(([value, label]) => (
                                <button
                                    key={value}
                                    type="button"
                                    onClick={() => setSweetness(value)}
                                    className={`min-h-11 rounded-xl border px-3 text-sm font-medium transition-all ${
                                        sweetness === value
                                            ? 'border-amber-500 bg-amber-500/10 text-amber-400'
                                            : 'border-border text-muted-foreground hover:border-border'
                                    }`}
                                >
                                    {label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {!isPlainTea && activeExtras.length > 0 && (
                        <div>
                            <Label className="mb-3 block text-sm font-medium text-foreground/80">
                                Extras
                            </Label>
                            <div className="space-y-3">
                                {activeExtras.map((extra) => (
                                    <label
                                        key={extra.slug}
                                        className="flex cursor-pointer items-center justify-between rounded-xl border border-border bg-card p-3 transition-all hover:border-border"
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className="text-xl">
                                                {iconMap[extra.slug] || '+'}
                                            </span>
                                            <span className="text-sm text-foreground/90">
                                                {extra.name}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="text-xs text-amber-400">
                                                +RM{extra.price.toFixed(2)}
                                            </span>
                                            <Checkbox
                                                checked={selectedExtras.has(
                                                    extra.slug,
                                                )}
                                                onCheckedChange={() =>
                                                    toggleExtra(extra.slug)
                                                }
                                                className="border-border"
                                            />
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>
                    )}

                    <div>
                        <Label
                            htmlFor="item-remark"
                            className="mb-2 block text-sm font-medium text-foreground/80"
                        >
                            Special Remarks
                        </Label>
                        <textarea
                            id="item-remark"
                            value={remark}
                            onChange={(e) => setRemark(e.target.value)}
                            placeholder="Any special requests for this drink?"
                            className="w-full resize-none rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-amber-500 focus:outline-none"
                            rows={2}
                        />
                    </div>
                </div>

                <div className="sticky bottom-0 mt-6 grid grid-cols-[0.8fr_1.2fr] gap-3 bg-background pt-3">
                    <Button
                        onClick={onClose}
                        variant="outline"
                        className="flex-1 border-border text-foreground/80 hover:bg-muted hover:text-foreground"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleAdd}
                        className="min-h-12 bg-amber-500 font-semibold text-black hover:bg-amber-400"
                    >
                        Add - RM {unitPrice.toFixed(2)}
                    </Button>
                </div>
            </div>
        </div>
    );
}
