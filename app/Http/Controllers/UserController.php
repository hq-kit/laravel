<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserRequest;
use App\Http\Resources\User\UserDetailResource;
use App\Http\Resources\User\UserIndexResource;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Inertia\Response;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        Gate::authorize('view-any', User::class);

        $users = User::query()
            ->with('roles')
            ->when($request->role, fn ($q, $s) => $q
                ->role(explode(',', $request->role))
            )
            ->when($request->search, fn ($q, $s) => $q
                ->where(fn ($q) => $q->where('name', 'like', "%$s%")
                    ->orWhere('email', 'like', "%$s%")
                )
            )
            ->when($request->sort, fn ($q, $col) => $q->orderBy($col, $request->direction === 'desc' ? 'desc' : 'asc'),
                fn ($q) => $q->latest()
            )
            ->paginate($request->integer('per_page', 10))
            ->withQueryString();

        $roles = Role::query()->pluck('name');

        return inertia('users/index', [
            'users' => fn () => UserIndexResource::collection($users),
            'filters' => $request->only('search', 'sort', 'direction', 'role'),
            'roles' => $roles,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        Gate::authorize('create', User::class);

        return inertia('users/form', [
            'data' => new User,
            'method' => 'post',
            'roles' => Role::query()->pluck('name'),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(UserRequest $request): RedirectResponse
    {
        Gate::authorize('create', User::class);

        $user = User::create([
            'email' => $request->email,
            'name' => $request->name,
            'password' => bcrypt($request->password ?? 'password'),
        ]);

        if ($request->roles) {
            $user->assignRole($request->roles);
        }

        toast('User created successfully');

        return to_route('users.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user): Response
    {
        Gate::authorize('view', $user);

        return inertia('users/show', [
            'data' => UserDetailResource::make($user),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user): Response
    {
        Gate::authorize('update', $user);

        return inertia('users/form', [
            'data' => $user->load('roles'),
            'method' => 'put',
            'roles' => Role::query()->pluck('name'),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UserRequest $request, User $user): RedirectResponse
    {
        Gate::authorize('update', $user);

        $user->update($request->validated());

        if ($request->roles) {
            $user->syncRoles($request->roles);
        }

        toast('User updated successfully');

        return to_route('users.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user): RedirectResponse
    {
        Gate::authorize('delete', $user);

        $user->delete();
        toast('User deleted successfully');

        return back();
    }

    public function bulk(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'action' => ['required', 'in:delete,assignRole,removeRole'],
            'ids' => ['required', 'array'],
            'ids.*' => ['integer', 'exists:users,id'],
        ]);

        $ids = collect($validated['ids'])
            ->filter(fn ($id) => $id !== auth()->id());

        if ($ids->isEmpty()) {
            toast('No users to process.');

            return back();
        }

        try {
            DB::transaction(function () use ($validated, $ids) {
                match ($validated['action']) {
                    'delete' => $this->bulkDelete($ids),
                };
            });
        } catch (\Throwable $e) {
            toast('Something went wrong', ['error' => $e->getMessage()]);

            return back();
        }

        return back();
    }

    private function bulkDelete(Collection $ids): void
    {
        Gate::authorize('delete', User::class);
        User::whereIn('id', $ids)->delete();
        toast('Users deleted successfully.');
    }

    public function role(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'role' => ['required', 'exists:roles,name'],
            'id' => ['required', 'exists:users,id'],
        ]);

        $user = User::query()->where('id', $validated['id'])->first();
        if ($user->hasRole($validated['role'])) {
            Gate::authorize('remove-role', User::class);
            $user->removeRole($validated['role']);
        } else {
            Gate::authorize('assign-role', User::class);
            $user->assignRole($validated['role']);
        }

        toast('User updated successfully');

        return back();
    }
}
