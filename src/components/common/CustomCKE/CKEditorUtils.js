
export function getCKEInstance(id) {
  return window.CKEDITOR.instances['ck-editor-' + id];
}

//run after code snippet output loaded
export function styleCodeSnippet() {
  setTimeout(
    document.querySelectorAll('pre code').forEach((block) => {
      console.log("a")
      window.hljs.highlightBlock(block);
    }),
    1000)
}

//run after code mathemical output loaded
export function formatMathemicalFormulas() {
  (function () {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "//cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.4/MathJax.js?config=TeX-AMS_HTML";   // use the location of your MathJax

    var config = 'MathJax.Hub.Config({' +
      'extensions: ["tex2jax.js"],' +
      'jax: ["input/TeX","output/HTML-CSS"]' +
      '});' +
      'MathJax.Hub.Startup.onload();';

    if (window.opera) {
      script.innerHTML = config
    } else {
      script.text = config
    }

    script.addEventListener('load', function () {
      window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub]);
    })

    document.getElementsByTagName("head")[0].appendChild(script);
  })();
}