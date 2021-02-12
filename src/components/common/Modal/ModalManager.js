import React from "react"
import Modal from './Modal';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

class ModalManager extends React.Component {
    render() {
        const { currentModals } = this.props;

        const renderedModals = currentModals.map((modalDescription, index) => {
            const { modalType, modalProps = {} } = modalDescription;

            return <Modal {...modalProps} key={modalType + index} />;

        });
        return <span>{renderedModals}</span>
    }

}


const mapStateToProps = (state) => {
    console.log(state);
    return {
        currentModals: state.modal
    };
}


const mapDispatchToProps = (dispatch) => bindActionCreators({
    // 
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ModalManager));

