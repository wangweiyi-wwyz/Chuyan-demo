const mobileNav = document.querySelector('aside nav');
const mobileNavButton = document.createElement('button');
mobileNav.id = 'site-navigation';
mobileNavButton.type = 'button';
mobileNavButton.className = 'secondary mobile-nav-toggle';
mobileNavButton.textContent = '导航菜单';
mobileNavButton.setAttribute('aria-controls', mobileNav.id);
mobileNav.before(mobileNavButton);
const mobileLayout = window.matchMedia('(max-width: 760px)');

function setMobileNav(open) {
  mobileNav.hidden = mobileLayout.matches && !open;
  mobileNavButton.setAttribute('aria-expanded', String(!mobileNav.hidden));
}
mobileNavButton.addEventListener('click', () => setMobileNav(mobileNav.hidden));
mobileNav.addEventListener('click', event => {
  if (mobileLayout.matches && event.target.closest('button')) setMobileNav(false);
});
mobileLayout.addEventListener('change', () => setMobileNav(false));
setMobileNav(false);
