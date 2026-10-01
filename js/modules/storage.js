import { mostrarToast } from './ui.js';

const CHAVE = 'ivn:voluntarios';

export function listarVoluntarios() {
  try {
    return JSON.parse(localStorage.getItem(CHAVE)) || [];
  } catch {
    return []; // dado corrompido ou storage bloqueado
  }
}

// Retorna true só quando o navegador confirmou a gravação
function gravar(lista) {
  try {
    localStorage.setItem(CHAVE, JSON.stringify(lista));
    return true;
  } catch {
    mostrarToast('Não foi possível salvar no navegador.', 'erro');
    return false;
  }
}

export function salvarVoluntario(dados) {
  const lista = listarVoluntarios();
  lista.push({ id: Date.now(), ...dados, criadoEm: new Date().toISOString() });
  return gravar(lista);
}

export function removerVoluntario(id) {
  return gravar(listarVoluntarios().filter(v => v.id !== id));
}

export function iniciarListaVoluntarios() {
  const lista = document.querySelector('.lista-voluntarios');
  if (!lista) return;
  lista.addEventListener('click', (e) => {
    const botao = e.target.closest('[data-acao="remover"]');
    if (!botao) return;
    if (!removerVoluntario(Number(botao.dataset.id))) return;
    botao.closest('li').remove();
    // Removeu o último: mostra a mensagem de lista vazia sem precisar recarregar
    if (!lista.children.length) {
      lista.outerHTML = '<p>Nenhum voluntário cadastrado ainda. <a href="#/cadastro" data-link>Faça o primeiro cadastro</a>.</p>';
    }
    mostrarToast('Voluntário removido.');
  });
}
