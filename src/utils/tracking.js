export function trackPageView(pageName) {
  if (window.ENV.ENABLE_DTM) {
    window.tracking['pagename'] = pageName;
  }
}

export function trackEvent(event, value) {
  if (window.ENV.ENABLE_DTM) {
    window.tracking[event] = value;
  }
}
