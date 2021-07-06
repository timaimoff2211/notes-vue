import Vue from 'vue'
import VueRouter from 'vue-router'
import MainPage from '@/views/MainPage'
import NotePage from '@/views/NotePage'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: "history",
  routes: [
    {path: '', name: 'main', component: MainPage},
    {path: '/note/:id', name: 'note-id', component: NotePage}
  ]
})

export default router;