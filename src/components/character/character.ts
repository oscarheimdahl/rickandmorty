import type { Character } from '../../api/types';

import './character.css';

export function Character(data: Character) {
  const characterDiv = document.createElement('button');
  characterDiv.className = 'character';

  const img = document.createElement('img');
  img.src = data.image;
  img.alt = data.name;
  img.className = 'character-image';

  const name = document.createElement('h2');
  name.textContent = data.name;
  name.className = 'character-name';

  characterDiv.appendChild(img);
  characterDiv.appendChild(name);

  return characterDiv;
}
