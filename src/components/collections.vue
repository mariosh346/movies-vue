<template>
  <div>
    <div
      v-for="(collection) in collections"
      :key="collection.id"
    >
      <input
        v-model="collection.title"
        type="text"
      >
    </div>
    <v-btn
      color="success"
      @click="createCollection"
    >
      Add collection
    </v-btn>
  </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      index: null
    }
  },
  computed: {
    ...mapState([
      'collections'
    ])
  },
  methods: {
    createCollection() {
      this.$store.commit('createCollection', {
        title: "new",
        movies: []
      })
    }
  }
}
</script>
