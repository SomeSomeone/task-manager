<template>
  <div class="task">
    <template v-if="!editMode">
      <span contenteditable="true" v-on:click="editMode = true"
        >{{ task.title }} <span class="mdi mdi-pencil"></span
      ></span>
      <span class="task-actions">
        <span
          v-on:click="switchStatus"
          :class="{
            'task-status': true,
            mdi: true,
            'mdi-check': task.status,
            'mdi-close': !task.status
          }"
        ></span>
        <span
          class="mdi mdi-trash-can-outline"
          v-on:click="$emit('remove', task)"
        ></span>
      </span>
    </template>
    <template v-else>
      <input class="task-input" type="text" v-model="title" />
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
  </div>
</template>

<script>
export default {
  name: "Task",
  props: ["task"],
  data: () => ({
    editMode: false,
    title: ""
  }),
  methods: {
    switchStatus() {
      this.task.status = !this.task.status;
    },
    updateTitle() {
      this.task.title = this.title;
    }
  },
  watch: {
    editMode() {
      this.title = this.task.title;
    }
  }
};
</script>

<style lang="sass" scoped>
.task
  font-size: 16px
  padding: 5px 45px 5px 5px
  line-height: 20px
  position: relative
  .task-input
    width: 100%
  & + .task
    border-top: 1px solid
  .task-actions
    position: absolute
    right: 5px
    height: 20px
    width: 40px
</style>
