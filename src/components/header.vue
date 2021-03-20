<template>
  <v-toolbar>
    <main-menu />

    <v-toolbar-title class="flex-100">
      <v-btn
        tile
        color="secondary"
      >
        <v-icon
          color="black"
          text="icon"
        >
          movie
        </v-icon>
        Movies
      </v-btn>
    </v-toolbar-title>
    <router-link
      v-if="!$store.getters.isLoggedIn"
      :to="{ name: 'login' }"
      tag="button"
    >
      Login
    </router-link>
    <v-menu
      v-else
      :lazy="true"
      transition="scroll-y-transition"
    >
      <avatar
        slot="activator"
        :poster-full-path="userPhotoURL"
      />
      <v-list>
        <v-list-tile>
          <button
            @click="signOut"
          >
            Logout
          </button>
        </v-list-tile>
      </v-list>
    </v-menu>
  </v-toolbar>
</template>
<script>
import firebase from "firebase";
import Avatar from "@/components/avatar";
import MainMenu from "@/components/menu";

export default {
  name: "Header",
  components: {
    MainMenu,
    Avatar
  },
  computed: {
    userPhotoURL() {
      return 'photoURL' in this.$store.state.user
        ? this.$store.state.user.photoURL
        : '';
    }
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('addUser', { user })
      } else {
        this.$store.commit('setUser', {})
      }
    });
  },
  methods: {
    signOut(e) {
      e.stopPropagation();
      firebase.auth().signOut();
    }
  }
}
</script>
