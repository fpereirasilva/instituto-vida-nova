import { mostrarToast } from './ui.js';

const CHAVE = 'ivn:voluntarios';

export function listarVoluntarios() {
  try {
    return JSON.parse(localStorage.getItem(CHAVE)) || [];
  } catch {
    return []; // dado corrompido ou storage bloqueado
  }
}

function gravar(lista) {
  try {
    localStorage.setItem(CHAVE, JSON.stringify(lista));
  } catch {
    mostrarToast('Não foi possível salvar no navegador.', 'erro');
  }
}

export function salvarVoluntario(dados) {
  const lista = listarVoluntarios();
  lista.push({ id: Date.now(), ...dados, criadoEm: new Date().toISOString() });
  gravar(lista);
}

export function removerVoluntario(id) {
  gravar(listarVoluntarios().filter(v => v.id !== id));
}

export function iniciarListaVoluntarios() {
  const lista = document.querySelector('.lista-voluntarios');
  if (!lista) return;
  lista.addEventListener('click', (e) => {
    const botao = e.target.closest('[data-acao="remover"]');
    if (!botao) return;
    removerVoluntario(Number(botao.dataset.id));
    botao.closest('li').remove();
    mostrarToast('Voluntário removido.');
  });
}
