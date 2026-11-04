<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
{
    public function authorize(): bool { return true; }
    public function rules(): array
    {
        return ['name' => ['required', 'string', 'max:120'], 'email' => ['required', 'email', 'max:255', 'unique:users'], 'password' => ['required', 'string', 'min:8', 'confirmed'], 'municipality_id' => ['nullable', 'exists:municipalities,id']];
    }
}
