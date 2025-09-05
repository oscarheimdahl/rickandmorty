import './style.css';

import {
  fetchCharactersPage,
  fetchEpisodesPage,
  fetchLocationsPage,
} from './api/rickandmorty-api';
import { Background } from './components/background/background';
import { MainBody } from './components/main-body/main-body';

const characters = await fetchCharactersPage(1);
const locations = await fetchLocationsPage(1);
const episodes = await fetchEpisodesPage(1);

console.log(characters);
console.log(locations);
console.log(episodes);

const app = document.querySelector<HTMLDivElement>('#app')!;
app.appendChild(Background());
app.appendChild(MainBody());
