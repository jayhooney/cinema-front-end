import { createRouter, createWebHistory } from "vue-router";
import Movie from "../components/Movie";
import MovieForm from "../components/MovieForm";

const routes = [
  {
    path: "/",
    name: "movie",
    component: Movie
  },
  {
    path: "/add",
    name: "add-movie",
    component: MovieForm,
    props: true
  },
  {
    path: "/update/",
    name: "update-movie",
    component: MovieForm,
    props: true
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
