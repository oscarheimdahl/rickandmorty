import type { Character, Episode, Location } from '../../api/types';
import type { EntityCardClickDetail } from '../entity-card/entity-card';

import './modal.css';

export function Modal() {
  let showModal = false;
  const modalContainer = document.createElement('div');
  modalContainer.className = 'modal-background hidden';

  const content = document.createElement('div');
  content.className = 'modal-content';
  modalContainer.appendChild(content);

  function closeModal() {
    modalContainer.classList.add('hidden');
    modalContainer.innerHTML = '';
  }

  function openModal(
    data: Character | Location | Episode,
    position: { x: number; y: number },
  ) {
    modalContainer.appendChild(buildPortal(position));
    const modal = buildModal(data);
    modalContainer.appendChild(modal);
    setTimeout(() => animateModalIn(modal, position), 500);
  }

  modalContainer.addEventListener('click', (e) => {
    if (e.target === modalContainer) {
      closeModal();
      showModal = false;
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && showModal) {
      closeModal();
      showModal = false;
    }
  });

  window.addEventListener('entityCardClick', (e) => {
    if (showModal) return;
    showModal = true;

    const { data, position } = (e as CustomEvent<EntityCardClickDetail>).detail;
    modalContainer.classList.remove('hidden');

    openModal(data, position);
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
  const modalContainer = document.createElement('div');
  modalContainer.className = 'modal-container';
  const modalContent = document.createElement('div');
  modalContent.className = 'modal';

  if ('image' in data) {
    const img = new Image();
    img.src = data.image;
    img.alt = data.name;
    img.className = 'modal-image';
    modalContent.appendChild(img);
  }

  const title = document.createElement('h1');
  title.textContent = data.name;
  title.className = 'rick-and-morty-text';
  modalContent.appendChild(title);

  if ('species' in data) {
    const species = document.createElement('p');
    species.textContent = 'Species: ' + data.species;
    modalContent.appendChild(species);
  }

  if ('gender' in data) {
    const gender = document.createElement('p');
    gender.textContent = 'Gender: ' + data.gender;
    modalContent.appendChild(gender);
  }

  if ('origin' in data) {
    const origin = document.createElement('p');
    origin.textContent = 'Origin: ' + data.origin.name;
    modalContent.appendChild(origin);
  }

  if ('status' in data) {
    const status = document.createElement('p');
    status.textContent = 'Status: ' + data.status;
    modalContent.appendChild(status);
  }

  if ('location' in data) {
    const location = document.createElement('p');
    location.textContent = 'Location: ' + data.location.name;
    modalContent.appendChild(location);
  }

  // Episode
  if ('episode' in data && typeof data.episode === 'string') {
    const span = document.createElement('span');
    span.textContent = data.episode;
    span.className = 'modal-episode';
    modalContent.appendChild(span);
  }

  if ('air_date' in data) {
    const span = document.createElement('span');
    span.textContent = 'Air date: ' + data.air_date;
    span.className = 'modal-air-date';
    modalContent.appendChild(span);
  }

  if ('type' in data) {
    const type = document.createElement('p');
    type.textContent = 'Type: ' + (data.type || 'Unknown');
    modalContent.appendChild(type);
  }

  if ('dimension' in data) {
    const dimension = document.createElement('p');
    dimension.textContent = 'Dimension: ' + data.dimension;
    modalContent.appendChild(dimension);
  }

  modalContainer.appendChild(modalContent);
  return modalContainer;
}

function animateModalIn(
  modal: HTMLDivElement,
  position: { x: number; y: number },
) {
  // To get correct final position, the modal needs to be first rendered in the dom.
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
