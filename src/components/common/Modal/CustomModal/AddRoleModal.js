import React from "react";
import '../Modal.scss'
import 'components/styles/Button.scss'
import { closeBigModal } from "redux/services/modalServices";
import store from 'redux/store/index.js'
import "components/common/CustomCKE/CKEditorContent.scss";
import 'components/styles/Detail.scss'
import ModalTitlebar from "components/common/Titlebar/ModalTitlebar";
import TreeView from 'components/common/TreeView/TreeView'

export default class AddRoleModal extends React.Component {
    state = { isRoleInfo: true }
    componentDidMount() {
        // document.querySelector(".ed-post-form-container.preview-modal").classList.remove("d-block");
        // document.querySelector(".ed-post-form-container.edit").classList.remove("d-none");
        // document.querySelector(".ed-post-form-container.preview-modal").classList.add("d-none");
        // document.querySelector(".ed-post-form-container.edit").classList.add("d-block");
    }
    closeModal = () => {
        store.dispatch(closeBigModal())
    }
    render() {
        return (
            <div>
                <div className="modal-overlay-shadow" />
                <div className="modal-fixed-layout">
                    <div className="modal-wrapper big o-f-hidden pd-top-5px">
                        <ModalTitlebar title="THÊM PHÂN QUYỀN" />
                        <div className="scroller-container mg-bottom-10px">
                            <div className="form-container">
                                <div>
                                    <div className="j-c-end " >
                                        <button className="blue-button" disabled={this.state.isRoleInfo} onClick={this.onEditBtnClick} >Role</button>
                                        <div className="mg-right-5px" />
                                        <button className="white-button" disabled={!this.state.isRoleInfo} onClick={this.onPreviewBtnClick} >Permission</button>
                                    </div>
                                    <div className="decoration-line mg-top-10px" />
                                </div>
                                <div id="add-role-info" >
                                    <TreeView />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

