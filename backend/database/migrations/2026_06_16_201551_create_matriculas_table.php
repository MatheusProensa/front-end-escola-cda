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
        // Solicitações de matrícula enviadas pelo formulário do site
        Schema::create('matriculas', function (Blueprint $table) {
            $table->id();
            $table->string('responsavel');
            $table->string('whatsapp');
            $table->string('nome_crianca')->nullable();
            $table->string('idade_crianca')->nullable();
            $table->string('segmento');                 // ex.: "Educação Infantil"
            $table->text('mensagem')->nullable();
            $table->enum('status', ['novo', 'em_contato', 'matriculado', 'arquivado'])->default('novo');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('matriculas');
    }
};
