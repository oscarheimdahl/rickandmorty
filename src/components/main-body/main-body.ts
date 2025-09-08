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
import { getActivePageTypeFromHash, getPageSearchParam } from '../../utils/url';
import { EntityCard } from '../entity-card/entity-card';
import { Modal } from '../modal/modal';
import { Pagination } from '../pagination/pagination';
import { Tabs } from '../tabs/tabs';
import { ErrorMessage } from './error-message/error-message';

import './main-body.css';

export type ActivePageType = 'characters' | 'locations' | 'episodes';

export function MainBody() {
  const pageNumber = getPageSearchParam();
  const activePageType = getActivePageTypeFromHash();

  const body = document.createElement('div');
  body.className = 'main-body loading';

  const cardsGrid = document.createElement('div');
  cardsGrid.className = 'cards-grid';

  async function loadEntities() {
    body.classList.add('loading');
    const activePage = getActivePageTypeFromHash();
    const pageNumber = getPageSearchParam();
    try {
      const data = await fetchEntities(activePage, pageNumber);
      const entities = data.results;
      const totalPages = data.info.pages;
      cardsGrid.innerHTML = '';
      entities?.forEach((entity) => cardsGrid.appendChild(EntityCard(entity)));
      body.appendChild(Pagination(pageNumber, totalPages, loadEntities));
    } catch (e) {
      cardsGrid.innerHTML = '';
      cardsGrid.appendChild(ErrorMessage(activePage));
    }
    body.classList.remove('loading');
  }

  loadEntities();
  body.appendChild(Tabs(activePageType, loadEntities));
  body.appendChild(cardsGrid);

  body.appendChild(Modal());
  return body;
}

async function fetchEntities(activePage: ActivePageType, pageNumber: number) {
  let entities:
    | CharactersResponse
    | LocationsResponse
    | EpisodesResponse
    | undefined = undefined;
  if (activePage === 'locations')
    entities = await fetchLocationsPage(pageNumber);
  else if (activePage === 'episodes')
    entities = await fetchEpisodesPage(pageNumber);
  else entities = await fetchCharactersPage(pageNumber); // Characters is default

  return entities;
}
