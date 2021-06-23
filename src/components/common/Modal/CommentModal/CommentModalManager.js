import React from "react"
import CommentModal from './CommentModal.js'
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

class CommentModalManager extends React.Component {
    render() {

        // props gom co modalType va modalProps

        const { currentModals } = this.props;
        const renderedModals = currentModals.map((modalInfo, index) => {
            const { modalProps = {} } = modalInfo;
            return <CommentModal key={index}  {...modalProps} />
        });
        return <span>{renderedModals}</span>

    }
}

const mapStateToProps = (state) => {

    return {
        currentModals: state.modal.commentModal
    };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CommentModalManager));

