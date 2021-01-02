import { createApp } from "vue";
import App from "./App.vue";
import axios from "axios";
import Router from "./router";

axios.defaults.baseURL = process.env.VUE_APP_SERVER_HOST;

createApp(App)
  .use(Router)
  .mount("#app");
