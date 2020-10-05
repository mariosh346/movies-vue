<template>
  <button
    style="width: 100%;
      flex-flow: row;
      background-color: #212121;"
    class="pa-3 ma-1"
  >
    <div
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
        <span>{{ item.title }}</span>
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
      <div
          class="ma-2"
          style="text-align: right"
      >
        {{ item.release_date }}
      </div>
    </div>
    <div
      class="d-flex ma-2 text-xs-left v-content__wrap"
    >
      {{ item.overview }}
    </div>
  </button>
</template>

<script>
import Avatar from "@/components/avatar";
export default {
  components: { Avatar },
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
