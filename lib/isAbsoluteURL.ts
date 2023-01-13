function isAbsoluteURL(url: string, { https } = { https: false }) {
  if (https) return url.indexOf('https://') === 0;
  return url.indexOf('://') > 0 || url.indexOf('//') === 0;
}

export default isAbsoluteURL;
