import { createRouter, createWebHistory } from 'vue-router'
import  store from '../store/store'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'accueil',
      component: () => import('../views/AccueilView.vue')
    },
    {
      path: '/connexion',
      name: 'connexion',
      component: () => import('../views/ConnexionView.vue')
    },
    {
      path: '/inscription',
      name: 'inscription',
      component: () => import('../views/InscriptionView.vue')
    }
  ]
})
// router.beforeResolve((to, from, next) => {
//   const user = store
//   console.log(user) //store with namespaced  modules
  
// })
export default router
