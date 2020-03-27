<template>
  <div>
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
            <v-avatar
              tile
              size="100px"
            >
              <v-img
                v-if="item.poster_path"
                :src="`http://image.tmdb.org/t/p/w185/${item.poster_path}`"
              />
              <v-icon
                v-else
                :color="message.color"
                v-text="message.icon"
              />
            </v-avatar>
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
      tag="div"
    >
      <v-list-item>
        <v-list-item-icon>
          <v-avatar size="50px">
            <v-img
              v-if="item.poster_path"
              :src="`http://image.tmdb.org/t/p/w185/${item.poster_path}`"
            />
            <v-icon
              v-else
              :color="message.color"
              v-text="message.icon"
            />
          </v-avatar>
        </v-list-item-icon>
        <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          <v-list-tile-sub-title>{{ item.vote_average }}</v-list-tile-sub-title>
        </v-list-tile-content>
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
      </v-list-item>
    </router-link>
  </div>
</template>

<script>
import { rateMovie } from "../api/api";
import { debuglog } from "util";

export default {
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
    },
    rating: _.debounce(function(newRate, oldRate) {
      newRate = parseFloat(newRate);
      if (newRate > 0.5 && newRate < 10) rateMovie(this.id, newRate);
    }, 500)
  }
};
</script>
