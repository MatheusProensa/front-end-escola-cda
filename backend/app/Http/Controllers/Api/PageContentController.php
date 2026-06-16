<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\PageContent;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PageContentController extends Controller
{
    // GET /api/conteudo/{pagina} — retorna todo conteúdo de uma página
    // Ex.: GET /api/conteudo/home → { "hero": {...}, "pilares": [...], ... }
    public function show(string $pagina): JsonResponse
    {
        $conteudo = PageContent::getPagina($pagina);

        return response()->json($conteudo);
    }

    // PUT /api/conteudo/{pagina}/{secao} — salva uma seção específica
    // Ex.: PUT /api/conteudo/home/hero  Body: { "titulo": "...", "texto": "..." }
    public function update(Request $request, string $pagina, string $secao): JsonResponse
    {
        $paginasValidas = ['home', 'sobre', 'segmentos', 'vivencias', 'metodologia', 'espacos'];
        abort_unless(in_array($pagina, $paginasValidas), 404);

        $conteudo = $request->validate(['*' => 'nullable']);

        PageContent::setPagina($pagina, $secao, $conteudo);

        return response()->json(['message' => 'Conteúdo salvo.']);
    }
}
