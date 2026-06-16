<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Album;
use App\Models\Foto;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class FotoController extends Controller
{
    // GET /api/admin/albuns/{album}/fotos
    public function index(Album $album): JsonResponse
    {
        return response()->json($album->fotos);
    }

    // POST /api/admin/albuns/{album}/fotos
    public function store(Request $request, Album $album): JsonResponse
    {
        $data = $request->validate([
            'url'       => 'required|string|max:500',
            'url_thumb' => 'nullable|string|max:500',
            'legenda'   => 'nullable|string|max:200',
            'ordem'     => 'integer|min:0',
        ]);

        $foto = $album->fotos()->create($data);

        return response()->json($foto, 201);
    }

    // DELETE /api/admin/fotos/{foto}
    public function destroy(Foto $foto): JsonResponse
    {
        $foto->delete();

        return response()->json(null, 204);
    }
}
