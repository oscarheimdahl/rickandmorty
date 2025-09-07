import type { Character, Episode, Location } from '../../api/types';
import type { EntityCardClickDetail } from '../entity-card/entity-card';

import './modal.css';

export function Modal() {
  let showModal = false;
  const modalContainer = document.createElement('div');
  modalContainer.className = 'modal-container hidden';

  const content = document.createElement('div');
  content.className = 'modal-content';
  modalContainer.appendChild(content);

  function closeModal() {
    modalContainer.classList.add('hidden');
    modalContainer.innerHTML = '';
  }

  modalContainer.addEventListener('click', (e) => {
    if (e.target === modalContainer) {
      closeModal();
      showModal = false;
    }
  });

  window.addEventListener('entityCardClick', (e) => {
    if (showModal) return;
    showModal = true;

    const { data, position } = (e as CustomEvent<EntityCardClickDetail>).detail;
    modalContainer.classList.remove('hidden');

    modalContainer.appendChild(buildPortal(position));
    const modal = buildModal(data);
    modalContainer.appendChild(modal);
    setTimeout(() => animateModalIn(modal, position), 500);
  });

  return modalContainer;
}

function buildPortal(position: { x: number; y: number }) {
  // Multiple divs to not have conflicting transforms
  const portalContainerPosition = document.createElement('div');
  portalContainerPosition.className = 'modal-portal-container-position';
  portalContainerPosition.style.transform = `translate(${position.x - 50}px, ${position.y - 50}px)`;

  const portalContainerScale = document.createElement('div');
  portalContainerScale.className = 'modal-portal-container-scale';

  const portal = document.createElement('div');
  portal.className = 'modal-portal';

  portalContainerScale.appendChild(portal);
  portalContainerPosition.appendChild(portalContainerScale);
  setTimeout(() => portalContainerPosition.remove(), 1500);

  return portalContainerPosition;
}

function buildModal(data: Character | Location | Episode) {
  console.log(data);
  const modalContent = document.createElement('div');
  modalContent.className = 'modal';

  const title = document.createElement('h1');
  title.textContent = data.name;
  modalContent.appendChild(title);

  return modalContent;
}

function animateModalIn(
  modal: HTMLDivElement,
  position: { x: number; y: number },
) {
  // To get correct final position, the modal needs to be rendered in the dom.
  const rect = modal.getBoundingClientRect();

  const offsetX = position.x - rect.left;
  const offsetY = position.y - rect.top;

  modal.style.transformOrigin = `${offsetX}px ${offsetY}px`;
  modal.style.transition = 'none';
  modal.style.transform = 'scale(0)';

  // Make sure div is rendered with scale 0 before animating back
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      modal.style.transition = 'transform 0.4s ease-in-out';
      modal.style.transform = 'scale(1)';
      modal.style.opacity = '1';
    });
  });
}
