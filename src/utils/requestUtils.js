import axios from 'axios';
import { openBLModal } from 'redux/services/modalServices';
import authService from 'authentication/authenticationServices.js'
const qs = require('qs');

export const appBaseUrl = process.env.REACT_APP_APP_BASE_URL;
export const remoteServiceBaseUrl = process.env.REACT_APP_REMOTE_SERVICE_BASE_URL;

export const request = axios.create({
  baseURL: remoteServiceBaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
  paramsSerializer: function (params) {
    return qs.stringify(params, {
      encode: false,
    });
  },
}
);

request.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

request.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.status !== 200) {
      openBLModal({ type: "error", text: "Có lỗi xảy ra!" });
      // setTimeout(window.location.reload(), 500);
    }
    return Promise.reject(error);
  }
);


// multipart request
export const multipartRequest = axios.create({
  baseURL: remoteServiceBaseUrl,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
}
);

multipartRequest.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

multipartRequest.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.status !== 200) {
      openBLModal({ type: "error", text: "Có lỗi xảy ra!" });
    }
    return Promise.reject(error);
  }
);

export const authRequest = axios.create({
  baseURL: remoteServiceBaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
}
);

authRequest.interceptors.request.use(
  (config) => {
    //if logged in
    if (authService.isLoggedIn()) {
      const callback = () => {
        config.headers.Authorization = `Bearer ${authService.getToken()}`;
        return Promise.resolve(config);
      };

      //if token is expire
      return authService.updateToken(callback);
    }

    //if not logged in => request without token
    return Promise.resolve(config);
  },
  (error) => {
    return Promise.reject(error);
  }
);

authRequest.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.status !== 200) {
      openBLModal({ type: "error", text: "Có lỗi xảy ra!" });
    }
    return Promise.reject(error);
  }
);