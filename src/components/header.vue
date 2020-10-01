<template functional>
  <v-toolbar>
    <v-menu>
      <v-toolbar-side-icon slot="activator" />>
      <v-list>
        <v-list-tile>
          <router-link
            :to="{ name: 'search' }"
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

    <v-toolbar-title>Movies</v-toolbar-title>
  </v-toolbar>
</template>
<script>
export default {
  name: "Header"
}
</script>
