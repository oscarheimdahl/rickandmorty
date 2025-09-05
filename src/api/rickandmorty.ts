import type { CharactersResponse } from './types';

const BASE_URL = 'https://rickandmortyapi.com/api/';

export async function fetchCharactersPage(page: number) {
  return fetchData<CharactersResponse>('character', page);
}

export async function fetchLocationsPage(page: number) {
  return fetchData('location', page);
}

export async function fetchEpisodesPage(page: number) {
  return fetchData('episode', page);
}

type Path = 'character' | 'location' | 'episode';
/**
 * @throws Error when fetch fails
 */
async function fetchData<T>(path: Path, page: number) {
  const res = await fetch(`${BASE_URL}${path}?page=${page}`, {
    headers: { 'Content-Type': 'application/json' },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json() as Promise<T>;
}
