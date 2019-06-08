<template>
  <footer class="footer" v-show="todos.length" v-cloak>
    <span class="todo-count">
      <strong>{{ remaining }}</strong> {{ remaining | pluralize }} left
    </span>
    <ul class="filters">
      <li>
        <a
          @click="filterTodo('all')"
          :class="{ selected: visibility === 'all' }"
        >
          All
        </a>
      </li>
      <li>
        <a
          @click="filterTodo('active')"
          :class="{ selected: visibility === 'active' }"
          >Active
        </a>
      </li>
      <li>
        <a
          @click="filterTodo('completed')"
          :class="{ selected: visibility === 'completed' }"
          >Completed
        </a>
      </li>
    </ul>
    <button
      class="clear-completed"
      @click="removeCompleted"
      v-show="todos.length > remaining"
    >
      Clear completed
    </button>
  </footer>
</template>

<script>
import { filters } from "../helpers/filter";

export default {
  name: "TodoFooter",

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
    remaining() {
      return filters.active(this.todos).length;
    }
  },

  filters: {
    pluralize(n) {
      return n === 1 ? "item" : "items";
    }
  },

  methods: {
    filterTodo(visibility) {
      this.$emit("filterTodo", visibility);
    },
    removeCompleted() {
      this.todos = filters.active(this.todos);
    }
  }
};
</script>
