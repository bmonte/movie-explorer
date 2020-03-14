import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    alias: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/movie/:movie_id',
    name: 'Movie',
    component: () => import('../views/Movie.vue'),
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('../views/Search.vue'),
  }
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes,
  //Scroll page to top
  scrollBehavior() {
    return { x: 0, y: 0 };
  }
})

export default router
