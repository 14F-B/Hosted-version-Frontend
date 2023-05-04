import { createApp } from "vue";
import axios from 'axios';
import AOS from "aos";


import App from "./App.vue";
import router from "./routes.js";
import store from './store';

// NPM Csomagok integrálása
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "aos/dist/aos.css";

// Saját assets fájlok/csomagok integrálása
import "./assets/css/style.css";
import "./assets/bootstrap-icons/bootstrap-icons.css";

// Axios konfigurálása
axios.defaults.baseURL = 'https://goeventapiservice.cyclic.app/docs';
axios.defaults.headers.common['Authorization'] = `Bearer ${store.state.token}`;


const app = createApp(App);

app.use(router);
app.use(store)
AOS.init();



app.mount("#app");

