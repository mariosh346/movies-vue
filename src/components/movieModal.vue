<template>
  <v-dialog v-model="item">
    <VCard>
      <!-- <v-btn @click="$router.go(-1)">
        close
      </v-btn> -->

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
      <v-divider light></v-divider>
      <v-card-actions class="pa-3">
        Rate this album
        <v-spacer></v-spacer>
        <v-text-field
          placeholder="rate"
          append-icon="star"
          autofocus
          clearable 
          :rules="inputRules"
          type="number"
          max="10"
        />
        <!-- <v-icon>star_border</v-icon> -->
      </v-card-actions>
    </VCard>
  </v-dialog>
</template>

<script>
import { getMovie } from '../api/api'

export default {
  data() {
    return {
      item: {},
      rate: null,
      id: this.$route.params.id,
      inputRules: [v => 10 >= v.length >= 0 || "Type from 0 to 10"]
    }
  },
  watch: {
    item (val) {
      if (!val)
        this.$router.go(-1)
    },
    rate (val) {
      // if (val)
        
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
    }
  }
}
</script>