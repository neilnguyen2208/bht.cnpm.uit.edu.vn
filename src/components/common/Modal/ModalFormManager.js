import React from "react"
import FormModal from "./FormModal"
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

class ModalFormManager extends React.Component {
    render() {

        // props gom co modalType va modalProps
        // voi alert_failure va alert_success thi co titlte, text, onOKClick
        // voi confirmation thi co title, text, onOKClick va onCancelClick
        // voi form thi co title, onSubmitClick va onCancelClick va childrenProps (form ma nguoi dung tu thiet ke)

        const { currentModals } = this.props;
        // console.log(currentModals);
        const renderedModals = currentModals.map((modalDescription, index) => {

            //create loader for handling api 

            const { modalType, modalProps = {} } = modalDescription;
            switch (modalType) {

            }
        });
        return <span>{renderedModals}</span>
    }
}

const mapStateToProps = (state) => {
    return {
        currentModals: state.modal.modalForm
    };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ModalFormManager));

