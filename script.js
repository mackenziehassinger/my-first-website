const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.site-nav');

function closeMenu() {
  if (!menuButton || !navigation) return;
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open navigation');
  navigation.classList.remove('is-open');
}

if (menuButton && navigation) {
  menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!open));
    menuButton.setAttribute('aria-label', open ? 'Open navigation' : 'Close navigation');
    navigation.classList.toggle('is-open', !open);
  });

  navigation.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });
}

const filterButtons = document.querySelectorAll('.filter-button');
const editCards = document.querySelectorAll('.edit-card');

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    filterButtons.forEach((item) => {
      const active = item === button;
      item.classList.toggle('is-active', active);
      item.setAttribute('aria-pressed', String(active));
    });

    editCards.forEach((card) => {
      const show = filter === 'all' || card.dataset.category === filter;
      card.classList.toggle('is-hidden', !show);
      card.setAttribute('aria-hidden', String(!show));
    });
  });
});

document.querySelectorAll('img').forEach((image) => {
  image.addEventListener('error', () => {
    const frame = image.closest('.hero-photo, .shop-image, .edit-image, .visit-image');
    if (!frame || frame.querySelector('.image-error')) return;
    const fallback = document.createElement('span');
    fallback.className = 'image-error';
    fallback.textContent = 'Visit the shop to explore its latest collection';
    frame.append(fallback);
  }, { once: true });
});
