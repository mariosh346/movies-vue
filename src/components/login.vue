<template> 
  <section
    id="firebaseui-auth-container"
  />
</template>
<script>
import firebase from "firebase";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";

export default {
  components: {
  },
  data () {
    return {
      user: null
    }
  },
  computed: {
  },
  watch: {
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      this.user = user;
    });
  },
  mounted() {
    const vm = this;
    let ui = firebaseui.auth.AuthUI.getInstance();
    if (!ui) {
      ui = new firebaseui.auth.AuthUI(firebase.auth());
    }
    const uiConfig = {
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID
      ],
      callbacks: {
        signInSuccessWithAuthResult: (currentUser) => {
          vm.$store.dispatch('addUser', currentUser)
          vm.$router.go(-2)
          return false
        }
      }
    };
    ui.start("#firebaseui-auth-container", uiConfig);
  },

  methods: {
  }
}

</script>
