import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import request from './utils/request';
import storage from './utils/storage';
import store from './store';
import api from './api';

// console.log("环境变量=>", import.meta.env);
// axios.get(config.mockApi + '/login').then((res) => {
//   console.log(res);
// })


// createApp(App).mount('#app')
const app = createApp(App);
// 把$request设置为全局属性
app.config.globalProperties.$request = request;
app.config.globalProperties.$storage = storage;
app.config.globalProperties.$api = api;
app.use(ElementPlus,{size:"small"})
app.use(router);
app.use(store);

app.mount('#app');