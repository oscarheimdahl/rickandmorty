import {
  fetchCharactersPage,
  fetchEpisodesPage,
  fetchLocationsPage,
} from '../../api/rickandmorty-api';
import type {
  CharactersResponse,
  EpisodesResponse,
  LocationsResponse,
} from '../../api/types';
import { EntityCard } from '../entity-card/entity-card';
import { Tabs } from '../tabs/tabs';

import './main-body.css';

export type ActivePage = 'characters' | 'locations' | 'episodes';

export function MainBody() {
  const activePage = getActivePageFromHash();

  const body = document.createElement('div');
  body.className = 'main-modal loading';

  const cardsGrid = document.createElement('div');
  cardsGrid.className = 'cards-grid';

  async function loadEntities() {
    const activePage = getActivePageFromHash();
    const entities = await fetchEntities(activePage);
    cardsGrid.innerHTML = '';
    entities?.forEach((entity) => cardsGrid.appendChild(entity));
    body.classList.remove('loading');
  }

  loadEntities();

  body.appendChild(Tabs(activePage, loadEntities));
  body.appendChild(cardsGrid);
  return body;
}

async function fetchEntities(
  activePage: ActivePage,
  // cardsGrid: HTMLDivElement,
  // onComplete: () => void,
) {
  let entities:
    | CharactersResponse
    | LocationsResponse
    | EpisodesResponse
    | undefined = undefined;
  if (activePage === 'locations') entities = await fetchLocationsPage(1);
  else if (activePage === 'episodes') entities = await fetchEpisodesPage(1);
  else entities = await fetchCharactersPage(1); // Characters is default

  if (!entities) return;

  return entities.results.map((entity) => EntityCard(entity));
}

function getActivePageFromHash(): ActivePage {
  const hash = window.location.hash;
  if (hash.includes('locations')) return 'locations';
  if (hash.includes('episodes')) return 'episodes';
  return 'characters';
}
