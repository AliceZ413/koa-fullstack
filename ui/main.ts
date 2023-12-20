import { createApp } from 'vue';

import App from './App';
import { router } from './routes';

import 'normalize.css';
import './styles/global.scss';
import './styles/transition.scss';

const app = createApp(App);

app.use(router);

app.mount('#app');
