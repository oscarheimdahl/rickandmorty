import { fetchCharactersPage } from '../../api/rickandmorty';
import { Character } from '../character/character';
import { Tabs } from '../tabs/tabs';

import './main-body.css';

export function MainBody() {
  const entityPage = window.location.hash ?? 'characters';
  const body = document.createElement('div');
  body.className = 'main-modal loading';

  const cardsGrid = document.createElement('div');
  cardsGrid.className = 'cards-grid';

  fetchAndAppendEntities(entityPage, cardsGrid, () => {
    body.classList.remove('loading');
  });

  body.appendChild(Tabs());
  body.appendChild(cardsGrid);
  return body;
}

async function fetchAndAppendEntities(
  entityPage: string,
  cardsGrid: HTMLDivElement,
  onComplete: () => void,
) {
  const characters = await fetchCharactersPage(1);
  characters.results.forEach((char) => {
    cardsGrid.appendChild(Character(char));
  });
  onComplete();
}
