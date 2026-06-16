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
        // Álbuns de fotos dos eventos da escola (página Momentos)
        Schema::create('albuns', function (Blueprint $table) {
            $table->id();
            $table->string('titulo');
            $table->date('data_evento');
            $table->string('capa')->nullable();         // caminho/URL da imagem de capa
            $table->enum('status', ['publicado', 'rascunho'])->default('rascunho');
            $table->unsignedSmallInteger('ordem')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('albuns');
    }
};
