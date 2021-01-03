import { createApp } from "vue";
import App from "./App.vue";
import axios from "axios";
import Router from "./router";

axios.defaults.baseURL = process.env.VUE_APP_SERVER_HOST;
axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

createApp(App)
  .use(Router)
  .mount("#app");
