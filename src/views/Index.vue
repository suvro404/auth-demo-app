<template>
  <div class="main-container">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "Index",
  computed: {
    isLoggedIn() {
      return this.$store.getters["auth/isLoggedIn"];
    }
  },
  watch: {
    isLoggedIn: function(val) {
      this.setRoute(val);
    }
  },
  mounted() {
    this.setRoute(this.isLoggedIn);
  },
  methods: {
    goToPage(routeName) {
      if(this.$route.name !== routeName) {
        this.$router.push({name: routeName});
      }
    },
    setRoute(val) {
      val ? this.goToPage('Home') : this.goToPage('Auth');
    }
  }
}
</script>

<style scoped>

</style>