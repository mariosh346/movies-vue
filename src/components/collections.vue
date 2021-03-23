<template>
  <div>
    <v-text-field
      xs12
      sm6
      offset-sm3
      flat
      disabled
      label="Collections"
      prepend-inner-icon="movie"
      solo-inverted
    />
    <div
      class="d-flex flex-wrap"
    >
      <div
        v-for="(collection) in collections"
        :key="collection.id"
        :class="itemClasses"
      >
        <collection
          :collection="collection"
        />
      </div>
    </div>
    <div>
      <v-btn
        color="success"
        large
        @click="createCollection"
      >
        Create collection
      </v-btn>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import Collection from "@/components/collection";
import firebase from "firebase";

export default {
  components: { Collection },
  data() {
    return {
      index: null
    }
  },
  computed: {
    ...mapState([
      'collections'
    ]),
    itemClasses() {
      return this.$store.getters.itemClasses;
    }
  },
  watch: {
    '$store.state.user': {
      immediate: true,
      handler() {
        this.$store.dispatch("bindCollections");
      }
    }
  },
  methods: {
    createCollection() {
      this.$store.dispatch('addCollection', {
        title: "New Collection",
        userId: this.$store.state.user.id,
        dateCreated: firebase.firestore.FieldValue.serverTimestamp(),
        dateUpdated: firebase.firestore.FieldValue.serverTimestamp(),
        movies: []
      })
    }
  }
}
</script>
