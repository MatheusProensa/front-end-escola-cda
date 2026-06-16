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
        // Depoimentos de famílias exibidos no carrossel da Home
        Schema::create('depoimentos', function (Blueprint $table) {
            $table->id();
            $table->string('nome');
            $table->string('papel')->nullable();    // ex.: "Mãe do João, 2º ano"
            $table->text('texto');
            $table->unsignedTinyInteger('nota')->default(5); // 1–5 estrelas
            $table->boolean('ativo')->default(true);
            $table->unsignedSmallInteger('ordem')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('depoimentos');
    }
};
