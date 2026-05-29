# Escola CDA — Site institucional (React + Vite + TypeScript)

Site institucional da **Escola CDA**, evoluído a partir do projeto original, **mantendo 100% a identidade visual** (azul institucional + dourado, Plus Jakarta Sans + Yellowtail). Agora é **multipágina**, responsivo e otimizado.

## Como rodar

```bash
npm install
npm run dev
```

Abra o endereço que o Vite mostrar (geralmente `http://localhost:5173`).

Para gerar a build de produção:

```bash
npm run build
npm run preview
```

## Estrutura

```
public/
  favicon.svg
src/
  assets/            → imagens (.webp) + assets/timeline/ (linha do tempo dos 15 anos)
  components/
    site.tsx         → Navbar, Footer, WhatsApp flutuante, Modal de matrícula,
                       Ícone, scroll-reveal e o Layout das páginas internas
  lib/
    assets.ts        → resolve as imagens de src/assets (import.meta.glob)
  pages/
    Home.tsx         → Hero, Pilares, Propósito, Segmentos, Vivências,
                       Espaço, Depoimentos, Conexão
    Segmentos.tsx    → Educação Infantil, Ensino Fundamental e Contraturno
    Vivencias.tsx    → catálogo completo das atividades/oficinas
    Espacos.tsx      → galeria de ambientes + alimentação saudável
    Sobre.tsx        → história, linha do tempo, valores, diferenciais, alimentação
    Matriculas.tsx   → formulário de interesse + contato + WhatsApp + mapa
  App.tsx            → rotas (React Router)
  App.css            → todos os estilos do site
  main.tsx           → ponto de entrada
  index.css          → reset base
index.html           → fontes (Google Fonts) e ícones (Font Awesome 6) via CDN
```

## Rotas

### Site público
| Caminho | Página |
|---|---|
| `/` | Início (Home) |
| `/segmentos` | Segmentos |
| `/vivencias` | Vivências |
| `/espacos` | Espaços |
| `/momentos` | Momentos (galeria de álbuns) |
| `/sobre` | Sobre |
| `/matriculas` | Matrículas e contato |

### Painel administrativo (acesso só por URL — sem link no site público)
| Caminho | Página |
|---|---|
| `/admin/login` | Login (integração backend marcada com `// 🔌`) |
| `/admin/dashboard` | Dashboard |
| `/admin/home` · `/admin/segmentos` · `/admin/vivencias` · `/admin/espacos` · `/admin/sobre` | Editores de conteúdo |
| `/admin/momentos` | Gerir álbuns de fotos |
| `/admin/contato` · `/admin/configuracoes` | Contato e preferências |

O código do painel fica em `src/admin/` (`AdminShell.tsx`, `ui.tsx`, `pages/`). **Ainda não há backend/autenticação reais** — o login apenas navega para o dashboard; o ponto de integração está comentado em `src/admin/pages/Login.tsx`.

> ⚠️ Deploy (Vercel/Netlify): por ser SPA com React Router, configure o **rewrite de todas as rotas para `/index.html`** (na Vercel, um `vercel.json` com `{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }`) para que `/admin/login`, `/momentos` etc. funcionem ao recarregar a página.

## O que mudou em relação ao projeto original

- **Multipágina** com React Router (antes era página única).
- **Responsivo** completo (desktop, tablet e mobile, com menu hambúrguer).
- **Performance**: imagens convertidas para **WebP** (o logo caiu de ~2 MB para ~39 KB), `loading="lazy"` e `decoding="async"`.
- **Conteúdo novo**: linha do tempo dos 15 anos (fotos reais), depoimentos de famílias, alimentação saudável, diferenciais (ProRaiz, Ballet, Jiu-Jitsu, App Diário Escola).
- **Funil de matrícula**: modal de interesse e página de contato (somente WhatsApp/telefone, sem e-mail).
- **Microinterações**: animações de entrada no scroll e contador animado.

## Observações técnicas

- **Ícones via Font Awesome 6 (CDN)** — carregados no `index.html`. O componente `Icon` (em `src/components/site.tsx`) renderiza as classes do Font Awesome. *(O projeto original usava `react-icons`; trocamos para CDN para que o visual fique idêntico ao site atual e o build não dependa do mapeamento de ícones. Se preferir voltar para `react-icons`, é só adaptar o componente `Icon`.)*
- **Fontes**: Plus Jakarta Sans + Yellowtail (Google Fonts, no `index.html`).
- As imagens ficam em `src/assets/` e são resolvidas por `src/lib/assets.ts` — para trocar uma foto, basta substituir o arquivo de mesmo nome.

---

Identidade visual e conteúdo: **Escola CDA** — *"Família e escola sonham juntas."*
