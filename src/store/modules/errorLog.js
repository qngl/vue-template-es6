import { saveError } from '@/api/logging';

const errorLog = {
  state: {
    logs: []
  },
  mutations: {
    ADD_ERROR_LOG: (state, log) => {
      state.logs.push(log);
      saveError(state.logs.pop());
    }
  },
  actions: {
    addErrorLog({ commit }, log) {
      commit('ADD_ERROR_LOG', log);
    }
  }
};

export default errorLog;
