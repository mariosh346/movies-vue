<template>
  <v-dialog
    v-model="item"
    class="ma-2"
  >
    <VCard>
      <v-layout>
        <v-flex xs8>
          <div class="pa-4">
            <avatar
              :poster-path="item.poster_path"
            />
            <div class="ma-2">
              <div class="headline">
                {{ item.title }}
              </div>
              <div>{{ item.overview }}</div>
              <div>{{ item.release_date }}</div>
              <div
                v-for="lang in item.spoken_languages"
                :key="lang.name"
              >
                {{ lang.name }}
              </div>
            </div>
            <div class="d-flex overflow-y-hidden mt-2">
              <div
                v-for="review in reviews"
                :key="review.id"
                class="px-1"
              >
                <div>
                  {{ review.author }}
                </div>
                <div
                  style="max-height: 40vh"
                  class="overflow-x-hidden"
                >
                  {{ review.content }}
                </div>
              </div>
            </div>
          </div>
        </v-flex>
        <v-flex xs4>
          <div class="pa-4">
            <div>
              <div>
                <v-icon
                  color="yellow darken-2"
                  text="icon"
                  class="mr-2"
                >
                  star
                </v-icon>
                <span class="headline">{{ item.vote_average }}</span>
                /10
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
                  @keyup="rate"
                />
              </div>

              <div>{{ item.vote_count }}</div>
              <div>{{ item.budget }}</div>
              <div>{{ item.revenue }}</div>
              <a
                v-for="video in videos"
                :key="video.id"
                :href="'https://www.youtube.com/watch?v='+video.key"
                class="v-btn"
                target="_blank"
              >
                <div>{{ video.type }}</div>
              </a>
              <div class="d-flex overflow-y-hidden">
                <span
                  v-for="similar in similars"
                  :key="similar.id"
                  class="ma-2"
                >
                  <router-link
                    :to="{ name: 'movieModal', params: { id: similar.id }}"
                    tag="div"
                    class="pa-2"
                  >
                    <avatar
                      :poster-path="similar.poster_path"
                    />
                    <div class="my-2 justify-center">
                      {{ similar.title }}
                    </div>
                  </router-link>
                </span>
              </div>
            </div>
          </div>
        </v-flex>
      </v-layout>
    </VCard>
  </v-dialog>
</template>

<script>
import { getMovie, getMovieReviews, getMovieSimilar, getMovieVideos, rateMovie } from '../api/api'
import Avatar from './avatar'

export default {
  components: {
    Avatar
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
      return this.$route.params.id;
    }
  },
  watch: {
    item (val, old) {
      if (!val) {
        this.$router.push('/')
      }
    },
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
