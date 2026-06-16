<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Depoimento;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class DepoimentoController extends Controller
{
    // GET /api/depoimentos — lista os ativos em ordem (público)
    public function index(): JsonResponse
    {
        $depoimentos = Depoimento::where('ativo', true)
            ->orderBy('ordem')
            ->get();

        return response()->json($depoimentos);
    }

    // GET /api/admin/depoimentos — lista todos (admin)
    public function adminIndex(): JsonResponse
    {
        return response()->json(Depoimento::orderBy('ordem')->get());
    }

    // POST /api/admin/depoimentos
    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'nome'  => 'required|string|max:100',
            'papel' => 'nullable|string|max:100',
            'texto' => 'required|string|max:1000',
            'nota'  => 'integer|min:1|max:5',
            'ativo' => 'boolean',
            'ordem' => 'integer|min:0',
        ]);

        $depoimento = Depoimento::create($data);

        return response()->json($depoimento, 201);
    }

    // PUT /api/admin/depoimentos/{id}
    public function update(Request $request, Depoimento $depoimento): JsonResponse
    {
        $data = $request->validate([
            'nome'  => 'sometimes|string|max:100',
            'papel' => 'nullable|string|max:100',
            'texto' => 'sometimes|string|max:1000',
            'nota'  => 'integer|min:1|max:5',
            'ativo' => 'boolean',
            'ordem' => 'integer|min:0',
        ]);

        $depoimento->update($data);

        return response()->json($depoimento);
    }

    // DELETE /api/admin/depoimentos/{id}
    public function destroy(Depoimento $depoimento): JsonResponse
    {
        $depoimento->delete();

        return response()->json(null, 204);
    }
}
