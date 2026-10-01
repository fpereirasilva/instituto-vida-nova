import { iniciarRouter } from './modules/router.js';
import { registrarEventosGlobais } from './modules/events.js';

document.addEventListener('DOMContentLoaded', () => {
  registrarEventosGlobais();
  iniciarRouter();
});
