<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    protected $fillable = ['chave', 'valor'];

    protected $casts = ['valor' => 'json'];

    // Atalho estático: Setting::get('whatsapp')
    public static function get(string $chave, mixed $padrao = null): mixed
    {
        return static::where('chave', $chave)->first()?->valor ?? $padrao;
    }

    // Atalho estático: Setting::set('whatsapp', '(55) 9999-9999')
    public static function set(string $chave, mixed $valor): void
    {
        static::updateOrCreate(['chave' => $chave], ['valor' => $valor]);
    }
}
