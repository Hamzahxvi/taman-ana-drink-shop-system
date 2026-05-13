import { Flame, Snowflake, Droplets, Cookie, Cake } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import type { AddItemOptions } from '@/contexts/cart-context';
import type { Product } from '@/types';

type Temperature = 'hot' | 'cold';
type Sweetness = 'regular' | 'less' | 'none';

interface DrinkCustomizationDialogProps {
    product: Product;
    open: boolean;
    onClose: () => void;
    onAdd: (options: AddItemOptions) => void;
}

const TEA_SLUGS = ['tea', 'green-tea'];

export function DrinkCustomizationDialog({
    product,
    open,
    onClose,
    onAdd,
}: DrinkCustomizationDialogProps) {
    const [temperature, setTemperature] = useState<Temperature>('hot');
    const [sweetness, setSweetness] = useState<Sweetness>('regular');
    const [extraMilk, setExtraMilk] = useState(false);
    const [toppings, setToppings] = useState<string[]>([]);
    const [remark, setRemark] = useState('');

    const isPlainTea = TEA_SLUGS.includes(product.slug);

    if (!open) {
        return null;
    }

    const toggleTopping = (value: string) => {
        setToppings((prev) =>
            prev.includes(value)
                ? prev.filter((t) => t !== value)
                : [...prev, value],
        );
    };

    let unitPrice = product.price;

    if (extraMilk) {
        unitPrice += 0.5;
    }

    if (toppings.includes('oreo_crumbles')) {
        unitPrice += 0.5;
    }

    if (toppings.includes('whipping_cream')) {
        unitPrice += 0.5;
    }

    const handleAdd = () => {
        onAdd({
            temperature,
            sweetness,
            extraMilk: isPlainTea ? false : extraMilk,
            toppings: isPlainTea ? [] : toppings,
            remark,
        });
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            />
            <div className="relative max-h-[90vh] w-full max-w-md overflow-y-auto rounded-2xl border border-zinc-800 bg-zinc-950 p-6 shadow-2xl">
                <div className="mb-6 flex items-center gap-4">
                    <span className="text-4xl">{product.icon}</span>
                    <div>
                        <h3 className="text-xl font-bold text-zinc-100">
                            {product.name}
                        </h3>
                        <p className="text-sm text-zinc-400">
                            RM {unitPrice.toFixed(2)}
                        </p>
                    </div>
                </div>

                <div className="space-y-6">
                    <div>
                        <Label className="mb-3 block text-sm font-medium text-zinc-300">
                            Temperature
                        </Label>
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                type="button"
                                onClick={() => setTemperature('hot')}
                                className={`flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition-all ${
                                    temperature === 'hot'
                                        ? 'border-orange-500 bg-orange-500/10 text-orange-400'
                                        : 'border-zinc-700 text-zinc-400 hover:border-zinc-600'
                                }`}
                            >
                                <Flame className="h-4 w-4" />
                                Hot
                            </button>
                            <button
                                type="button"
                                onClick={() => setTemperature('cold')}
                                className={`flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition-all ${
                                    temperature === 'cold'
                                        ? 'border-cyan-500 bg-cyan-500/10 text-cyan-400'
                                        : 'border-zinc-700 text-zinc-400 hover:border-zinc-600'
                                }`}
                            >
                                <Snowflake className="h-4 w-4" />
                                Cold
                            </button>
                        </div>
                    </div>

                    <div>
                        <Label className="mb-3 block text-sm font-medium text-zinc-300">
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
                                    className={`rounded-xl border px-3 py-2.5 text-sm font-medium transition-all ${
                                        sweetness === value
                                            ? 'border-amber-500 bg-amber-500/10 text-amber-400'
                                            : 'border-zinc-700 text-zinc-400 hover:border-zinc-600'
                                    }`}
                                >
                                    {label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {!isPlainTea && (
                        <>
                            <div>
                                <Label className="mb-3 block text-sm font-medium text-zinc-300">
                                    Extras
                                </Label>
                                <div className="space-y-3">
                                    <label className="flex cursor-pointer items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900/50 p-3 transition-all hover:border-zinc-700">
                                        <div className="flex items-center gap-3">
                                            <Droplets className="h-5 w-5 text-blue-400" />
                                            <span className="text-sm text-zinc-200">
                                                Extra Milk
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="text-xs text-amber-400">
                                                +RM0.50
                                            </span>
                                            <Checkbox
                                                checked={extraMilk}
                                                onCheckedChange={(checked) =>
                                                    setExtraMilk(
                                                        checked === true,
                                                    )
                                                }
                                                className="border-zinc-600"
                                            />
                                        </div>
                                    </label>
                                </div>
                            </div>

                            <div>
                                <Label className="mb-3 block text-sm font-medium text-zinc-300">
                                    Toppings
                                </Label>
                                <div className="space-y-3">
                                    <label className="flex cursor-pointer items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900/50 p-3 transition-all hover:border-zinc-700">
                                        <div className="flex items-center gap-3">
                                            <Cookie className="h-5 w-5 text-amber-400" />
                                            <span className="text-sm text-zinc-200">
                                                Oreo Crumbles
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="text-xs text-amber-400">
                                                +RM0.50
                                            </span>
                                            <Checkbox
                                                checked={toppings.includes(
                                                    'oreo_crumbles',
                                                )}
                                                onCheckedChange={() =>
                                                    toggleTopping(
                                                        'oreo_crumbles',
                                                    )
                                                }
                                                className="border-zinc-600"
                                            />
                                        </div>
                                    </label>
                                    <label className="flex cursor-pointer items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900/50 p-3 transition-all hover:border-zinc-700">
                                        <div className="flex items-center gap-3">
                                            <Cake className="h-5 w-5 text-purple-400" />
                                            <span className="text-sm text-zinc-200">
                                                Whipping Cream
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="text-xs text-amber-400">
                                                +RM0.50
                                            </span>
                                            <Checkbox
                                                checked={toppings.includes(
                                                    'whipping_cream',
                                                )}
                                                onCheckedChange={() =>
                                                    toggleTopping(
                                                        'whipping_cream',
                                                    )
                                                }
                                                className="border-zinc-600"
                                            />
                                        </div>
                                    </label>
                                </div>
                            </div>
                        </>
                    )}

                    <div>
                        <Label
                            htmlFor="item-remark"
                            className="mb-2 block text-sm font-medium text-zinc-300"
                        >
                            Special Remarks
                        </Label>
                        <textarea
                            id="item-remark"
                            value={remark}
                            onChange={(e) => setRemark(e.target.value)}
                            placeholder="Any special requests for this drink?"
                            className="w-full resize-none rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-amber-500 focus:outline-none"
                            rows={2}
                        />
                    </div>
                </div>

                <div className="mt-6 flex gap-3">
                    <Button
                        onClick={onClose}
                        variant="outline"
                        className="flex-1 border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-zinc-100"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleAdd}
                        className="flex-1 bg-amber-500 font-semibold text-black hover:bg-amber-400"
                    >
                        Add to Cart — RM {unitPrice.toFixed(2)}
                    </Button>
                </div>
            </div>
        </div>
    );
}
