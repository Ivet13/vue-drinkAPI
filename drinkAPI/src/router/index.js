import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue';

//ROUTE RECORDS
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/AboutView.vue')
  },
  {
    path: "/item/:id/:slug",
    name: "item",
    component: () => import("../views/ItemView.vue"),
    props: route => ({ ...route.params, id: parseInt(route.params.id) }),

  },
  {
    path: "/search",
    name: "search",
    component: () => import("../views/SearchView.vue"),
    props: route => ({ ...route.params, id: parseInt(route.params.id) }),

  },
  {
    path: '/random',
    name: 'random',
    component: () => import('../views/RandomItemView.vue')
  },
];

//ROUTER INSTANCE
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
