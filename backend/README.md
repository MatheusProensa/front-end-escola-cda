# Backend — Escola CDA

API REST em Laravel 13 + Sanctum para o painel administrativo do site.

## Rodar localmente

```bash
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed    # cria tabelas + admin padrão
php artisan serve             # http://localhost:8000
```

**Credenciais do admin** são configuradas diretamente no servidor via variáveis de ambiente.

## Variáveis de ambiente

| Variável       | Descrição                                |
|----------------|------------------------------------------|
| `APP_URL`      | URL do backend                           |
| `FRONTEND_URL` | URL do frontend (usado pelo CORS)        |
| `DB_CONNECTION`| `sqlite` (dev) ou `pgsql` (produção)     |
| `DB_*`         | Credenciais do banco em produção         |

## Estrutura

```
app/
├── Http/Controllers/Api/
│   ├── AuthController.php        # login, logout, /api/user
│   ├── SettingController.php     # configurações do site
│   ├── PageContentController.php # conteúdo das páginas
│   ├── DepoimentoController.php  # depoimentos (home)
│   ├── AlbumController.php       # álbuns de fotos
│   ├── FotoController.php        # fotos de cada álbum
│   └── MatriculaController.php   # solicitações de matrícula
└── Models/
    ├── Setting.php
    ├── PageContent.php
    ├── Depoimento.php
    ├── Album.php
    ├── Foto.php
    └── Matricula.php

database/
├── migrations/     # estrutura do banco
└── seeders/        # dados iniciais

routes/
└── api.php         # todas as rotas da API
```

## Autenticação

Usa **Laravel Sanctum** com tokens Bearer.

```
POST /api/login  →  { token, user }
# inclua em todas as requisições protegidas:
Authorization: Bearer <token>
```
