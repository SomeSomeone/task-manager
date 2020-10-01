<template>
  <div id="app">
    <Cards></Cards>
  </div>
</template>

<script>
import Cards from "@/components/cards/Cards";

export default {
  name: "App",
  components: {
    Cards
  }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
