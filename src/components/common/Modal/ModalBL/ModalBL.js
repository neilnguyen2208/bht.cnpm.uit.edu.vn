import React from "react";
import './ModalBL.scss'
import gray_delete_icon from 'assets/icons/24x24/gray_delete_icon_24x24.png'
import { closeBLModal } from "redux/services/modalServices";
import done_icon from 'assets/icons/svg/success_icon.svg'
import warning_icon from 'assets/icons/svg/bg_o_warning_icon.svg'
import error_icon from 'assets/icons/svg/bg_r_warning_icon.svg'

export default class ModalBL extends React.Component {
    constructor(props) {
        super(props);
        this.timeOut = null;
    }

    closeModal = () => {
        if (this.timeOut)
            clearTimeout(this.timeOut);
        closeBLModal(this.props.id);
    }

    onButtonClick = () => {
        closeBLModal(this.props.id);
        if (this.props.onBtnClick)
            this.props.onBtnClick();
    }

    componentDidMount() {
        this.timeOut = setTimeout(() => closeBLModal(), 10000)
    }

    componentWillUnmount() {
        if (this.timeOut)
            clearTimeout(this.timeOut);
    }

    render() {
        let { type, text } = this.props;

        return (
            <div className="bl-modal-fixed-layout">
                <div className="bottom-left-modal j-c-space-between">
                    <div className="bl-modal-text-c">
                        {type === "success" && <img className="bl-modal-main-icon" src={done_icon} alt="icon" />}
                        {type === "error" && <img className="bl-modal-main-icon" src={error_icon} alt="icon" />}
                        {type === "warning" && <img className="bl-modal-main-icon" src={warning_icon} alt="icon" />}

                        <div className="d-flex">
                            <div className="bl-modal-text">
                                {text}
                            </div>
                            {/* <div className="bl-modal-text-link" onClick={() => this.onButtonClick()}>
                                {btnText}
                            </div> */}
                        </div>
                    </div>
                    <img className="bl-modal-close-icon" alt="x" src={gray_delete_icon}
                        onClick={() => this.closeModal()} />
                </div>
            </div >
        );

    }
}

