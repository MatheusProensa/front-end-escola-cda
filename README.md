<div align="center">

# Escola CDA — Plataforma Web

**Família e escola sonham juntas.**

Site institucional + painel administrativo da Escola CDA
Educação Infantil e Ensino Fundamental em Santa Maria/RS — há 15 anos.

[![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)](https://github.com/MatheusProensa/front-end-escola-cda)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Backend-Supabase-3FCF8E?logo=supabase&logoColor=white)](https://supabase.com/)
[![Vercel](https://img.shields.io/badge/Frontend-Vercel-000000?logo=vercel&logoColor=white)](https://vercel.com/)

[🌐 Ver site ao vivo](https://escola-cda.vercel.app) · [📸 Instagram](https://www.instagram.com/escolacda.sm/) · [📘 Facebook](https://www.facebook.com/escolacda.sm)

</div>

---

## Estrutura do repositório

```
escola-cda/
├── frontend/          # React 18 + TypeScript + Vite
│   ├── src/
│   │   ├── assets/    # Imagens (WebP), logos e fotos
│   │   ├── components/
│   │   ├── pages/     # Páginas públicas
│   │   ├── admin/     # Painel administrativo
│   │   └── lib/       # Cliente Supabase, utilitários
│   ├── public/
│   ├── index.html
│   └── package.json
│
├── supabase/
│   └── schema.sql     # Esquema do banco (tabelas + RLS) — rodar no SQL Editor do Supabase
│
└── README.md
```

---

## Tecnologias

| Camada     | Tecnologia                              |
|------------|-----------------------------------------|
| Frontend   | React 18 · TypeScript · Vite 5          |
| Rotas      | React Router 6                          |
| Backend    | Supabase (Postgres + Auth + API REST)   |
| Auth       | Supabase Auth                           |
| Frontend Deploy | Vercel                            |

---

## Como rodar localmente

### 1. Banco de dados (Supabase)

1. Crie um projeto grátis em [supabase.com](https://supabase.com)
2. Vá em **SQL Editor** e execute todo o conteúdo de `supabase/schema.sql`
3. Vá em **Authentication → Users** e crie o usuário admin manualmente (e-mail + senha)
4. Vá em **Settings → API** e copie a **Project URL** e a **anon public key**

### 2. Frontend

```bash
cd frontend
npm install
cp .env.example .env     # cole VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY
npm run dev               # http://localhost:5173
```

> Sem essas variáveis configuradas, o painel admin roda em **modo demo** (qualquer credencial funciona, nada é salvo).

### 3. Estatísticas (Google Analytics) — opcional

A página `/admin/estatisticas` busca dados reais do GA4 através da função serverless `api/analytics.js`. Para ativar, configure no projeto Vercel (Settings → Environment Variables), nunca no código:

| Variável          | Onde encontrar                                                              |
|-------------------|------------------------------------------------------------------------------|
| `GA_PROPERTY_ID`  | Google Analytics → Admin → Detalhes da propriedade (ID numérico da propriedade) |
| `GA_CLIENT_EMAIL` | E-mail da conta de serviço criada no Google Cloud (Console → IAM → Contas de serviço) |
| `GA_PRIVATE_KEY`  | Chave privada (campo `private_key`) do JSON gerado para essa conta de serviço |

A conta de serviço precisa ser adicionada como **Visualizador** na propriedade do GA4 (Admin → Acesso à propriedade). Sem essas variáveis, a página de estatísticas mostra uma mensagem informando que não está configurada — o restante do site continua funcionando normalmente.

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

## Banco de dados — principais tabelas

| Tabela          | Descrição                                  | Escrita pública |
|-----------------|---------------------------------------------|-----------------|
| `site_settings` | Configurações de contato (WhatsApp, etc.)  | Não              |
| `page_content`  | Conteúdo editável de cada página/seção     | Não              |
| `depoimentos`   | Depoimentos publicados no carrossel        | Não              |
| `albuns`        | Álbuns de fotos                             | Não              |
| `fotos`         | Fotos de cada álbum                         | Não              |
| `matriculas`    | Solicitações de matrícula                  | Sim (insert)     |

Todas as tabelas têm Row Level Security (RLS) habilitado — leitura pública dos dados publicados, escrita restrita a usuários autenticados (painel admin). Veja `supabase/schema.sql` para as policies completas.

---

## Equipe

| Pessoa           | Área       |
|------------------|------------|
| Matheus Proensa  | Frontend   |
| Júnior Ferreira  | Backend    |

**Escola CDA** · R. José Manhago, 194 · Camobi, Santa Maria/RS
