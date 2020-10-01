<template functional>
  <v-avatar>
    <v-img
      v-if="props.posterPath"
      :src="`http://image.tmdb.org/t/p/w185/${props.posterPath}`"
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
    }
  }
};
</script>
