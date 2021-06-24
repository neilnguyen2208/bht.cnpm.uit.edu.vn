import React from "react";
import '../Modal.scss'
import 'components/styles/Button.scss'
import { closeBigModal, closeModal, openModal } from "redux/services/modalServices";
import store from 'redux/store/index.js'
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { getDocumentSubjects } from "redux/services/documentSubjectServices";
import { getDocumentCategories } from "redux/services/documentCategoryServices";
import { getTagQuickQueryResult } from "redux/services/tagServices"
import { getDocumentByID, editADocument } from "redux/services/documentServices"
import { get_DocumentByIDReset, put_EditADocumentReset } from "redux/actions/documentAction"

import { get_tagQuickQueryResultRequest, get_tagQuickQueryResultReset } from "redux/actions/tagAction"
import { DELAY_TIME } from 'constants.js'
import "components/common/CustomCKE/CKEditorContent.scss";
import 'components/styles/Detail.scss'

//components
import Tag from "components/document/Tag";
import ModalTitlebar from 'components/common/Titlebar/ModalTitlebar';
import Combobox from 'components/common/Combobox/Combobox';
import Editor from 'components/common/CustomCKE/CKEditor.js';
import { getCKEInstance } from 'components/common/CustomCKE/CKEditorUtils';
import Loader from 'components/common/Loader/Loader'

//utils
import { ClickAwayListener } from '@material-ui/core';
import { validation, styleFormSubmit } from 'utils/validationUtils'
import SmallLoader from 'components/common/Loader/Loader_S'

const validationCondition = {
    form: '#edit-document-form',
    rules: [
        //truyen vao id, loai component, message
        validation.isRequired('ed-document-title', 'text-input', 'Tên tài liệu không được để trống!'),
        validation.noSpecialChar('ed-document-title', 'text-input', 'Tên tài liệu không được chứa ký tự đặc biệt!'),
        validation.isRequired('ed-document-category-combobox', 'combobox', 'Danh mục không được để trống'),
        validation.isRequired('ed-document-cke', 'ckeditor', 'Nội dung tài liệu không được để trống'),
        validation.isRequired('ed-document-subject-combobox', 'combobox', 'Môn học không được để trống'),
        validation.isRequired('cr-document-file-input', 'file-input', 'Tài liệu không được để trống!'),
        validation.maxFileCount('cr-document-file-input', 'file-input', 3, 'Không được vượt quá 3 tài liệu!'),
        validation.maxFileSize('cr-document-file-input', 'file-input', 26214400, 'Không được vượt quá 25MB!'),
    ],
}

class EditDocumentModal extends React.Component {
    constructor(props) {
        super(props);
        this.categoryList = [
            {
                id: 0,
                name: "Chọn danh mục"
            }
        ];
        this.subjectList = [
            { id: 0, name: "Chọn danh mục" }
        ]
        this.isNotifySuccessOpen = false;
        this.state = {

            currentCategory: "",
            currentSubject: "",
            publishDtm: "",

            isUploading: false,
            isSearchingTag: false,

            EDIT_DOCUMENT_DTO: {
                tags: [],
                title: '',//
                content: ``,
                summary: `null`,
                categoryID: "",
                imageURL: "null",
                readingTime: 10
            },

            author: {
                avatarURL: "https://i.imgur.com/SZJgL6C.png",
                displayName: "Nguyễn Văn Đông",
                username: "dongnsince1999"
            },


        };
        this.shownTag = [
            { dmID: 1, id: '', content: '' },
            { dmID: 2, id: '', content: '' },
            { dmID: 3, id: '', content: '' },
            { dmID: 4, id: '', content: '' },
            { dmID: 5, id: '', content: '' },
        ]
        this.tagQuickQueryResult =
            [
                {
                    id: 1,
                    name: "tag1",
                },
                {
                    id: 2,
                    name: "tag2",
                },
                {
                    id: 3,
                    name: "tag2",
                }
            ];

        this.timeOut = null;
        this.isFirstLoad = false;
        this.isInstanceReady = false;
        this.tagQuickQueryResult = <></>;
    }
    componentDidMount() {
        validation(validationCondition);
        this.props.getDocumentCategories();
        this.props.getDocumentSubjects();

        this.props.getDocumentByID(this.props.id);
        this.isFirstLoad = false;

        this.timeOut = null;
        this.isInstanceReady = false;

    }

    componentWillUnmount() {
        //reset global state isLoadDone of tagSearchQuickQuerry 
        store.dispatch(get_tagQuickQueryResultReset());
        store.dispatch(get_DocumentByIDReset());
        store.dispatch(put_EditADocumentReset());
        if (getCKEInstance('ed-document-cke'))
            getCKEInstance('ed-document-cke').destroy();
    }

    onCategoryOptionChanged = (selectedOption) => {
        this.setState({
            EDIT_DOCUMENT_DTO: { ...this.state.EDIT_DOCUMENT_DTO, categoryID: selectedOption.id },
            currentCategory: selectedOption.name
        })
    }


    onSubjectOptionChanged = (selectedOption) => {
        this.setState({
            EDIT_DOCUMENT_DTO: { ...this.state.EDIT_DOCUMENT_DTO, subjectID: selectedOption.id },
            currentSubject: selectedOption.name
        })
    }

    handleUploadBtnClick = () => {
        let dom = document.createElement("DIV");
        dom.innerHTML = this.state.EDIT_DOCUMENT_DTO.content;
        let plain_text = (dom.textContent || dom.innerText);
        let tmpSummary = '';
        if (this.state.EDIT_DOCUMENT_DTO.content.length < 160) {
            tmpSummary = plain_text;
        }
        else {
            tmpSummary = plain_text.substring(0, 160);
        }

        if (styleFormSubmit(validationCondition)) {
            openModal("confirmation",
                {
                    title: "Thay đổi tài liệu",
                    text: "Hành động này cần phê duyệt và không thể hoàn tác.",
                    confirmText: "Xác nhận",
                    cancelText: "Huỷ",
                    onConfirm: () => {
                        this.props.editADocument(this.props.id, { ...this.state.EDIT_DOCUMENT_DTO, summary: tmpSummary + "" });
                        closeModal(); //close confimation popup
                        this.closeModal(); //close edit document popup
                    }
                })


        }
    }

    //#region  tag region
    closeQuickSearchTag = () => {
        document.getElementById("ed-document-qs-tag-result-container").classList.add('hidden');
        document.getElementById("ed-document-qs-tag-result-container").classList.remove('show');
    }

    quickSearchTags = (e) => {
        if (!e.target.value) {
            this.closeQuickSearchTag();
            return;
        }
        let value = e.target.value;

        //dispatch request
        store.dispatch(get_tagQuickQueryResultRequest());
        this.setState({ isSearchingTag: true })

        // delay thoi gian, dispatch ham search nhung delay thoi gian
        clearTimeout(this.timeOut);

        this.timeOut = setTimeout(() => this.props.getTagQuickQueryResult(value), DELAY_TIME);

        document.getElementById("ed-document-qs-tag-result-container").classList.add('show');
        document.getElementById("ed-document-qs-tag-result-container").classList.remove('hidden');
    }

    onCKEInstanceReady = () => {
        this.isInstanceReady = true;
        this.setState({})
    }

    keyHandler = (e) => {
        if (!e.target.value) return;
        let tags = this.state.EDIT_DOCUMENT_DTO.tags;
        let hasOldTag = -1; // khong cos => -1 neu co => id cua tag 
        if (e.charCode === 13) { //press Enter    

            //neu chua search duoc thi khong cho bam enter
            //check voi 3 ket qua tim kiem duoc, neu khong match thi tao moi
            if (this.props.isTagQuickQueryLoadDone) {

                //compare voi 3 ket qua
                if (this.props.tagQuickQueryResult) {
                    this.props.tagQuickQueryResult.forEach(tag => {
                        if (e.target.value.localeCompare(tag.content) === 0) {
                            console.log("equal");
                            hasOldTag = tag.id; //co tag giong tag cu
                        }
                    })
                }

                //dong search container
                document.getElementById("ed-document-qs-tag-result-container").classList.add('hidden');
                document.getElementById("ed-document-qs-tag-result-container").classList.remove('show');

                //tao moi hoac dung lai tag cu
                let tmpShownTag = this.shownTag;
                if (hasOldTag !== -1) {
                    tags.push({ id: hasOldTag });
                    for (let i = 0; i < tmpShownTag.length; i++) {
                        if (tmpShownTag[i].content === '' && tmpShownTag[i].id === '') {
                            tmpShownTag[i].content = e.target.value; tmpShownTag[i].id = hasOldTag; break;
                        }
                    }
                }
                else {
                    tags.push({ content: e.target.value }); //tao ra tag moi
                    for (let i = 0; i < tmpShownTag.length; i++) {
                        if (tmpShownTag[i].content === '' && tmpShownTag[i].id === '') {
                            tmpShownTag[i].content = e.target.value; break;
                        }
                    }
                }

                this.setState({
                    EDIT_DOCUMENT_DTO: {
                        ...this.state.EDIT_DOCUMENT_DTO,
                        tags: tags
                    }
                });

                //clear tag input 
                e.target.value = ""
            }
        }
    }

    onTagSearchResultClick = (tag) => {
        //kiem tra xem ten co dang bi trung voi tag nao ben duoi khong, 
        //neu khong thi them co id
        let isTheSameContent = -1; // khong cos => -1 neu co => id cua tag 

        this.shownTag.forEach(_tag => {
            //kiem tra xem tag dang bam co giong tag cu hay khong
            if (tag.content.localeCompare(_tag.content) === 0) {
                console.log("equal content");
                isTheSameContent = _tag.id; //co tag giong tag cu
            }
            if (tag.id === _tag.id) {
                console.log("equal id");
                isTheSameContent = _tag.id; //co tag giong tag cu
            }
        })

        //neu trung tag thi khong cho cạp nhat
        if (isTheSameContent === tag.id) {
            console.log("Không thể chọn tag trùng");
            return;
        }

        let tmpTagDTO = this.state.EDIT_DOCUMENT_DTO.tags;
        tmpTagDTO.push({ id: tag.id });

        //cap nhat lai shownTag theo tmpDTO
        let tmpShownTag = this.shownTag;
        for (let i = 0; i < tmpShownTag.length; i++) {
            if (tmpShownTag[i].content === '' && tmpShownTag[i].id === '') {
                tmpShownTag[i].content = tag.content; tmpShownTag[i].id = tag.id; break;
            }
        }

        //cap nhat lai shown tag tu state
        document.getElementById("ed-document-qs-tag-result-container").classList.add('hidden');
        document.getElementById("ed-document-qs-tag-result-container").classList.remove('show');

        this.setState({
            EDIT_DOCUMENT_DTO: {
                ...this.state.EDIT_DOCUMENT_DTO,
                tags: tmpTagDTO
            }
        });

    }

    deleteTag = (item) => {
        //xoa trong shownTag
        //xoa trong DTO

        //xet theo id va content, cap nhat lai shownTag
        if (item.content)
            this.shownTag.forEach(tag => {
                if (tag.content === item.content)
                    item.content = ''; item.id = '';
            })

        else if (item.id) {
            this.shownTag.forEach(tag => {
                if (tag.id === item.id)
                    item.content = ''; item.id = '';
            })
        }

        //cap nhat lai tmpDTO theo shownTag
        let tempTagDTO = [];
        this.shownTag.forEach(tag => {
            if (tag.id || tag.content) {
                tempTagDTO.push({ id: tag.id, content: tag.content })
            }
        })

        //cap nhat lai shownTag theo tmpDTO
        this.shownTag.forEach(tag => {
            tag.id = ''; tag.content = '';
        })

        tempTagDTO.forEach((tag, index) => {
            this.shownTag[index].id = tag.id;
            this.shownTag[index].content = tag.content;
        })

        //cap nhat lai DTO theo tmpDTO
        this.setState({
            EDIT_DOCUMENT_DTO: {
                ...this.state.EDIT_DOCUMENT_DTO,
                tags: tempTagDTO,
            }
        });
        this.forceUpdate();
    }

    //#endregion
    handleEditorChange = (value) => {
        if (value.length < 160) {
            this.setState({ EDIT_DOCUMENT_DTO: { ...this.state.EDIT_DOCUMENT_DTO, content: value } })
            return;
        }
        else {
            this.setState({ EDIT_DOCUMENT_DTO: { ...this.state.EDIT_DOCUMENT_DTO, content: value } });
            return;
        }
    };

    handleTitleChange = (e) => {
        this.setState({
            EDIT_DOCUMENT_DTO: { ...this.state.EDIT_DOCUMENT_DTO, title: e.target.value }
        })
    }

    closeModal = () => {
        store.dispatch(closeBigModal())
    }

    render() {

        if (!this.props.isCategoryLoading && this.props.categories) {
            this.categoryList = this.props.categories;
        }

        if (!this.props.isSubjectLoading && this.props.subjects) {
            this.subjectList = this.props.subjects;
        }

        this.tagSearchResult = <></>;
        if (this.props.isTagQuickQueryLoading) {
            this.tagSearchResult = <SmallLoader text="Đang tìm kiếm kết quả phù hợp" />;
            document.getElementById("ed-document-tag-container-tip-label").innerText = "";
        }

        else
            if (this.props.isTagQuickQueryLoadDone) {
                if (this.state.isSearchingTag) {
                    this.setState({ isSearchingTag: false })
                }
                if (this.props.tagQuickQueryResult && !this.isCategoryLoading) {

                    //truong hop khong co tag nao thoa man va chua du 5 tag
                    if (this.state.EDIT_DOCUMENT_DTO.tags.length < 5) {
                        document.getElementById("ed-document-tag-input").classList.remove('invalid');
                        if (this.props.tagQuickQueryResult.length === 0)
                            document.getElementById("ed-document-tag-container-tip-label").innerText = "Không có kết quả tìm kiếm phù hợp! Bấm Enter để thêm tag mới."
                        else
                            document.getElementById("ed-document-tag-container-tip-label").innerText = "Chọn tag phù hợp, hoặc bấm enter để thêm tag!";
                    }
                    else {
                        document.getElementById("ed-document-tag-container-tip-label").innerText = "Không thể nhập quá 5 tag."
                        document.getElementById("ed-document-tag-input").classList.add('invalid');
                    }
                    this.tagSearchResult = <div>
                        <div className="d-flex">
                            {this.props.tagQuickQueryResult.map(tag => {
                                return <div className="tag-search-item"
                                    onClick={() => { this.state.EDIT_DOCUMENT_DTO.tags.length < 5 && this.onTagSearchResultClick(tag) }}>
                                    <div className="tag-search-item-content">  {tag.content}</div>
                                </div>
                            })}
                        </div>
                        {this.props.tagQuickQueryResult.length !== 0 ?
                            <div className='form-line' /> : <></>}
                    </div>
                }
            }

        //load lan dau tien hoac moi load xong thi gan data cho DTO
        if (!this.props.isCurrentDocumentLoading && Object.keys(this.props.currentDocument).length > 0 && !this.isFirstLoad && this.isInstanceReady) {
            this.isFirstLoad = true;
            this.props.currentDocument.tags.forEach((item, index) => {
                this.shownTag[index].id = item.id;
                this.shownTag[index].content = item.content;
            })
            getCKEInstance('ed-document-cke').setData(this.props.currentDocument.content)
            this.setState({
                EDIT_DOCUMENT_DTO: {
                    title: this.props.currentDocument.title,
                    tags: this.props.currentDocument.tags ? this.props.currentDocument.tags : [],
                    content: this.props.currentDocument.content,
                    imageURL: this.props.currentDocument.imageURL,
                    categoryID: this.props.currentDocument.categoryID,
                    categoryName: this.props.currentDocument.categoryName,
                    readingTime: this.props.currentDocument.readingTime,
                    authorDisplayName: this.props.currentDocument.authorDisplayName,
                    authorID: this.props.currentDocument.authorID,
                    authorAvatarURL: this.props.currentDocument.authorAvatarURL,
                    id: this.props.currentDocument.id,
                    subjectID: this.props.currentDocument.subjectID,
                    subjectName: this.props.currentDocument.subject

                }
            })
        }
        //load xong thi cho hien thi body
        if (this.props.currentDocument && !this.props.isCurrentDocumentLoading && document.getElementById('edit-document-body')) {
        }

        return (
            <div>

                <div className="modal-overlay-shadow" />
                <div className="modal-fixed-layout">
                    <div className="modal-wrapper big o-f-hidden pd-top-5px">
                        <ModalTitlebar title="CHỈNH SỬA TÀI LIỆU" />
                        <div className="scroller-container mg-bottom-10px">
                            <div className="form-container">
                                <div id="edit-document-body">
                                    {/* Edit region */}
                                    <div className="ed-document-form-container edit">
                                        <div id="edit-document-form" className="form-container" onSubmit={this.handleUpload} tabIndex="1">
                                            <div className="mg-top-10px" />

                                            <div className="form-group">
                                                <label className="form-label-required">Tiêu đề:</label>
                                                <input className="text-input" id="ed-document-title"
                                                    placeholder="Nhập tiêu đề tài liệu "
                                                    onChange={e => this.handleTitleChange(e)}
                                                    type="text" defaultValue={
                                                        !this.props.isCurrentDocumentLoading ? this.state.EDIT_DOCUMENT_DTO.title : ''} ></input>
                                                <div className="form-error-label-container">
                                                    <span className="form-error-label" ></span>
                                                </div>
                                            </div>

                                            {/* CKEditor */}
                                            <div className="form-group">
                                                <div className="form-label-required">Nội dung:</div>
                                                <Editor
                                                    editorId={"ed-document-cke"}
                                                    onChange={this.handleEditorChange}
                                                    myData={!this.props.isCurrentDocumentLoading ? this.state.EDIT_DOCUMENT_DTO.content : ''}
                                                    validation
                                                    onInstanceReady={this.onCKEInstanceReady}
                                                />
                                                <div className="form-error-label-container">
                                                    <span className="form-error-label" ></span>
                                                </div>
                                            </div>

                                            {/* Category */}
                                            <div className="form-group" >
                                                <label className="form-label-required">Danh mục:</label>
                                                <Combobox comboboxId = "ed-document-category-combobox"
                                                    selectedOptionID={!this.props.isCurrentDocumentLoading ? this.state.EDIT_DOCUMENT_DTO.categoryID : 0}
                                                    options={this.categoryList}
                                                    onOptionChanged={(selectedOption) => this.onCategoryOptionChanged(selectedOption)}
                                                    placeHolder="Chọn danh mục"
                                                    validation
                                                >
                                                </Combobox>
                                                <div className="form-error-label-container">
                                                    <span className="form-error-label" ></span>
                                                </div>
                                            </div >

                                            {/* Category */}
                                            <div className="form-group" >
                                                <label className="form-label-required">Môn học:</label>
                                                <Combobox comboboxId = "ed-document-subject-combobox"
                                                    selectedOptionID={!this.props.isCurrentDocumentLoading ? this.state.EDIT_DOCUMENT_DTO.subjectID : 0}
                                                    options={this.subjectList}
                                                    onOptionChanged={(selectedOption) => this.onSubjectOptionChanged(selectedOption)}
                                                    placeHolder="Chọn môn học"
                                                    validation
                                                >
                                                </Combobox>
                                                <div className="form-error-label-container">
                                                    <span className="form-error-label" ></span>
                                                </div>
                                            </div >

                                            {/* Tag */}
                                            <div className='form-group mg-bottom-10px'>
                                                <label className="form-label">Tags:</label>

                                                <input onChange={(e) => this.quickSearchTags(e)} id="ed-document-tag-input"
                                                    onKeyPress={(this.state.EDIT_DOCUMENT_DTO.tags.length < 5) && this.keyHandler}
                                                    className="text-input"
                                                    placeholder="Nhập tag " />

                                                <ClickAwayListener onClickAway={() => this.closeQuickSearchTag()}>
                                                    {/* khi load xong thi ntn */}
                                                    <div id="ed-document-qs-tag-result-container" className="text-input-dropdown-container hidden">
                                                        <div className="text-input-dropdown">
                                                            {this.tagSearchResult}
                                                            <div className="form-tip-label" id="ed-document-tag-container-tip-label" />
                                                        </div>
                                                    </div>

                                                </ClickAwayListener>

                                                <div className="form-tip-label-container">
                                                    <div className="form-tip-label">Có thể nhập tối đa 5 tag.</div>
                                                </div>
                                                <div className="mg-top-10px" >
                                                    {this.shownTag.map(item =>
                                                        <Tag isReadOnly={false} onDeleteTag={(item) => this.deleteTag(item)} tag={item} />
                                                    )}
                                                </div>
                                                <div className="form-line" />

                                            </div>

                                            {/* Button */}
                                            <div className="form-group j-c-end pd-bottom-10px">
                                                <button className="blue-button form-submit-btn" onClick={() => this.handleUploadBtnClick()}>Lưu</button>
                                                <button className="white-button form-submit-btn mg-left-10px" onClick={() => this.closeModal()}>Huỷ</button>
                                            </div>
                                        </div >
                                    </div >
                                </div >
                                {(this.props.isCurrentDocumentLoading || !this.props.currentDocument) ?
                                    <Loader /> :
                                    <></>}
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}

const mapStateToProps = (state) => {
    return {
        categories: state.documentCategory.categories.data,
        isCategoryLoading: state.documentCategory.categories.isLoading,

        subjects: state.documentSubject.subjects.data,
        isSubjectLoading: state.documentSubject.subjects.isLoading,

        isCurrentDocumentLoading: state.document.currentDocument.isLoading,
        currentDocument: state.document.currentDocument.data,
        isCurrentDocumentLoadDone: state.document.currentDocument.isLoadDone,



        tagQuickQueryResult: state.tag.tagQuickQueryResult.data,
        isTagQuickQueryLoading: state.tag.tagQuickQueryResult.isLoading,
        //sau nay su dung loading de tranh cac truong hop ma 2 bien isSearching va isLoadDone khong xu ly duoc
        isTagQuickQueryLoadDone: state.tag.tagQuickQueryResult.isLoadDone,
    };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
    getDocumentCategories,
    getDocumentSubjects,
    getTagQuickQueryResult,
    getDocumentByID,
    editADocument

}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditDocumentModal));
