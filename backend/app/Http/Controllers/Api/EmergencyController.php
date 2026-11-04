<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;

class EmergencyController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json([
            'country' => config('emergency.country'),
            'updated_at' => config('emergency.updated_at'),
            'disclaimer' => 'Estos contactos son informativos. En una emergencia inmediata llama al 123.',
            'services' => config('emergency.services'),
        ]);
    }
}
