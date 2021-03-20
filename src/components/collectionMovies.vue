<template> 
  <v-flex>
    <v-text-field
      v-model="collectionName"
      xs12
      sm6
      offset-sm3
      flat
      disabled
      label="Collection"
      :loading="loading"
      prepend-inner-icon="movie"
      solo-inverted
    />
    <router-view />

    <movie
      v-for="item in collectionItems"
      :key="item.id"
      :class="itemClasses"
      :item="item"
    />
  </v-flex>
</template>
<script>
import Movie from './movie'
import { getMovie } from '@/api/api'

export default {
  components: {
    Movie
  },
  data () {
    return {
      collectionItems: [],
      loading: false,
      noData: true
    }
  },
  computed: {
    collections() {
      return this.$store.state.collections;
    },
    collection() {
      return this.collections.find((collection) => collection.id === this.$route.params.id)
    },
    collectionName() {
      return this.collection ? this.collection.name : ''
    },
    itemClasses() {
      return this.$store.state.isMobile ? 'flex-100 pa-1' :'flex-33 pa-1';
    }
  },
  watch: {
    collection(newVal) {
      this.getItems(newVal)
    },
    '$store.state.user': {
      immediate: true,
      handler() {
        this.$store.dispatch("bindCollections");
      }
    }
  },

  methods: {
    getItems(collection) {
      collection.movies.forEach((movieId) => {
        getMovie(movieId).then((response) => {
          this.collectionItems.push(response.data)
        })
      })
    }
  }
}

</script>
