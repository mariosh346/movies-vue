<template>
  <v-dialog
    v-model="item"
    class="ma-2"
  >
    <VCard>
      <v-layout>
        <v-flex xs8>
          <v-card-title primary-title>
            <avatar :poster-path="item.poster_path" />
            <div>
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
          </v-card-title>
        </v-flex>
        <v-flex xs4>
          <v-card-title primary-title>
            <div>
              <div>
                <span class="headline">{{ item.vote_average }}</span>
                /10
                <v-text-field
                  v-model="rating"
                  placeholder="Rate this movie"
                  prepend-icon="star"
                  autofocus
                  clearable
                  type="number"
                  max="10"
                  min="0.5"
                  step="0.5"
                  :success="success"
                  :error="error"
                  @keyup="rate"
                />
              </div>

              <div>{{ item.vote_count }}</div>
              <div>{{ item.budget }}</div>
              <div>{{ item.revenue }}</div>
            </div>
          </v-card-title>
        </v-flex>
      </v-layout>
    </VCard>
  </v-dialog>
</template>

<script>
import { getMovie, rateMovie } from '../api/api'
import Avatar from './avatar'

export default {
  components: {
    Avatar
  },
  data() {
    return {
      item: {},
      success: false,
      error: false,
      rating: undefined,
      id: this.$route.params.id
    }
  },
  watch: {
    item (val) {
      if (!val)
        this.$router.go(-1)
    }
  },
  created() {
    getMovie(this.id)
      .then(this.onGetMovie)
      .catch((e) => {
        alert("Not available movie")
      })
  },
  methods: {
    onGetMovie (response) {
      this.item = response.data
    },
    rate({ key }) {
      if (key === 'Enter') {
        const newRate = parseFloat(this.rating);
        rateMovie(this.id, newRate).then(() => {
          this.success = true
          this.error = false
        }).catch(() => {
          this.success = false
          this.error = true
        });
      }
    }
  }
}
</script>
