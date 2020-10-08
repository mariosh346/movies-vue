<template>
  <v-btn
    style="width: 100%"
    class="pa-5 ma-1"
  >
    <router-link
      :key="item.id"
      :to="{ name: 'movieModal', params: { id: item.id }}"
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
        </span>
      </div>
    </router-link>
  </v-btn>
</template>

<script>
import Avatar from "@/components/avatar";
import MovieTitle from "@/components/title/movieTitle";

export default {
  components: { MovieTitle, Avatar },
  props: {
    isModal: {
      type: Boolean,
      value: true
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

  watch: {
    item(val) {
      if (!val) this.$router.go(-1);
    }
  }
};
</script>
