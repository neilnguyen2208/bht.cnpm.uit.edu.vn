
import { CKEToolbarConfiguration } from "./CKEditorConfiguration"
import Loader from 'components/common/Loader/Loader'
import React, { Component } from 'react';
import './CKEditor.scss'

class Editor extends Component {

  constructor(props) {
    super(props);
    this.editorID = "ck-editor-" + this.props.id;
    this.state = { content: '' };
  }

  componentDidMount() {
    let toolbarConfig = this.props.config ? this.props.config : CKEToolbarConfiguration;

    let configuration = {
      toolbar: toolbarConfig,

    };

    window.CKEDITOR.replace(this.editorID, configuration);

    window.CKEDITOR.instances[this.editorID].on('change', function () {
      let data = window.CKEDITOR.instances[this.editorID].getData();
      this.onEditorChange(data);
    }.bind(this));

    window.CKEDITOR.instances[this.editorID].on('focus', function () {
      this.onFocus();
    }.bind(this));

    //khong co ham on blur   
    window.CKEDITOR.instances[this.editorID].on('blur', function () {
      this.onBlur();
    }.bind(this));

    window.CKEDITOR.instances[this.editorID].on('instanceReady', function () {
      this.onInstanceReady();
    }.bind(this));

    document.getElementById('ck-editor-loader' + this.props.id).style.display = "block";
    document.getElementById("cke-wrapper-" + this.props.id).style.border = "none";

    if (this.props.validation) {
      document.getElementById("cke-wrapper-" + this.props.id).classList.add("validation")
    }
  }

  onEditorChange = (data) => {
    if (this.props.onChange) {
      this.props.onChange(data);
    }
  }

  validate = () => {

    //lay element ngoai cung cua editor hien tai
    this.errorMessage = document.getElementById("d-e-cke-wrapper-" + this.props.id).innerText;
    this.formGroupElement = document.getElementById("d-f-g-cke-wrapper-" + this.props.id).innerText;
    this.errorSelector = document.getElementById("d-e-s-cke-wrapper-" + this.props.id).innerText;
    let wrapperEditor = document.getElementById("cke-wrapper-" + this.props.id);

    //lay element error 
    this.errorElement = this.getParent(wrapperEditor, this.formGroupElement).querySelector(this.errorSelector);

    if (this.errorMessage && !window.CKEDITOR.instances[this.editorID].getData()) {
      this.errorElement.innerText = this.errorMessage;
      this.getParent(wrapperEditor, this.formGroupElement).classList.add('invalid');
      document.getElementById("cke-wrapper-" + this.props.id).classList.add("invalid");

    } else {
      this.errorElement.innerText = '';
      this.getParent(wrapperEditor, this.formGroupElement).classList.remove('invalid');
      document.getElementById("cke-wrapper-" + this.props.id).classList.remove("invalid");
    }
  }

  onFocus = () => {
    document.getElementById("cke-wrapper-" + this.props.id).classList.add("focus");
    document.getElementById("cke-wrapper-" + this.props.id).classList.remove("invalid");
    if (this.props.onFocus) {
      this.props.onFocus();
    }
    return !this.errorMessage;
  }

  onBlur = () => {
    if (document.getElementById("cke-wrapper-" + this.props.id)) {
      document.getElementById("cke-wrapper-" + this.props.id).classList.remove("focus");
      if (this.props.validation)
        this.validate();
    }
  }

  onInstanceReady = () => {
    document.getElementById('ck-editor-loader' + this.props.id).style.display = "none";
    document.getElementById("cke-wrapper-" + this.props.id).style.border = "1px solid var(--gray)";
    if (this.props.onInstanceReady)
      this.props.onInstanceReady()
  }

  //lay form
  getParent = (wrapperEditor, selector) => {
    while (wrapperEditor.parentElement) {
      if (wrapperEditor.parentElement.matches(selector)) {
        return wrapperEditor.parentElement;
      }
      wrapperEditor = wrapperEditor.parentElement;
    }
  }

  render() {
    return (
      <div className="cke-wrapper form-ckeditor" id={"cke-wrapper-" + this.props.id}>
        <input type="text-area" className="fake-cke" id={this.editorID} name={this.editorID} cols="100" rows="6" defaultValue={this.props.value}>
        </input>
        <div id={"ck-editor-loader" + this.props.id}>
          <Loader />
        </div>
        {this.props.validation ? <div>
          <div id={"d-e-cke-wrapper-" + this.props.id} style={{ "display": "none" }} ></div>
          <div id={"d-f-g-cke-wrapper-" + this.props.id} style={{ "display": "none" }} ></div>
          <div id={"d-e-s-cke-wrapper-" + this.props.id} style={{ "display": "none" }} ></div>
        </div> : <></>}
      </div>
    );
  }
}


export default Editor;