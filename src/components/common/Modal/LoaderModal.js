import React from "react";
import './Modal.scss'

import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import { closeModal } from "redux/actions/modalAction";
import MediumLoader from 'components/common/Loader/Loader_M';
class LoaderModal extends React.Component {
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
        return (
            <div>
                <MediumLoader text={this.props.text} />
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoaderModal));
