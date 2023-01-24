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
    path: "/:id",
    name: "item.show",
    component: () => import("../views/ItemShow.vue"),
    props: route => ({ ...route.params, id: parseInt(route.params.id) }),

  }
];

//ROUTER INSTANCE
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
