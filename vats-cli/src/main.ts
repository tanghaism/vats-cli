import { createApp } from 'vue';
import Antd, { message, Modal, notification } from 'ant-design-vue';
import { createPinia } from 'pinia';
import Vats from 'vats';
import App from './App.vue';
import { initI18n } from '@/utils/i18n';

window.$message = message;
window.$modal = Modal;
window.$notification = notification;

import './registerServiceWorker';
import router from './router';

import 'ant-design-vue/dist/antd.min.css';
import '@/assets/scss/index.scss';
import 'vats/dist/style.css';

export const i18n = initI18n();

const app = createApp(App).use(router).use(createPinia()).use(Antd).use(i18n).use(Vats);

app.mount('#app');
