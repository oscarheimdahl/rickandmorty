import {
  fetchCharactersPage,
  fetchEpisodesPage,
  fetchLocationsPage,
} from '../../api/rickandmorty-api';
import { getActivePageTypeFromHash, getPageSearchParam } from '../../utils/url';
import { EntityCard } from '../entity-card/entity-card';
import { Modal } from '../modal/modal';
import { Pagination } from '../pagination/pagination';
import { Tabs } from '../tabs/tabs';
import { ErrorMessage } from './error-message/error-message';

import './main-body.css';

export type ActivePageType = 'characters' | 'locations' | 'episodes';

export function MainBody() {
  const body = document.createElement('div');
  body.className = 'main-body';
  const bodyWrapper = document.createElement('div');
  bodyWrapper.className = 'main-body-wrapper';

  const cardsGrid = document.createElement('div');
  cardsGrid.className = 'cards-grid';

  async function loadEntities() {
    bodyWrapper.classList.add('loading');
    const activePageType = getActivePageTypeFromHash();
    const pageNumber = getPageSearchParam();

    try {
      const data = await fetchEntities(activePageType, pageNumber);
      const entities = data.results;
      const totalPages = data.info.pages;
      cardsGrid.innerHTML = '';
      entities?.forEach((entity) => cardsGrid.appendChild(EntityCard(entity)));
      document.querySelector('.pagination')?.remove();
      body.appendChild(Pagination(pageNumber, totalPages, loadEntities));
    } catch (e) {
      cardsGrid.innerHTML = '';
      cardsGrid.appendChild(ErrorMessage(activePageType));
    }

    bodyWrapper.classList.remove('loading');
  }

  loadEntities();
  body.appendChild(Tabs(loadEntities));
  body.appendChild(cardsGrid);
  body.appendChild(Modal());
  bodyWrapper.appendChild(body);

  return bodyWrapper;
}

async function fetchEntities(activePage: ActivePageType, pageNumber: number) {
  if (activePage === 'locations') return fetchLocationsPage(pageNumber);
  else if (activePage === 'episodes') return fetchEpisodesPage(pageNumber);
  else return fetchCharactersPage(pageNumber); // Characters is default
}
