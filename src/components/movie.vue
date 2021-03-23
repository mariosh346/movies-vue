<template>
  <v-btn
    style="width: 100%"
    class="py-5 ma-1"
  >
    <router-link
      :key="item.id"
      :to="{ name: linkName, params: { id: item.id }}"
      tag="div"
      class="d-flex ma-2 align-center v-content__wrap"
    >
      <div
        class="ma-2"
        style="text-align: left;"
      >
        <avatar :poster-path="item.poster_path" />
      </div>
      <div
        class="ma-2 wrap_text flex-grow-1"
      >
        <movie-title
          :release-date="item.release_date"
          :title="item.title"
        />
      </div>
      <div
        class="ma-2"
        style="text-align: right"
      >
        <span>
          <v-icon
            color="yellow darken-2"
            text="icon"
            :small="true"
          >
            star
          </v-icon>
          {{ item.vote_average }}
          <v-icon
            color="white"
            text="icon"
            :small="true"
            class="ml-1 px-1"
          >
            add_to_queue
          </v-icon>
        </span>
      </div>
    </router-link>
  </v-btn>
</template>

<script lang="ts">
import Vue from 'vue'
import Avatar from "./avatar";
import MovieTitle from "./title/movieTitle";

export default Vue.extend({
  components: { MovieTitle, Avatar },
  props: {
    isInCollection: {
      type: Boolean,
      value: false
    },
    item: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      rating: null
    };
  },
  computed: {
    linkName() {
      return this.isInCollection ? 'movieCollection' : 'movieModal';
    }
  },
  watch: {
    item(val) {
      if (!val) this.$router.go(-1);
    }
  }
});
</script>
