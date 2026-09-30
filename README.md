# Instituto Vida Nova

Single Page Application do Instituto Vida Nova, ONG que atende crianças, jovens e famílias com projetos de reforço escolar, capacitação profissional e horta comunitária. O site apresenta os projetos, permite o cadastro de voluntários e mantém a lista de inscritos no navegador.

Projeto desenvolvido nas Experiências Práticas da disciplina Desenvolvimento Front-End para Web.

**Site publicado:** https://fpereirasilva.github.io/instituto-vida-nova/

## Funcionalidades

- Navegação SPA por hash (`#/inicio`, `#/projetos`, `#/cadastro`, `#/voluntarios`)
- Cards de projetos gerados por templates JavaScript e filtro por categoria
- Formulário com validação em tempo real, verificação de CPF e máscaras (IMask)
- Persistência dos voluntários no `localStorage`
- Acessibilidade WCAG 2.1 AA: contraste, foco visível, skip link, ARIA e navegação por teclado

## Tecnologias

HTML5, CSS3, JavaScript (ES Modules), [IMask](https://imask.js.org/) via CDN, esbuild (build) e sharp (WebP).

## Estrutura

```
html/            index.html (shell da SPA)
css/             reset.css, styles.css, build.css
js/main.js       ponto de entrada
js/modules/      router, templates, dados, events, form-validation, storage, ui, navegacao
images/          JPG/PNG originais + versões WebP
scripts/         build.mjs e images.mjs
.github/workflows/deploy.yml   deploy automático no GitHub Pages
```

## Como rodar localmente

Pré-requisito: Node.js 20+.

```bash
git clone https://github.com/fpereirasilva/instituto-vida-nova.git
cd instituto-vida-nova
npm install
npm run dev        # abre em http://localhost:5173/html/
```

Os módulos ES precisam de um servidor HTTP; abrir o `index.html` direto pelo sistema de arquivos não funciona.

## Build de produção

```bash
npm run images     # gera as versões WebP das imagens
npm run build      # gera a pasta dist/ com JS e CSS minificados
npm run preview    # serve a pasta dist/ em http://localhost:4173
```

## Deploy

Cada push na branch `main` dispara o workflow `.github/workflows/deploy.yml`, que instala as dependências, roda o build e publica a pasta `dist/` no GitHub Pages. Em **Settings > Pages**, a fonte deve estar como **GitHub Actions**.

## Fluxo de trabalho (GitFlow)

- `main`: versões publicadas, cada uma com tag (`v1.0.0`)
- `develop`: integração contínua do desenvolvimento
- `feature/*`: uma branch por funcionalidade, integrada em `develop` via pull request
- `release/*`: preparação de versão (ajustes finais e número de versão)
- `hotfix/*`: correções urgentes a partir de `main`

Commits seguem o padrão Conventional Commits (`feat:`, `fix:`, `docs:`, `build:`, `perf:`, `chore:`).

## Manutenção

- Novo projeto social: adicionar um objeto em `js/modules/dados.js` e a imagem em `images/`, depois rodar `npm run images`.
- Nova regra de validação: incluir no objeto `regras` de `js/modules/form-validation.js`.
- Os dados de voluntários ficam só no navegador do usuário (chave `ivn:voluntarios`). Uma integração com API deve substituir as funções de `js/modules/storage.js`.

## Autor

Fabio Silva
