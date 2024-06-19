import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia'; // 引入 createPinia
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'

const app = createApp(App)
const pinia = createPinia(); // 创建 Pinia 实例

app.use(router);
app.use(pinia); // 使用 Pinia
app.use(ElementPlus);
app.mount('#app');
