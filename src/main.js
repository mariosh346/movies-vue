import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import router from './router'
import firebase from "firebase";
import { firestorePlugin } from 'vuefire'
import { store } from './store/index'

Vue.config.productionTip = false

const firebaseConfig = {
  apiKey: "AIzaSyByqnFhzkTWWLjWczPN41c-5IbfJn3hRuI",
  authDomain: "my-project-users-300618.firebaseapp.com",
  projectId: "my-project-users-300618",
  storageBucket: "my-project-users-300618.appspot.com",
  messagingSenderId: "304981610003",
  appId: "1:304981610003:web:1dd8d65d828e65664d39e6",
  measurementId: "G-ZYYQCWBFZG"
};

// Initialize Firebase
export const db = firebase
  .initializeApp(firebaseConfig)
  .firestore();

const { TimeStamp, GeoPoint } = firebase.firestore
export { TimeStamp, GeoPoint }

Vue.use(firestorePlugin)

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
