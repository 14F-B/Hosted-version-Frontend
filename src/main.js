import { createApp } from "vue";
import axios from 'axios';
import AOS from "aos";
import jwt_decode from 'jwt-decode';

import App from "./App.vue";
import router from "./routes.js";
import store from './store';

import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "aos/dist/aos.css";

import "./assets/css/style.css";
import "./assets/bootstrap-icons/bootstrap-icons.css";


axios.defaults.baseURL = 'https://goeventapiservice.cyclic.app/docs';

axios.interceptors.request.use(config => {
  const token = store.state.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

const app = createApp(App);

app.use(router);
app.use(store);
AOS.init();

app.mixin({
  methods: {
    $jwtDecode(token) {
      return jwt_decode(token);
    }
  }
});

app.mount("#app");

setInterval(() => {
  store.dispatch('checkTokenExpiration');
}, 10 * 60 * 1000); // token lejáratának ellenőrzése minden 10 percenként
store.dispatch('checkTokenExpiration');
