import { Head, Link, router } from '@inertiajs/react';
import { ArrowLeft, Pencil, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import type { Product } from '@/types';

interface ExtraData {
    id: number;
    name: string;
    slug: string;
    price: number;
    is_active: boolean;
}

export default function AdminProductsIndex({
    products,
    extras = [],
}: {
    products: Product[];
    extras?: ExtraData[];
}) {
    const handleDeleteProduct = (product: Product) => {
        if (window.confirm(`Delete "${product.name}"?`)) {
            router.delete(`/admin/products/${product.id}`, {
                preserveScroll: true,
            });
        }
    };

    const [editingExtra, setEditingExtra] = useState<ExtraData | null>(null);
    const [showExtraForm, setShowExtraForm] = useState(false);
    const [extraName, setExtraName] = useState('');
    const [extraPrice, setExtraPrice] = useState('');

    const resetExtraForm = () => {
        setEditingExtra(null);
        setShowExtraForm(false);
        setExtraName('');
        setExtraPrice('');
    };

    const handleExtraSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const data = { name: extraName, price: parseFloat(extraPrice) };

        if (editingExtra) {
            router.put(`/admin/extras/${editingExtra.id}`, data, {
                onSuccess: resetExtraForm,
                preserveScroll: true,
            });
        } else {
            router.post('/admin/extras', data, {
                onSuccess: resetExtraForm,
                preserveScroll: true,
            });
        }
    };

    const handleEditExtra = (extra: ExtraData) => {
        setEditingExtra(extra);
        setShowExtraForm(true);
        setExtraName(extra.name);
        setExtraPrice(extra.price.toString());
    };

    const handleToggleExtra = (extra: ExtraData) => {
        router.put(
            `/admin/extras/${extra.id}`,
            {
                name: extra.name,
                price: extra.price,
                is_active: !extra.is_active,
            },
            { preserveScroll: true },
        );
    };

    const handleDeleteExtra = (extra: ExtraData) => {
        if (window.confirm(`Delete "${extra.name}"?`)) {
            router.delete(`/admin/extras/${extra.id}`, {
                preserveScroll: true,
            });
        }
    };

    return (
        <>
            <Head title="Menu Management" />

            <div className="px-4 py-5 sm:p-6">
                <Link
                    href="/admin"
                    className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition hover:text-foreground/90"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back
                </Link>

                <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <h1 className="text-2xl font-bold text-foreground">
                        Menu Items
                    </h1>
                    <Link
                        href="/admin/products/create"
                        className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-black hover:bg-amber-400 sm:w-auto"
                    >
                        <Plus className="h-4 w-4" />
                        Add Item
                    </Link>
                </div>

                <div className="mb-10 grid gap-3 md:hidden">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="rounded-xl border border-border bg-card p-4"
                        >
                            <div className="flex items-start gap-3">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-muted text-2xl">
                                    {product.icon}
                                </div>
                                <div className="min-w-0 flex-1">
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="min-w-0">
                                            <h2 className="truncate text-base font-semibold text-foreground">
                                                {product.name}
                                            </h2>
                                            <p className="mt-0.5 text-sm text-muted-foreground">
                                                {product.category}
                                            </p>
                                        </div>
                                        <span
                                            className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${
                                                product.is_available
                                                    ? 'bg-green-500/10 text-green-400'
                                                    : 'bg-red-500/10 text-red-400'
                                            }`}
                                        >
                                            {product.is_available
                                                ? 'Available'
                                                : 'Hidden'}
                                        </span>
                                    </div>

                                    <div className="mt-3 flex items-center justify-between gap-3">
                                        <span className="text-base font-semibold text-amber-400">
                                            RM {product.price.toFixed(2)}
                                        </span>
                                        <div className="flex items-center gap-2">
                                            <Link
                                                href={`/admin/products/${product.id}/edit`}
                                                aria-label={`Edit ${product.name}`}
                                                className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-muted-foreground hover:bg-muted hover:text-foreground"
                                            >
                                                <Pencil className="h-4 w-4" />
                                            </Link>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleDeleteProduct(product)
                                                }
                                                aria-label={`Delete ${product.name}`}
                                                className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-muted-foreground hover:bg-red-500/10 hover:text-red-400"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    {products.length === 0 && (
                        <div className="rounded-xl border border-border bg-card px-4 py-8 text-center text-sm text-muted-foreground">
                            No menu items yet.
                        </div>
                    )}
                </div>

                <div className="mb-10 hidden overflow-hidden rounded-xl border border-border md:block">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-border bg-card">
                                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                                    Icon
                                </th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                                    Name
                                </th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                                    Category
                                </th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                                    Price
                                </th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                                    Available
                                </th>
                                <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr
                                    key={product.id}
                                    className="border-b border-border last:border-0 hover:bg-muted/50"
                                >
                                    <td className="px-4 py-3 text-2xl">
                                        {product.icon}
                                    </td>
                                    <td className="px-4 py-3 font-medium text-foreground">
                                        {product.name}
                                    </td>
                                    <td className="px-4 py-3 text-sm text-muted-foreground">
                                        {product.category}
                                    </td>
                                    <td className="px-4 py-3 text-amber-400">
                                        RM {product.price.toFixed(2)}
                                    </td>
                                    <td className="px-4 py-3">
                                        <span
                                            className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                                                product.is_available
                                                    ? 'bg-green-500/10 text-green-400'
                                                    : 'bg-red-500/10 text-red-400'
                                            }`}
                                        >
                                            {product.is_available
                                                ? 'Yes'
                                                : 'No'}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link
                                                href={`/admin/products/${product.id}/edit`}
                                                className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
                                            >
                                                <Pencil className="h-4 w-4" />
                                            </Link>
                                            <button
                                                onClick={() =>
                                                    handleDeleteProduct(product)
                                                }
                                                className="rounded-lg p-2 text-muted-foreground hover:bg-red-500/10 hover:text-red-400"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {products.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={6}
                                        className="px-4 py-8 text-center text-sm text-muted-foreground"
                                    >
                                        No menu items yet.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <h2 className="text-xl font-bold text-foreground">
                        Extras
                    </h2>
                    <button
                        onClick={() => {
                            resetExtraForm();
                            setShowExtraForm(!showExtraForm);
                        }}
                        className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-black hover:bg-amber-400 sm:w-auto"
                    >
                        <Plus className="h-4 w-4" />
                        Add Extra
                    </button>
                </div>

                {showExtraForm && (
                    <form
                        onSubmit={handleExtraSubmit}
                        className="mb-6 rounded-xl border border-border bg-card p-5"
                    >
                        <h3 className="mb-4 text-lg font-semibold text-foreground">
                            {editingExtra ? 'Edit Extra' : 'New Extra'}
                        </h3>
                        <div className="grid gap-4 sm:grid-cols-3">
                            <div>
                                <label className="mb-1 block text-sm text-muted-foreground">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    value={extraName}
                                    onChange={(e) =>
                                        setExtraName(e.target.value)
                                    }
                                    className="w-full rounded-lg border border-border bg-muted px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground"
                                    placeholder="e.g. Extra Milk"
                                    required
                                />
                            </div>
                            <div>
                                <label className="mb-1 block text-sm text-muted-foreground">
                                    Price (RM)
                                </label>
                                <input
                                    type="number"
                                    step="0.50"
                                    min="0"
                                    value={extraPrice}
                                    onChange={(e) =>
                                        setExtraPrice(e.target.value)
                                    }
                                    className="w-full rounded-lg border border-border bg-muted px-3 py-2 text-sm text-foreground"
                                    placeholder="0.50"
                                    required
                                />
                            </div>
                            <div className="flex items-end gap-2">
                                <button
                                    type="submit"
                                    className="min-h-10 flex-1 rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-black hover:bg-amber-400 sm:flex-none"
                                >
                                    {editingExtra ? 'Update' : 'Save'}
                                </button>
                                <button
                                    type="button"
                                    onClick={resetExtraForm}
                                    className="min-h-10 flex-1 rounded-lg border border-border px-4 py-2 text-sm text-muted-foreground hover:bg-muted sm:flex-none"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </form>
                )}

                <div className="grid gap-3 md:hidden">
                    {extras.map((extra) => (
                        <div
                            key={extra.id}
                            className="rounded-xl border border-border bg-card p-4"
                        >
                            <div className="flex items-start justify-between gap-3">
                                <div className="min-w-0">
                                    <h3 className="truncate text-base font-semibold text-foreground">
                                        {extra.name}
                                    </h3>
                                    <p className="mt-1 text-sm text-amber-400">
                                        RM {extra.price.toFixed(2)}
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => handleToggleExtra(extra)}
                                    className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium transition ${
                                        extra.is_active
                                            ? 'bg-green-500/10 text-green-400'
                                            : 'bg-muted text-muted-foreground'
                                    }`}
                                >
                                    {extra.is_active ? 'Active' : 'Inactive'}
                                </button>
                            </div>

                            <div className="mt-4 grid grid-cols-2 gap-2">
                                <button
                                    type="button"
                                    onClick={() => handleEditExtra(extra)}
                                    className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-border text-sm text-muted-foreground hover:bg-muted hover:text-foreground/90"
                                >
                                    <Pencil className="h-4 w-4" />
                                    Edit
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleDeleteExtra(extra)}
                                    className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-border text-sm text-muted-foreground hover:bg-red-500/10 hover:text-red-400"
                                >
                                    <Trash2 className="h-4 w-4" />
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                    {extras.length === 0 && (
                        <div className="rounded-xl border border-border bg-card px-4 py-8 text-center text-sm text-muted-foreground">
                            No extras added yet
                        </div>
                    )}
                </div>

                <div className="hidden rounded-xl border border-border bg-card md:block">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-border text-left text-sm text-muted-foreground">
                                <th className="px-5 py-3 font-medium">Name</th>
                                <th className="px-5 py-3 font-medium">Price</th>
                                <th className="px-5 py-3 font-medium">
                                    Active
                                </th>
                                <th className="px-5 py-3 font-medium">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {extras.map((extra) => (
                                <tr
                                    key={extra.id}
                                    className="border-b border-border/50 last:border-b-0"
                                >
                                    <td className="px-5 py-3 text-foreground/90">
                                        {extra.name}
                                    </td>
                                    <td className="px-5 py-3 text-foreground/80">
                                        RM {extra.price.toFixed(2)}
                                    </td>
                                    <td className="px-5 py-3">
                                        <button
                                            onClick={() =>
                                                handleToggleExtra(extra)
                                            }
                                            className={`rounded-full px-3 py-0.5 text-xs font-medium transition ${
                                                extra.is_active
                                                    ? 'bg-green-500/10 text-green-400'
                                                    : 'bg-muted-foreground text-muted-foreground'
                                            }`}
                                        >
                                            {extra.is_active
                                                ? 'Active'
                                                : 'Inactive'}
                                        </button>
                                    </td>
                                    <td className="px-5 py-3">
                                        <div className="flex items-center gap-1">
                                            <button
                                                onClick={() =>
                                                    handleEditExtra(extra)
                                                }
                                                className="rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground/90"
                                            >
                                                <Pencil className="h-4 w-4" />
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleDeleteExtra(extra)
                                                }
                                                className="rounded p-1 text-muted-foreground hover:bg-red-500/10 hover:text-red-400"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {extras.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={4}
                                        className="px-5 py-12 text-center text-muted-foreground"
                                    >
                                        No extras added yet
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

AdminProductsIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/admin' },
        { title: 'Menu', href: '/admin/products' },
    ],
};
