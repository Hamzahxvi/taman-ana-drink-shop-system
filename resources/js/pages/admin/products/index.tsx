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
            { name: extra.name, price: extra.price, is_active: !extra.is_active },
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

            <div className="p-6">
                <Link
                    href="/admin"
                    className="mb-4 inline-flex items-center gap-1.5 text-sm text-zinc-400 transition hover:text-zinc-200"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back
                </Link>

                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-zinc-100">
                        Menu Items
                    </h1>
                    <Link
                        href="/admin/products/create"
                        className="inline-flex items-center gap-2 rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-black hover:bg-amber-400"
                    >
                        <Plus className="h-4 w-4" />
                        Add Item
                    </Link>
                </div>

                <div className="mb-10 overflow-hidden rounded-xl border border-zinc-800">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-zinc-800 bg-zinc-900/50">
                                <th className="px-4 py-3 text-left text-sm font-medium text-zinc-400">
                                    Icon
                                </th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-zinc-400">
                                    Name
                                </th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-zinc-400">
                                    Category
                                </th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-zinc-400">
                                    Price
                                </th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-zinc-400">
                                    Available
                                </th>
                                <th className="px-4 py-3 text-right text-sm font-medium text-zinc-400">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr
                                    key={product.id}
                                    className="border-b border-zinc-800 last:border-0 hover:bg-zinc-900/30"
                                >
                                    <td className="px-4 py-3 text-2xl">
                                        {product.icon}
                                    </td>
                                    <td className="px-4 py-3 font-medium text-zinc-100">
                                        {product.name}
                                    </td>
                                    <td className="px-4 py-3 text-sm text-zinc-400">
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
                                                className="rounded-lg p-2 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100"
                                            >
                                                <Pencil className="h-4 w-4" />
                                            </Link>
                                            <button
                                                onClick={() =>
                                                    handleDeleteProduct(product)
                                                }
                                                className="rounded-lg p-2 text-zinc-400 hover:bg-red-500/10 hover:text-red-400"
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
                                        className="px-4 py-8 text-center text-sm text-zinc-500"
                                    >
                                        No menu items yet.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-zinc-100">
                        Extras
                    </h2>
                    <button
                        onClick={() => {
                            resetExtraForm();
                            setShowExtraForm(!showExtraForm);
                        }}
                        className="inline-flex items-center gap-2 rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-black hover:bg-amber-400"
                    >
                        <Plus className="h-4 w-4" />
                        Add Extra
                    </button>
                </div>

                {showExtraForm && (
                    <form
                        onSubmit={handleExtraSubmit}
                        className="mb-6 rounded-xl border border-zinc-800 bg-zinc-900/50 p-5"
                    >
                        <h3 className="mb-4 text-lg font-semibold text-zinc-100">
                            {editingExtra ? 'Edit Extra' : 'New Extra'}
                        </h3>
                        <div className="grid gap-4 sm:grid-cols-3">
                            <div>
                                <label className="mb-1 block text-sm text-zinc-400">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    value={extraName}
                                    onChange={(e) => setExtraName(e.target.value)}
                                    className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-500"
                                    placeholder="e.g. Extra Milk"
                                    required
                                />
                            </div>
                            <div>
                                <label className="mb-1 block text-sm text-zinc-400">
                                    Price (RM)
                                </label>
                                <input
                                    type="number"
                                    step="0.50"
                                    min="0"
                                    value={extraPrice}
                                    onChange={(e) => setExtraPrice(e.target.value)}
                                    className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-zinc-100"
                                    placeholder="0.50"
                                    required
                                />
                            </div>
                            <div className="flex items-end gap-2">
                                <button
                                    type="submit"
                                    className="rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-black hover:bg-amber-400"
                                >
                                    {editingExtra ? 'Update' : 'Save'}
                                </button>
                                <button
                                    type="button"
                                    onClick={resetExtraForm}
                                    className="rounded-lg border border-zinc-700 px-4 py-2 text-sm text-zinc-400 hover:bg-zinc-800"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </form>
                )}

                <div className="rounded-xl border border-zinc-800 bg-zinc-900/50">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-zinc-800 text-left text-sm text-zinc-400">
                                <th className="px-5 py-3 font-medium">Name</th>
                                <th className="px-5 py-3 font-medium">Price</th>
                                <th className="px-5 py-3 font-medium">Active</th>
                                <th className="px-5 py-3 font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {extras.map((extra) => (
                                <tr
                                    key={extra.id}
                                    className="border-b border-zinc-800/50 last:border-b-0"
                                >
                                    <td className="px-5 py-3 text-zinc-200">
                                        {extra.name}
                                    </td>
                                    <td className="px-5 py-3 text-zinc-300">
                                        RM {extra.price.toFixed(2)}
                                    </td>
                                    <td className="px-5 py-3">
                                        <button
                                            onClick={() => handleToggleExtra(extra)}
                                            className={`rounded-full px-3 py-0.5 text-xs font-medium transition ${
                                                extra.is_active
                                                    ? 'bg-green-500/10 text-green-400'
                                                    : 'bg-zinc-700 text-zinc-500'
                                            }`}
                                        >
                                            {extra.is_active ? 'Active' : 'Inactive'}
                                        </button>
                                    </td>
                                    <td className="px-5 py-3">
                                        <div className="flex items-center gap-1">
                                            <button
                                                onClick={() => handleEditExtra(extra)}
                                                className="rounded p-1 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
                                            >
                                                <Pencil className="h-4 w-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteExtra(extra)}
                                                className="rounded p-1 text-zinc-400 hover:bg-red-500/10 hover:text-red-400"
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
                                        className="px-5 py-12 text-center text-zinc-500"
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
