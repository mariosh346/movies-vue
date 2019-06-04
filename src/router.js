import Vue from 'vue'
import Router from 'vue-router'
import Search from './components/Search/search.vue'
import MovieModal from './components/movieModal.vue'
// import Projects from './views/Projects.vue'
// import Team from './views/Team.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'search',
      component: Search,
    },
    { 
      path: 'movie/:id',
      component: MovieModal,
      name: 'movieModal'
    }
  ]
})
