const queryParams = (params) => {
  return Object.keys(params)
    .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
    .join('&');
}

export default function (url, { method, data = {}, headersOverride = {} }) {
  let endPoint = url;
  const headers = new Headers(Object.assign({ "Content-Type": "application/json" }, headersOverride));
  let options = {
    method: method,
    headers
  }

  if (method === 'GET') {
    const urlParam = queryParams(data);
    if (urlParam.length > 0) {
      endPoint = endPoint + '?' + urlParam
    }
  } else {
    options.body = JSON.stringify(data)
  }

  return window.fetch(endPoint, options)
    .then((res) =>  {
      if (res.status === 204) {
        return Promise.resolve()
      }
      return res.json()
    });
}
