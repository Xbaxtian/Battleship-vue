// @ts-nocheck
export default {
  namespaced: true,
  state: {
    turns: 0,
    level: {},
  },
  actions: {
    setConfig({ commit }, payload) {
      commit("SET_CONFIG", payload);
    },
  },
  mutations: {
    SET_CONFIG(state, payload) {
      state.turns = payload.turns;
      state.level = payload.level;
    },
  },
  getters: {
    turns: (state) => state.turns || state.level.turns,
  },
};
