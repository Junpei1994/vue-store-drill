<template>
  <header class="header">
    <input
      class="new-todo"
      autofocus
      autocomplete="off"
      placeholder="What needs to be done?"
      v-model="newTodo"
      @keyup.enter="addTodo"
    />
  </header>
</template>

<script>
export default {
  name: "TodoInput",
  data() {
    return {
      newTodo: ""
    };
  },
  props: {},
  methods: {
    addTodo() {
      const value = this.newTodo && this.newTodo.trim();
      this.$emit("addTodo", value);
      this.newTodo = "";
    }
  }
};
</script>
