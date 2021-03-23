<template> 
  <v-flex>
    <v-text-field
      v-model="collectionName"
      xs12
      sm6
      offset-sm3
      flat
      label="Collection"
      :loading="loading"
      prepend-inner-icon="movie"
      solo-inverted
    />
    <router-view />

    <div class="d-flex flex-wrap">
      <div
        v-for="item in collectionItems"
        :key="item.id"
        :class="itemClasses"
      >
        <movie
          :is-in-collection="true"
          :item="item"
        />
      </div>
    </div>
    <v-btn
      color="error"
      large
      @click="onDeleteClicked"
    >
      Delete collection
    </v-btn>
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
    collectionName: {
      set(title) {
        this.updateCollection({
          ...this.collection,
          title
        })
      },
      get() {
        return this.collection ? this.collection.title : ''
      }
    },
    itemClasses() {
      return this.$store.getters.itemClasses;
    }
  },
  watch: {
    collection(newVal) {
      if (newVal) {
        this.getItems(newVal)
      }
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
      this.collectionItems = []
      const promises = []
      this.loading = true

      collection.movies.forEach((movieId) => {
        promises.push(
          getMovie(movieId).then((response) => {
            this.collectionItems.push(response.data)
          })
        )
      })

      Promise.allSettled(promises).then(() => {
        this.loading = false
      });
    },
    updateCollection(collection) {
      this.$store.dispatch('updateCollection', {
        id: this.collection.id,
        payload: collection
      })
    },
    async onDeleteClicked() {
      await this.$store.dispatch('deleteCollection', this.collection)
      this.$router.go(-1)
    }
  }
}

</script>
