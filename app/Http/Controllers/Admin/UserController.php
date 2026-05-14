<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {
        $users = User::query()
            ->whereIn('role', ['customer', 'staff'])
            ->orderByRaw("case when role = 'staff' then 0 else 1 end")
            ->orderBy('name')
            ->get(['id', 'name', 'email', 'phone', 'role', 'created_at']);

        return Inertia::render('admin/users/index', [
            'users' => $users,
        ]);
    }

    public function update(Request $request, User $user): RedirectResponse
    {
        $this->ensureManageable($user);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => [
                'required',
                'string',
                'lowercase',
                'email',
                'max:255',
                Rule::unique(User::class)->ignore($user->id),
            ],
            'phone' => 'nullable|string|max:255',
            'role' => 'required|string|in:customer,staff',
        ]);

        $user->update($validated);

        return redirect()->route('admin.users.index')
            ->with('flash', ['success' => 'Account updated successfully.']);
    }

    public function destroy(User $user): RedirectResponse
    {
        $this->ensureManageable($user);

        $user->delete();

        return redirect()->route('admin.users.index')
            ->with('flash', ['success' => 'Account deleted successfully.']);
    }

    private function ensureManageable(User $user): void
    {
        abort_unless(in_array($user->role, ['customer', 'staff'], true), 404);
    }
}
