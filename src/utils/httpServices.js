import axios from 'axios';

export function getToken() {
  return localStorage.getItem('token');
}

export const appBaseUrl = process.env.REACT_APP_APP_BASE_URL;
export const remoteServiceBaseUrl = process.env.REACT_APP_REMOTE_SERVICE_BASE_URL;

const qs = require('qs');

const http = axios.create({
  baseURL: remoteServiceBaseUrl,
  timeout: 30000,
  paramsSerializer: function (params) {
    return qs.stringify(params, {
      encode: false,
    });
  },
});

http.interceptors.request.use(
  function (config) {

    console.log()
    if (getToken()) {
      config.headers.common['Authorization'] = 'Bearer ' + getToken();
    }
    config.headers.common['Access-Control-Allow-Origin'] = "*";
    config.headers.common['crossdomain'] = true;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (!!error.response && !!error.response.data.error && !!error.response.data.error.message && error.response.data.error.details) {
      // Modal.error({
      //   title: error.response.data.error.message,
      //   content: error.response.data.error.details,
      // });
    } else if (!!error.response && !!error.response.data.error && !!error.response.data.error.message) {
      // Modal.error({
      //   title: L('LoginFailed'),
      //   content: error.response.data.error.message,
      // });
    } else if (!error.response) {
      // Modal.error({ content: L('UnknownError') });
    }

    setTimeout(() => { }, 1000);

    return Promise.reject(error);
  }
);

export default http;
