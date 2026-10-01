import { paginaInicio, paginaProjetos, paginaCadastro, paginaVoluntarios, paginaNaoEncontrada } from './templates.js';
import { iniciarFormulario } from './form-validation.js';
import { iniciarFiltroProjetos } from './events.js';
import { listarVoluntarios, iniciarListaVoluntarios } from './storage.js';

const rotas = {
  '/inicio':      { titulo: 'Início',      render: paginaInicio },
  '/projetos':    { titulo: 'Projetos',    render: paginaProjetos,    depois: iniciarFiltroProjetos },
  '/cadastro':    { titulo: 'Cadastre-se', render: paginaCadastro,    depois: iniciarFormulario },
  '/voluntarios': { titulo: 'Voluntários', render: () => paginaVoluntarios(listarVoluntarios()), depois: iniciarListaVoluntarios }
};

let primeiraRenderizacao = true;

function renderizar() {
  const caminho = window.location.hash.replace('#', '') || '/inicio';
  const rota = rotas[caminho];
  const app = document.getElementById('app');

  app.innerHTML = rota ? rota.render() : paginaNaoEncontrada();
  document.title = `${rota ? rota.titulo : 'Página não encontrada'} | Instituto Vida Nova`;

  document.querySelectorAll('[data-link]').forEach(link => {
    const ativo = link.getAttribute('href') === `#${caminho}`;
    link.classList.toggle('ativo', ativo);
    ativo ? link.setAttribute('aria-current', 'page') : link.removeAttribute('aria-current');
  });

  if (rota && rota.depois) rota.depois();
  // Na carga inicial o foco fica no topo (skip link); nas trocas de rota vai para o conteúdo
  if (!primeiraRenderizacao) app.focus();
  primeiraRenderizacao = false;
}

export function iniciarRouter() {
  window.addEventListener('hashchange', renderizar);
  renderizar();
}
