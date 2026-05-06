<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
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
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $roleId = $this->route('role')?->id;
        $guard_names = implode(',', array_keys(config('auth.guards')));

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
            'guard_name' => (string) 'required|string|max:255|in:'.$guard_names,

            'permissions' => ['nullable', 'array'],
            'permissions.*' => ['exists:permissions,name'],
        ];
    }
}
