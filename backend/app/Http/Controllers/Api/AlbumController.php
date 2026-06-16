<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Album;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AlbumController extends Controller
{
    // GET /api/albuns — lista álbuns publicados com contagem de fotos (público)
    public function index(): JsonResponse
    {
        $albuns = Album::where('status', 'publicado')
            ->withCount('fotos')
            ->orderBy('data_evento', 'desc')
            ->get();

        return response()->json($albuns);
    }

    // GET /api/albuns/{id} — álbum com todas as fotos (público)
    public function show(Album $album): JsonResponse
    {
        abort_unless($album->status === 'publicado', 404);

        return response()->json($album->load('fotos'));
    }

    // GET /api/admin/albuns — todos os álbuns (admin)
    public function adminIndex(): JsonResponse
    {
        return response()->json(
            Album::withCount('fotos')->orderBy('data_evento', 'desc')->get()
        );
    }

    // POST /api/admin/albuns
    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'titulo'      => 'required|string|max:200',
            'data_evento' => 'required|date',
            'capa'        => 'nullable|string|max:500',
            'status'      => 'in:publicado,rascunho',
            'ordem'       => 'integer|min:0',
        ]);

        $album = Album::create($data);

        return response()->json($album, 201);
    }

    // PUT /api/admin/albuns/{id}
    public function update(Request $request, Album $album): JsonResponse
    {
        $data = $request->validate([
            'titulo'      => 'sometimes|string|max:200',
            'data_evento' => 'sometimes|date',
            'capa'        => 'nullable|string|max:500',
            'status'      => 'in:publicado,rascunho',
            'ordem'       => 'integer|min:0',
        ]);

        $album->update($data);

        return response()->json($album);
    }

    // DELETE /api/admin/albuns/{id}
    public function destroy(Album $album): JsonResponse
    {
        $album->delete(); // fotos são deletadas em cascata (cascadeOnDelete na migration)

        return response()->json(null, 204);
    }
}
