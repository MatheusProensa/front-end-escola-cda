<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    // POST /api/login — retorna { token, user }
    public function login(Request $request): JsonResponse
    {
        $request->validate([
            'email'    => 'required|email',
            'password' => 'required|string',
        ]);

        if (! Auth::attempt($request->only('email', 'password'))) {
            throw ValidationException::withMessages([
                'email' => ['E-mail ou senha incorretos.'],
            ]);
        }

        $user  = Auth::user();
        $token = $user->createToken('painel')->plainTextToken;

        return response()->json([
            'token' => $token,
            'user'  => ['nome' => $user->name, 'email' => $user->email],
        ]);
    }

    // GET /api/user — retorna o usuário da sessão atual
    public function user(Request $request): JsonResponse
    {
        $user = $request->user();

        return response()->json([
            'nome'  => $user->name,
            'email' => $user->email,
        ]);
    }

    // PUT /api/admin/perfil — atualiza nome e/ou senha do usuário logado
    public function updatePerfil(Request $request): JsonResponse
    {
        $data = $request->validate([
            'nome'     => 'sometimes|string|max:100',
            'password' => 'sometimes|string|min:8',
        ]);

        $user = $request->user();
        if (isset($data['nome'])) $user->name = $data['nome'];
        if (isset($data['password'])) $user->password = $data['password'];
        $user->save();

        return response()->json(['nome' => $user->name, 'email' => $user->email]);
    }

    // POST /api/logout — revoga o token atual
    public function logout(Request $request): JsonResponse
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Sessão encerrada.']);
    }
}
