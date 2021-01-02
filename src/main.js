import { createApp } from "vue";
import App from "./App.vue";
import axios from "axios";
import Router from "./router";

axios.defaults.baseURL = "http://localhost:3000";

createApp(App)
  .use(Router)
  .mount("#app");
