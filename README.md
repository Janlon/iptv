# IPTV LG webOS

Aplicativo IPTV otimizado para TVs LG webOS, consumindo listas Xtream Codes através de URL, usuário e senha. A interface foi desenhada para controle remoto, priorizando carregamento rápido, navegação fluida e exibição clara de filmes e séries.

## ✨ Recursos principais

- **Autenticação Xtream Codes** com persistência local das credenciais para reconexão imediata.
- **Estado global com React Query** para cache de categorias e catálogos, com pré-busca inteligente e revalidação automática em segundo plano.
- **Interface pronta para TV** com layout em abas (Filmes/Séries), lista de categorias, grade responsiva e painel de detalhes.
- **Navegação por controle remoto** (setas, Enter, Back, Play/Pause) com foco visual e skeletons durante o carregamento.
- **Otimizações de desempenho**: janela virtual na grade, placeholders leves, tempo limite de requisições e memoização de dados.
- **Testes com Vitest + Testing Library** cobrindo utilitários da API Xtream.

## 🧱 Estrutura do projeto

```text
src/
  App.tsx               # Provedor React Query e shell principal
  components/
    AppShell.tsx        # Decide entre login, loading e dashboard
  modules/
    auth/               # Contexto de autenticação e tela de login
    dashboard/          # Layout principal: categorias, grid e detalhes
    iptv/               # Cliente Xtream Codes e tipos
    navigation/         # Hook de navegação para controle remoto
  styles/
    global.css          # Estilos globais TV-first
```

## ✅ Pré-requisitos

- **Node.js 18+ (LTS recomendado)**
- **npm 9+** (instala junto com o Node)
- URL do servidor Xtream / usuário / senha ativos.

> ⚠️ Caso esteja em um ambiente sem Node/npm instalados, instale primeiro (Windows: [nodejs.org](https://nodejs.org/) → versão LTS). Depois reabra o terminal e confirme com `node --version` e `npm --version`.

## 🚀 Como iniciar

```bash
npm install
npm run dev
```

O Vite abrirá o servidor local em `http://localhost:5173`. Informe a URL Xtream (por exemplo, `http://seu-servidor.com:80/`), usuário e senha para carregar a biblioteca.

### Variáveis de ambiente (opcional)

Para fixar um endpoint padrão sem editar código, crie um arquivo `.env.local` e defina:

```bash
VITE_DEFAULT_BASE_URL=https://seu-servidor-iptv.com/
```

No login, o valor aparecerá pré-preenchido.

#### Bypass de CORS (recomendado para produção)

Alguns provedores Xtream bloqueiam requisições diretas do navegador. Configure um proxy reverso (qualquer serviço que aceite a URL de destino e retorne o JSON) e informe a rota através da variável:

```bash
VITE_XTREAM_PROXY_URL=https://seu-proxy.example.com/{url}
```

- Use `{url}` no template para ser substituído automaticamente pela URL Xtream codificada.
- Caso o proxy aceite parâmetros de query (`?url=`), basta apontar para `https://seu-proxy.example.com/proxy?url=`.
- Durante o desenvolvimento, você pode executar um pequeno relay local com [http-proxy-middleware](https://github.com/chimurai/http-proxy-middleware) ou serviços como Cloudflare Workers / Fly.io.

Quando definido, o app tentará primeiro a conexão direta; se falhar por CORS, repetirá a chamada via proxy antes de exibir o erro.

### Proxy local para testes rápidos

Para testar rapidamente sem publicar um proxy, use o script incluso:

```bash
npm run proxy
```

Ele inicia um servidor em `http://localhost:8787/proxy?url=...` que replica cabeçalhos necessários e libera CORS. Aponte o front-end para esse proxy adicionando no `.env.local`:

```bash
VITE_XTREAM_PROXY_URL=http://localhost:8787/proxy?url=
```

Principais variáveis de ambiente do proxy:

| Variável               | Propósito                                          | Default   |
|------------------------|----------------------------------------------------|-----------|
| `XTREAM_PROXY_PORT`    | Porta de escuta                                    | `8787`    |
| `XTREAM_PROXY_HOST`    | Host de binding (ex.: `127.0.0.1`)                 | `0.0.0.0` |
| `XTREAM_PROXY_ALLOW`   | Lista de hosts Xtream permitidos (vírgula)         | `*`       |
| `XTREAM_PROXY_ORIGINS` | Domínios liberados para CORS                       | `*`       |
| `REQUEST_TIMEOUT`      | Timeout em ms para as chamadas ao upstream         | `10000`   |

Execute `npm run proxy:check` para imprimir a configuração carregada antes de subir o serviço (útil em produção ou containers).

## 📦 Scripts

| Comando            | Descrição                                           |
|--------------------|-----------------------------------------------------|
| `npm run dev`      | Ambiente de desenvolvimento com Vite + HMR.         |
| `npm run build`    | Compila o app para produção (`dist/`).              |
| `npm run preview`  | Serve o build para inspeção local.                  |
| `npm run test`     | Executa testes com Vitest em ambiente JSDOM.        |
| `npm run proxy`    | Sobe o proxy local leve para contornar CORS.        |
| `npm run proxy:check` | Imprime a configuração atual do proxy e sai.    |

## 🧪 Testes

Os testes rodam com Vitest + Testing Library:

```bash
npm run test
```

O arquivo `src/modules/iptv/api.test.ts` cobre o utilitário `createXtreamUrl`. Expanda conforme adicionar novas regras de negócio (por exemplo, cache, controle de foco, limites de retry).

## 📺 Controles suportados

| Tecla remota | Ação                                    |
|--------------|------------------------------------------|
| ↑/↓          | Percorre categorias ou sobe/desce na grade |
| ←/→          | Alterna abas/categorias ou navega na grade |
| Enter/OK     | Seleciona item (reservado para player)     |
| Back/Esc     | Retorna ao painel anterior ou tela inicial |
| Play/Pause   | Pré-mapeado para extensão futura           |

## ⚙️ Estratégias de desempenho

- Cache de 10 minutos para categorias e catálogos.
- Pré-busca da aba inativa ao trocar de seção.
- Grade em janela (windowing) exibindo somente itens próximos ao foco.
- Skeletons animados para feedback imediato de carregamento.
- Timeout de 8 segundos nas requisições Xtream para evitar travamentos de UI.

## 📦 Empacotamento para webOS

1. Rode `npm run build` para gerar os arquivos em `dist/`.
2. Use o [webOS TV CLI](https://webostv.developer.lge.com/develop/tools/cli-introduction) para criar e assinar o pacote `.ipk`:
   - `ares-package dist`
   - `ares-install --device <apelido-do-dispositivo> dist.ipk`
3. Certifique-se de adicionar permissões de rede no `appinfo.json` (se aplicável) e testar em um emulador/TV real.

## 🗺️ Próximos passos sugeridos

- Integrar player de vídeo nativo do webOS (MediaPlayer/HTML5 video).
- Implementar favoritos e busca rápida.
- Adicionar monitoramento de saúde da API (fallbacks quando offline).
- Criar testes end-to-end (ex.: Playwright) simulando o controle remoto.

---

Dúvidas ou sugestões? Abra uma issue ou ajuste diretamente no código — a estrutura está pronta para evoluir rápido.
