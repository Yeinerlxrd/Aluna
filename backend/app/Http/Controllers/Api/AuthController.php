<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Kreait\Firebase\Factory;
use Kreait\Firebase\Exception\Auth\FailedToVerifyToken;

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

    public function google(Request $request)
    {
        $validated = $request->validate(['id_token' => ['required', 'string']]);

        try {
            $auth = (new Factory())
                ->withServiceAccount(config('firebase.credentials'))
                ->withProjectId(config('firebase.project_id'))
                ->createAuth();
            $firebaseUser = $auth->verifyIdToken($validated['id_token'])->claims();
        } catch (FailedToVerifyToken $exception) {
            return response()->json(['message' => 'El token de Google no es válido.'], 401);
        }

        $email = $firebaseUser->get('email');
        $name = $firebaseUser->get('name') ?: Str::before($email, '@');
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
