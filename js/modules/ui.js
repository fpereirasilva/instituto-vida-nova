export function mostrarToast(mensagem, tipo = 'sucesso') {
  const toast = document.getElementById('toast');
  toast.textContent = mensagem;
  toast.className = `toast toast--${tipo}`;
  toast.hidden = false;
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => { toast.hidden = true; }, 3500);
}

export function marcarErro(campo, mensagem) {
  const span = document.getElementById(`erro-${campo.id}`);
  campo.setAttribute('aria-invalid', mensagem ? 'true' : 'false');
  campo.classList.toggle('invalido', Boolean(mensagem));
  campo.classList.toggle('valido', !mensagem);
  if (span) span.textContent = mensagem || '';
}
