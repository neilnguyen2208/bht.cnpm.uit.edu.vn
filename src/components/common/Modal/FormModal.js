import React from "react";
import './Modal.scss'
import 'components/styles/Form.scss'
import 'components/styles/Button.scss'
import { openModal } from "redux/services/modalServices";
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
        this.props.inputs.forEach(element => {
            if (element.type === "text-area" || element.type === "text-input")
                this.DTO[element.key] = document.querySelector('#' + element.id).value; //for text input and text area

        });
        if (this.props.append) {
            Object.assign(this.DTO, this.props.append);
        }

        let { title, text, verifyText, cancelText, onConfirm } = this.props.confirmBox;
        if (this.props.validationCondition)
            if (styleFormSubmit(this.props.validationCondition)) {
                openModal("confirmation", { title: title, verifyText: verifyText, text: text, cancelText: cancelText, onConfirm: () => onConfirm(this.DTO) });
                return;
            } else return;

        else
            openModal("confirmation", { title: title, verifyText: verifyText, text: text, cancelText: cancelText, onVerify: () => onConfirm(this.DTO) })
    }

    render() {

        let { submitText, cancelText, title, inputs, formId } = this.props;

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
                                                                    <Combobox comboboxId = {input.id}
                                                                        selectedOptionID={input.selectedOptionID ?
                                                                            input.selectedOptionID
                                                                            : input.options[0].id}
                                                                        options={input.options}
                                                                        onOptionChanged={(selectedOption) => {
                                                                            this.DTO[input.key] = input.onOptionChanged(selectedOption);
                                                                        }
                                                                        }
                                                                        placeHolder={input.placeHolder}
                                                                        validation={input.validation}
                                                                    >
                                                                    </Combobox> :
                                                                    <Combobox comboboxId = {input.id}
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
export default FormModal;