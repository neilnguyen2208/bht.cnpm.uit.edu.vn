import React from "react"
import AlertModal from './AlertModal';
import ConfirmationModal from './ConfirmationModal';
import FormModal from './FormModal'

import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

class ModalManager extends React.Component {
    render() {

        // props gom co modalType va modalProps
        // voi alert_failure va alert_success thi co titlte, text, onOKClick
        // voi confirmation thi co title, text, onOKClick va onCancelClick
        // voi form thi co title, onSubmitClick va onCancelClick va childrenProps (form ma nguoi dung tu thiet ke)

        const { currentModals } = this.props;

        const renderedModals = currentModals.map((modalDescription, index) => {

            //create loader for handling api 

            const { modalType, modalProps = {} } = modalDescription;
            switch (modalType) {
                case "alert":
                    return <AlertModal {...modalProps} key={modalType + index} />;
                case "confirmation":
                    return <ConfirmationModal {...modalProps} key={modalType + index} />;
                default:
                    return <FormModal {...modalProps} key={modalType + index} />;
            }
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
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ModalManager));

