import React from "react";
import '../ModalBL/ModalBL.scss';
import './CommentModal.scss';
import 'components/styles/Comment.scss';
import gray_delete_icon from 'assets/icons/24x24/gray_delete_icon_24x24.png';
import { closeBLModal } from "redux/services/modalServices";

export default class CommentModal extends React.Component {
    constructor(props) {
        super(props);
        this.timeOut = null;
    }

    componentDidMount() {
        window.onresize = () => {
            document.querySelectorAll(".comment-modal-container").forEach(element => {
                element.style.height = (window.innerHeight - 80).toString() + "px";
            })
        }
        this.timeOut = setTimeout(() => closeBLModal(), 10000)
    }

    closeModal = () => {
        if (this.timeOut)
            clearTimeout(this.timeOut);
        // closeBLModal(this.props.id);
    }

    onButtonClick = () => {

        closeBLModal(this.props.id);
        // if (this.props.onBtnClick)
        // this.props.onBtnClick();
    }


    componentWillUnmount() {
        // if (this.timeOut)
        // clearTimeout(this.timeOut);
    }

    render() {
        // let { text } = this.props;
        return (
            <div className="comment-modal-fixed-layout">
                <div className="comment-modal-container" style={{ height: (window.innerHeight - 80).toString() + "px" }}>
                    <div className="j-c-space-between comment-modal">
                        <div className="comments-container">
                            <div className="section-title"> 30 Bình luận</div>
                            <div className="d-flex">
                                <div className="comment-modal-text">
                                    {/* {text} */}
                                </div>
                                <div className="comment-modal-text-link" onClick={() => this.onButtonClick()}>
                                    {/* {btnText} */}
                                </div>
                            </div>
                        </div>
                        <img className="comment-modal-close-icon" alt="x" src={gray_delete_icon}
                            onClick={() => this.closeModal()} />
                    </div>
                    <div className="right-comment-container">
                        Hiện tại không có bình luận nào cho bài tập này.
                    </div>
                </div>
            </div >
        );

    }
}

