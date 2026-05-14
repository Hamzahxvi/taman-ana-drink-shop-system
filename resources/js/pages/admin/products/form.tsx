import { Head, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import type { Product } from '@/types';

interface ExtraData {
    id: number;
    name: string;
    slug: string;
    price: number;
    is_active: boolean;
}

export default function AdminProductForm({
    product,
    extras = [],
}: {
    product?: Product | null;
    extras?: ExtraData[];
}) {
    const { errors } = usePage().props;
    const isEditing = !!product;

    const [form, setForm] = useState({
        name: product?.name ?? '',
        description: product?.description ?? '',
        price: product?.price.toString() ?? '',
        icon: product?.icon ?? '',
        category: product?.category ?? '',
        is_available: product?.is_available ?? true,
        extra_ids: product?.extra_ids ?? ([] as number[]),
    });

    const [image, setImage] = useState<File | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const data = new FormData();
        data.append('name', form.name);
        data.append('description', form.description);
        data.append('price', form.price);
        data.append('icon', form.icon);
        data.append('category', form.category);
        data.append('is_available', form.is_available ? '1' : '0');

        for (const id of form.extra_ids) {
            data.append('extra_ids[]', String(id));
        }

        if (image) {
            data.append('image', image);
        }

        if (isEditing) {
            data.append('_method', 'PUT');
            router.post(`/admin/products/${product!.id}`, data, {
                preserveScroll: true,
            });
        } else {
            router.post('/admin/products', data, {
                preserveScroll: true,
            });
        }
    };

    const fieldErrors = errors as Record<string, string>;

    return (
        <>
            <Head title={isEditing ? 'Edit Product' : 'Add Product'} />

            <div className="p-6">
                <h1 className="mb-6 text-2xl font-bold text-foreground">
                    {isEditing ? 'Edit Product' : 'Add Product'}
                </h1>

                <form onSubmit={handleSubmit} className="max-w-lg space-y-5">
                    <div className="space-y-2">
                        <Label htmlFor="name" className="text-foreground/80">
                            Name
                        </Label>
                        <Input
                            id="name"
                            value={form.name}
                            onChange={(e) =>
                                setForm({ ...form, name: e.target.value })
                            }
                            className="border-border bg-card text-foreground"
                            required
                        />
                        {fieldErrors.name && (
                            <p className="text-sm text-red-400">
                                {fieldErrors.name}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label
                            htmlFor="description"
                            className="text-foreground/80"
                        >
                            Description
                        </Label>
                        <textarea
                            id="description"
                            value={form.description}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    description: e.target.value,
                                })
                            }
                            rows={3}
                            className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-amber-500/50 focus:outline-none"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label
                                htmlFor="price"
                                className="text-foreground/80"
                            >
                                Price (RM)
                            </Label>
                            <Input
                                id="price"
                                type="number"
                                step="0.01"
                                min="0"
                                value={form.price}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        price: e.target.value,
                                    })
                                }
                                className="border-border bg-card text-foreground"
                                required
                            />
                            {fieldErrors.price && (
                                <p className="text-sm text-red-400">
                                    {fieldErrors.price}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label
                                htmlFor="icon"
                                className="text-foreground/80"
                            >
                                Icon (emoji)
                            </Label>
                            <Input
                                id="icon"
                                value={form.icon}
                                onChange={(e) =>
                                    setForm({ ...form, icon: e.target.value })
                                }
                                placeholder="☕"
                                className="border-border bg-card text-foreground"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label
                                htmlFor="category"
                                className="text-foreground/80"
                            >
                                Category
                            </Label>
                            <Select
                                value={form.category}
                                onValueChange={(v) =>
                                    setForm({ ...form, category: v })
                                }
                            >
                                <SelectTrigger className="border-border bg-card text-foreground">
                                    <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent className="border-border bg-card">
                                    <SelectItem value="Coffee">
                                        Coffee
                                    </SelectItem>
                                    <SelectItem value="Tea">Tea</SelectItem>
                                    <SelectItem value="Special">
                                        Special
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-foreground/80">
                                Available
                            </Label>
                            <div className="flex items-center gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() =>
                                        setForm({
                                            ...form,
                                            is_available: !form.is_available,
                                        })
                                    }
                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                        form.is_available
                                            ? 'bg-green-500'
                                            : 'bg-muted-foreground'
                                    }`}
                                >
                                    <span
                                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                            form.is_available
                                                ? 'translate-x-6'
                                                : 'translate-x-1'
                                        }`}
                                    />
                                </button>
                                <span className="text-sm text-muted-foreground">
                                    {form.is_available ? 'Yes' : 'No'}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label className="text-foreground/80">Extras</Label>
                        <div className="rounded-xl border border-border bg-card p-4">
                            <div className="grid gap-2 sm:grid-cols-2">
                                {extras.map((extra) => (
                                    <label
                                        key={extra.id}
                                        className="flex cursor-pointer items-center gap-3 rounded-lg p-2 text-sm transition hover:bg-muted"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={form.extra_ids.includes(
                                                extra.id,
                                            )}
                                            onChange={(e) => {
                                                setForm({
                                                    ...form,
                                                    extra_ids: e.target.checked
                                                        ? [
                                                              ...form.extra_ids,
                                                              extra.id,
                                                          ]
                                                        : form.extra_ids.filter(
                                                              (id) =>
                                                                  id !==
                                                                  extra.id,
                                                          ),
                                                });
                                            }}
                                            className="h-4 w-4 rounded border-border bg-muted text-amber-500 focus:ring-amber-500"
                                        />
                                        <span className="text-foreground/90">
                                            {extra.name}
                                        </span>
                                        <span className="ml-auto text-xs text-muted-foreground">
                                            +RM {extra.price.toFixed(2)}
                                        </span>
                                    </label>
                                ))}
                            </div>
                            {extras.length === 0 && (
                                <p className="py-2 text-center text-sm text-muted-foreground">
                                    No extras available.
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="image" className="text-foreground/80">
                            Image (optional)
                        </Label>
                        <Input
                            id="image"
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                                setImage(e.target.files?.[0] ?? null)
                            }
                            className="border-border bg-card text-foreground file:mr-3 file:rounded file:border-0 file:bg-muted file:px-3 file:py-1 file:text-sm file:text-foreground/80"
                        />
                        {fieldErrors.image && (
                            <p className="text-sm text-red-400">
                                {fieldErrors.image}
                            </p>
                        )}
                    </div>

                    <div className="flex items-center gap-3 pt-2">
                        <Button
                            type="submit"
                            className="bg-amber-500 text-black hover:bg-amber-400"
                        >
                            {isEditing ? 'Update Product' : 'Create Product'}
                        </Button>
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={() => router.visit('/admin/products')}
                            className="text-muted-foreground hover:text-foreground"
                        >
                            Cancel
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}

AdminProductForm.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/admin' },
        { title: 'Menu', href: '/admin/products' },
        { title: 'Form', href: '' },
    ],
};
