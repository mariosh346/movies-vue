<template>
  <v-app dark>
    <v-content>
      <Header />
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import Header from "@/components/header";

export default {
  name: 'App',
  components: {
    Header
  },
  data () {
    return {
      //
    }
  }
}
</script>

<style>
.wrap_text {
  overflow-x: hidden;
  white-space: pre-line;
  overflow-wrap: break-word;
}
</style>
