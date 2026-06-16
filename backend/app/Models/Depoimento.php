<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Depoimento extends Model
{
    protected $fillable = ['nome', 'papel', 'texto', 'nota', 'ativo', 'ordem'];

    protected $casts = ['ativo' => 'boolean', 'nota' => 'integer', 'ordem' => 'integer'];
}
