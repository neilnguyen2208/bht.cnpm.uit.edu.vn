import React from "react";
import './Modal.scss'

import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import { closeModal } from "redux/actions/modalAction";
import Loader from ""
class AlertModal extends React.Component {
    constructor(props) {
        super(props);
    }

    closeModal = () => {
        this.props.closeModal();
    }

    onOKClick = () => {
        this.props.closeModal();
        if (this.props.onOKClick)
            this.props.onOKClick();
    }

    render() {
        let { text } = this.props;
        return (
            <div>
                <Loader text={this.props.text} />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        currentModals: state.modal
    };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
    closeModal
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AlertModal));
