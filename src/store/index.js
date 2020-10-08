import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'

Vue.use(Vuex)

export const vuexLocalStorage = new VuexPersist({
  storage: window.localStorage,
  reducer: state => ({
    collections: state.collections
  })
})

export const store = new Vuex.Store({
  plugins: [vuexLocalStorage.plugin],
  state: {
    collections: [],
    isMobile: false
  },
  getters: {

  },
  mutations: {
    createCollection(state, payload) {
      state.collections.push(payload)
    },
    deleteCollection(state, index) {
      delete state.collections[index]
    },
    setIsMobile(state) {
      state.isMobile = window.innerWidth <= 1100
    }
  }
})
