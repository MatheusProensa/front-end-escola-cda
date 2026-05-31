# 🌟 Site Institucional — Escola CDA

**Família e escola sonham juntas.**

Site institucional moderno da Escola CDA — educação infantil e ensino fundamental em Santa Maria/RS, há 15 anos.

[![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)](https://github.com/MatheusProensa/front-end-escola-cda)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React Router](https://img.shields.io/badge/React_Router-6.26-CA4245?logo=reactrouter&logoColor=white)](https://reactrouter.com/)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?logo=vercel&logoColor=white)](https://vercel.com/)

[🌐 Ver site ao vivo](https://escola-cda.vercel.app/) · [📸 Instagram](https://www.instagram.com/escolacda.sm/) · [📘 Facebook](https://www.facebook.com/escolacda.sm)

</div>

---

## 📸 Preview

> 🚧 **Projeto em desenvolvimento.** As imagens abaixo são da versão atual e o site segue recebendo melhorias — o visual pode mudar.

<div align="center">

### Página inicial
<img src="screenshots/home.png" alt="Home da Escola CDA" width="100%" />

### Nosso Espaço
<img src="screenshots/espacos.png" alt="Página de Espaços da Escola CDA" width="100%" />

</div>

---

## ✨ Sobre o projeto

> 🚧 **Status:** em desenvolvimento ativo. O site público já está funcional; o painel administrativo está pronto como front-end e aguarda a integração com o back-end.

Site institucional completo desenvolvido para transmitir **acolhimento, desenvolvimento infantil e a parceria entre escola e família**, com uma identidade visual premium, moderna e emocional — fugindo do padrão genérico de sites escolares.

O projeto reúne **um site público** (institucional) e **um painel administrativo** (área restrita), preparado para integração com back-end.

> 💙 Identidade visual: azul institucional + dourado de destaque, tipografia **Plus Jakarta Sans** + acentos em **Yellowtail** (script), fotografia real e afetiva das crianças e dos espaços da escola.

---

## 🚀 Funcionalidades

### 🏠 Site público
- **Home** — hero emocional, pilares, faixa do app Diário Escola, depoimentos de famílias e seção "Nosso Espaço".
- **Segmentos** — Berçário, Educação Infantil e Ensino Fundamental, com galerias por fase.
- **Metodologia** — proposta pedagógica (ProRaiz), eixos por fase, tecnologia em sala e Diário Escola.
- **Vivências** — atividades organizadas em **Especializadas**, **Oficinas** e **Aulas extras**.
- **Espaços** — galeria imersiva dos ambientes (com lightbox) + seção de **energia solar**.
- **Sobre** — história, linha do tempo, valores e alimentação saudável.
- **Momentos** — álbuns de eventos reais (aniversário 15 anos, Feira do Livro, Festa da Família).
- **Agende uma visita** — formulário de interesse que conduz o contato pelo WhatsApp.

### 🔐 Painel administrativo (`/admin`)
- Login protegido + rotas autenticadas (modo demo no front; pronto para API real).
- Editores para cada seção do site: Home, Segmentos, Metodologia, Vivências, Espaços, Sobre, Momentos, Contato.
- Dashboard e Configurações (incluindo acessibilidade).

### ♿ Acessibilidade & SEO
- **VLibras** — tradutor de Libras em todas as páginas.
- Recursos de **aumento de fonte** e **alto contraste**.
- **SEO por página** (títulos + descrições únicos), **dados estruturados** (Schema.org `EducationalOrganization`), **Open Graph** (preview de link bonito) e `sitemap.xml` + `robots.txt`.

### 📱 Experiência
- 100% **responsivo** (mobile, tablet e desktop).
- **Imagens otimizadas** (WebP + carregamento lazy) para performance.
- Animações sutis de entrada ao rolar a página.
- Botão flutuante de **WhatsApp** sempre acessível.

---

## 🛠️ Tecnologias

| Camada | Tecnologia |
|---|---|
| Framework | **React 18** + **TypeScript** |
| Build | **Vite 5** |
| Rotas | **React Router 6** |
| Ícones | **Font Awesome 6** |
| Acessibilidade | **VLibras** (gov.br) |
| Tipografia | Plus Jakarta Sans · Yellowtail |
| Deploy | **Vercel** |

---

## 📦 Como rodar localmente

> Pré-requisitos: **Node.js 18+** e **npm**.

```bash
# 1. Clone o repositório
git clone https://github.com/MatheusProensa/front-end-escola-cda.git
cd front-end-escola-cda

# 2. Instale as dependências
npm install

# 3. Rode em modo desenvolvimento
npm run dev
```

O site abre em `http://localhost:5173`.
O painel administrativo fica em `http://localhost:5173/admin` (no modo demo, qualquer e-mail/senha entra).

```bash
# Gerar build de produção
npm run build

# Pré-visualizar o build
npm run preview
```

---

## 📁 Estrutura do projeto

```
src/
├── assets/              # Imagens (WebP), logos e fotos
├── components/
│   └── site.tsx         # Navbar, Footer, Layout, contexto de contato, hooks (SEO, reveal)
├── lib/
│   ├── api.ts           # Cliente HTTP central (pronto p/ Laravel + Sanctum)
│   └── assets.ts        # Resolução de imagens via Vite
├── pages/               # Páginas públicas (Home, Segmentos, Metodologia, …)
├── admin/
│   ├── auth.tsx         # Autenticação (login/logout, token)
│   ├── RequireAuth.tsx  # Proteção de rotas
│   ├── AdminShell.tsx   # Layout do painel
│   └── pages/           # Editores de cada seção + Login + Dashboard
├── App.tsx              # Rotas (site público + /admin/*)
├── App.css              # Estilos do site
└── main.tsx             # Entry point
```

---

## 🔌 Integração com o back-end

O front-end já está **preparado para conectar** a uma API (planejada em **Laravel + Sanctum**):

- `src/lib/api.ts` — cliente HTTP central. Basta definir a variável de ambiente:

```env
# .env
VITE_API_URL=https://sua-api.com.br
```

- Sem `VITE_API_URL` definida, o painel roda em **modo demo** (não persiste dados).
- `src/admin/auth.tsx` já contém o fluxo real comentado (`POST /api/login`, `GET /api/user`, `POST /api/logout`).

Cada tela do admin corresponde a uma seção editável do site — o modelo de dados acompanha essa divisão (Home, Segmentos, Metodologia, Vivências, Espaços, Sobre, Momentos, Contato).

---

## 🌐 Deploy

O projeto está publicado na **Vercel**: [escola-cda.vercel.app](https://escola-cda.vercel.app/)

Cada `push` na branch `main` dispara um novo deploy automático.

---

## 👥 Créditos

Desenvolvido por **Matheus Proensa** (front-end) e **Júnior Ferreira** (back-end).

Projeto para a **Escola CDA** — R. José Manhago, 194 · Camobi, Santa Maria/RS.

---

<div align="center">
<sub>© 2026 Escola CDA · Feito com 💙 em Santa Maria/RS</sub>
</div>
