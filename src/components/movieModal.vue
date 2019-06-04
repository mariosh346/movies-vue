<template>
  <v-dialog v-model="item">
    <VCard>    
      <h1>{{ item.title }}</h1>
      <v-btn @click="$router.go(-1)">
        close
      </v-btn>
    </VCard>
  </v-dialog>
</template>

<script>
import { getMovie } from '../api/api'

export default {
  data() {
    return {
      item: {},
      id: this.$route.params.id
    }
  },
  created() {
    // use $route.params.id to get the item for that ID from whereever you have stored all the items.
    getMovie(this.id).then(this.onGetMovie)
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.log(e)
      })
  },
  methods: {
    onGetMovie (response) {
      this.item = response.data
    }
  }
}
</script>