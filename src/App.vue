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
  },
  created() {
    this.$store.commit('setIsMobile')
    window.addEventListener("resize", () => this.$store.commit('setIsMobile'));
  }
}
</script>

<style>
.wrap_text {
  overflow-x: hidden;
  white-space: pre-line;
  overflow-wrap: break-word;
}
.flex-wrap {
  flex-wrap: wrap;
}
.flex-33 {
  flex: 0 33%!important;
}
.flex-100 {
  flex: 0 100%!important;
}
</style>
