import './style.css';

import { Background } from './components/background/background';
import { MainBody } from './components/main-body/main-body';

const app = document.querySelector<HTMLDivElement>('#app')!;

app.appendChild(Background());
app.appendChild(MainBody());
