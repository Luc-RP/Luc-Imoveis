(() => {
  'use strict';

  const searchForm = document.getElementById('search-form');
  const purposeButtons = [...document.querySelectorAll('[data-purpose]')];
  const navLinks = [...document.querySelectorAll('[data-nav]')];
  const cards = [...document.querySelectorAll('.listing-card')];
  const searchType = document.getElementById('property-type');
  const searchArea = document.getElementById('min-area');
  const searchLocation = document.getElementById('location');
  const resultsMessage = document.getElementById('results-message');
  const emptyState = document.getElementById('empty-state');
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
    menu.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Abrir menu');
  }

  function normalize(value) {
    return String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
  }

  function runDemoSearch() {
    const type = searchType.value;
    const minimum = Number(searchArea.value);
    const location = normalize(searchLocation.value);
    // Os três cartões são exemplos fictícios de Indaiatuba, não uma consulta a anúncios reais.
    const matchesLocation = !location || location === 'sp' || location.includes('indaiatuba');
    let count = 0;
    cards.forEach((card) => {
      const show = card.dataset.purpose === purpose &&
        (type === 'todos' || card.dataset.type === type) &&
        Number(card.dataset.area) >= minimum && matchesLocation;
      card.hidden = !show;
      if (show) count += 1;
    });
    emptyState.hidden = count > 0;
    resultsMessage.textContent = count
      ? `${count} ${count === 1 ? 'exemplo encontrado' : 'exemplos encontrados'} nesta prévia. Nenhum anúncio real foi consultado.`
      : 'Nenhum exemplo corresponde aos filtros escolhidos. A busca real ainda será implementada.';
    document.getElementById('anuncios').scrollIntoView({ behavior: 'smooth', block: 'start' });
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
  searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    runDemoSearch();
  });

  document.querySelectorAll('[data-coming-soon]').forEach((button) => button.addEventListener('click', () => {
    const action = button.dataset.comingSoon;
    dialogDescription.textContent = `A funcionalidade de ${action} está planejada, mas ainda não foi implementada. Esta é somente a primeira tela visual do LUC Imóveis, sem cadastro de usuários nem envio de dados.`;
    if (typeof dialog.showModal === 'function') dialog.showModal();
    else window.alert(dialogDescription.textContent);
  }));

  document.getElementById('year').textContent = String(new Date().getFullYear());
})();