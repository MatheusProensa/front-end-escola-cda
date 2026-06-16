<div align="center">

# Escola CDA — Plataforma Web

**Família e escola sonham juntas.**

Site institucional + painel administrativo + API backend da Escola CDA  
Educação Infantil e Ensino Fundamental em Santa Maria/RS — há 15 anos.

[![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)](https://github.com/MatheusProensa/front-end-escola-cda)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Laravel](https://img.shields.io/badge/Laravel-13-FF2D20?logo=laravel&logoColor=white)](https://laravel.com/)
[![Vercel](https://img.shields.io/badge/Frontend-Vercel-000000?logo=vercel&logoColor=white)](https://vercel.com/)

[🌐 Ver site ao vivo](https://escola-cda.vercel.app) · [📸 Instagram](https://www.instagram.com/escolacda.sm/) · [📘 Facebook](https://www.facebook.com/escolacda.sm)

</div>

---

## Estrutura do repositório

Este projeto segue uma estrutura **monorepo** — frontend e backend no mesmo repositório, em pastas separadas.

```
escola-cda/
├── frontend/          # React 18 + TypeScript + Vite
│   ├── src/
│   │   ├── assets/    # Imagens (WebP), logos e fotos
│   │   ├── components/
│   │   ├── pages/     # Páginas públicas
│   │   ├── admin/     # Painel administrativo
│   │   └── lib/       # API client, utilitários
│   ├── public/
│   ├── index.html
│   └── package.json
│
├── backend/           # Laravel 13 + Sanctum (API REST)
│   ├── app/
│   │   ├── Http/Controllers/Api/
│   │   └── Models/
│   ├── database/
│   │   ├── migrations/
│   │   └── seeders/
│   ├── routes/
│   │   └── api.php
│   └── composer.json
│
└── README.md
```

---

## Tecnologias

| Camada     | Tecnologia                              |
|------------|-----------------------------------------|
| Frontend   | React 18 · TypeScript · Vite 5          |
| Rotas      | React Router 6                          |
| Backend    | Laravel 13 · PHP 8.4                    |
| Auth       | Laravel Sanctum (token Bearer)          |
| Banco      | SQLite (dev) · PostgreSQL (produção)    |
| Frontend Deploy | Vercel                            |
| Backend Deploy  | Railway (planejado)               |

---

## Como rodar localmente

### Frontend

```bash
cd frontend
npm install
cp .env.example .env     # configure VITE_API_URL se quiser conectar ao backend
npm run dev              # http://localhost:5173
```

> Sem `VITE_API_URL`, o painel admin roda em **modo demo** (qualquer credencial funciona).

### Backend

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed   # cria tabelas + usuário admin padrão
php artisan serve            # http://localhost:8000
```

**Credenciais do admin** são configuradas via variáveis de ambiente no servidor.

---

## Páginas do site público

| Rota           | Página                                          |
|----------------|-------------------------------------------------|
| `/`            | Home — hero, pilares, depoimentos               |
| `/segmentos`   | Berçário, Ed. Infantil e Ensino Fundamental     |
| `/vivencias`   | Atividades especializadas, oficinas e extras    |
| `/metodologia` | Proposta pedagógica ProRaiz                     |
| `/espacos`     | Galeria dos ambientes da escola                 |
| `/momentos`    | Álbuns de eventos e celebrações                 |
| `/sobre`       | História, linha do tempo e valores              |
| `/matriculas`  | Formulário de interesse e agendamento de visita |

---

## API — principais rotas

### Públicas

| Método | Rota                      | Descrição                          |
|--------|---------------------------|------------------------------------|
| POST   | `/api/login`              | Autenticação — retorna token       |
| GET    | `/api/configuracoes`      | Configurações públicas do site     |
| GET    | `/api/conteudo/{pagina}`  | Conteúdo editável de uma página    |
| GET    | `/api/depoimentos`        | Depoimentos publicados             |
| GET    | `/api/albuns`             | Álbuns de fotos publicados         |
| POST   | `/api/matriculas`         | Envio do formulário de matrícula   |

### Protegidas (requer token Sanctum)

| Método | Rota                                    | Descrição                     |
|--------|-----------------------------------------|-------------------------------|
| GET    | `/api/user`                             | Dados do usuário logado       |
| POST   | `/api/logout`                           | Encerra sessão                |
| PUT    | `/api/admin/configuracoes`              | Atualiza configurações        |
| PUT    | `/api/admin/conteudo/{pagina}/{secao}`  | Atualiza seção de uma página  |
| CRUD   | `/api/admin/depoimentos`                | Gerencia depoimentos          |
| CRUD   | `/api/admin/albuns`                     | Gerencia álbuns de fotos      |
| GET    | `/api/admin/matriculas`                 | Lista solicitações de matrícula |

---

## Equipe

| Pessoa           | Área       |
|------------------|------------|
| Matheus Proensa  | Frontend   |
| Júnior Ferreira  | Backend    |

**Escola CDA** · R. José Manhago, 194 · Camobi, Santa Maria/RS
