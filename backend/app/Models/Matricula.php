<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Matricula extends Model
{
    protected $fillable = [
        'responsavel',
        'whatsapp',
        'nome_crianca',
        'idade_crianca',
        'segmento',
        'mensagem',
        'status',
    ];
}
