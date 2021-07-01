import React from "react";
import '../ModalBL/ModalBL.scss';
import './CommentModal.scss';
import 'components/styles/Comment.scss';
import gray_delete_icon from 'assets/icons/24x24/gray_delete_icon_24x24.png';
import { closeCommentModal } from "redux/services/modalServices";
import CommentSection from "./ExcerciseComment/CommentSection";

import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getExerciseById } from 'redux/services/courseServices'

class CommentModal extends React.Component {
    constructor(props) {
        super(props);
        this.timeOut = null;
    }

    componentDidMount() {
        // this.props.getExerciseById(2);
        document.querySelectorAll("comment-modal-container").forEach(item => item.classList.remove("close"));
        window.onresize = () => {
            document.querySelectorAll(".comment-modal-container").forEach(element => {
                element.style.height = (window.innerHeight - 80).toString() + "px";
            })
        }
    }

    closeModal = () => {
        document.querySelectorAll(".comment-modal-container").forEach(item => item.classList.add("close"));
        setTimeout(() => closeCommentModal(this.props.id), 1000);
    }

    componentWillUnmount() {

    }

    render() {
        return (
            <div>
                <div className="modal-overlay-shadow" />
                <div className="modal-fixed-layout" style={{ padding: "0px" }}>
                    <div className="comment-modal-fixed-layout">
                        <div className="comment-modal-container" style={{ height: (window.innerHeight - 80).toString() + "px" }}>
                            <div className="j-c-space-between comment-modal">
                                <img className="comment-modal-close-icon" alt="x" src={gray_delete_icon}
                                    onClick={() => this.closeModal()} />
                            </div>
                            <CommentSection
                                useAction={true}
                                // create comment will show if you have action create comment
                                // exerciseAvailableActions={this.props.currentExercise.availableActions}
                                exerciseAvailableActions={["comment"]}
                                exerciseId={this.props.exerciseId}
                                commentCount={0}
                            />
                        </div>
                    </div >
                </div>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        currentExercise: state.course.currentExercise.data,
        isLoadDone: state.course.currentExercise.isLoadDone
    }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
    getExerciseById,
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CommentModal));