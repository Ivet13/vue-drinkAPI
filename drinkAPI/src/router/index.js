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
    component: () => import('../views/AboutView.vue'),
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: "/item/:id/:slug",
    name: "item",
    component: () => import("../views/ItemView.vue"),
    props: route => ({ ...route.params, id: parseInt(route.params.id) }),
    meta: {
      requiresAuth: true,
    }

  },
  {
    path: "/search",
    name: "search",
    component: () => import("../views/SearchView.vue"),
    props: route => ({ ...route.params, id: parseInt(route.params.id) }),
    meta: {
      requiresAuth: true,
    }

  },
  {
    path: '/random',
    name: 'random',
    component: () => import('../views/RandomItemView.vue'),
    meta: {
      requiresAuth: true,
    }
  },
  ,
    {
      path: "/login",
      name: "login",
      component: () => import("../views/Login.vue"),
    }
];

//ROUTER INSTANCE
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  //ACTIVE PAGE CLASS 
  linkActiveClass: 'drink-actively',
  //ROUTE RECORDS
  routes
})

router.beforeEach((to, from) => {
  if (to.meta.requiresAuth && !window.user) {
    // needs to login if not already logged in
    return { 
      name: 'login',
      query: { redirect: to.fullPath}
   }
  }
})

export default router
