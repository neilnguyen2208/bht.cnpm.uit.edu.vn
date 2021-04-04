import React from "react";
import '../Modal.scss'
import 'components/styles/Button.scss'
import { closeBigModal, closeModal, openModal } from "redux/services/modalServices";
import store from 'redux/store/index.js'
import "components/common/CustomCKE/CKEditorContent.scss";
import 'components/styles/Detail.scss'
import ModalTitlebar from "components/common/Titlebar/ModalTitlebar";
import TreeView from 'components/common/TreeView/TreeView'
import { styleFormSubmit, validation } from 'utils/validationUtils'

const validationCondition = {
    form: '#edit-role-form',
    rules: [
        //truyen vao id, loai component, message
        validation.isRequired('edit-role-name-input', 'text-input', 'Tên role không được để trống!'),
        validation.noSpecialChar('edit-role-name-input', 'text-input', 'Tên role không được chứa ký tự đặc biệt!'),
    ],
}

export default class AddRoleModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isAddRole: true }
        this.CREATE_ROLE_DTO = {
            roleName: '',
            permission: []
        }
    }

    componentDidMount() {
        validation(validationCondition);

    }

    handleSaveBtnClick = () => {
        if (styleFormSubmit(validationCondition)) {
            openModal("confirmation",
                {
                    title: "Cập nhật role.",
                    text: "Hành động có thể cần refresh để hiệu lực các thay đổi.",
                    confirmText: "Xác nhận",
                    cancelText: "Huỷ",
                    onConfirm: () => {
                        // this.props.editAPost(this.props.id, { ...this.state.EDIT_POST_DTO, summary: tmpSummary + "" });
                        closeModal(); //close confimation popup
                        closeBigModal(); //close edit post popup
                    }
                })
        }
    }

    onRoleNameChanged = (e) => {
        this.setState({ CREATE_ROLE_DTO: { ...this.state.CREATE_ROLE_DTO, roleName: (e.target.value) } })
    }

    onNodeChecked = (checkedKeys, info) => {
        console.log(checkedKeys);
        this.setState({ CREATE_ROLE_DTO: { ...this.state.CREATE_ROLE_DTO, permission: checkedKeys } })
    }

    render() {
        return (
            <div>
                <div className="modal-overlay-shadow" />
                <div className="modal-fixed-layout">
                    <div className="modal-wrapper big o-f-hidden pd-top-5px">
                        <ModalTitlebar title="CHỈNH SỬA PHÂN QUYỀN" />
                        <div className="scroller-container mg-bottom-10px">
                            <div className="form-container">
                                <div>
                                    <div className="j-c-end " >
                                        <button className="blue-button" disabled={this.state.isAddRole} onClick={this.onAddRoleBtnClick} >Role</button>
                                        <div className="mg-right-5px" />
                                        <button className="white-button" disabled={!this.state.isAddRole} onClick={this.onSetPermissionBtnClick} >Permission</button>
                                    </div>
                                    <div className="decoration-line mg-top-10px" />
                                </div>
                                <div className="edit-role" id="edit-role-form">
                                    <div className="form-group mg-top-10px">
                                        <label className="form-label-required">Tên role:</label>
                                        <input className="text-input" id="edit-role-name-input"
                                            placeholder="Nhập tên role "
                                            onChange={e => this.onRoleNameChanged(e)}
                                            type="text"
                                        // defaultValue={
                                        // !this.props.isCurrentPostLoading ? this.state.EDIT_POST_DTO.title : ''
                                        //  }
                                        ></input>
                                        <div className="form-error-label-container">
                                            <span className="form-error-label" ></span>
                                        </div>
                                    </div>

                                    <div className="form-group pd-top-10px">
                                        <label className="form-checkbox-container" >
                                            <input type="checkbox" className="form-checkbox" id="register-form-confirm-tos" />
                                            <span className="form-checkbox-style"></span>
                                            <div className="d-flex">
                                                <div className="form-checkbox-label"> Mặc định </div>
                                            </div>
                                        </label>
                                        <div className="form-tip-label">
                                            Người dùng mới tạo tài khoản sẽ có quyền mặc định.
                                        </div>
                                    </div>

                                </div>
                                <div className="set-permission d-none" >

                                    <div className="form-group mg-top-10px">
                                        <label className="form-label">Search:</label>
                                        <input className="text-input" id="role-search-filter"
                                            placeholder="Nhập từ khoá tìm kiếm "
                                            onChange={e => this.handleSearchFilterChange(e)}
                                            type="text"
                                        ></input>
                                    </div>

                                    <div className="form-line" />

                                    <TreeView
                                        onNodeChecked={this.onNodeChecked}
                                        onNodeSelected={this.onNodeSelected}
                                        defaultExpandedKeys={['0-0', '0-1', '0-2']}
                                        data={
                                            [
                                                {
                                                    title: 'Adminstration',
                                                    key: '0-0',
                                                    children: [
                                                        {
                                                            title: 'Admin.Edit',
                                                            key: '0-0-0',
                                                        },
                                                        {
                                                            title: 'Admin.Delete',
                                                            key: '0-0-1',
                                                        },
                                                    ],
                                                },
                                                {
                                                    title: 'Post',
                                                    key: '0-1',
                                                    children: [
                                                        {
                                                            title: 'Post.Edit',
                                                            key: '0-1-0',
                                                        },
                                                        {
                                                            title: 'Post.Delete',
                                                            key: '0-1-1',
                                                        },
                                                        {
                                                            title: 'Post.Create',
                                                            key: '0-1-2',
                                                        },
                                                        {
                                                            title: 'Post.Report',
                                                            key: '0-1-3',
                                                        },
                                                        {
                                                            title: 'Post.Detail',
                                                            key: '0-1-3',
                                                        },
                                                    ],
                                                },
                                                {
                                                    title: 'Document',
                                                    key: '0-2',
                                                    children: [
                                                        {
                                                            title: 'Document.Edit',
                                                            key: '0-2-0',
                                                        },
                                                        {
                                                            title: 'Document.Delete',
                                                            key: '0-2-1',
                                                        },
                                                        {
                                                            title: 'Document.Create',
                                                            key: '0-12-2',
                                                        },
                                                        {
                                                            title: 'Document.Report',
                                                            key: '0-2-3',
                                                        },
                                                        {
                                                            title: 'Document.Detail',
                                                            key: '0-2-3',
                                                        },
                                                    ],
                                                },
                                            ]
                                        }
                                    />
                                </div>

                                {/* Button */}
                                <div className="form-group j-c-end pd-bottom-10px">
                                    <button className="blue-button form-submit-btn" onClick={() => this.handleSaveBtnClick()}>Lưu</button>
                                    <button className="white-button form-submit-btn mg-left-10px" onClick={() => this.closeModal()}>Huỷ</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    onAddRoleBtnClick = () => {
        this.setState({ isAddRole: !this.state.isAddRole });
        document.querySelector(".set-permission").classList.remove("d-block");
        document.querySelector(".edit-role").classList.remove("d-none");
        document.querySelector(".set-permission").classList.edit("d-none");
        document.querySelector(".edit-role").classList.edit("d-block");

    }

    onSetPermissionBtnClick = () => {
        this.setState({ isAddRole: !this.state.isAddRole });
        document.querySelector(".set-permission").classList.remove("d-none");
        document.querySelector(".edit-role").classList.remove("d-block");
        document.querySelector(".set-permission").classList.edit("d-block");
        document.querySelector(".edit-role").classList.edit("d-none");
    }
}

