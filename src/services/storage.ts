const storageId = 'chat:loggedIn';
const storageValue = 'true';

export function getLoggedInFlag(): boolean {
  return localStorage.getItem(storageId) === storageValue;
}

export function setLoggedInFlag(): void {
  localStorage.setItem(storageId, storageValue);
}

export function clearLoggedInFlag(): void {
  localStorage.removeItem(storageId);
}
