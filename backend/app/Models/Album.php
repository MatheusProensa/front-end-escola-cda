<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Album extends Model
{
    protected $table = 'albuns';

    protected $fillable = ['titulo', 'data_evento', 'capa', 'status', 'ordem'];

    protected $casts = ['data_evento' => 'date', 'ordem' => 'integer'];

    public function fotos(): HasMany
    {
        return $this->hasMany(Foto::class, 'album_id')->orderBy('ordem');
    }
}
