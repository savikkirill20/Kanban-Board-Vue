<template>

  <h1>
    <img alt="Vue logo" src="./assets/logo.png" width="64">
    Kanban Board
  </h1>
  <MenuBar />
  <router-view />
</template>

<script>
import MenuBar from './components/MenuBar'

export default {
  name: 'App',
  mounted () {
    document.title = 'Kanban Board';
    this.$store.dispatch('init');
  },
  components: {
    MenuBar
  }
}

</script>

