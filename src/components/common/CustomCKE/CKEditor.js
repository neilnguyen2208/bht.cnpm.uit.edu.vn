
import { CKEToolbarConfiguration, codeSnippet_languages, codeSnippet_theme, styleConfig } from "./CKEditorConfiguration"
import Loader from 'components/common/Loader/Loader'
import React from 'react';
import './CKEditor.scss';

class Editor extends React.Component {

  constructor(props) {
    super(props);
    this.editorID = "ck-editor-" + this.props.editorId;
    this.state = { content: '' };
  }

  componentDidMount() {
    this.scriptCKELoaded();
  }

  scriptCKELoaded = () => {
    // console.log("editor loaded!")
    //bhtConfiguration
    let toolbarConfig = this.props.config ? this.props.config : CKEToolbarConfiguration;

    let bhtConfiguration = {
      extraPlugins: 'nvd_math',
      mathJaxLib: '//cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.4/MathJax.js?config=TeX-AMS_HTML',
      toolbar: toolbarConfig,
      format_tags: 'p;h1;h2;h3;pre',
      stylesSet: styleConfig,
      codeSnippet_theme: codeSnippet_theme,
      codeSnippet_languages: codeSnippet_languages,
      autoEmbed_widget: 'nvd_math'
    };

    //inject bhtConfiguration to external file
    if (this.props.inline)
      window.createCKEInstance(this.editorID, bhtConfiguration, true)();
    else
      window.createCKEInstance(this.editorID, bhtConfiguration, false)();

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

    //goi khi instance bi huy
    window.CKEDITOR.instances[this.editorID].on('destroy', function () {
      this.onDestroy();
    }.bind(this));

    window.CKEDITOR.instances[this.editorID].on('instanceReady', function () {
      this.onInstanceReady();
    }.bind(this));

    document.getElementById('ck-editor-loader' + this.props.editorId).style.display = "block";
    document.getElementById("cke-wrapper-" + this.props.editorId).style.border = "none";

    if (this.props.validation) {
      document.getElementById("cke-wrapper-" + this.props.editorId).classList.add("validation")
    }

    window.CKEDITOR.on('dialogDefinition', function (ev) {
      // Take the dialog name and its definition from the event data.
      var dialogName = ev.data.name;
      var dialogDefinition = ev.data.definition;

      // Check if the definition is from the dialog window you are interested in (the "Link" dialog window).
      if (dialogName === 'link') {

        //override title of popup.
        dialogDefinition.title = "LINK";

        //remove advanced and target tab
        dialogDefinition.removeContents('advanced');
        dialogDefinition.removeContents('target');


        // Get a reference to the "Link Info" tab.
        let infoTab = dialogDefinition.getContents('info');
        //Remove link type
        infoTab.get('linkType').style = 'display: none';
        infoTab.get('anchorOptions').style = 'display: none';


        // Set the default value for the URL field.
        var urlField = infoTab.get('url');
        urlField['default'] = 'www.example.com';
      }

      if (dialogName === 'image') {
        dialogDefinition.removeContents('advanced');
        dialogDefinition.removeContents('Link');
        dialogDefinition.title = "HÌNH ẢNH";

        let infoTab = dialogDefinition.getContents('info');
        infoTab.get('txtAlt').style = 'display: none';
        infoTab.get('txtBorder').style = 'display: none';
        infoTab.get('txtHSpace').style = 'display: none';
        infoTab.get('txtVSpace').style = 'display: none';
        infoTab.get('htmlPreview').style = 'display: none';
      }


      if (dialogName === 'codeSnippet') {
        let infoTab = dialogDefinition.getContents('info');
        dialogDefinition.title = "ĐỊNH DẠNG CODE";

        infoTab.get('lang').label = 'Chọn ngôn ngữ lập trình:';
        infoTab.get('code').label = `Nội dung code:`;



      }
    });



  }

  onEditorChange = (data) => {
    if (this.props.onChange) {
      this.props.onChange(data);
    }
  }


  onDestroy = () => {

    if (this.props.onDestroy)
      this.props.onDestroy();
    console.log(this.editorID + " has been destroyed!");
  }
  validate = () => {

    //lay element ngoai cung cua editor hien tai
    this.errorMessage = document.getElementById("d-e-cke-wrapper-" + this.props.editorId).innerText;
    let wrapperEditor = document.getElementById("cke-wrapper-" + this.props.editorId);

    //lay element error 
    this.errorElement = this.getParent(wrapperEditor, '.form-group').querySelector('.form-error-label');

    if (this.errorMessage && !window.CKEDITOR.instances[this.editorID].getData()) {
      this.errorElement.innerText = this.errorMessage;
      this.getParent(wrapperEditor, '.form-group').classList.add('invalid');
      document.getElementById("cke-wrapper-" + this.props.editorId).classList.add("invalid");

    } else {
      this.errorElement.innerText = '';
      this.getParent(wrapperEditor, '.form-group').classList.remove('invalid');
      document.getElementById("cke-wrapper-" + this.props.editorId).classList.remove("invalid");
    }
  }

  onFocus = () => {
    let wrapperEditor = document.getElementById("cke-wrapper-" + this.props.editorId);
    document.getElementById("cke-wrapper-" + this.props.editorId).classList.add("focus");
    if (this.props.validation) {
      this.getParent(wrapperEditor, '.form-group').querySelector('.form-error-label').innerText = '';
      this.getParent(wrapperEditor, '.form-group').classList.remove('invalid');
      document.getElementById("cke-wrapper-" + this.props.editorId).classList.remove("invalid");
    }
    if (this.props.onFocus) {
      this.props.onFocus();
    }
    return !this.errorMessage;
  }

  onBlur = () => {
    if (document.getElementById("cke-wrapper-" + this.props.editorId)) {
      document.getElementById("cke-wrapper-" + this.props.editorId).classList.remove("focus");
      if (this.props.validation)
        this.validate();
    }
  }

  onInstanceReady = () => {
    document.getElementById('ck-editor-loader' + this.props.editorId).style.display = "none";
    document.getElementById("cke-wrapper-" + this.props.editorId).style.border = "1px solid var(--gray)";
    if (this.props.onInstanceReady)
      this.props.onInstanceReady();
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

      <div className="cke-wrapper ckeditor" id={"cke-wrapper-" + this.props.editorId}>
        <textarea className="fake-cke" id={this.editorID} name={this.editorID} cols="100" rows="6" defaultValue={this.props.myData}>
        </textarea>
        <div id={"ck-editor-loader" + this.props.editorId}>
          <Loader />
        </div>
        {this.props.validation ? <div>
          <div id={"d-e-cke-wrapper-" + this.props.editorId} style={{ "display": "none" }} ></div>
        </div> : <></>}

      </div>
    );
  }
}


export default Editor;
