<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Matricula;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class MatriculaController extends Controller
{
    // POST /api/matriculas — recebe o formulário do site (público)
    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'responsavel'   => 'required|string|max:100',
            'whatsapp'      => 'required|string|max:20',
            'nome_crianca'  => 'nullable|string|max:100',
            'idade_crianca' => 'nullable|string|max:20',
            'segmento'      => 'required|string|max:50',
            'mensagem'      => 'nullable|string|max:1000',
        ]);

        $matricula = Matricula::create($data);

        return response()->json(['message' => 'Solicitação recebida com sucesso!'], 201);
    }

    // GET /api/admin/matriculas — lista todas (admin)
    public function index(Request $request): JsonResponse
    {
        $status = $request->query('status'); // filtro opcional: ?status=novo

        $query = Matricula::latest();

        if ($status) {
            $query->where('status', $status);
        }

        return response()->json($query->get());
    }

    // PUT /api/admin/matriculas/{id}/status — atualiza o status (admin)
    public function updateStatus(Request $request, Matricula $matricula): JsonResponse
    {
        $data = $request->validate([
            'status' => 'required|in:novo,em_contato,matriculado,arquivado',
        ]);

        $matricula->update($data);

        return response()->json($matricula);
    }
}
