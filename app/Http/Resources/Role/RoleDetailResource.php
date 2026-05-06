<?php

namespace App\Http\Resources\Role;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Spatie\Permission\Models\Role;

/**
 * @mixin Role
 */
class RoleDetailResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'guard_name' => $this->guard_name,
            'permissions' => $this->whenLoaded('permissions') ? $this->permissions()->pluck('name')->toArray() : [],
            'team_id' => $this->team_id,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'permissions_count' => $this->permissions_count,

            'can' => [
                'view' => $request->user()->can('role.view'),
                'update' => $request->user()->can('role.update') && ($this->name !== 'super admin' && ! $request->user()->hasRole('admin')),
                'delete' => $request->user()->can('role.delete') && ($this->name !== 'super admin' && ! $request->user()->hasRole('admin')),
            ],
        ];
    }
}
