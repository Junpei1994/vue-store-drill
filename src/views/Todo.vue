<template>
  <div class="todoapp">
    <TodoInput @addTodo="addTodo" />
    <TodoList :todos="todos" :visibility="visibility" />
    <TodoFooter
      :todos="todos"
      :visibility="visibility"
      @filterTodo="filterTodo"
    />
  </div>
</template>

<script>
import { todoStorage } from "../helpers/storage";

import TodoList from "../components/TodoList";
import TodoInput from "../components/TodoInput";
import TodoFooter from "../components/TodoFooter";

export default {
  name: "Todo",
  components: {
    TodoList,
    TodoInput,
    TodoFooter
  },
  data() {
    return {
      todos: todoStorage.fetch(),
      visibility: "all"
    };
  },

  watch: {
    todos: {
      handler(todos) {
        todoStorage.save(todos);
      },
      deep: true
    }
  },
  methods: {
    addTodo(value) {
      if (!value) return;
      this.todos.push({
        id: todoStorage.uid++,
        title: value,
        completed: false
      });
    },
    filterTodo(visibility) {
      this.visibility = visibility;
    }
  }
};
</script>
