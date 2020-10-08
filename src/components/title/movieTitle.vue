<template>
  <span>
    <span>{{ title }}</span>
    <span>  ({{ releaseDate }})</span>
  </span>
</template>

<script lang="ts">
export default {
  name: 'MovieTitle',
  props: {
    title: {
      type: String,
      required: true
    },
    releaseDate: {
      type: String,
      required: true
    }
  }
};
</script>
