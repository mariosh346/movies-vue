<template>
  <div class="d-flex-item">
    <template v-if="isModal">
      <v-flex xs8>
        <v-card-title primary-title>
          <div>
            <div class="headline">
              {{ item.title }}
            </div>
            <div>{{ item.overview }}</div>
            <div>({{ item.release_date }})</div>
            <div
              v-for="lang in item.spoken_languages"
              :key="lang.name"
            >
              {{ lang.name }}
            </div>
            <avatar :poster-path="item.poster_path" />
          </div>
        </v-card-title>
      </v-flex>
      <v-flex xs4>
        <v-card-title primary-title>
          <div>
            <div>
              <span class="headline">{{ item.vote_average }}</span>
              /10
            </div>
            <div>{{ item.vote_count }}</div>
            <div>{{ item.budget }}</div>
            <div>{{ item.revenue }}</div>
          </div>
        </v-card-title>
      </v-flex>
    </template>
    <router-link 
      v-else
      :key="item.id"
      :to="{ name: 'movieModal', params: { id: item.id }}"
      tag="a"
    >
      <div class="d-flex ma-2">
        <div class="d-flex-item">
          <avatar :poster-path="item.poster_path" />
        </div>
        <div class="d-flex-item">
          <div>{{ item.title }}</div>
          <div>{{ item.vote_average }}</div>
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
