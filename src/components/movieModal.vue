<template>
  <modal> <!-- some generic modal component, wrapping a CSS modal -->
    <h1>{{ item.title }}</h1>
    <button @click="$router.go(-1)">
      close
    </button>
  </modal>
</template>

<script>
import { getMovie } from '../api/api'

export default {
  data() {
    return {
      item: null
    }
  },
  created() {
    // use $route.params.id to get the item for that ID from whereever you have stored all the items.
    getMovie(this.item).then(this.onGetMovie)
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.log(e)
      })
  },
  methods: {
    onGetMovie (response) {
      this.item = response.data.results
    }
  }
}
</script>