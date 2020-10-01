<template>
  <div class="card">
    <span
      class="card-remove mdi mdi-trash-can-outline"
      v-on:click="removeCard"
    ></span>
    <input
      type="range"
      class="card-slider"
      v-model="card.status"
      :style="{ backgroundColor: `hsl(${card.status}, 80%, 50%)` }"
    />
    <p class="card-title" v-on:click="editMode = !editMode" v-if="!editMode">
      {{ card.title }} <span class="mdi mdi-pencil"></span>
    </p>
    <template v-else>
      <input class="card-input" type="text" v-model="card.title" />
      <button
        class="mdi mdi-check"
        v-on:click="
          () => {
            updateTitle();
            editMode = !editMode;
          }
        "
      ></button>
      <button class="mdi mdi-close" v-on:click="editMode = !editMode"></button>
    </template>
    <div class="task-new" v-on:click="addTask">
      <span class="mdi mdi-plus"></span>
      Create task
    </div>
    <div class="card-tasks">
      <Task
        v-for="task in card.tasks"
        :task="task"
        v-bind:key="task.id"
        v-on:remove="removeTask"
      ></Task>
    </div>
  </div>
</template>

<script>
import Task from "@/components/cards/tasks/Task";
export default {
  name: "Card",
  components: {
    Task
  },
  props: ["card"],
  computed: {},
  data: () => ({
    editMode: false,
    title: ""
  }),
  methods: {
    addTask() {
      this.card.tasks.unshift({
        id: this.card.tasks.length,
        title: "New card",
        status: false
      });
      this.updateItem({ ...this.card });
    },
    removeTask(task) {
      const index = this.card.tasks.findIndex(i => i.id === task.id);
      if (index > -1) {
        this.card.tasks.splice(index, 1);
      }
    },
    updateTitle() {
      this.updateItem({ ...this.card, title: this.title });
    },
    updateItem(item) {
      this.$store.dispatch("CardStore/updateItem", item);
    },
    removeCard() {
      this.$store.dispatch("CardStore/removeItem", this.card);
    }
  },
  watch: {
    editMode() {
      this.title = this.card.title;
    },
    "card.status"() {
      this.updateItem({ ...this.card });
    },
    "card.tasks": {
      handler() {
        this.updateItem({ ...this.card });
      },
      deep: true
    }
  }
};
</script>

<style lang="sass" scoped>
.card
  position: relative
  background: #eee
  padding: 30px 10px 10px 10px
  .task-new
    background: #60ff9c
    font-size: 16px
    display: flex
    width: 100%
    height: 2em
    align-items: center
    justify-content: center
    user-select: none
    cursor: pointer
    transition: background 0.2s
    padding: 1em
    box-sizing: border-box
    &:active
      background: #208746
  .card-tasks
    background: #d3d0d0
    max-height: 400px
    overflow: auto
  .card-title
    cursor: pointer
  .card-input
    width: 100%
  .card-slider
    overflow: hidden
    width: 100%
    -webkit-appearance: none
  .card-remove
    position: absolute
    top: 5px
    right: 5px
</style>
