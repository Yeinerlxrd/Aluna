<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreReportRequest extends FormRequest
{
    public function authorize(): bool { return $this->user() !== null; }
    public function rules(): array
    {
        return [
            'municipality_id' => ['required', 'exists:municipalities,id'],
            'category' => ['required', 'in:acoso,iluminacion,zona_desolada,otro'],
            'reference' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string', 'min:10', 'max:2000'],
            'latitude' => ['nullable', 'numeric', 'between:-90,90', 'required_with:longitude'],
            'longitude' => ['nullable', 'numeric', 'between:-180,180', 'required_with:latitude'],
        ];
    }
}
