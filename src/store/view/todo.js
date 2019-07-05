import * as types from "../mutation-types";
import { todoStorage } from "../../helpers/storage";

const state = {
  todos: []
};

const getters = {};

const mutations = {
  increment(state) {
    state.count++;
  },
  [types.FETCH_TODOS](state, todos) {
    state.todos = todos;
  }
};

const actions = {
  increment(context) {
    context.commit("increment");
  },
  fetchTodos({ commit }) {
    const todos = todoStorage.fetch();
    commit(types.FETCH_TODOS, todos);
  }
};

export const todo = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
