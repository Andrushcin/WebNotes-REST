import { createRouter, createWebHistory } from 'vue-router'
import NotesView from '../views/NotesView.vue'

const routes = [
  {
    path: '/',
    name: 'Мои заметки',
    component: NotesView
  },
  {
    path: '/register',
    name: 'Регистрация',
    component: () => import('../views/RegisterView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
