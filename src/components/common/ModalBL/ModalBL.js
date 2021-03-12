import React from "react";
import './ModalBL.scss'
import gray_delete_icon from 'assets/icons/24x24/gray_delete_icon_24x24.png'
import done_icon from 'assets/icons/24x24/done_icon_24x24.png'
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import { closeBLModal } from "redux/actions/modalAction";
import store from 'redux/store/index.js'
class ModalBL extends React.Component {
    constructor(props) {
        super(props);
        this.timeOut = null;
    }

    closeModal = () => {
        if (this.timeOut)
            clearTimeout(this.timeOut);
        store.dispatch(closeBLModal(this.props.id));
    }

    onButtonClick = () => {
        store.dispatch(closeBLModal(this.props.id));
        if (this.props.onBtnClick)
            this.props.onBtnClick();
    }

    componentDidMount() {
        this.timeOut = setTimeout(() => this.props.closeBLModal(), 3000)
    }

    componentWillUnmount() {
        if (this.timeOut)
            clearTimeout(this.timeOut);
    }

    render() {
        let { icon, text, btnText } = this.props;

        return (
            <div className="bl-modal-fixed-layout">
                <div className="bottom-left-modal j-c-space-between">
                    <div className="bl-modal-text-c">
                        {icon ? <img className="bl-modal-main-icon" src={icon} alt="icon" /> : <></>}
                        {/* bl is stand for bottom-left */}
                        <div className="d-flex">
                            <div className="bl-modal-text">
                                {text}
                            </div>
                            <div className="bl-modal-text-link" onClick={() => this.onButtonClick()}>
                                {btnText}
                            </div>
                        </div>
                    </div>
                    <img className="bl-modal-close-icon" alt="x" src={gray_delete_icon}
                        onClick={() => this.closeModal()} />
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
    closeBLModal
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ModalBL));
