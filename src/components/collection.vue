<template>
  <router-link
    :key="collection.id"
    :to="{ name: 'collection', params: { id: collection.id }}"
    tag="v-btn"
    style="width: 100%"
    class="py-5 ma-0"
  >
    <span 
      class="flex"
    >
      {{ collectionTitle }}
    </span>
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
  </router-link>
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
    collectionTitle() {
      return this.collection.title
    }
  },
  created() {
  },
  methods: {
    onCloseClicked() {
      this.$store.dispatch('deleteCollection', this.collection)
    }
  }
}
</script>
