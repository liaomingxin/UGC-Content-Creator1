import { createApp } from 'vue';
import App from './App.vue';
import './styles/theme.css'; // 引入全局样式
import { i18n } from './i18n';

const app = createApp(App);
app.use(i18n);
app.mount('#app');
