<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Fotos de cada álbum — cada linha é uma foto
        Schema::create('fotos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('album_id')->constrained('albuns')->cascadeOnDelete();
            $table->string('url');                      // URL ou caminho do arquivo
            $table->string('url_thumb')->nullable();    // miniatura (opcional)
            $table->string('legenda')->nullable();
            $table->unsignedSmallInteger('ordem')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('fotos');
    }
};
