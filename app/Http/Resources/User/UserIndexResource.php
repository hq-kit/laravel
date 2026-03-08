<?php

namespace App\Http\Resources\User;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin User
 */
class UserIndexResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<User>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'email_verified_at' => $this->email_verified_at,
            'created_at' => $this->created_at->format('d F Y'),
            'avatar' => $this->avatar,
            'roles' => $this->whenLoaded('roles') ? $this->roles()->pluck('name')->toArray() : [],

            'can' => [
                'view' => $request->user()->can('view', $this->resource),
                'update' => $request->user()->can('update', $this->resource),
                'delete' => $request->user()->can('delete', $this->resource) && $this->id !== $request->user()->id,
                'assign-role' => $request->user()->can('assign-role', $this->resource) && $this->id !== $request->user()->id,
                'remove-role' => $request->user()->can('remove-role', $this->resource) && $this->id !== $request->user()->id,
            ],
        ];
    }
}
