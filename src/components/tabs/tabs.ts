import './tabs.css';

export function Tabs() {
  const tabsDiv = document.createElement('div');
  tabsDiv.className = 'tabs';

  const tab1 = document.createElement('button');
  tab1.textContent = 'Characters';
  tab1.id = 'characters';
  tabsDiv.appendChild(tab1);

  const tab2 = document.createElement('button');
  tab2.textContent = 'Locations';
  tab2.id = 'locations';
  tabsDiv.appendChild(tab2);

  const tab3 = document.createElement('button');
  tab3.textContent = 'Episodes';
  tab3.id = 'episodes';
  tabsDiv.appendChild(tab3);

  tabsDiv.addEventListener('click', (e) => {
    const target = e.target as HTMLButtonElement;
    if (target.tagName !== 'BUTTON') return;

    if (target.classList.contains('active')) return;

    const currentActive = tabsDiv.querySelector('.active');
    if (currentActive) currentActive.classList.remove('active');
    target.classList.add('active');
  });

  return tabsDiv;
}
