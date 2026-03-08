<?php

namespace App\Http\Resources\Permission;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Spatie\Permission\Models\Permission;

/**
 * @mixin Permission
 */
class PermissionIndexResource extends JsonResource
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
            'roles' => $this->whenLoaded('roles') ? $this->roles()->pluck('name') : [],

            'can' => [
                'view' => $request->user()->can('permission.view'),
                'update' => $request->user()->can('permission.update') && ($this->hasRole('super admin') && ! $request->user()->hasRole('admin')),
                'delete' => $request->user()->can('permission.delete') && ($this->hasRole('super admin') && ! $request->user()->hasRole('admin')),
            ],
        ];
    }
}
