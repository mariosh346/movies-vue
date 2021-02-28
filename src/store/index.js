import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'
import { firestoreAction, vuexfireMutations } from "vuexfire";
import { db } from "@/main";
import firebase from "firebase";

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
    isLoggedIn: state => {
      return 'id' in state.user
    }
  },
  mutations: {
    ...vuexfireMutations,
    setIsMobile(state) {
      state.isMobile = window.innerWidth <= 1100
    },
    setUser(state, payload) {
      state.user = payload
    }
  },
  actions: {
    bindCollections: firestoreAction(({
      state,
      bindFirestoreRef }) => {
      // return the promise returned by `bindFirestoreRef`
      return bindFirestoreRef('collections',
        db.collection('collections')
          .where('userId', '==', state.user.id || -1)
      )
    }),
    addCollection: firestoreAction(async (
      { state, dispatch },
      payload
    ) => {
      const refCollection = await db.collection('collections').add(payload)
      const userRef = db.collection('users')
        .doc(state.user.id)
      await userRef.update({
        collections: [...state.user.collections, refCollection]
      })
      // bind new collection
      await dispatch('bindCollections')
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
    bindUser: firestoreAction((
      { bindFirestoreRef },
      { user }
    ) => {
      return bindFirestoreRef('user', db.collection('users').doc(user.uid))
    }),
    addUser: firestoreAction(async (
      { dispatch, state, getters },
      { user }
    ) => {
      const refUser = db.collection('users').doc(user.uid)
      await dispatch('bindUser', { user })
      if (!getters.isLoggedIn) {
        await refUser.set({
          id: user.uid,
          email: user.email,
          emailVerified: user.emailVerified,
          name: user.displayName,
          photoURL: user.photoURL,
          dateRegistered: firebase.firestore.FieldValue.serverTimestamp(),
          collections: []
        })
      }
    }),
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
