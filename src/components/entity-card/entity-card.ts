import type { Character, Episode, Location } from '../../api/types';

import './entity-card.css';

export type EntityCardClickDetail = {
  data: Character | Location | Episode;
  position: { x: number; y: number };
};

export function EntityCard(data: Character | Location | Episode) {
  const card = document.createElement('button');
  card.className = 'card rick-and-morty-text';

  if ('image' in data) {
    const img = new Image();
    img.src = data.image;
    img.alt = data.name;
    img.className = 'card-image';
    card.appendChild(img);
  }

  const name = document.createElement('h2');
  name.textContent = data.name;
  card.appendChild(name);

  if ('episode' in data && typeof data.episode === 'string') {
    const span = document.createElement('span');
    span.textContent = data.episode;
    span.className = 'entity-episode';
    card.appendChild(span);
  }

  card.addEventListener('click', (e) => {
    const event = new CustomEvent<EntityCardClickDetail>('entityCardClick', {
      detail: {
        data,
        position: {
          x: e.clientX,
          y: e.clientY,
        },
      },
    });
    window.dispatchEvent(event);
  });

  return card;
}
