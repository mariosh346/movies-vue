import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'
import { firestoreAction, vuexfireMutations } from "vuexfire";
import { db } from "@/main";

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
    user: {},
    isMobile: false
  },
  getters: {

  },
  mutations: {
    ...vuexfireMutations,
    setIsMobile(state) {
      state.isMobile = window.innerWidth <= 1100
    }
  },
  actions: {
    bindCollections: firestoreAction(({ bindFirestoreRef }) => {
      // return the promise returned by `bindFirestoreRef`
      return bindFirestoreRef('collections', db.collection('collections'))
    }),
    addCollection: firestoreAction((context, payload) => {
      return db.collection('collections').add(payload)
    }),
    deleteCollection: firestoreAction((context, payload) => {
      return db.collection('collections')
        .doc(payload)
        .delete()
    }),
    updateCollection: firestoreAction((context, { id, payload } ) => {
      return db.collection('collections')
        .doc(id)
        .set(payload)
    }),
    addUser(context, payload) {
      return db.collection('users')
        .doc(payload.user.uid)
        .set({
          email: payload.user.email,
          emailVerified: payload.user.emailVerified,
          name: payload.user.displayName,
          photoURL: payload.user.photoURL,
          collections: []
        });
    },
    deleteUser(context, payload) {
      return db.collection('users')
        .doc(payload)
        .delete()
    },
    updateUser(context, { id, payload }) {
      return db.collection('users')
        .doc(id)
        .set(payload)
    }
  }
})
