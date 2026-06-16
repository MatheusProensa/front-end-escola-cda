<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\SettingController;
use App\Http\Controllers\Api\PageContentController;
use App\Http\Controllers\Api\DepoimentoController;
use App\Http\Controllers\Api\AlbumController;
use App\Http\Controllers\Api\FotoController;
use App\Http\Controllers\Api\MatriculaController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Rotas públicas (sem autenticação)
|--------------------------------------------------------------------------
| Acessíveis pelo site público
*/

// Autenticação
Route::post('/login', [AuthController::class, 'login']);

// Formulário de matrícula — qualquer visitante pode enviar
Route::post('/matriculas', [MatriculaController::class, 'store']);

// Conteúdo público das páginas
Route::get('/conteudo/{pagina}', [PageContentController::class, 'show']);

// Configurações públicas do site (telefone, endereço, etc.)
Route::get('/configuracoes', [SettingController::class, 'index']);

// Depoimentos publicados (carrossel da home)
Route::get('/depoimentos', [DepoimentoController::class, 'index']);

// Álbuns publicados e suas fotos
Route::get('/albuns', [AlbumController::class, 'index']);
Route::get('/albuns/{album}', [AlbumController::class, 'show']);

/*
|--------------------------------------------------------------------------
| Rotas protegidas — exigem token Sanctum (painel admin)
|--------------------------------------------------------------------------
*/
Route::middleware('auth:sanctum')->group(function () {

    // Usuário logado, atualização de perfil e logout
    Route::get('/user', [AuthController::class, 'user']);
    Route::put('/admin/perfil', [AuthController::class, 'updatePerfil']);
    Route::post('/logout', [AuthController::class, 'logout']);

    // Grupo /admin/*
    Route::prefix('admin')->group(function () {

        // Configurações do site
        Route::put('/configuracoes', [SettingController::class, 'update']);

        // Conteúdo das páginas
        Route::put('/conteudo/{pagina}/{secao}', [PageContentController::class, 'update']);

        // Depoimentos
        Route::get('/depoimentos', [DepoimentoController::class, 'adminIndex']);
        Route::post('/depoimentos', [DepoimentoController::class, 'store']);
        Route::put('/depoimentos/{depoimento}', [DepoimentoController::class, 'update']);
        Route::delete('/depoimentos/{depoimento}', [DepoimentoController::class, 'destroy']);

        // Álbuns de fotos
        Route::get('/albuns', [AlbumController::class, 'adminIndex']);
        Route::post('/albuns', [AlbumController::class, 'store']);
        Route::put('/albuns/{album}', [AlbumController::class, 'update']);
        Route::delete('/albuns/{album}', [AlbumController::class, 'destroy']);

        // Fotos de um álbum
        Route::get('/albuns/{album}/fotos', [FotoController::class, 'index']);
        Route::post('/albuns/{album}/fotos', [FotoController::class, 'store']);
        Route::delete('/fotos/{foto}', [FotoController::class, 'destroy']);

        // Matrículas
        Route::get('/matriculas', [MatriculaController::class, 'index']);
        Route::put('/matriculas/{matricula}/status', [MatriculaController::class, 'updateStatus']);
    });
});
