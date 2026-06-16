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
        // Conteúdo editável de cada página (home, sobre, segmentos, etc.)
        // pagina + secao formam a chave única; conteudo é JSON livre
        Schema::create('page_contents', function (Blueprint $table) {
            $table->id();
            $table->string('pagina');           // ex.: "home", "sobre", "segmentos"
            $table->string('secao');            // ex.: "hero", "pilares", "diario"
            $table->json('conteudo');           // dados da seção em formato JSON
            $table->timestamps();

            $table->unique(['pagina', 'secao']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('page_contents');
    }
};
