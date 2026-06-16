# Frontend — Escola CDA

Site institucional e painel administrativo em React 18 + TypeScript + Vite.

## Rodar localmente

```bash
npm install
cp .env.example .env
npm run dev        # http://localhost:5173
npm run build      # build de produção
npm run preview    # visualizar build
```

## Variáveis de ambiente

| Variável       | Descrição                                                  |
|----------------|------------------------------------------------------------|
| `VITE_API_URL` | URL da API Laravel. Vazio = modo demo (sem backend real).  |

## Estrutura

```
src/
├── assets/          # Imagens WebP, logos
├── components/
│   └── site.tsx     # Navbar, Footer, Layout, contexto de contato
├── lib/
│   ├── api.ts       # Cliente HTTP (fetch + Bearer token)
│   └── assets.ts    # Resolução de assets via Vite
├── pages/           # Páginas públicas (Home, Segmentos, Vivências…)
├── admin/
│   ├── auth.tsx     # Contexto de autenticação
│   ├── RequireAuth.tsx
│   ├── AdminShell.tsx
│   └── pages/       # Editores por seção + Login + Dashboard
├── App.tsx          # Roteamento principal
├── App.css          # Estilos do site
└── main.tsx
```

## Deploy

Publicado na **Vercel** — push na `main` dispara deploy automático.  
Site ao vivo: [escola-cda.vercel.app](https://escola-cda.vercel.app)
