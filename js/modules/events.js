export function registrarEventosGlobais() {
  // O skip link não pode alterar o hash, senão o roteador entende "#app" como uma rota
  document.querySelector('.pular-link')?.addEventListener('click', (evento) => {
    evento.preventDefault();
    document.getElementById('app').focus();
  });

  const toggle = document.querySelector('.menu__toggle');
  const lista = document.getElementById('menu-lista');

  toggle.addEventListener('click', () => {
    const aberto = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!aberto));
    lista.classList.toggle('aberto', !aberto);
  });

  // Delegação de eventos: um único listener no <main> atende os cards criados dinamicamente
  document.getElementById('app').addEventListener('click', (evento) => {
    const botao = evento.target.closest('[data-acao="detalhes"]');
    if (!botao) return;
    const descricao = botao.previousElementSibling;
    const aberto = !descricao.hidden;
    descricao.hidden = aberto;
    botao.setAttribute('aria-expanded', String(!aberto));
    botao.textContent = aberto ? 'Ver detalhes' : 'Ocultar detalhes';
  });

  document.addEventListener('keydown', (evento) => {
    if (evento.key === 'Escape' && lista.classList.contains('aberto')) {
      lista.classList.remove('aberto');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.focus();
    }
  });
}

export function iniciarFiltroProjetos() {
  const botoes = document.querySelectorAll('.filtro');
  botoes.forEach(botao => botao.addEventListener('click', () => {
    botoes.forEach(b => { b.classList.remove('ativo'); b.setAttribute('aria-pressed', 'false'); });
    botao.classList.add('ativo');
    botao.setAttribute('aria-pressed', 'true');
    const filtro = botao.dataset.filtro;
    document.querySelectorAll('#lista-projetos .card').forEach(card => {
      card.hidden = filtro !== 'todos' && card.dataset.categoria !== filtro;
    });
  }));
}
