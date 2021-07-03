import React from "react"

import EditPostModal from './CustomModal/EditPostModal'
import EditDocumentModal from './CustomModal/EditDocumentModal'
import ReportModal from './CustomModal/ReportModal'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

class ModalBigManager extends React.Component {
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
                case "edit-post":
                    return <EditPostModal {...modalProps} key={modalType + index} />
                case "edit-document":
                    return <EditDocumentModal {...modalProps} key={modalType + index} />
                case "report-post":
                    return <ReportModal {...modalProps} type="POST" key={modalType + index} />
                case "report-document":
                    return <ReportModal {...modalProps} type="DOCUMENT" key={modalType + index} />
                case "report-exercise":
                    return <ReportModal {...modalProps} type="EXERCISE" key={modalType + index} />
                case "report-comment":
                    return <ReportModal {...modalProps} type="COMMENT" key={modalType + index} />
                default:
                    return <></>;
            }
        });
        return <span>
            {renderedModals}
        </span>
    }
}

const mapStateToProps = (state) => {
    return {
        currentModals: state.modal.bigModal
    };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ModalBigManager));

