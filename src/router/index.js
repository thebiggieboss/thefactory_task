import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: () => import('../views/HomePage.vue')
    },
    {
      path: "/favorites",
      component: () => import('../views/FavoritesPage.vue')
    },
    {
      path: "/:id",
      component: () => import('../views/_id/index.vue')
    },
  ]
})

export default router
