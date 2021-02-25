<template>
  <v-toolbar>
    <v-menu>
      <v-toolbar-side-icon slot="activator" />>
      <v-list>
        <v-list-tile>
          <router-link
            :to="{ name: 'home' }"
            tag="button"
          >
            <v-list-tile-content>
              <v-list-tile-title>Home</v-list-tile-title>
            </v-list-tile-content>
          </router-link>
        </v-list-tile>
        <v-list-tile>
          <router-link
            :to="{ name: 'collections' }"
            tag="button"
          >
            <v-list-tile-content>
              <v-list-tile-title>Collections</v-list-tile-title>
            </v-list-tile-content>
          </router-link>
        </v-list-tile>
      </v-list>
    </v-menu>

    <v-toolbar-title class="flex-100">
      Movies
    </v-toolbar-title>
    <router-link
      v-if="!user"
      :to="{ name: 'login' }"
      tag="button"
    >
      Login
    </router-link>
    <button
      v-else
      @click="signOut"
    >
      Logout
    </button>
  </v-toolbar>
</template>
<script>
import firebase from "firebase";

export default {
  name: "Header",
  components: {
  },
  data() {
    return  {
      user: null
    }
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      this.user = user;
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
