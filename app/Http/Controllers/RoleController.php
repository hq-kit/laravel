<?php

namespace App\Http\Controllers;

use App\Http\Requests\RoleRequest;
use App\Http\Resources\Role\RoleDetailResource;
use App\Http\Resources\Role\RoleIndexResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        Gate::authorize('view-any', Role::class);

        $roles = Role::query()
            ->with('permissions')
            ->when($request->search, function ($query, $search) {
                $query->where('name', 'like', "%{$search}%")
                    ->orWhere('guard_name', 'like', "%{$search}%");
            })
            ->when($request->sort, function ($query, $sort) use ($request) {
                $query->orderBy($sort, $request->direction ?? 'asc');
            })
            ->paginate($request->integer('per_page', 10))
            ->withQueryString();

        return inertia('roles/index', [
            'roles' => RoleIndexResource::collection($roles),
            'filters' => $request->only('search', 'sort', 'direction', 'role'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        Gate::authorize('create', Role::class);

        return inertia('roles/form', [
            'data' => new Role,
            'permissions' => Permission::query()->pluck('name'),
            'guard_names' => array_keys(config('auth.guards')),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(RoleRequest $request)
    {
        Gate::authorize('create', Role::class);

        $role = Role::create($request->validated());

        if ($request->permissions) {
            $role->givePermissionTo($request->permissions);
        }

        toast('Role created successfully');

        return to_route('roles.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Role $role)
    {
        Gate::authorize('view', $role);

        return inertia('roles/show', [
            'role' => RoleDetailResource::make($role->load('permissions')),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Role $role)
    {
        Gate::authorize('update', $role);

        return inertia('roles/form', [
            'data' => $role->load('permissions'),
            'permissions' => Permission::query()->pluck('name'),
            'guard_names' => array_keys(config('auth.guards')),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(RoleRequest $request, Role $role)
    {
        Gate::authorize('update', $role);

        $role->update($request->validated());

        if ($request->permissions) {
            $role->syncPermissions($request->permissions);
        }

        toast('Role updated successfully');

        return to_route('roles.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Role $role)
    {
        Gate::authorize('delete', $role);

        $role->delete();
        toast('Role deleted successfully');

        return back();
    }
}
