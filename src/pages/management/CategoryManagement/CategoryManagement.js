/* eslint-disable react/jsx-pascal-case */

import React from 'react'
import 'layouts/AdminSidebar'
import Titlebar from 'components/common/Titlebar/Titlebar'
import dropdown_btn from 'assets/icons/24x24/dropdown_icon_24x24.png'
import './CategoryManagement.scss'

import { ClickAwayListener } from '@material-ui/core';

//import for Redux
import { bindActionCreators } from 'redux'
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getDocumentCategories } from "redux/services/documentCategoryServices";

//chuyen thanh chi xem nen chua co handle click cho cac item trong bang danh muc bai viet
class CategoryManagement extends React.Component {
    constructor(props) {
        super();

        //Post 
        this.isAddPostCategoryPopupOpen = false;
        this.isEditPostCategoryPopupOpen = false;
        this.isVerifyDeletePostCategoryPopupOpen = false;

        //Doc
        this.isAddDocCategoryPopupOpen = false;
        this.isEditDocCategoryPopupOpen = false;
        this.isVerifyDeleteDocCategoryPopupOpen = false;

        //Notify
        this.notifyHeader = "";
        this.notifyContent = "";
        this.isNotifySuccessOpen = false;
        this.isNotifyFailOpen = false;

        //for Edit and Delete, only choose 1 item in all table
        this.selected_category_id = "";

        //for document category
        this.documentCategoriesList = [];

        this.state = {
            postCategoriesList:
                [
                    {
                        "id": 1,
                        "title": "Danh muc 1"
                    },
                    {
                        "id": 2,
                        "title": "Danh muc 2"
                    },
                    {
                        "id": 3,
                        "title": "Danh muc 3"
                    }
                ],
            canClickEditPostCategory: false,
            canClickDeletePostCategory: false,
            canClickEditDocCategory: false,
            canClickDeleteDocCategory: false,

        }
    }

    componentDidMount() {
        // this.props.getDocumentCategories();


    }

    onPageChange = () => {

    }

    render() {

        if (this.props.categoryList !== null && this.props.categoryList !== undefined
            && this.props.subjectList !== null && this.props.subjectList !== undefined
            && this.props.semesterList !== null && this.props.semesterList !== undefined
        ) {

            this.documentCategoriesList = this.props.categoryList;
            this.subjectList = this.props.subjectList;
            this.documentSemesterList = this.props.semesterList;

            return (
                <div>
                    <Titlebar title="QUẢN LÝ DANH MỤC" />
                    <div className="content-container">
                        {/* Danh mục bài viết */}
                        <div className="Category_Type_Dropdown" id="management-post-categories-dropdown" onClick={() => this.handlerCategoryTypeDropDownClick("management-post-categories-dropdown", "management-post-categories-container")}>
                            <div>
                                DANH MỤC BÀI VIẾT
                            </div>
                            <img alt="v" className="dropdown-element" src={dropdown_btn} id="page-management-dropdown-btn-element" />
                        </div>

                        <div className="Category_Type_Dropdown_Container" id="management-post-categories-container">
                            <div className="Category_Component_List">
                                <div className="Category_Component">
                                    {/* Danh sach cac danh muc bai viet*/}
                                    <div className="Category_Dropdown mg-top-15px" id="management-post-category-dropdown" onClick={() => this.handlerCategoryTypeDropDownClick("management-post-category-dropdown", "management-post-category-container")}>
                                        <div className="Category_Dropdown_Title">
                                            Danh sách danh mục:
                                        </div>
                                        <img alt="v" className="dropdown-element" src={dropdown_btn} id="page-management-dropdown-btn-element" />
                                    </div>

                                    <ClickAwayListener onClickAway={() => { this.closeAllPostCategoryListItemActivated() }}>
                                        <div className="Category_Dropdown_Container  mg-top-5px" id="management-post-category-container">
                                            <div className="custom-table-layout">
                                                <div className="custom-table-header">
                                                    <div className="custom-table-20percents-column">Mã danh mục</div>
                                                    <div className="custom-table-80percents-column">Tên danh mục</div>
                                                </div>

                                                {this.state.postCategoriesList.map(item =>
                                                    <div className="Custom_Table_Item" name="Post_Custom_Table_Item" key={item.id} id={"management-post-category-item-" + item.id} onClick={(e) => this.handlerPostCategoryItemClick(e, item.id, item.name)} >
                                                        <div className="Custom_Table_Item_20percents">{item.id}</div>
                                                        <div className="Custom_Table_Item_80percents">{item.title}</div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </ClickAwayListener>
                                    <div className="Category_Buttons_Layout">
                                        <button className="blue-button mg-right-5px" onClick={() => this.handlerClickAddPostCategory()}>Thêm</button>
                                        <button className="white-button mg-right-5px" disabled={!this.state.canClickEditPostCategory} onClick={() => this.handlerClickEditPostCategory()}>Sửa</button>
                                        <button className="red-button" disabled={!this.state.canClickDeletePostCategory} onClick={() => this.handlerClickDeletePostCategory()}>Xóa</button>
                                    </div>
                                </div>
                                <div style={{ height: "30px" }}></div>
                            </div>
                        </div>

                        <div style={{ height: "5px" }}></div>

                        {/* Danh mục tài liệu */}
                        <div className="Category_Type_Dropdown" id="management-parent-document-categories-dropdown" onClick={() => this.handlerCategoryTypeDropDownClick("management-parent-document-categories-dropdown", "management-parent-document-categories-container")}>
                            <div>
                                DANH MỤC TÀI LIỆU
                            </div>
                            <img alt="v" className="dropdown-element" src={dropdown_btn} id="page-management-dropdown-btn-element" />
                        </div>

                        <div className="Category_Type_Dropdown_Container" id="management-parent-document-categories-container">
                            <div className="Category_Component_List mg-top-5px">
                                <div className="Category_Component">

                                    {/* Danh sach cac danh muc tai lieu*/}
                                    <div className="Category_Dropdown mg-top-15px" id="management-document-categories-dropdown" onClick={() => this.handlerCategoryTypeDropDownClick("management-document-categories-dropdown", "management-document-categories-container")}>
                                        <div className="Category_Dropdown_Title">
                                            Danh sách danh mục:
                                        </div>
                                        <img alt="v" className="dropdown-element" src={dropdown_btn} id="page-management-dropdown-btn-element" />
                                    </div>

                                    <ClickAwayListener onClickAway={() => { this.closeAllDocCategoryListItemActivated() }}>
                                        <div className="Category_Dropdown_Container  mg-top-5px" id="management-document-categories-container">
                                            <div className="custom-table-layout">
                                                <div className="custom-table-header">
                                                    <div className="custom-table-20percents-column">Mã danh mục</div>
                                                    <div className="custom-table-80percents-column">Tên danh mục</div>
                                                </div>
                                                <div className="custom-table-layout" >
                                                    {this.documentCategoriesList.map(item =>
                                                        <div className="Custom_Table_Item" name="Document-category_Custom_Table_Item" key={item.id} id={'management-document-category-item-' + item.id} onClick={(e) => this.handerDocCategoryItemClick(e, item.id, item.name)}>
                                                            <div className="Custom_Table_Item_20percents">{item.id}</div>
                                                            <div className="Custom_Table_Item_80percents">{item.name}</div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            {/* <div className="Category_Buttons_Layout" >
                                            <div className="blue-button mg-right-5px">Thêm</div>
                                            <div className="white-button mg-right-5px">Sửa</div>
                                            <div className="red-button">Xóa</div>
                                        </div> */}
                                        </div>
                                    </ClickAwayListener>



                                </div>
                            </div>
                        </div>

                    </div>

                </div >
            );
        }
        return <></>
    }


    //#region for dropdown UX. 
    handlerCategoryTypeDropDownClick = (dropdown_id, container_id) => {
        let dropdown = document.getElementById(dropdown_id);
        let container = document.getElementById(container_id);

        if (container.style.display === "none") {
            container.style.display = "block";
            dropdown.style.width = "100%";
        }
        else {
            container.style.display = "none";
            dropdown.style.width = "30%";
        }
    }

    //#endregion

    //#region for Post category area:
    handlerPostCategoryItemClick = (e, id, name) => {
        let all_item = document.getElementsByName("Post_Custom_Table_Item");

        for (let i = 0; i < all_item.length; i++) {
            all_item[i].className = "Custom_Table_Item";
        }

        let category_item = document.getElementById("management-post-category-item-" + id);
        // category_item.className
        category_item.className = "Custom_Table_Item_Activated";

        this.selected_category_id = id;
        // this.selected_category-name = name;

        this.setState({
            canClickDeletePostCategory: true,
            canClickEditPostCategory: true
        });

    }

    closeAllPostCategoryListItemActivated = () => {
        let all_item = document.getElementsByName("Post_Custom_Table_Item");
        for (let i = 0; i < all_item.length; i++) {
            all_item[i].className = "Custom_Table_Item";
        }
        this.setState({
            canClickDeletePostCategory: false,
            canClickEditPostCategory: false
        });
    }

    //Add post category area:
    handlerClickAddPostCategory = () => {
        this.isAddPostCategoryPopupOpen = true;
        this.setState({});
    }


    //#endregion

    //#region for Doc category area:
    handerDocCategoryItemClick = (e, id, name) => {
        let all_item = document.getElementsByName("Document-category_Custom_Table_Item");

        for (let i = 0; i < all_item.length; i++) {
            all_item[i].className = "Custom_Table_Item";
        }

        let category_item = document.getElementById("management-document-category-item-" + id);
        // category_item.className
        category_item.className = "Custom_Table_Item_Activated";

        this.selected_category_id = id;
        // this.selected_category-name = name;

        this.setState({
            canClickDeletePostCategory: true,
            canClickEditPostCategory: true
        });
    }

    closeAllDocCategoryListItemActivated = () => {
        let all_item = document.getElementsByName("Document-category_Custom_Table_Item");
        for (let i = 0; i < all_item.length; i++) {
            all_item[i].className = "Custom_Table_Item";
        }
        this.setState({
            canClickDeleteDocCategory: false,
            canClickEditDocCategory: false
        });
    }

}


//#region for Redux
const mapStateToProps = (state) => {
    return {
        categoryList: state.document_categories,

    };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
    getDocumentCategories,
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CategoryManagement));
//#endregion
