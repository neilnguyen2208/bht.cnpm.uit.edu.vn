import axios from 'axios';
import { openBLModal } from 'redux/services/modalServices';
import keycloakService from 'keycloakServices.js'

export const appBaseUrl = process.env.REACT_APP_APP_BASE_URL;
export const remoteServiceBaseUrl = process.env.REACT_APP_REMOTE_SERVICE_BASE_URL;

export const request = axios.create({
  baseURL: remoteServiceBaseUrl,
  headers: {
    'Content-Type': 'application/json',
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

export const springRequest = axios.create({
  baseURL: remoteServiceBaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
}
);

springRequest.interceptors.request.use((config) => {
  if (keycloakService.isLoggedIn()) {
    const callback = () => {
      config.headers.Authorization = `Bearer ${keycloakService.getToken()}`;
      return Promise.resolve(config);
    };
    return keycloakService.updateToken(callback);
  }
});

springRequest.interceptors.response.use(
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