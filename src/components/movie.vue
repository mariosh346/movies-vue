<template>
  <div class="d-flex-item">
    <router-link
      :key="item.id"
      :to="{ name: 'movieModal', params: { id: item.id }}"
      tag="v-btn"
    >
      <div class="d-flex ma-2 justify-space-between">
        <div class="d-flex-item">
          <avatar :poster-path="item.poster_path" />
        </div>
        <div class="d-flex-item">
          <span>{{ item.title }}</span>
        </div>
        <div class="d-flex-item">
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
    </router-link>
  </div>
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
