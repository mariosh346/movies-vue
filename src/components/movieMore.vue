<template>
  <div class="ma-2 collapsing">
    <v-flex>
      <div class="pa-2">
        <template v-if="withHeader">
          <div
            style="text-align: left"
          >
            <avatar :poster-path="item.poster_path" />
          </div>
          <div
            class="my-2 wrap_text"
          >
            <span>{{ item.title }}</span>
          </div>
          <div class="py-1">
            {{ item.overview }}
          </div>
        </template>
        <div>
          <div>
            <v-icon
              color="yellow darken-2"
              text="icon"
              class="mr-2"
            >
              star
            </v-icon>
            <span>
              <span class="headline">{{ item.vote_average }}/10</span>
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
          <div class="my-2">
            <span
              v-for="genre in item.genres"
              :key="genre.name"
              class="mx-1"
            >
              {{ genre.name }}
            </span>
          </div>
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
      <div class="pa-2">
        <div class="overflow-x-hidden my-3">
          <div
            v-for="review in reviews"
            :key="review.id"
            class="px-1"
          >
            <div class="ma-2 font-weight-bold">
              {{ review.author }}
            </div>
            <div
              style="max-height: 30vh"
              class="overflow-x-hidden"
            >
              {{ review.content }}
            </div>
          </div>
        </div>
        <div class="d-flex overflow-y-hidden">
          <router-link
            v-for="similar in similars"
            :key="similar.id"
            :to="{ name: 'movieModal', params: { id: similar.id }}"
            tag="button"
            class="ma-2"
          >
            <div class="pa-2">
              <avatar
                :poster-path="similar.poster_path"
              />
              <div class="my-2 justify-center">
                {{ similar.title }}
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </v-flex>
  </div>
</template>

<script>
import { getMovie, getMovieReviews, getMovieSimilar, getMovieVideos, rateMovie } from '../api/api'
import Avatar from './avatar'

export default {
  components: {
    Avatar
  },
  props: {
    withHeader: false,
    id: undefined
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
  watch: {
    id () {
      this.fetchItems()
    }
  },
  created() {
    this.fetchItems()
  },
  methods: {
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
}
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
