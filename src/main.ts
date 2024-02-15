import { createApp } from 'vue'
import PrimeVue from "primevue/config";
import App from './App.vue'

import "primeflex/primeflex.min.css";
import "primevue/resources/themes/aura-light-green/theme.css";
import "primeicons/primeicons.css";


const app = createApp(App);
app.use(PrimeVue);
app.mount('#app');


