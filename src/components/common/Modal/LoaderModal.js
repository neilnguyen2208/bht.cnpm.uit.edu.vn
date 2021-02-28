import React from "react";
import './Modal.scss'

import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import { closeModal } from "redux/actions/modalAction";
import Loader from 'components/common/Loader/Loader_S';
class LoaderModal extends React.Component {

    render() {
        return (
            <div>
                <div className="modal-overlay-shadow" />
                <div className="modal-fixed-layout">
                    <Loader text={this.props.text} />
                </div>
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
