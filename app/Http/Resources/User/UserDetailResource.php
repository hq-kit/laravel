<?php

namespace App\Http\Resources\User;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin User
 */
class UserDetailResource extends JsonResource
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
            'email' => $this->email,
            'email_verified_at' => $this->email_verified_at,
            'avatar' => $this->avatar,
            'roles' => $this->whenLoaded('roles') ? $this->roles()->pluck('name')->toArray() : [],
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,

            'can' => [
                'update' => $request->user()->can('update', $this->resource),
                'delete' => $request->user()->can('delete', $this->resource) && $this->id !== $request->user()->id,
                'assign-role' => $request->user()->can('assign-role', $this->resource) && $this->id !== $request->user()->id,
                'remove-role' => $request->user()->can('remove-role', $this->resource) && $this->id !== $request->user()->id,
            ],
        ];
    }
}
