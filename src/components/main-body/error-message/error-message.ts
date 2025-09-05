import type { ActivePage } from '../main-body';

export function ErrorMessage(activePage: ActivePage) {
  const errorDiv = document.createElement('div');
  errorDiv.className = 'error-message';
  errorDiv.textContent = 'An error occurred, could not load ' + activePage;
  return errorDiv;
}
