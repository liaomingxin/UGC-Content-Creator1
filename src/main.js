import { createApp } from 'vue';
import App from './App.vue';
import './styles/theme.css'; // 引入全局样式
import { i18n } from './i18n';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

const app = createApp(App);
app.use(i18n);
app.use(ElementPlus);
app.mount('#app');
