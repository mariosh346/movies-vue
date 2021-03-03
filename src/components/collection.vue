<template>
  <div>
    <label>
      <input
        v-model="collectionTitle"
        type="text"
      >
    </label>
    <v-btn
      flat
      small
      @click.prevent="onCloseClicked"
    >
      <v-icon
        text="icon"
      >
        close
      </v-icon>
    </v-btn>
  </div>
</template>
<script>

export default {
  props: {
    collection: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      index: null
    }
  },
  computed: {
    collectionTitle: {
      set(title) {
        this.updateCollection({
          ...this.collection,
          title
        })
      },
      get() {
        return this.collection.title
      }
    }
  },
  created() {
  },
  methods: {
    onCloseClicked() {
      this.$store.dispatch('deleteCollection', this.collection)
    },
    updateCollection(collection) {
      this.$store.dispatch('updateCollection', {
        id: this.collection.id,
        payload: collection
      })
    }
  }
}
</script>
