import { Head, Link, router } from '@inertiajs/react';
import { ArrowLeft, Pencil, Save, Trash2, X } from 'lucide-react';
import { useState } from 'react';

type ManagedUser = {
    id: number;
    name: string;
    email: string;
    phone: string | null;
    role: 'customer' | 'staff';
    created_at: string;
};

type FormState = {
    name: string;
    email: string;
    phone: string;
    role: 'customer' | 'staff';
};

const roleLabels: Record<ManagedUser['role'], string> = {
    customer: 'Customer',
    staff: 'Staff',
};

export default function AdminUsersIndex({ users }: { users: ManagedUser[] }) {
    const [editingUserId, setEditingUserId] = useState<number | null>(null);
    const [form, setForm] = useState<FormState>({
        name: '',
        email: '',
        phone: '',
        role: 'customer',
    });

    const startEditing = (user: ManagedUser) => {
        setEditingUserId(user.id);
        setForm({
            name: user.name,
            email: user.email,
            phone: user.phone ?? '',
            role: user.role,
        });
    };

    const cancelEditing = () => {
        setEditingUserId(null);
        setForm({
            name: '',
            email: '',
            phone: '',
            role: 'customer',
        });
    };

    const updateUser = (user: ManagedUser) => {
        router.put(
            `/admin/users/${user.id}`,
            {
                ...form,
                phone: form.phone.trim() === '' ? null : form.phone,
            },
            {
                preserveScroll: true,
                onSuccess: cancelEditing,
            },
        );
    };

    const deleteUser = (user: ManagedUser) => {
        if (window.confirm(`Delete "${user.name}"?`)) {
            router.delete(`/admin/users/${user.id}`, {
                preserveScroll: true,
            });
        }
    };

    return (
        <>
            <Head title="Account Management" />

            <div className="px-4 py-5 sm:p-6">
                <Link
                    href="/admin"
                    className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition hover:text-foreground/90"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back
                </Link>

                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-foreground">
                        Accounts
                    </h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Manage customer and staff accounts.
                    </p>
                </div>

                <div className="grid gap-3 lg:hidden">
                    {users.map((user) => {
                        const isEditing = editingUserId === user.id;

                        return (
                            <div
                                key={user.id}
                                className="rounded-xl border border-border bg-card p-4"
                            >
                                {isEditing ? (
                                    <AccountForm
                                        form={form}
                                        setForm={setForm}
                                    />
                                ) : (
                                    <AccountSummary user={user} />
                                )}

                                <div className="mt-4 grid grid-cols-2 gap-2">
                                    {isEditing ? (
                                        <>
                                            <button
                                                type="button"
                                                onClick={() => updateUser(user)}
                                                className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-amber-500 text-sm font-semibold text-black hover:bg-amber-400"
                                            >
                                                <Save className="h-4 w-4" />
                                                Save
                                            </button>
                                            <button
                                                type="button"
                                                onClick={cancelEditing}
                                                className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-border text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
                                            >
                                                <X className="h-4 w-4" />
                                                Cancel
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    startEditing(user)
                                                }
                                                className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-border text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
                                            >
                                                <Pencil className="h-4 w-4" />
                                                Edit
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => deleteUser(user)}
                                                className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-border text-sm text-muted-foreground hover:bg-red-500/10 hover:text-red-400"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                                Delete
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                    {users.length === 0 && (
                        <div className="rounded-xl border border-border bg-card px-4 py-8 text-center text-sm text-muted-foreground">
                            No customer or staff accounts found.
                        </div>
                    )}
                </div>

                <div className="hidden overflow-hidden rounded-xl border border-border bg-card lg:block">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-border text-left text-sm text-muted-foreground">
                                <th className="px-5 py-3 font-medium">
                                    Account
                                </th>
                                <th className="px-5 py-3 font-medium">Phone</th>
                                <th className="px-5 py-3 font-medium">Role</th>
                                <th className="px-5 py-3 text-right font-medium">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {users.map((user) => {
                                const isEditing = editingUserId === user.id;

                                return (
                                    <tr
                                        key={user.id}
                                        className="border-b border-border/50 last:border-b-0"
                                    >
                                        {isEditing ? (
                                            <>
                                                <td
                                                    colSpan={3}
                                                    className="px-5 py-3"
                                                >
                                                    <AccountForm
                                                        form={form}
                                                        setForm={setForm}
                                                        compact
                                                    />
                                                </td>
                                                <td className="px-5 py-3">
                                                    <div className="flex justify-end gap-2">
                                                        <IconButton
                                                            label="Save"
                                                            onClick={() =>
                                                                updateUser(user)
                                                            }
                                                        >
                                                            <Save className="h-4 w-4" />
                                                        </IconButton>
                                                        <IconButton
                                                            label="Cancel"
                                                            onClick={
                                                                cancelEditing
                                                            }
                                                        >
                                                            <X className="h-4 w-4" />
                                                        </IconButton>
                                                    </div>
                                                </td>
                                            </>
                                        ) : (
                                            <>
                                                <td className="px-5 py-3">
                                                    <div className="font-medium text-foreground">
                                                        {user.name}
                                                    </div>
                                                    <div className="text-muted-foreground">
                                                        {user.email}
                                                    </div>
                                                </td>
                                                <td className="px-5 py-3 text-muted-foreground">
                                                    {user.phone ?? '-'}
                                                </td>
                                                <td className="px-5 py-3">
                                                    <RoleBadge
                                                        role={user.role}
                                                    />
                                                </td>
                                                <td className="px-5 py-3">
                                                    <div className="flex justify-end gap-2">
                                                        <IconButton
                                                            label="Edit"
                                                            onClick={() =>
                                                                startEditing(
                                                                    user,
                                                                )
                                                            }
                                                        >
                                                            <Pencil className="h-4 w-4" />
                                                        </IconButton>
                                                        <IconButton
                                                            label="Delete"
                                                            onClick={() =>
                                                                deleteUser(user)
                                                            }
                                                            danger
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </IconButton>
                                                    </div>
                                                </td>
                                            </>
                                        )}
                                    </tr>
                                );
                            })}
                            {users.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={4}
                                        className="px-5 py-12 text-center text-muted-foreground"
                                    >
                                        No customer or staff accounts found.
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

function AccountSummary({ user }: { user: ManagedUser }) {
    return (
        <div className="space-y-3">
            <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                    <h2 className="truncate text-base font-semibold text-foreground">
                        {user.name}
                    </h2>
                    <p className="truncate text-sm text-muted-foreground">
                        {user.email}
                    </p>
                </div>
                <RoleBadge role={user.role} />
            </div>
            <div className="text-sm text-muted-foreground">
                Phone: {user.phone ?? '-'}
            </div>
        </div>
    );
}

function AccountForm({
    form,
    setForm,
    compact = false,
}: {
    form: FormState;
    setForm: React.Dispatch<React.SetStateAction<FormState>>;
    compact?: boolean;
}) {
    return (
        <div className={compact ? 'grid gap-3 xl:grid-cols-4' : 'space-y-3'}>
            <input
                type="text"
                value={form.name}
                onChange={(e) =>
                    setForm((current) => ({
                        ...current,
                        name: e.target.value,
                    }))
                }
                className="w-full rounded-lg border border-border bg-muted px-3 py-2 text-sm text-foreground"
                placeholder="Name"
            />
            <input
                type="email"
                value={form.email}
                onChange={(e) =>
                    setForm((current) => ({
                        ...current,
                        email: e.target.value,
                    }))
                }
                className="w-full rounded-lg border border-border bg-muted px-3 py-2 text-sm text-foreground"
                placeholder="Email"
            />
            <input
                type="text"
                value={form.phone}
                onChange={(e) =>
                    setForm((current) => ({
                        ...current,
                        phone: e.target.value,
                    }))
                }
                className="w-full rounded-lg border border-border bg-muted px-3 py-2 text-sm text-foreground"
                placeholder="Phone"
            />
            <select
                value={form.role}
                onChange={(e) =>
                    setForm((current) => ({
                        ...current,
                        role: e.target.value as FormState['role'],
                    }))
                }
                className="w-full rounded-lg border border-border bg-muted px-3 py-2 text-sm text-foreground"
            >
                <option value="customer">Customer</option>
                <option value="staff">Staff</option>
            </select>
        </div>
    );
}

function RoleBadge({ role }: { role: ManagedUser['role'] }) {
    return (
        <span
            className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                role === 'staff'
                    ? 'bg-blue-500/10 text-blue-400'
                    : 'bg-zinc-500/10 text-zinc-400'
            }`}
        >
            {roleLabels[role]}
        </span>
    );
}

function IconButton({
    label,
    onClick,
    children,
    danger = false,
}: {
    label: string;
    onClick: () => void;
    children: React.ReactNode;
    danger?: boolean;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            aria-label={label}
            title={label}
            className={`rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground ${
                danger ? 'hover:bg-red-500/10 hover:text-red-400' : ''
            }`}
        >
            {children}
        </button>
    );
}

AdminUsersIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/admin' },
        { title: 'Accounts', href: '/admin/users' },
    ],
};
