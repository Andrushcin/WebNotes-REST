import { createRouter, createWebHistory } from 'vue-router'
import NotesView from '../views/NotesView.vue'
import NotePage from '../views/NotePage.vue'

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
  },
  {
    path: '/notes/new',
    name: 'Новая заметка',
    component: NotePage
  },
  {
    path: '/notes/:id/edit',
    name: 'note',
    component: NotePage
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
