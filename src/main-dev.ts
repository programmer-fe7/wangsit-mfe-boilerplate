/**
 * This entry file is for vite running projet as monolith for development and cypress testing purpose
 */

import { createApp } from 'vue';

import App from './App.vue';

import { registerComponents } from '@/utils';

import '@fewangsit/wangsvue/style.css';
import '@fewangsit/wangsvue-presets/wangsvue/style.css';

const app = createApp(App);
registerComponents(app);

app.mount('#app');
