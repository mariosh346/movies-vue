<template>
  <v-avatar v-once>
    <v-img
      v-if="posterPathComputed"
      :src="posterPathComputed"
    />
    <v-icon
      v-else
      color="black"
      text="icon"
      :x-large="true"
    >
      movie
    </v-icon>
  </v-avatar>
</template>

<script>
export default {
  props: {
    posterPath: {
      type: String,
      default: ''
    },
    posterFullPath: {
      type: String,
      default: ''
    }
  },
  computed: {
    posterPathComputed() {
      let posterPath;
      if(this.posterFullPath) {
        posterPath = this.posterFullPath
      } else if(this.posterPath) {
        posterPath = `http://image.tmdb.org/t/p/w185/${this.posterPath}`
      }

      return posterPath
    }
  }
};
</script>
