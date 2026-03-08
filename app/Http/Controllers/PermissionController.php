<?php

namespace App\Http\Controllers;

use App\Http\Requests\PermissionRequest;
use App\Http\Resources\Permission\PermissionDetailResource;
use App\Http\Resources\Permission\PermissionIndexResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Spatie\Permission\Models\Permission;

class PermissionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        Gate::authorize('view-any', Permission::class);

        $permissions = Permission::query()
            ->with('roles')
            ->when($request->search, function ($query, $search) {
                $query->where('name', 'like', "%{$search}%")
                    ->orWhere('guard_name', 'like', "%{$search}%");
            })
            ->when($request->sort, function ($query, $sort) use ($request) {
                $query->orderBy($sort, $request->direction ?? 'asc');
            })
            ->paginate($request->integer('per_page', 10))
            ->withQueryString();

        return inertia('permissions/index', [
            'permissions' => PermissionIndexResource::collection($permissions),
            'filters' => $request->only('search', 'sort', 'direction', 'role'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        Gate::authorize('create', Permission::class);

        return inertia('permissions/form',
            [
                'data' => new Permission,
                'guard_names' => array_keys(config('auth.guards')),
            ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(PermissionRequest $request)
    {
        Gate::authorize('create', Permission::class);

        Permission::create($request->validated());
        toast('Permission created successfully');

        return to_route('permissions.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Permission $permission)
    {
        Gate::authorize('view', $permission);

        return inertia('permissions/show', [
            'permission' => PermissionDetailResource::make($permission->load('roles')),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Permission $permission)
    {
        Gate::authorize('update', $permission);

        return inertia('permissions/form', [
            'data' => $permission,
            'guard_names' => array_keys(config('auth.guards')),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(PermissionRequest $request, Permission $permission)
    {
        Gate::authorize('update', $permission);

        $permission->update($request->validated());
        toast('Permission updated successfully');

        return to_route('permissions.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Permission $permission)
    {
        Gate::authorize('delete', $permission);

        $permission->delete();
        toast('Permission deleted successfully');

        return to_route('permissions.index');
    }
}
