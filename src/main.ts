import { createApp } from 'vue'
import PrimeVue from "primevue/config";
import App from './App.vue'

import "primeflex/primeflex.min.css";
import "primevue/resources/themes/nano/theme.css";

const app = createApp(App);
app.use(PrimeVue);
app.mount('#app');


