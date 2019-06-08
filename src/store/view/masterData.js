const state = {
  storeId: ""
};

const mutations = {
  masterData(state, payload) {
    state.storeId = payload.storeId;
  }
};

const actions = {
  async getMasterData(context) {
    const url = "/CLP/api/getMasterData/execute";
    const data = { storeId: "KR00111" };
    const results = await axios.post(url, data);
    context.commit("masterData", results);
  }
};

export const masterData = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters: {}
};
