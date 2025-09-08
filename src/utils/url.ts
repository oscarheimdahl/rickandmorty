import type { ActivePageType } from '../components/main-body/main-body';

export function setPageSearchParam(page: number) {
  const hash = window.location.hash || '#';
  const [base, queryString] = hash.split('?');
  const urlParams = new URLSearchParams(queryString ?? '');
  urlParams.set('page', String(page));
  const newHash = `${base}?${urlParams.toString()}`;
  window.location.hash = newHash;
}

export function getPageSearchParam() {
  const hash = window.location.hash;
  const queryString = hash.split('?')[1] ?? '';
  const urlParams = new URLSearchParams(queryString);
  const pageParam = urlParams.get('page');
  const pageNumber = pageParam ? Number(pageParam) : 1;
  return pageNumber;
}

export function getActivePageTypeFromHash(): ActivePageType {
  const hash = window.location.hash;
  if (hash.includes('locations')) return 'locations';
  if (hash.includes('episodes')) return 'episodes';
  return 'characters';
}
