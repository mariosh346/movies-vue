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