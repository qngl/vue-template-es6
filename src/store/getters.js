const getters = {
  sidebar: state => state.app.sidebar,
  loading: state => state.app.loading,
  language: state => state.app.language,
  device: state => state.app.device,
  theme: state => state.app.theme,
  makeFilter: state => state.app.makeFilter,
  channel: state => state.app.channel,
  showhBodyBackground: state => state.app.showhBodyBackground,
  message: state => state.message.msg,
  token: state => state.user.token,
  redirect: state => state.user.redirect,
  lastAuthTime: state => state.user.lastAuthTime,
  lastActiveTime: state => state.user.lastActiveTime,
  errorLogs: state => state.errorLog.logs
};
export default getters;
