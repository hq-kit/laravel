<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class PermissionRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->route('permission')?->id ? auth()->user()->hasPermissionTo('permission.update') : auth()->user()->hasPermissionTo('permission.create');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $guard_names = implode(',', array_keys(config('auth.guards')));

        return [
            'name' => 'required|string|max:255|unique:roles,name,'.$this->route('permission')?->id,
            'guard_name' => (string) 'required|string|max:255|in:'.$guard_names,
        ];
    }
}
