import { Head, Link, router } from '@inertiajs/react';
import { ArrowLeft, Pencil, Plus, Trash2 } from 'lucide-react';
import type { Product } from '@/types';

export default function AdminProductsIndex({
    products,
}: {
    products: Product[];
}) {
    const handleDelete = (product: Product) => {
        if (window.confirm(`Delete "${product.name}"?`)) {
            router.delete(`/admin/products/${product.id}`, {
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

                <div className="overflow-hidden rounded-xl border border-zinc-800">
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
                                                    handleDelete(product)
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
                                        No menu items yet. Add your first drink!
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
