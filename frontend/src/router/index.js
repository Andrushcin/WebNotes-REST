import { createRouter, createWebHistory } from 'vue-router'
import NotesView from '../views/NotesView.vue'
import NotePage from '../views/NotePage.vue'

const routes = [
  {
    path: '/auth/register',
    name: 'SignUp',
    component: () => import('../views/RegisterView.vue')
  },
  {
    path: '/auth/login',
    name: 'SignIn',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/auth/logout',
    name: 'Logout',
    component: () => import('../views/LogoutView.vue')
  },
  {
    path: '/auth/activate/:link',
    name: 'Activate',
    component: () => import('../views/ActivateView.vue')
  },
  {
    path: '/',
    name: 'MyMotes',
    component: NotesView
  },
  {
    path: '/notes/new',
    name: 'NewNote',
    component: NotePage
  },
  {
    path: '/notes/:id',
    name: 'Note',
    component: NotePage
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
