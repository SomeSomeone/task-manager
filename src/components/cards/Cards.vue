<template>
  <div class="cards">
    <div class="card-add" v-on:click="addCard">
      <span class="mdi mdi-plus"></span>
      Create card
    </div>
    <Card v-for="card in cards" v-bind:key="card.id" :card="card"></Card>
  </div>
</template>

<script>
import Card from "@/components/cards/Card";
export default {
  name: "Cards",
  components: {
    Card
  },
  computed: {
    cards() {
      return this.$store.getters["CardStore/getList"];
    }
  },
  methods: {
    addCard() {
      this.$store.dispatch("CardStore/createItem", {
        title: "New card"
      });
    }
  },
  mounted() {
    this.$store.dispatch("CardStore/getList");
  }
};
</script>

<style lang="sass" scoped>
.cards
  display: grid
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr))
  grid-gap: 10px
  padding: 0 10px
  height: 100%
  .card-add
    background: #60ff9c
    font-size: 22px
    display: flex
    width: 100%
    height: 100%
    align-items: center
    justify-content: center
    user-select: none
    cursor: pointer
    transition: background 0.2s
    padding: 1em
    box-sizing: border-box
    &:active
      background: #208746
</style>
