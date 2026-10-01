import { marcarErro, mostrarToast } from './ui.js';
import { salvarVoluntario } from './storage.js';
import { navegar } from './navegacao.js';

const regras = {
  nome:     v => v.trim().length >= 3 || 'Informe seu nome completo (mínimo 3 letras).',
  email:    v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) || 'Digite um e-mail válido.',
  cpf:      v => cpfValido(v) || 'CPF inválido.',
  telefone: v => /^\(\d{2}\) \d{4,5}-\d{4}$/.test(v) || 'Telefone no formato (00) 00000-0000.',
  cep:      v => /^\d{5}-\d{3}$/.test(v) || 'CEP no formato 00000-000.',
  cidade:   v => v.trim().length >= 2 || 'Informe a cidade.',
  projeto:  v => v !== '' || 'Escolha um projeto de interesse.'
};

export function cpfValido(valor) {
  const cpf = valor.replace(/\D/g, '');
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
  const digito = (base) => {
    let soma = 0;
    for (let i = 0; i < base; i++) soma += Number(cpf[i]) * (base + 1 - i);
    const resto = (soma * 10) % 11;
    return resto === 10 ? 0 : resto;
  };
  return digito(9) === Number(cpf[9]) && digito(10) === Number(cpf[10]);
}

function validarCampo(campo) {
  const regra = regras[campo.name];
  if (!regra) return true;
  const resultado = regra(campo.value);
  marcarErro(campo, resultado === true ? '' : resultado);
  return resultado === true;
}

function aplicarMascaras(form) {
  if (!window.IMask) return; // se a CDN falhar, o formulário continua funcionando só com a validação
  IMask(form.cpf, { mask: '000.000.000-00' });
  IMask(form.telefone, { mask: [{ mask: '(00) 0000-0000' }, { mask: '(00) 00000-0000' }] });
  IMask(form.cep, { mask: '00000-000' });
}

export function iniciarFormulario() {
  const form = document.getElementById('form-cadastro');
  if (!form) return;
  aplicarMascaras(form);

  form.addEventListener('blur', (e) => { if (e.target.name) validarCampo(e.target); }, true);
  form.addEventListener('input', (e) => {
    if (e.target.classList.contains('invalido')) validarCampo(e.target);
  });

  form.addEventListener('submit', (evento) => {
    evento.preventDefault();
    const campos = [...form.elements].filter(el => el.name);
    const valido = campos.map(validarCampo).every(Boolean);

    if (!valido) {
      form.querySelector('.invalido').focus();
      mostrarToast('Confira os campos destacados.', 'erro');
      return;
    }

    const dados = Object.fromEntries(new FormData(form));
    if (!salvarVoluntario(dados)) return; // o erro já foi exibido pelo storage
    form.reset();
    mostrarToast(`Obrigado, ${dados.nome.split(' ')[0]}! Cadastro realizado.`);
    navegar('/voluntarios');
  });
}
