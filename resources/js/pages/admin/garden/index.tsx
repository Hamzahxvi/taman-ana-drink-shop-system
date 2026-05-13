import { Head, router, usePage } from '@inertiajs/react';
import { Trash2, Upload } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { GardenImage } from '@/types';

export default function AdminGardenIndex({
    images,
}: {
    images: GardenImage[];
}) {
    const { errors } = usePage().props;
    const [caption, setCaption] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);

    const handleUpload = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!image) {
            return;
        }

        setUploading(true);
        const data = new FormData();
        data.append('image', image);
        data.append('caption', caption);
        data.append('sort_order', String(images.length + 1));

        router.post('/admin/garden', data, {
            preserveScroll: true,
            onSuccess: () => {
                setCaption('');
                setImage(null);
                setUploading(false);
            },
            onError: () => setUploading(false),
        });
    };

    const handleDelete = (gardenImage: GardenImage) => {
        if (window.confirm('Delete this image?')) {
            router.delete(`/admin/garden/${gardenImage.id}`, {
                preserveScroll: true,
            });
        }
    };

    const handleCaptionUpdate = (
        gardenImage: GardenImage,
        newCaption: string,
    ) => {
        router.post(
            `/admin/garden/${gardenImage.id}`,
            { caption: newCaption },
            { preserveScroll: true },
        );
    };

    const fieldErrors = errors as Record<string, string>;

    return (
        <>
            <Head title="Garden Gallery" />

            <div className="p-6">
                <h1 className="mb-6 text-2xl font-bold text-zinc-100">
                    Garden Gallery
                </h1>

                <form
                    onSubmit={handleUpload}
                    className="mb-8 rounded-xl border border-zinc-800 bg-zinc-900/50 p-5"
                >
                    <h2 className="mb-4 text-lg font-semibold text-zinc-100">
                        Upload New Image
                    </h2>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label className="text-zinc-300">Image</Label>
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={(e) =>
                                    setImage(e.target.files?.[0] ?? null)
                                }
                                className="border-zinc-700 bg-zinc-900 text-zinc-100 file:mr-3 file:rounded file:border-0 file:bg-zinc-800 file:px-3 file:py-1 file:text-sm file:text-zinc-300"
                                required
                            />
                            {fieldErrors.image && (
                                <p className="text-sm text-red-400">
                                    {fieldErrors.image}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label className="text-zinc-300">Caption</Label>
                            <Input
                                value={caption}
                                onChange={(e) => setCaption(e.target.value)}
                                placeholder="A beautiful garden view..."
                                className="border-zinc-700 bg-zinc-900 text-zinc-100 placeholder:text-zinc-500"
                            />
                        </div>

                        <Button
                            type="submit"
                            disabled={!image || uploading}
                            className="bg-amber-500 text-black hover:bg-amber-400 disabled:opacity-50"
                        >
                            <Upload className="mr-2 h-4 w-4" />
                            {uploading ? 'Uploading...' : 'Upload Image'}
                        </Button>
                    </div>
                </form>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {images.map((gardenImage) => (
                        <div
                            key={gardenImage.id}
                            className="group relative overflow-hidden rounded-xl border border-zinc-800"
                        >
                            <div className="aspect-[4/3] bg-zinc-800">
                                <img
                                    src={gardenImage.image_url}
                                    alt={gardenImage.caption ?? 'Garden'}
                                    className="h-full w-full object-cover"
                                    onError={(e) => {
                                        (
                                            e.target as HTMLImageElement
                                        ).style.display = 'none';
                                    }}
                                />
                            </div>

                            <div className="absolute top-2 right-2 opacity-0 transition-opacity group-hover:opacity-100">
                                <button
                                    onClick={() => handleDelete(gardenImage)}
                                    className="rounded-lg bg-red-500/80 p-2 text-white hover:bg-red-500"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </button>
                            </div>

                            <div className="p-3">
                                <input
                                    defaultValue={gardenImage.caption ?? ''}
                                    onBlur={(e) =>
                                        handleCaptionUpdate(
                                            gardenImage,
                                            e.target.value,
                                        )
                                    }
                                    placeholder="Add a caption..."
                                    className="w-full bg-transparent text-sm text-zinc-300 placeholder:text-zinc-600 focus:outline-none"
                                />
                                <p className="mt-1 text-xs text-zinc-600">
                                    Order: {gardenImage.sort_order}
                                </p>
                            </div>
                        </div>
                    ))}

                    {images.length === 0 && (
                        <div className="col-span-full py-12 text-center text-zinc-500">
                            <p className="text-lg">No garden images yet</p>
                            <p className="mt-1 text-sm">
                                Upload photos of your garden
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

AdminGardenIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/admin' },
        { title: 'Garden', href: '' },
    ],
};
