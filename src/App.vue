<template>
  <div id="app" class="app">
    <div class="container">
      <div class="app-title">
        <router-link :to="{name: 'main'}">
          <h1>Notes</h1>
        </router-link>
      </div>
      <router-view />
    </div>
  </div>
</template>

<script>

export default {
  name: 'App',
  created() {
    this.$store.dispatch('fetchNotes');
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/colors.scss';
.app {
  min-height: 100vh;
  background: $white-dark;
}
.app-title {
  padding: 1.2rem 0;
  border-bottom: 1px solid $grey-light;
  h1 {
    color: $grey-dark;
    font-weight: 300;
  }
}
</style>
