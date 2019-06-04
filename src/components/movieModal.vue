<template>
  <v-dialog v-model="item">
    <VCard>
      <v-layout>
        <v-flex xs8>
          <v-card-title primary-title>
            <div>
              <div class="headline">
                {{ item.title }}
              </div>
              <div>
                {{ item.overview }}                
              </div>
              <div>
                ({{ item.release_date }})             
              </div>
              <div
                v-for="lang in item.spoken_languages"
                :key="lang.name"
              >
                {{ lang.name }}
              </div>
              <div>
                {{ item.poster_path }}
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
              </div>
              <div>
                {{ item.vote_count }}
              </div>
              <div>
                {{ item.budget }}
              </div>              
              <div>
                {{ item.revenue }}
              </div>
            </div>
          </v-card-title>
        </v-flex>
      </v-layout>
      <v-divider light />
      <v-card-actions class="pa-3">
        Rate this movie
        <v-spacer />
        <v-text-field
          v-model="rating"
          placeholder="rate"
          prepend-icon="star"
          autofocus
          clearable 
          type="number"
          max="10"
          min="0.5"
        />
      </v-card-actions>
    </VCard>
  </v-dialog>
</template>

<script>
import { getMovie, rateMovie } from '../api/api'
import { debuglog } from 'util';

export default {
  data() {
    return {
      item: {},
      rating: null,
      id: this.$route.params.id
    }
  },
  watch: {
    item (val) {
      if (!val)
        this.$router.go(-1)
    },
    rating: _.debounce(function (newRate, oldRate) {
      newRate = parseFloat(newRate)
      if(newRate>0.5 && newRate<10)
        rateMovie(this.id, newRate)
    }, 500)
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
    }
  }
}
</script>