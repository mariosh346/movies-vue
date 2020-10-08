import Vue from 'vue'
import Router from 'vue-router'
import Search from './components/search.vue'
import MovieModal from './components/movieModal.vue'
import Collections from './components/collections.vue'
// import Projects from './views/Projects.vue'
// import Team from './views/Team.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Search,
      children: [
        {
          path: '/movie/:id',
          component: MovieModal,
          name: 'movieModal'
        }
      ]
    },
    {
      path: '/search/:search',
      name: 'search',
      component: Search
    },
    {
      path: '/collections',
      name: 'collections',
      component: Collections
    }
  ]
})
