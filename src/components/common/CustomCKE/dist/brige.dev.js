"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = createCKEInstance;

function createCKEInstance(id, config, onLoad) {
  var script = document.createElement("script");
  script.src = '../../../../public/ckeditor/ckeditor.js';
  script.async = true;
  document.body.appendChild(script);
  script.setAttribute('id', 'ckeditor-sample');

  script.onload = function () {
    onLoad();
  };
}