import portal from '../../images/portal.png';

import './background.css';

export function Background() {
  const portalImg = document.createElement('img');
  portalImg.className = 'background-image';
  portalImg.src = portal;

  const imageContainer = document.createElement('div');
  imageContainer.className = 'background-image-container';
  imageContainer.appendChild(portalImg);

  return imageContainer;
}
