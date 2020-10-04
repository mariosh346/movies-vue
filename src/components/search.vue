<template> 
  <v-layout row>
    <v-flex>
      <v-card class="pa-4">
        <v-text-field
          v-model="search"
          xs12
          sm6
          offset-sm3
          class="mx-3"
          flat
          label="Search"
          :loading="loading"
          prepend-inner-icon="search"
          solo-inverted
          clearable
          browser-autocomplete="movies"
          @click:clear="clearSearch"
        />
        <div class="d-flex ma-2 flex-wrap">
          <router-view />
          <infinite-scroll 
            :items="items"
            :loading="loading"
            @lastItemIsVisible="fetchNextPage"
          >
            <template v-slot="{ item, index }">
              <movie
                :item="item"
              />
            </template>
          </infinite-scroll>
        </div>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
import _ from 'lodash'
import { CancelToken } from 'axios'
import Movie from './movie'
import { getSearchItems } from '../api/api'
import InfiniteScroll from "@/components/InfiniteScroll/InfiniteScroll";

export default {
  components: {
    InfiniteScroll,
    Movie
  },
  data () {
    return {
      cancelGetItems: null,
      selected: null,
      search: '',
      items: [],
      page: 1,
      totalPages: 0,
      lettersLimit: 3,
      loading: false,
      noData: true
    }
  },
  computed: {
  },

  watch: {
    search (newSearch) {
      this.searchItems(newSearch, this.page)
    }
  },

  methods: {
    clearSearch () {
      this.search = ''
      this.items = []
      this.page = 1
      this.totalPages = 0
    },

    fetchNextPage() {
      this.page = this.page + 1;
      debugger
      this.searchItems(this.search, this.page)
    },

    /*
    * Called when user inputs in search
    * @param {String} search - Input value from user
    * @return {Promise} - Promise with array of Products for this search
    */
    searchItems (search, page) {
      if (search.length < this.lettersLimit || (!/^[a-zA-Z0-9]+$/.test(search)) ) {
        this.items = []
        this.page = 1
        this.totalPages = 0
        this.loading = false
        return
      }
      this.noData = false
      this.loading = true
      return this.getItems(search, page)
    },

    /*
    * Called from onSearch
    * @param {String} search - Input value from user
    * @return {Promise} - Promise with array of Products of this search
    */
    getItems: _.debounce(function (search, page) {
      this.checkCancelGetItems(this.cancelGetItems, this.gotItems)
      this.gotItems = false
      this.cancelGetItems = CancelToken.source()

      return getSearchItems(page, search, this.cancelGetItems)
        .then(this.onGetItems)
        .catch((e) => {
          // eslint-disable-next-line no-console
          console.log(e)
        })
    }, 130),

    /*
     * Called from getItems. Needed for mocking.
     * @param {Object} cancelGetItems - Cancel token of axios of getItems
     * @param {Boolean} gotItems - Indicates if api call is finished
     * @param {String} txt - Text needed for debug
     * Cancel axios request if gotItems = false
     */
    checkCancelGetItems (cancelGetItems, gotItems, txt = 'Cancelled from user') {
      if (cancelGetItems) {
        cancelGetItems.cancel(txt)
      }
    },

    /*
     * Called from getItems. Success callback of getSearchItems api call
     * @param {Object} response - Response from server
     * Gets items, stops loading and checks for no data
     */
    onGetItems (response) {
      this.items = [...this.items, ...response.data.results]
      debugger
      this.page = response.data.page
      this.totalPages = response.data.total_pages
      this.loading = false
      this.cancelGetItems = null

      if (!this.items.length) this.noData = true
    }
  }
}

</script>
<style>
.flex-wrap {
  flex-wrap: wrap;
}
</style>
