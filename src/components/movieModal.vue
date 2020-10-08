<template>
  <v-dialog
    v-model="item"
  >
    <VCard class="pa-2">
      <movie-more
        :id="id"
        :with-header="true"
      />
    </VCard>
  </v-dialog>
</template>

<script>
import MovieMore from "@/components/movieMore";

export default {
  components: {
    MovieMore
  },
  data() {
    return {
      item: {},
      similars: [],
      videos: [],
      reviews: [],
      loading: false,
      success: false,
      error: false,
      rating: undefined
    }
  },
  computed: {
    id() {
      return Number(this.$route.params.id);
    }
  },
  watch: {
    item(val, old) {
      if (!val) {
        this.$router.push('/')
      }
    }
  }
}
</script>
