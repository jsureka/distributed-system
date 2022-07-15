<template>
  <main
    class="main-content"
  >
    <router-view />
  </main>
</template>
<script>
import { mapMutations, mapState } from "vuex";

export default {
  name: "App",
  components: {

  },
  methods: {
    ...mapMutations(["toggleConfigurator", "navbarMinimize"])
  },
  computed: {
    ...mapState([
      "isRTL",
      "color",
      "isAbsolute",
      "isNavFixed",
      "navbarFixed",
      "absolute",
      "showSidenav",
      "showNavbar",
      "showFooter",
      "showConfig",
      "hideConfigButton"
    ])
  },
  beforeMount() {
    this.$store.state.isTransparent = "bg-transparent";
  }
};
</script>
