<template>
  <v-btn
    style="width: 100%"
    class="pa-5"
  >
    <div
      :key="item.id"
      class="d-flex ma-2 align-center v-content__wrap"
    >
      <div
        class="ma-2"
        style="text-align: left"
      >
        <avatar :poster-path="item.poster_path" />
      </div>
      <div
        class="ma-2"
        style="overflow-x: hidden;
          white-space: pre-line;
          overflow-wrap: break-word;"
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
      <!-- <v-list-tile-action>
                  <v-list-tile-action-text>{{ item.action }}</v-list-tile-action-text>
                  <v-icon
                    v-if="selected.indexOf(index) < 0"
                    color="grey lighten-1"
                  >
                    star_border
                  </v-icon>

                  <v-icon
                    v-else
                    color="yellow darken-2"
                  >
                    star
                  </v-icon>
      </v-list-tile-action>-->
    </div>
  </v-btn>
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
