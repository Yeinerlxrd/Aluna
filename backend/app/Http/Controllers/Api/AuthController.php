<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Http;

class AuthController extends Controller
{
    public function register(RegisterRequest $request)
    {
        $user = User::create([...$request->safe()->except('password_confirmation'), 'password' => Hash::make($request->string('password'))]);
        return response()->json(['user' => $user->only(['id', 'name', 'email', 'municipality_id']), 'token' => auth('api')->login($user)], 201);
    }

    public function login(Request $request)
    {
        $credentials = $request->validate(['email' => ['required', 'email'], 'password' => ['required', 'string']]);
        if (!$token = auth('api')->attempt($credentials)) return response()->json(['message' => 'Credenciales inválidas.'], 401);
        return $this->respondWithToken($token);
    }

    public function supabase(Request $request)
    {
        $validated = $request->validate(['access_token' => ['required', 'string']]);
        $response = Http::withHeaders([
            'apikey' => config('supabase.service_role_key'),
            'Authorization' => 'Bearer ' . $validated['access_token'],
        ])->get(rtrim(config('supabase.url'), '/') . '/auth/v1/user');
        if ($response->failed()) return response()->json(['message' => 'La sesión de Supabase no es válida.'], 401);
        $supabaseUser = $response->json();
        $email = $supabaseUser['email'] ?? null;
        $name = $supabaseUser['user_metadata']['name'] ?? Str::before((string) $email, '@');
        if (!$email) return response()->json(['message' => 'La cuenta de Google no tiene email.'], 422);

        $user = User::firstOrCreate(
            ['email' => $email],
            ['name' => $name, 'password' => Hash::make(Str::random(40))]
        );

        return $this->respondWithToken(auth('api')->login($user));
    }

    public function me() { return response()->json(['user' => auth('api')->user()->only(['id', 'name', 'email', 'municipality_id'])]); }
    public function logout() { auth('api')->logout(); return response()->json(['message' => 'Sesión cerrada.']); }
    private function respondWithToken(string $token) { return response()->json(['token' => $token, 'user' => auth('api')->user()->only(['id', 'name', 'email', 'municipality_id'])]); }
}
