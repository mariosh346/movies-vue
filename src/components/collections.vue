<template>
  <div>
    <collection
      v-for="(collection) in collections"
      :key="collection.id"
      :collection="collection"
    />
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
import Collection from "@/components/collection";

export default {
  components: { Collection },
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
  watch: {
    '$store.state.user': {
      immediate: true,
      handler() {
        this.$store.dispatch("bindCollections");
      }
    }
  },
  methods: {
    createCollection() {
      this.$store.dispatch('addCollection', {
        title: "New Collection",
        userId: this.$store.state.user.id,
        movies: []
      })
    }
  }
}
</script>
