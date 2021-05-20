"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.codeSnippet_languages = exports.codeSnippet_theme = exports.styleConfig = exports.SimpleCKEToolbarConfiguration = exports.CKEToolbarConfiguration = void 0;
var CKEToolbarConfiguration = [{
  name: 'clipboard',
  items: ['Undo', 'Redo']
}, {
  name: 'links',
  items: ['Link']
}, {
  name: 'insert',
  items: ['Image', 'HorizontalRule', 'SpecialChar']
}, {
  name: 'basicstyles',
  items: ['Bold', 'Italic', 'Underline', 'Strike']
}, {
  name: 'paragraph',
  items: ['NumberedList', 'BulletedList', '-', 'Blockquote', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock']
}, {
  name: 'codesnippet',
  items: ['CodeSnippet']
}, {
  name: 'nvd_math',
  items: ['MathBtn']
}, {
  name: 'styles',
  items: ['Styles', 'Format']
}];
exports.CKEToolbarConfiguration = CKEToolbarConfiguration;
var SimpleCKEToolbarConfiguration = [{
  name: 'clipboard',
  items: ['Undo', 'Redo']
}, {
  name: 'basicstyles',
  items: ['Bold', 'Italic', 'Underline', 'Strike']
}];
exports.SimpleCKEToolbarConfiguration = SimpleCKEToolbarConfiguration;
var styleConfig = [{
  name: 'Function, Variable',
  element: 'code'
}, {
  name: 'Highlight',
  element: 'span',
  styles: {
    'background-color': 'Yellow'
  }
}];
exports.styleConfig = styleConfig;
var codeSnippet_theme = 'railscasts';
exports.codeSnippet_theme = codeSnippet_theme;
var codeSnippet_languages = {
  java: 'Java',
  javascript: 'JavaScript',
  json: 'JSON',
  html: 'HTML',
  cpp: 'C++',
  cs: 'C#',
  css: 'CSS',
  python: 'Python',
  sql: 'SQL',
  xml: 'XML',
  bash: 'Bash',
  objectivec: 'Objective-C'
};
exports.codeSnippet_languages = codeSnippet_languages;