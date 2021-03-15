import axios from 'axios';
import { openModal, closeModal } from 'redux/actions/modalAction'
import qs from 'qs'
import store from 'redux/store/index'
export function getToken() {
  return localStorage.getItem('token');
}

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
      store.dispatch(openModal("alert", { title: "Lỗi", text: `Error code: ${error.status} <br> Error content: ${error.statusText} `, type: "Fail" }));
      // setTimeout(window.location.reload(), 500);
    }
    return Promise.reject(error);
  }
);

// var FormData = require('form-data');
// var fs = require('fs');
// var data = new FormData();
// data.append('file', fs.createReadStream('/C:/Users/mirushi/Downloads/hibernate_in_action.pdf'));

// var config = {
//   method: 'post',
//   url: 'localhost:8080/documents/upload',
//   headers: { 
//     ...data.getHeaders()
//   },
//   data : data
// };

// axios(config)
// .then(function (response) {
//   console.log(JSON.stringify(response.data));
// })
// .catch(function (error) {
//   console.log(error);
// });
