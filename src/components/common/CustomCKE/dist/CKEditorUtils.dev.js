"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCKEInstance = getCKEInstance;
exports.styleCodeSnippet = styleCodeSnippet;
exports.formatMathermicalFormulas = formatMathermicalFormulas;

function getCKEInstance(id) {
  return window.CKEDITOR.instances['ck-editor-' + id];
}

function styleCodeSnippet() {
  document.querySelectorAll('pre code').forEach(function (block) {
    window.hljs.highlightBlock(block);
  });
}

function formatMathermicalFormulas() {}