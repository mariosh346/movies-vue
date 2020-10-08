<template>
  <span>
    <span>{{ title }}</span>
    <span
      v-if="releaseDate"
      class="font-weight-thin ml-1"
    >({{ releaseDate }})</span>
  </span>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'MovieTitle',
  props: {
    title: {
      type: String,
      required: true
    },
    releaseDate: {
      type: String,
      default: undefined
    }
  }
});
</script>
