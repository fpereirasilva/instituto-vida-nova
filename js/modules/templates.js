import { projetos } from './dados.js';

const escapar = (texto) => String(texto).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

export const cardProjeto = ({ id, titulo, categoria, imagem, alt, descricao }) => `
  <article class="card" data-categoria="${categoria}" id="projeto-${id}">
    <img src="../images/${imagem}" alt="${alt}" loading="lazy">
    <div class="card__corpo">
      <span class="card__tag">${categoria}</span>
      <h3>${titulo}</h3>
      <p class="card__descricao" hidden>${descricao}</p>
      <button class="btn btn--secundario" data-acao="detalhes" aria-expanded="false">Ver detalhes</button>
    </div>
  </article>`;

export const paginaInicio = () => `
  <section class="hero">
    <h1>Instituto Vida Nova</h1>
    <p>Há mais de 10 anos apoiando crianças, jovens e famílias da nossa comunidade.</p>
    <a href="#/cadastro" class="btn" data-link>Quero ser voluntário</a>
  </section>
  <section class="destaques">
    <h2>Projetos em destaque</h2>
    <div class="grade">${projetos.slice(0, 3).map(cardProjeto).join('')}</div>
  </section>`;

export const paginaProjetos = () => `
  <section>
    <h1>Nossos projetos sociais</h1>
    <div class="filtros" role="group" aria-label="Filtrar projetos">
      <button class="filtro ativo" data-filtro="todos">Todos</button>
      <button class="filtro" data-filtro="Educação">Educação</button>
      <button class="filtro" data-filtro="Capacitação">Capacitação</button>
      <button class="filtro" data-filtro="Meio ambiente">Meio ambiente</button>
    </div>
    <div class="grade" id="lista-projetos">${projetos.map(cardProjeto).join('')}</div>
  </section>`;

export const paginaCadastro = () => `
  <section>
    <h1>Cadastro de voluntário</h1>
    <form id="form-cadastro" novalidate>
      <fieldset>
        <legend>Dados pessoais</legend>
        <label for="nome">Nome completo</label>
        <input type="text" id="nome" name="nome" required minlength="3">
        <span class="erro" id="erro-nome"></span>

        <label for="email">E-mail</label>
        <input type="email" id="email" name="email" required>
        <span class="erro" id="erro-email"></span>

        <label for="cpf">CPF</label>
        <input type="text" id="cpf" name="cpf" required placeholder="000.000.000-00">
        <span class="erro" id="erro-cpf"></span>

        <label for="telefone">Telefone</label>
        <input type="tel" id="telefone" name="telefone" required placeholder="(00) 00000-0000">
        <span class="erro" id="erro-telefone"></span>
      </fieldset>
      <fieldset>
        <legend>Endereço</legend>
        <label for="cep">CEP</label>
        <input type="text" id="cep" name="cep" required placeholder="00000-000">
        <span class="erro" id="erro-cep"></span>

        <label for="cidade">Cidade</label>
        <input type="text" id="cidade" name="cidade" required>
        <span class="erro" id="erro-cidade"></span>
      </fieldset>
      <fieldset>
        <legend>Interesse</legend>
        <label for="projeto">Projeto de interesse</label>
        <select id="projeto" name="projeto" required>
          <option value="">Selecione</option>
          ${projetos.map(p => `<option value="${p.titulo}">${p.titulo}</option>`).join('')}
        </select>
        <span class="erro" id="erro-projeto"></span>
      </fieldset>
      <button type="submit" class="btn">Enviar cadastro</button>
    </form>
  </section>`;

export const paginaVoluntarios = (lista) => `
  <section>
    <h1>Voluntários cadastrados</h1>
    ${lista.length === 0
      ? '<p>Nenhum voluntário cadastrado ainda. <a href="#/cadastro" data-link>Faça o primeiro cadastro</a>.</p>'
      : `<ul class="lista-voluntarios">${lista.map(v => `
          <li data-id="${v.id}">
            <strong>${escapar(v.nome)}</strong> - ${escapar(v.projeto)} <small>(${escapar(v.cidade)})</small>
            <button class="btn btn--perigo" data-acao="remover" data-id="${v.id}">Remover</button>
          </li>`).join('')}</ul>`}
  </section>`;

export const paginaNaoEncontrada = () => `
  <section><h1>Página não encontrada</h1><p><a href="#/inicio" data-link>Voltar ao início</a></p></section>`;
