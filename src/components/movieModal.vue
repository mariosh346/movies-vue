<template>
  <v-dialog v-model="item">
    <VCard>
      <v-layout>
        <movie
          :item="item"
          :is-modal="true"
        />
      </v-layout>
      <v-divider light />
      <v-card-actions class="pa-3">
        Rate this movie
        <v-spacer />
        <v-text-field
          v-model="rating"
          placeholder="rate"
          prepend-icon="star"
          autofocus
          clearable
          type="number"
          max="10"
          min="0.5"
        />
      </v-card-actions>
    </VCard>
  </v-dialog>
</template>

<script>
import { getMovie, rateMovie } from '../api/api'
import { debuglog } from 'util';
import Movie from './movie' 

export default {
  components: {
    Movie
  },
  data() {
    return {
      item: {},
      id: this.$route.params.id
    }
  },
  watch: {
    item (val) {
      if (!val)
        this.$router.go(-1)
    }
  },
  created() {
    getMovie(this.id)
      .then(this.onGetMovie)
      .catch((e) => {
        alert("Not available movie")
      })
  },
  methods: {
    onGetMovie (response) {
      this.item = response.data
    }
  }
}
</script>