import React from "react";
import './Modal.scss'
import 'components/styles/Form.scss'
import 'components/styles/Button.scss'
import red_delete_icon from 'assets/icons/24x24/red_delete_icon_24x24.png'
import { closeModal, openModal } from "redux/actions/modalAction";
import store from 'redux/store/index.js'
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import Editor from 'components/common/CustomCKE/CKEditor.js'
import FormFileUploader from 'components/common/FormFileUploader/FormFileUploader'
import ModalTitlebar from 'components/common/Titlebar/ModalTitlebar'
import Combobox from 'components/common/Combobox/Combobox';
import { validation, styleFormSubmit } from 'utils/validationUtils'

class FormModal extends React.Component {
    constructor(props) {
        super(props);
        this.DTO = {};
    }

    componentDidMount() {
        validation(this.props.validationCondition);
    }

    onCancelClick = () => {
        this.props.closeModal();
    }

    onSubmitClick = () => {
        if (this.props.validationCondition)
            if (styleFormSubmit(this.props.validationCondition)) {
                this.props.openModal("confirmation", { title: "A", onOKClick: this.props.onVerify(this.DTO) })
            }
            else return;
        this.props.openModal("confirmation", { title: "A", onOKClick: this.props.onVerify(this.DTO) })
    }

    render() {

        let { submitText, cancelText, id, title, inputs, formId } = this.props;

        return (
            <div>
                <div className="modal-overlay-shadow" />
                <div className="modal-fixed-layout">
                    <div className="modal-wrapper form o-f-hidden pd-top-5px">
                        <ModalTitlebar title={title} form />
                        {/* Basic form */}
                        <div className="scroller-container">
                            <div className="form-container" id={formId}>
                                {inputs.map(input => {
                                    return <div className="form-group">
                                        <label className={input.isRequired ? "form-label-required" : "form-label"}>{input.label}</label>
                                        {
                                            input.type === "text-input" ?
                                                <input className="text-input" id={input.id}
                                                    placeholder={input.placeHolder}
                                                    type="text"
                                                    validation={input.validation} >
                                                </input> :
                                                <>
                                                    {input.type === "text-area" ?
                                                        <textarea className="text-area" id={input.id}
                                                            placeholder={input.placeHolder}
                                                            validation={input.validation} >
                                                        </textarea> :
                                                        <>
                                                            {input.type === "combobox" ?
                                                                <> {input.selectedOptionID ?
                                                                    <Combobox id={input.id}
                                                                        selectedOptionID={input.selectedOptionID ?
                                                                            input.selectedOptionID
                                                                            : input.options[0].id}
                                                                        options={input.options}
                                                                        onOptionChanged={(selectedOption) => input.onOptionChanged(selectedOption)}
                                                                        placeHolder={input.placeHolder}
                                                                        validation={input.validation}
                                                                    >
                                                                    </Combobox> :
                                                                    <Combobox id={input.id}
                                                                        options={input.options}
                                                                        onOptionChanged={(selectedOption) => input.onOptionChanged(selectedOption)}
                                                                        placeHolder={input.placeHolder}
                                                                        validation={input.validation}
                                                                    >
                                                                    </Combobox>
                                                                }
                                                                </>
                                                                :
                                                                <>
                                                                    {input.type === "ckeditor" ?
                                                                        <Editor
                                                                            id={input.id}
                                                                            validation={input.validation}
                                                                            data={input.defaultData}
                                                                        /> :
                                                                        <>
                                                                            {input.type === "file-input" ?
                                                                                <FormFileUploader id={input.id}
                                                                                    validation={input.validation}
                                                                                    maxSize={26214400} //byte
                                                                                    fileType={".pdf"} //n
                                                                                /> :
                                                                                <></>
                                                                            }
                                                                        </>
                                                                    }
                                                                </>
                                                            }
                                                        </>
                                                    }
                                                </>
                                        }

                                        <div className="form-error-label-container">
                                            <span className="form-error-label" ></span>
                                        </div>
                                    </div>
                                })
                                }
                                <div className="modal-footer">
                                    <div className="blue-button" onClick={() => this.onSubmitClick()} >{submitText ? submitText : "Submit"}</div>
                                    <div className="red-button mg-left-5px" onClick={() => this.onCancelClick()} >{cancelText ? cancelText : "Cancel"}</div>
                                </div>
                            </div>
                        </div >

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
    closeModal, openModal
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FormModal));