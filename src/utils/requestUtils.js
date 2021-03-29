import axios from 'axios';
import { openModal, closeModal } from 'redux/services/modalServices';
import qs from 'qs';
import store from 'redux/store/index';
import FormData from 'form-data';
import fs from 'fs';

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
      openModal("alert", { title: "Lỗi", text: `Error code: ${error.status} <br> Error content: ${error.statusText} `, type: "Fail" });
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
      openModal("alert", { title: "Lỗi", text: `Error code: ${error.status} <br> Error content: ${error.statusText} `, type: "Fail" });
      // setTimeout(window.location.reload(), 500);
    }
    return Promise.reject(error);
  }
);
