import React from "react";
import './Modal.scss'
import 'components/styles/Form.scss'
import 'components/styles/Button.scss'
import red_delete_icon from 'assets/icons/24x24/red_delete_icon_24x24.png'
import { closeModal } from "redux/actions/modalAction";
import store from 'redux/store/index.js'
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import Editor from 'components/common/CustomCKE/CKEditor.js'
class FormModal extends React.Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {

    }

    closeModal = () => {
        this.props.closeModal()
    }

    onSubmitClick = () => {
        this.props.closeModal();
        if (this.props.onSubmit)
            this.props.onSubmit();
    }

    onCancelClick = () => {
        if (this.props.onCancel)
            this.props.onCancel();
    }

    render() {

        let { submitText, cancelText, id, title, inputs, formId, validationOptions, onVerifyBtnClick } = this.props;

        let form =
            <div className="content-container">
                <div className="form-container" id={inputs.formId}>{
                    inputs.map(input => {
                        if (input.type === "form-input")
                            return <div className="form-group">
                                <label className="form-label-required">{input.label}</label>
                                <input className="form-input" id={input.id}
                                    placeholder={input.placeHolder}
                                    onChange={e => this.handleTitleChange(e)}
                                    type="text" >
                                </input>
                                <div className="form-error-label-container">
                                    <span className="form-error-label" ></span>
                                </div>
                            </div>
                        if (input.type === "form-text-area")
                            
                        if (input.type === "form-ckeditor")
                            return <div className="form-group">
                                <div className="form-label-required">Nội dung:</div>
                                <Editor
                                    id={"ed-post-cke"}
                                    onChange={this.handleEditorChange}
                                    // myData={!this.props.isCurrentPostLoading ? this.state.EDIT_POST_DTO.content : ''}
                                    validation
                                    onInstanceReady={this.onCKEInstanceReady}
                                />
                                <div className="form-error-label-container">
                                    <span className="form-error-label" ></span>
                                </div>
                            </div>
                        if (input.type === "form-file-input")
                            return <div className="form-group">
                                <label className="form-label-required">{input.label}</label>
                                <input className="form-text-area" id={input.id}
                                    placeholder={input.placeHolder}
                                    onChange={e => this.handleTitleChange(e)}
                                    type="text" >
                                </input>
                                <div className="form-error-label-container">
                                    <span className="form-error-label" ></span>
                                </div>
                            </div>
                        if (input.type === "form-combobox")
                            return <div className="form-group">
                                <label className="form-label-required">{input.label}</label>
                                <input className="form-text-area" id={input.id}
                                    placeholder={input.placeHolder}
                                    onChange={e => this.handleTitleChange(e)}
                                    type="text" >
                                </input>
                                <div className="form-error-label-container">
                                    <span className="form-error-label" ></span>
                                </div>
                            </div>

                        return <></>;
                    })}
                </div>
            </div>

        return (
            <div>
                <div className="modal-overlay-shadow" />
                <div className="modal-fixed-layout">
                    <div className="modal-wrapper form">
                        <div className="modal-header">
                            <div> {this.props.title} </div>
                            <img className="modal-close-modal" alt="header" src={red_delete_icon}
                                onClick={() => this.closeModal()} />
                        </div>
                        {/* Tam thoi form se nhu the nay, sau nay su dung thi lam tiep */}
                        {form}
                        <div className="modal-footer">
                            <div className="blue-button" onClick={() => this.onSubmitClick()} >{submitText ? submitText : "Submit"}</div>
                            <div className="red-button mg-left-5px" onClick={() => this.onCancelClick()} >{cancelText ? cancelText : "Cancel"}</div>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}

const mapStateToProps = (state) => {
    return {

    };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
    closeModal
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FormModal));