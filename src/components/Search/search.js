import _ from 'lodash'
import { getSearchItems } from '../../api/api'
import { CancelToken } from 'axios'

export default {
  data () {
    return {
      cancelGetItems: null,
      selected: [2],
      search: '',
      items: []
    }
  },
  computed: {
  },

  watch: {
    search (newSearch) {
      this.getItems(newSearch)
    }
  },

  methods: {
    clearSearch () {
      this.search = ''
      this.items = []
    },

    toggle (index) {
      const i = this.selected.indexOf(index)

      if (i > -1) {
        this.selected.splice(i, 1)
      } else {
        this.selected.push(index)
      }
    },

    /*
    * Called when user inputs in search
    * @param {String} search - Input value from user
    * @return {Promise} - Promise with array of Products for this search
    */
    onSearch (search) {
      this.inputVal = search

      this.noData = false
      if (search.length < this.lettersLimit) {
        this.items = []
        this.loading = false
        return
      }
      this.loading = true
      return this.getItems(search)
    },

    /*
    * Called from onSearch
    * @param {String} search - Input value from user
    * @return {Promise} - Promise with array of Products of this search
    */
    getItems: _.debounce(function (search) {
      this.checkCancelGetItems(this.cancelGetItems, this.gotItems)
      this.gotItems = false
      this.cancelGetItems = CancelToken.source()

      return getSearchItems(this.autocompleteProductsPath, this.itemsLimit, search, this.cancelGetItems)
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
      this.items = response.data.results
      this.loading = false
      this.cancelGetItems = null

      if (!this.items.length) this.noData = true
    }
  }
}
