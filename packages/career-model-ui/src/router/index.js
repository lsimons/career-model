import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Category from '../views/Category.vue'
import Area from '../views/Area.vue'
import Competency from '../views/Competency.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/category/:category',
    name: 'Category',
    component: Category
  },
  {
    path: '/area/:category/:area',
    name: 'Area',
    component: Area
  },
  {
    path: '/competency/:category/:area/:competency',
    name: 'Competency',
    component: Competency
  }
]

const router = new VueRouter({
  routes
})

export default router

if (window) {
  window.router = router
}
