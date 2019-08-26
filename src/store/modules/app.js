import Cookies from 'js-cookie';

const app = {
  state: {
    sidebar: {
      opened: false
    },
    showhBodyBackground: false,
    device: 'desktop',
    theme: Cookies.get('theme') || 'defaultTheme',
    language: Cookies.get('lng') || 'en',
    makeFilter: Cookies.get('makeFilter') ? JSON.parse(Cookies.get('makeFilter')) : null,
    channel: Cookies.get('CHNL')
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      state.sidebar.opened = !state.sidebar.opened;
    },
    TOGGLE_DEVICE: (state, device) => {
      state.device = device;
    },
    TOGGLE_BG: (state, visibility) => {
      state.showhBodyBackground = visibility;
    },
    SET_LANGUAGE: (state, language) => {
      state.language = language;
      Cookies.set('lng', language);
    },
    SET_MAKE_FILTER: (state, makeFilter) => {
      state.makeFilter = makeFilter;
      Cookies.set('makeFilter', JSON.stringify(makeFilter));
    },
    CLEAR_MAKE_FILTER: state => {
      state.makeFilter = null;
      Cookies.remove('makeFilter');
    },
    SET_THEME: (state, theme) => {
      state.theme = theme;
      Cookies.set('theme', theme);
    },
    CLEAR_THEME: state => {
      state.theme = null;
      Cookies.remove('theme');
    },
    SET_CHANNEL: (state, channel) => {
      state.channel = channel;
      Cookies.set('CHNL', channel);
    }
  },
  actions: {
    toggleSideBar({ commit }) {
      commit('TOGGLE_SIDEBAR');
    },
    toggleDevice({ commit }, device) {
      commit('TOGGLE_DEVICE', device);
    },
    toggleBodyBackground({ commit }, visibility) {
      commit('TOGGLE_BG', visibility);
    },
    setLanguage({ commit }, language) {
      commit('SET_LANGUAGE', language);
    },
    setMakeFilter({ commit }, makeFilter) {
      commit('SET_MAKE_FILTER', makeFilter);
    },
    clearMakeFilter({ commit }) {
      commit('CLEAR_MAKE_FILTER');
    },
    setTheme({ commit }, theme) {
      commit('SET_THEME', theme);
    },
    clearTheme({ commit }) {
      commit('CLEAR_THEME');
    },
    setChannel({ commit }, channel) {
      commit('SET_CHANNEL', channel);
    }
  }
};

export default app;
