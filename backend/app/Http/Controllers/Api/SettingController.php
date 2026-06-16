<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SettingController extends Controller
{
    // GET /api/configuracoes — retorna todas as configurações como objeto
    public function index(): JsonResponse
    {
        $settings = Setting::all()->pluck('valor', 'chave');

        return response()->json($settings);
    }

    // PUT /api/configuracoes — atualiza várias configurações de uma vez
    // Body: { "whatsapp": "...", "telefone": "...", ... }
    public function update(Request $request): JsonResponse
    {
        $data = $request->validate([
            'whatsapp'   => 'sometimes|string|max:30',
            'telefone'   => 'sometimes|string|max:30',
            'wpp_link'   => 'sometimes|string|max:255',
            'endereco'   => 'sometimes|string|max:255',
            'horario'    => 'sometimes|string|max:100',
            'instagram'  => 'sometimes|string|max:100',
            'facebook'   => 'sometimes|string|max:100',
        ]);

        foreach ($data as $chave => $valor) {
            Setting::set($chave, $valor);
        }

        return response()->json(['message' => 'Configurações salvas.']);
    }
}
