<template>
  <div class="ma-2 collapsing">
    <v-flex>
      <div
        v-if="item.title"
        class="pa-2"
      >
        <div class="d-flex">
          <div v-if="withHeader">
            <div
              style="text-align: left"
            >
              <avatar :poster-path="item.poster_path" />
            </div>
            <div
              class="my-2 wrap_text"
            >
              <movie-title
                :release-date="item.release_date"
                :title="item.title"
              />
            </div>
          </div>
          <div>
            <v-icon
              color="yellow darken-2"
              text="icon"
              class="mr-2"
            >
              star
            </v-icon>
            <span>
              <span class="title">{{ item.vote_average }}/10</span>
              <span class="font-weight-thin">
                {{ item.vote_count }}
              </span>
            </span>

            <v-text-field
              v-model="rating"
              placeholder="Rate"
              prepend-icon="star"
              autofocus
              clearable
              type="number"
              max="10"
              min="0.5"
              step="0.5"
              :loading="loading"
              :success="success"
              :error="error"
              style="width: 140px"
              @keyup="rate"
            />
          </div>
        </div>
        <div class="my-2">
          <span
            v-for="genre in item.genres"
            :key="genre.name"
            class="mx-1"
          >
            {{ genre.name }}
          </span>
        </div>
        <v-select
          v-model="movieOnCollections"
          :items="collections"
          :menu-props="{ maxHeight: '400' }"
          item-value="id"
          item-text="title"
          label="Select Collections"
          multiple
          persistent-hint
        />
        <div
          style="max-height: 15vh"
          class="py-1 overflow-x-hidden"
        >
          {{ item.overview }}
        </div>
        <div class="my-2">
          <div
            style="max-height: 7vh"
            class="overflow-x-hidden"
          >
            <a
              v-for="video in videos"
              :key="video.id"
              :href="'https://www.youtube.com/watch?v='+video.key"
              class="v-btn"
              target="_blank"
            >
              <div>{{ video.type }}</div>
            </a>
          </div>
        </div>
      </div>
      <div class="mx-2">
        <div class="overflow-x-hidden mb-2">
          <div
            v-for="review in reviews"
            :key="review.id"
            class="px-1"
          >
            <div class="ma-2 font-weight-bold">
              {{ review.author }}
            </div>
            <div
              style="max-height: 15vh"
              class="overflow-x-hidden"
            >
              {{ review.content }}
            </div>
          </div>
        </div>
        <div class="d-flex overflow-y-hidden align-start">
          <router-link
            v-for="similar in similars"
            :key="similar.id"
            :to="{ name: 'movieModal', params: { id: similar.id }}"
            tag="button"
            class="ma-2"
            style="min-width: 15vw"
          >
            <avatar
              :poster-path="similar.poster_path"
            />
            <div class="my-2 justify-center">
              {{ similar.title }}
            </div>
          </router-link>
        </div>
      </div>
    </v-flex>
  </div>
</template>

<script lang="ts">
import { getMovie, getMovieReviews, getMovieSimilar, getMovieVideos, rateMovie } from '../api/api'
import Avatar from './avatar'
import MovieTitle from './title/movieTitle.vue';
import Vue from 'vue';
import collection from './collection.vue';

export default Vue.extend({
  components: {
    MovieTitle,
    Avatar
  },
  props: {
    withHeader: {
      type: Boolean,
      default: true
    },
    id: {
      type: Number,
      required: true
    }
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
    collections() {
      return this.$store.state.collections;
    },
    movieOnCollections: {
      get() {
        return this.collections.find((collection) => {
          return this.item.id in collection.movies
        })
      },
      set(movies) {
        // this.updateCollection()
      }
    }
  },
  watch: {
    id () {
      this.fetchItems()
    }
  },
  created() {
    this.fetchItems()
    this.$store.dispatch("bindCollections");
  },
  methods: {
    updateCollection(id, movies) {
      let newCollection = this.collections.find((collection) => collection.id === id)

      this.$store.dispatch('updateCollection', {
        id,
        payload: collection
      })
    },
    async fetchItems() {
      getMovie(this.id)
        .then(this.onGetMovie)
        .catch((e) => {
          alert("Not available movie")
        })

      this.similars = await getMovieSimilar(this.id)
      this.reviews = await getMovieReviews(this.id)
      this.videos = await getMovieVideos(this.id)
    },
    onGetMovie (response) {
      this.item = response.data
    },
    rate({ key }) {
      if (key === 'Enter') {
        this.loading = true;
        const newRate = parseFloat(this.rating);
        rateMovie(this.id, newRate).then(() => {
          this.success = true
          this.error = false
        }).catch(() => {
          this.success = false
          this.error = true
        }).finally(() => {
          this.loading = false
        });
      }
    }
  }
})
</script>

<style>
.collapsing {
  -webkit-transition-property: height, visibility;
  transition-property: height, visibility;
  -webkit-transition-duration: 1s;
  transition-duration: 1s;
  -webkit-transition-timing-function: ease;
  transition-timing-function: ease;
}
</style>
