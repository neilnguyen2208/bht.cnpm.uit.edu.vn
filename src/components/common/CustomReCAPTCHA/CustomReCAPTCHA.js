
import React, { Component } from 'react';
import './CustomReCAPTCHA.scss'
import ReCAPTCHA from 'react-google-recaptcha';
import { RECAPTCHA_CLIENT_SIDE_KEY } from 'constants.js';

class CustomReCAPTCHA extends Component {

  constructor(props) {
    super(props);
    this.token = '';
  }

  componentDidMount() {
    document.getElementById("ReCAP-wrapper-" + this.props.id).classList.add("dummy-invalid");
  }

  onTokenChange = (token) => {
    this.token = token;
    document.getElementById("ReCAP-wrapper-" + this.props.id).classList.remove("dummy-invalid");
    let wrapper = this.getParent(document.getElementById("ReCAP-wrapper-" + this.props.id), '.form-group');
    wrapper.classList.remove('invalid');
    this.getParent(document.getElementById("ReCAP-wrapper-" + this.props.id), '.form-group').querySelector('.form-error-label').innerText = '';
    console.log(token);

    if (this.state.onTokenChange)
      this.props.onTokenChange(token);
    this.setState({});
  }

  // validate = () => {

  //   //lay element ngoai cung cua editor hien tai
  //   this.errorMessage = document.getElementById("d-e-ReCAP-wrapper-" + this.props.id).innerText;
  //   let wrapperReCAP = document.getElementById("ReCAP-wrapper-" + this.props.id);

  //   //lay element error 
  //   this.errorElement = this.getParent(wrapperReCAP, '.form-group').querySelector('.form-error-label');

  //   if (this.errorMessage && !this.token) {
  //     this.errorElement.innerText = this.errorMessage;
  //     this.getParent(wrapperReCAP, '.form-group').classList.add('invalid');
  //     document.getElementById("ReCAP-wrapper-" + this.props.id).classList.add("invalid");

  //   } else {
  //     this.errorElement.innerText = '';
  //     this.getParent(wrapperReCAP, '.form-group').classList.remove('invalid');
  //     document.getElementById("ReCAP-wrapper-" + this.props.id).classList.remove("invalid");
  //   }
  // }

  //lay form
  getParent = (wrapperReCAP, selector) => {
    while (wrapperReCAP.parentElement) {
      if (wrapperReCAP.parentElement.matches(selector)) {
        return wrapperReCAP.parentElement;
      }
      wrapperReCAP = wrapperReCAP.parentElement;
    }
  }

  render() {
    return (
      <div className="ReCAP-wrapper ReCAP " id={"ReCAP-wrapper-" + this.props.id}>
        <ReCAPTCHA sitekey={RECAPTCHA_CLIENT_SIDE_KEY} onChange={token => this.onTokenChange(token)} />
        <div id={"d-e-ReCAP-wrapper-" + this.props.id} style={{ "display": "none" }} ></div>
      </div>
    );
  }
}
export default CustomReCAPTCHA;