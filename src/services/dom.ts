export function hideMainNavbar(): void {
  document?.getElementById('main-navbar')?.classList.add('is-hidden');
  document?.getElementById('react')?.classList.add('is-fullheight');
}

export function unhideMainNavbar(): void {
  document?.getElementById('main-navbar')?.classList.remove('is-hidden');
  document?.getElementById('react')?.classList.remove('is-fullheight');
}
