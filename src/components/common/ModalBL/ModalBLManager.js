import React from "react"
import BLModal from './ModalBL'
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

class BLModalManager extends React.Component {
    render() {

        // props gom co modalType va modalProps

        const { currentModals } = this.props;
        const renderedModals = currentModals.map((modalInfo, index) => {
            const { modalProps = {} } = modalInfo;
            return <BLModal key={index}  {...modalProps} />
        });
        return <span>{renderedModals}</span>

    }
}

const mapStateToProps = (state) => {

    return {
        currentModals: state.modal.blModal
    };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BLModalManager));

