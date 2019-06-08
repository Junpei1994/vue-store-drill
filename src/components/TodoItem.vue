<template>
  <li
    class="todo"
    :class="{ completed: todo.completed, editing: todo == editedTodo }"
  >
    <div class="view">
      <input class="toggle" type="checkbox" v-model="todo.completed" />
      <label @dblclick="editTodo(todo)">{{ todo.title }}</label>
      <button class="destroy" @click="removeTodo(todo)"></button>
    </div>
    <input
      class="edit"
      type="text"
      v-model="todo.title"
      v-todo-focus="todo == editedTodo"
      @blur="doneEdit(todo)"
      @keyup.enter="doneEdit(todo)"
      @keyup.esc="cancelEdit(todo)"
    />
  </li>
</template>

<script>
export default {
  name: "TodoItem",
  data() {
    return {
      editedTodo: null
    };
  },
  props: {
    todo: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  methods: {
    removeTodo(todo) {
      this.$emit("removeTodo", todo);
    },

    editTodo(todo) {
      this.beforeEditCache = todo.title;
      this.editedTodo = todo;
    },

    doneEdit(todo) {
      if (!this.editedTodo) {
        return;
      }
      this.editedTodo = null;
      todo.title = todo.title.trim();
      if (!todo.title) {
        this.removeTodo(todo);
      }
    },

    cancelEdit(todo) {
      this.editedTodo = null;
      todo.title = this.beforeEditCache;
    }
  },
  directives: {
    "todo-focus"(el, binding) {
      if (binding.value) {
        el.focus();
      }
    }
  }
};
</script>
