import { setPageSearchParam } from '../../utils/url';

import './pagination.css';

export function Pagination(
  pageNumber: number,
  totalPages: number,
  loadEntities: () => void,
) {
  const paginationContainer = document.createElement('div');
  paginationContainer.className = 'pagination';

  const prevButton = document.createElement('button');
  prevButton.className = 'pagination-button prev-button';
  prevButton.textContent = 'Previous';
  prevButton.disabled = pageNumber <= 1;

  const pageNumberSpan = document.createElement('span');
  pageNumberSpan.textContent = pageNumber.toString();

  const nextButton = document.createElement('button');
  nextButton.className = 'pagination-button next-button';
  nextButton.textContent = 'Next';
  nextButton.disabled = pageNumber >= totalPages;

  function updatePage(direction: 'next' | 'prev') {
    let newPageNumber = pageNumber;
    if (direction === 'next')
      newPageNumber = Math.min(totalPages, pageNumber + 1);
    else if (direction === 'prev') newPageNumber = Math.max(1, pageNumber - 1);

    if (newPageNumber === pageNumber) return;
    setPageSearchParam(newPageNumber);
    loadEntities();
  }

  prevButton.addEventListener('click', () => updatePage('prev'));
  nextButton.addEventListener('click', () => updatePage('next'));

  paginationContainer.appendChild(prevButton);
  paginationContainer.appendChild(pageNumberSpan);
  paginationContainer.appendChild(nextButton);

  return paginationContainer;
}
