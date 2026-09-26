(() => {
  'use strict';

  const searchForm = document.getElementById('search-form');
  const purposeButtons = [...document.querySelectorAll('[data-purpose]')];
  const navLinks = [...document.querySelectorAll('[data-nav]')];
  const searchType = document.getElementById('property-type');
  const searchArea = document.getElementById('min-area');
  const menuButton = document.getElementById('menu-button');
  const menu = document.getElementById('main-menu');
  const dialog = document.getElementById('soon-dialog');
  const dialogDescription = document.getElementById('soon-description');
  let purpose = 'alugar';

  function choosePurpose(nextPurpose) {
    purpose = nextPurpose;
    purposeButtons.forEach((button) => {
      const selected = button.dataset.purpose === purpose;
      button.classList.toggle('selected', selected);
      button.setAttribute('aria-pressed', String(selected));
    });
    navLinks.forEach((link) => link.classList.toggle('active', link.dataset.nav === purpose));
  }

  function closeMenu() {
    if (!menu || !menuButton) return;
    menu.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Abrir menu');
  }

  function showComingSoon(message) {
    dialogDescription.textContent = message;
    if (typeof dialog.showModal === 'function') dialog.showModal();
    else window.alert(message);
  }

  purposeButtons.forEach((button) => button.addEventListener('click', () => choosePurpose(button.dataset.purpose)));

  navLinks.forEach((link) => link.addEventListener('click', () => {
    choosePurpose(link.dataset.nav);
    closeMenu();
  }));

  menuButton.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
  });
  menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));

  document.querySelectorAll('[data-category]').forEach((link) => link.addEventListener('click', () => {
    searchType.value = link.dataset.category;
  }));

  // A busca da home usa as páginas reais de categoria e os filtros do catálogo local.
  // Ainda não consulta anúncios externos em tempo real nem busca um banco de dados.
  searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const destinos = {
      galpao: 'galpoes.html',
      estudio: 'estudios.html',
      comercial: 'salas-comerciais.html'
    };
    const tipo = searchType.value;
    const destino = destinos[tipo] || 'novidades.html';
    const parametros = new URLSearchParams();
    const area = searchArea.value;
    const local = document.getElementById('location').value.trim();
    if (tipo !== 'todos' && !destinos[tipo]) parametros.set('tipo',tipo);
    if (area !== '0') parametros.set('area',area);
    const cidadeNormalizada = local.toLowerCase().replaceAll(" ", "");
    if (local && !["indaiatuba","indaiatuba,sp","indaiatubasp"].includes(cidadeNormalizada)) {
      // Aceita bairro específico ou outra cidade, que exibirá zero resultados se não cadastrada.
      parametros.set('bairro',local.split(',')[0].trim());
    }
    if (purpose !== 'alugar') parametros.set('finalidade',purpose);
    const query = parametros.toString();
    window.location.assign(destino+(query?'?'+query:''));
  });

  document.querySelectorAll('[data-coming-soon]').forEach((control) => control.addEventListener('click', (event) => {
    if (control.tagName === 'A') event.preventDefault();
    const action = control.dataset.comingSoon;
    showComingSoon(`A funcionalidade de ${action} está planejada, mas ainda não foi implementada. Esta é somente a primeira tela visual do LUC Imóveis, sem cadastro de usuários nem envio de dados.`);
  }));

  document.getElementById('year').textContent = String(new Date().getFullYear());
})();