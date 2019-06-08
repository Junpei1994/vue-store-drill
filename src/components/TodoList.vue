<template>
  <section class="main" v-show="todos.length" v-cloak>
    <input
      id="toggle-all"
      class="toggle-all"
      type="checkbox"
      v-model="allDone"
    />
    <label for="toggle-all"></label>
    <ul class="todo-list">
      <TodoItem
        v-for="todo in filteredTodos"
        :key="todo.id"
        :todo="todo"
        @removeTodo="removeTodo"
      />
    </ul>
  </section>
</template>

<script>
import { filters } from "../helpers/filter";

import TodoItem from "../components/TodoItem";

export default {
  name: "TodoList",
  components: {
    TodoItem
  },

  props: {
    todos: {
      type: Array,
      default() {
        return [];
      }
    },
    visibility: {
      type: String,
      required: true
    }
  },

  computed: {
    filteredTodos() {
      return filters[this.visibility](this.todos);
    },
    remaining() {
      return filters.active(this.todos).length;
    },
    allDone: {
      get() {
        return this.remaining === 0;
      },
      set(value) {
        this.todos.forEach(todo => {
          todo.completed = value;
        });
      }
    }
  },
  methods: {
    removeTodo(todo) {
      this.todos.splice(this.todos.indexOf(todo), 1);
    }
  }
};
</script>
