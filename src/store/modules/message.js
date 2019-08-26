const message = {
  state: {
    msg: null
  },
  mutations: {
    SET_MESSAGE: (state, msg) => {
      state.msg = msg;
    }
  },
  actions: {
    showSuccess({ commit }, msg) {
      commit('SET_MESSAGE', prepareMessage('success', msg));
    },
    showError({ commit }, msg) {
      commit('SET_MESSAGE', prepareMessage('error', msg));
    },
    showInfo({ commit }, msg) {
      commit('SET_MESSAGE', prepareMessage('info', msg));
    },
    clearMessage({ commit }) {
      commit('SET_MESSAGE', {});
    }
  }
};

function prepareMessage(type, msg) {
  const payload = { type: type };
  if (msg) {
    if (typeof msg === 'object') {
      Object.assign(payload, msg);
    } else if (typeof msg === 'string') {
      payload.content = msg;
    }
  }
  return payload;
}

export default message;
