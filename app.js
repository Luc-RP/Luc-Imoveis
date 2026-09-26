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

  // A seção de resultados fictícios foi removida a pedido do proprietário.
  // Mantemos os controles visuais e informamos que ainda não existe uma busca real.
  searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const typeLabel = searchType.options[searchType.selectedIndex].text;
    const minimum = searchArea.value === '0'
      ? 'qualquer área'
      : `área mínima de ${searchArea.options[searchArea.selectedIndex].text}`;
    showComingSoon(`Você selecionou ${typeLabel.toLowerCase()}, ${minimum}. A busca de anúncios reais ainda está em desenvolvimento. Nenhum imóvel ou cadastro foi consultado.`);
  });

  document.querySelectorAll('[data-coming-soon]').forEach((control) => control.addEventListener('click', (event) => {
    if (control.tagName === 'A') event.preventDefault();
    const action = control.dataset.comingSoon;
    showComingSoon(`A funcionalidade de ${action} está planejada, mas ainda não foi implementada. Esta é somente a primeira tela visual do LUC Imóveis, sem cadastro de usuários nem envio de dados.`);
  }));

  document.getElementById('year').textContent = String(new Date().getFullYear());
})();