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
import { Modal } from '../modal/modal';
import { Tabs } from '../tabs/tabs';
import { ErrorMessage } from './error-message/error-message';

import './main-body.css';

export type ActivePage = 'characters' | 'locations' | 'episodes';

export function MainBody() {
  const activePage = getActivePageFromHash();

  const body = document.createElement('div');
  body.className = 'main-modal loading';

  const cardsGrid = document.createElement('div');
  cardsGrid.className = 'cards-grid';

  async function loadEntities() {
    body.classList.add('loading');
    const activePage = getActivePageFromHash();
    try {
      const entities = await fetchEntities(activePage);
      cardsGrid.innerHTML = '';
      entities?.forEach((entity) => cardsGrid.appendChild(EntityCard(entity)));
    } catch (e) {
      cardsGrid.innerHTML = '';
      cardsGrid.appendChild(ErrorMessage(activePage));
    }
    body.classList.remove('loading');
  }

  loadEntities();
  body.appendChild(Tabs(activePage, loadEntities));
  body.appendChild(cardsGrid);
  body.appendChild(Modal());
  return body;
}

async function fetchEntities(activePage: ActivePage) {
  let entities:
    | CharactersResponse
    | LocationsResponse
    | EpisodesResponse
    | undefined = undefined;
  if (activePage === 'locations') entities = await fetchLocationsPage(1);
  else if (activePage === 'episodes') entities = await fetchEpisodesPage(1);
  else entities = await fetchCharactersPage(1); // Characters is default

  return entities.results;
}

const sleep = async (msec: number) => {
  return new Promise((resolve) => setTimeout(resolve, msec));
};

function getActivePageFromHash(): ActivePage {
  const hash = window.location.hash;
  if (hash.includes('locations')) return 'locations';
  if (hash.includes('episodes')) return 'episodes';
  return 'characters';
}
