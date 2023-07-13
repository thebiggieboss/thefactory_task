import './assets/styles/main.scss'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
// import i18n from './i18n'
import App from './App.vue'
import router from './router'


const app = createApp(App).use(createPinia()).use(router)



router.isReady().then(() => {
    app.mount("#app");
});