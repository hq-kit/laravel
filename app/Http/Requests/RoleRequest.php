<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class RoleRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->route('role')?->id ? auth()->user()->hasPermissionTo('role.update') : auth()->user()->hasPermissionTo('role.create');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $roleId = $this->route('role')?->id;

        return [
            'name' => [
                'required',
                'string',
                'max:255',
                'regex:/^[a-z0-9_\-]+$/',
                Rule::unique('roles', 'name')
                    ->where('guard_name', $this->guard_name) // filter by guard_name saja
                    ->ignore($roleId),                       // ignore current record by ID
            ],
            'guard_name' => 'required|in:'.implode(',', array_keys(config('auth.guards'))),
            'permissions' => ['nullable', 'array'],
            'permissions.*' => ['exists:permissions,name'],
        ];
    }
}
