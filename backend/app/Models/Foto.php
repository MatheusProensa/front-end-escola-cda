<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Foto extends Model
{
    protected $fillable = ['album_id', 'url', 'url_thumb', 'legenda', 'ordem'];

    protected $casts = ['ordem' => 'integer'];

    public function album(): BelongsTo
    {
        return $this->belongsTo(Album::class, 'album_id');
    }
}
