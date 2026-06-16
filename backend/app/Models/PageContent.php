<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PageContent extends Model
{
    protected $fillable = ['pagina', 'secao', 'conteudo'];

    protected $casts = ['conteudo' => 'json'];

    // Retorna todas as seções de uma página como array ['secao' => conteudo]
    public static function getPagina(string $pagina): array
    {
        return static::where('pagina', $pagina)
            ->pluck('conteudo', 'secao')
            ->toArray();
    }

    // Salva ou atualiza uma seção
    public static function setPagina(string $pagina, string $secao, array $conteudo): void
    {
        static::updateOrCreate(
            ['pagina' => $pagina, 'secao' => $secao],
            ['conteudo' => $conteudo]
        );
    }
}
