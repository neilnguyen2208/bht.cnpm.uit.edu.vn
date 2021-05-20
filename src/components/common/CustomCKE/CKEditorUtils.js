
export function getCKEInstance(id) {
  return window.CKEDITOR.instances['ck-editor-' + id];
}

export function styleCodeSnippet() {
  document.querySelectorAll('pre code').forEach((block) => {
    window.hljs.highlightBlock(block);
  });
}

export function formatMathermicalFormulas() {

}