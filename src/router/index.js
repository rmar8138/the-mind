import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import CreateGame from "../views/CreateGame.vue";
import JoinGame from "../views/JoinGame.vue";
import Lobby from "../views/Lobby.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    component: About
  },
  {
    path: "/create",
    name: "CreateGame",
    component: CreateGame
  },
  {
    path: "/join",
    name: "JoinGame",
    component: JoinGame
  },
  {
    path: "/lobby",
    name: "Lobby",
    component: Lobby
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
