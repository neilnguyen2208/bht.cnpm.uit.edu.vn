"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCKEInstance = getCKEInstance;
exports.styleCodeSnippet = styleCodeSnippet;
exports.formatMathemicalFormulas = formatMathemicalFormulas;

function getCKEInstance(id) {
  return window.CKEDITOR.instances['ck-editor-' + id];
} //run after code snippet output loaded


function styleCodeSnippet() {
  document.querySelectorAll('pre code').forEach(function (block) {
    window.hljs.highlightBlock(block);
  });
} //run after code mathemical output loaded


function formatMathemicalFormulas() {
  (function () {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "//cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.4/MathJax.js?config=TeX-AMS_HTML"; // use the location of your MathJax

    var config = 'MathJax.Hub.Config({' + 'extensions: ["tex2jax.js"],' + 'jax: ["input/TeX","output/HTML-CSS"]' + '});' + 'MathJax.Hub.Startup.onload();';

    if (window.opera) {
      script.innerHTML = config;
    } else {
      script.text = config;
    }

    script.addEventListener('load', function () {
      window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub]);
    });
    document.getElementsByTagName("head")[0].appendChild(script);
  })();
}