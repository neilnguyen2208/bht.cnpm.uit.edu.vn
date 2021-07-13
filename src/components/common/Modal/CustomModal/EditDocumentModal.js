import React from "react";
import '../Modal.scss'
import 'components/styles/Button.scss'
import { closeBigModal, closeModal, openModal } from "redux/services/modalServices";
import store from 'redux/store/index.js'
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { getSubjectsList } from "redux/services/subjectServices";
import { getDocumentCategories } from "redux/services/documentCategoryServices";
import { getTagQuickQueryResult } from "redux/services/tagServices"
import {
    getDocumentByIdForEdit,
    editADocument
} from "redux/services/documentServices"
import { put_EditADocumentReset } from "redux/actions/documentAction"

import {
    get_tagQuickQueryResultRequest,
    get_tagQuickQueryResultReset
} from "redux/actions/tagAction"
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
import {
    validation,
    styleFormSubmit
} from 'utils/validationUtils'
import SmallLoader from 'components/common/Loader/Loader_S'
import { SimpleCKEToolbarConfiguration } from "components/common/CustomCKE/CKEditorConfiguration";
import FormFileUploader from "components/common/FormFileUploader/FormFileUploader";
import ImageUploader from 'components/common/FormFileUploader/FormImageUploader';

const validationCondition = {
    form: '#edit-document-form',
    rules: [
        //truyen vao id, loai component, message
        validation.isRequired('ed-document-title', 'text-input', 'Tên tài liệu không được để trống!'),
        validation.noSpecialChar('ed-document-title', 'text-input', 'Tên tài liệu không được chứa ký tự đặc biệt!'),
        validation.isRequired('ed-document-category-combobox', 'combobox', 'Danh mục không được để trống'),
        validation.isRequired('ed-document-cke', 'ckeditor', 'Nội dung tài liệu không được để trống'),
        validation.isRequired('ed-document-subject-combobox', 'combobox', 'Môn học không được để trống'),
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

            DOCUMENT_DTO: {
                tags: [],
                title: '',
                description: ``,
                summary: `null`,
                categoryID: "",
                imageURL: "null",
                subjectID: ""
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
        this.filesList = [];
        this.initFilesData = [];
    }

    componentDidMount() {
        validation(validationCondition);
        this.props.getDocumentCategories();
        this.props.getSubjectsList();

        this.props.getDocumentByIdForEdit(this.props.id);
        this.isFirstLoad = false;

        this.timeOut = null;
        this.isInstanceReady = false;

    }

    componentWillUnmount() {
        //reset global state isLoadDone of tagSearchQuickQuerry 
        store.dispatch(get_tagQuickQueryResultReset());
        store.dispatch(put_EditADocumentReset());
        if (getCKEInstance('ed-document-cke'))
            getCKEInstance('ed-document-cke').destroy();
    }

    onCategoryOptionChanged = (selectedOption) => {
        this.setState({
            DOCUMENT_DTO: { ...this.state.DOCUMENT_DTO, categoryID: selectedOption.id },
            currentCategory: selectedOption.name
        })
    }

    onSubjectOptionChanged = (selectedOption) => {
        this.setState({
            DOCUMENT_DTO: { ...this.state.DOCUMENT_DTO, subjectID: selectedOption.id },
            currentSubject: selectedOption.name
        })
    }

    handleUploadBtnClick = () => {
        this.UPLOAD_DOCUMENT_DTO = {
            "categoryID": this.state.DOCUMENT_DTO.categoryID,
            "subjectID": this.state.DOCUMENT_DTO.subjectID,
            "title": this.state.DOCUMENT_DTO.title,
            "description": this.state.DOCUMENT_DTO.description,
            "imageURL": this.state.DOCUMENT_DTO.imageURL,
            "publishDtm": "2021-07-12T16:41:23.566Z",
            "docFileUploadRequestDTOs": this.initFilesData,
            "tags": this.state.DOCUMENT_DTO.tags
        }

        if (styleFormSubmit(validationCondition)) {
            openModal("confirmation",
                {
                    title: "Cập nhật tài liệu",
                    text: "Hành động này cần phê duyệt và không thể hoàn tác.",
                    confirmText: "Xác nhận",
                    cancelText: "Huỷ",
                    onConfirm: () => {
                        this.props.editADocument(this.props.id, this.UPLOAD_DOCUMENT_DTO, [], this.imageFile, this.isNewImageFile);
                        closeModal(); //close confimation popup
                        closeModal();
                        closeBigModal();
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
        let tags = this.state.DOCUMENT_DTO.tags;
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
                    DOCUMENT_DTO: {
                        ...this.state.DOCUMENT_DTO,
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

        let tmpTagDTO = this.state.DOCUMENT_DTO.tags;
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
            DOCUMENT_DTO: {
                ...this.state.DOCUMENT_DTO,
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
            DOCUMENT_DTO: {
                ...this.state.DOCUMENT_DTO,
                tags: tempTagDTO,
            }
        });
        this.forceUpdate();
    }

    //#endregion
    handleEditorChange = (value) => {
        if (value.length < 160) {
            this.setState({ DOCUMENT_DTO: { ...this.state.DOCUMENT_DTO, description: value } })
            return;
        }
        else {
            this.setState({ DOCUMENT_DTO: { ...this.state.DOCUMENT_DTO, description: value } });
            return;
        }
    };

    handleTitleChange = (e) => {
        this.setState({
            DOCUMENT_DTO: { ...this.state.DOCUMENT_DTO, title: e.target.value }
        })
    }

    onFileChange = (files) => {
        console.log(files);
        this.filesList = files;
        this.setState({});
    }

    handleImageFileChange = (imageFile) => {
        this.isNewImageFile = true;
        this.imageFile = imageFile;
        this.setState({});
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
                    if (this.state.DOCUMENT_DTO.tags.length < 5) {
                        if (this.props.tagQuickQueryResult.length === 0)
                            document.getElementById("ed-document-tag-container-tip-label").innerText = "Không có kết quả tìm kiếm phù hợp! Bấm Enter để thêm tag mới."
                        else
                            document.getElementById("ed-document-tag-container-tip-label").innerText = "Chọn tag phù hợp, hoặc bấm enter để thêm tag!";
                    }
                    else {
                        document.getElementById("ed-document-tag-container-tip-label").innerText = "Không thể nhập quá 5 tag."
                    }
                    this.tagSearchResult = <div>
                        <div className="d-flex">
                            {this.props.tagQuickQueryResult.map(tag => {
                                return <div className="tag-search-item"
                                    onClick={() => { this.state.DOCUMENT_DTO.tags.length < 5 && this.onTagSearchResultClick(tag) }}>
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
        if (!this.props.isCurrentDocumentLoading
            && Object.keys(this.props.currentDocument).length > 0
            && !this.isFirstLoad
            && this.isInstanceReady) {

            this.isFirstLoad = true;
            this.props.currentDocument.tags.forEach((item, index) => {
                this.shownTag[index].id = item.id;
                this.shownTag[index].content = item.content;
            })

            getCKEInstance('ed-document-cke').setData(this.props.currentDocument.description);
            document.getElementById("image-input-placeholder-edit-document-imgurl").src = this.props.currentDocument.imageURL;
            document.getElementById("image-input-placeholder-edit-document-imgurl").classList.remove("d-none");
            this.setState({
                DOCUMENT_DTO: {
                    title: this.props.currentDocument.title,
                    tags: this.props.currentDocument.tags ? this.props.currentDocument.tags : [],
                    description: this.props.currentDocument.description,
                    imageURL: this.props.currentDocument.imageURL,
                    categoryID: this.props.currentDocument.categoryID,
                    categoryName: this.props.currentDocument.categoryName,
                    readingTime: this.props.currentDocument.readingTime,
                    authorDisplayName: this.props.currentDocument.authorDisplayName,
                    authorID: this.props.currentDocument.authorID,
                    authorAvatarURL: this.props.currentDocument.authorAvatarURL,
                    id: this.props.currentDocument.id,
                    subjectID: this.props.currentDocument.subjectID,
                    subjectName: this.props.currentDocument.subject,
                    docFileUploadDTOs: this.props.currentDocument.docFileUploadDTOs
                },

            });

            for (let i = 0; i < this.props.currentDocument.docFileUploadDTOs.length; i++) {
                this.filesList[i] = { rank: i, id: this.props.currentDocument.docFileUploadDTOs[i].id }
                this.initFilesData.push({ rank: i, id: this.props.currentDocument.docFileUploadDTOs[i].id });
            }

            this.UPDATE_DOCUMENT_DTO = {
                categoryID: this.props.currentDocument.categoryID,
                subjectID: this.props.currentDocument.subjectID,
                title: this.props.currentDocument.title,
                description: this.props.currentDocument.description,
                imageURL: this.props.currentDocument.imageURL,
                publishDtm: "2021-07-08T00:24:38.794Z",
                docFileUploadRequestDTOs: this.initFilesData,
                tags: this.props.currentDocument.tags
            }

        }

        //load xong thi cho hien thi body
        if (this.props.postDetailForEdit && !this.props.isCurrentDocumentLoading && document.getElementById('edit-post-body')) {
            document.getElementById('edit-document-body').classList.add("d-block");
            document.getElementById('edit-document-body').classList.remove("d-none");
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
                                                        !this.props.isCurrentDocumentLoading ? this.state.DOCUMENT_DTO.title : ''} ></input>
                                                <div className="form-error-label-container">
                                                    <span className="form-error-label" ></span>
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <label className="form-label-required">Ánh bìa:</label>
                                                < ImageUploader
                                                    id="edit-document-imgurl"
                                                    maxSize={512000}
                                                    // initialData={this.props.postDetailForEdit.imageURL ? this.props.postDetailForEdit.imageURL : ''}
                                                    onImageChange={this.handleImageFileChange}
                                                    fileType={[".png, .jpg"]}
                                                />
                                            </div>

                                            {/* CKEditor */}
                                            <div className="form-group">
                                                <div className="form-label-required">Mô tả tài liệu:</div>
                                                <Editor
                                                    config={SimpleCKEToolbarConfiguration}
                                                    editorId="ed-document-cke"
                                                    placeholder='Start typing here...'
                                                    onChange={this.handleEditorChange}
                                                    onInstanceReady={this.onCKEInstanceReady}
                                                    height={200}
                                                    autoGrow_maxHeight={300}
                                                    autoGrow_minHeight={200}
                                                    validation
                                                />
                                                <div className="form-error-label-container">
                                                    <span className="form-error-label" ></span>
                                                </div>
                                            </div>

                                            {/* Category */}
                                            <div className="form-group" >
                                                <label className="form-label-required">Danh mục:</label>
                                                <Combobox comboboxId="ed-document-category-combobox"
                                                    selectedOptionID={!this.props.isCurrentDocumentLoading && !this.props.isCategoryLoading ? this.state.DOCUMENT_DTO.categoryID : 0}
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
                                                <Combobox comboboxId="ed-document-subject-combobox"
                                                    selectedOptionID={!this.props.isCurrentDocumentLoading && !this.props.isSubjectLoading ? this.state.DOCUMENT_DTO.subjectID : 0}
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
                                                    onKeyPress={(this.state.DOCUMENT_DTO.tags.length < 5) && this.keyHandler}
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

                                                {/* Tag */}
                                                <div className="form-tip-label-container">
                                                    <div className="form-tip-label">Có thể nhập tối đa 5 tag.</div>
                                                </div>
                                                <div className="mg-top-10px" >
                                                    {this.shownTag.map(item =>
                                                        <Tag isReadOnly={false} onDeleteTag={(item) => this.deleteTag(item)} tag={item} />
                                                    )}
                                                </div>
                                                <div className="form-line" />

                                                {/* Form file uploader */}
                                                <div className="form-group" style={{ marginTop: "20px" }}>
                                                    <label className="form-label-required">Tài liệu:</label>
                                                    <FormFileUploader
                                                        id='cr-document-file-input'
                                                        onFileChange={(file) => this.onFileChange(file)}
                                                        maxSize={26214400} //byte
                                                        fileType={".pdf"} //n
                                                        multiple
                                                        maxFileCount={3}
                                                        data={!this.props.isCurrentDocumentLoading ? this.state.DOCUMENT_DTO.docFileUploadDTOs : []}
                                                    />
                                                </div>
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

        subjects: state.subject.subjects.data,
        isSubjectLoading: state.subject.subjects.isLoading,

        isCurrentDocumentLoading: state.document.currentDocumentForEdit.isLoading,
        currentDocument: state.document.currentDocumentForEdit.data,
        isCurrentDocumentLoadDone: state.document.currentDocumentForEdit.isLoadDone,

        tagQuickQueryResult: state.tag.tagQuickQueryResult.data,
        isTagQuickQueryLoading: state.tag.tagQuickQueryResult.isLoading,
        //sau nay su dung loading de tranh cac truong hop ma 2 bien isSearching va isLoadDone khong xu ly duoc
        isTagQuickQueryLoadDone: state.tag.tagQuickQueryResult.isLoadDone,
    };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
    getDocumentCategories,
    getSubjectsList,
    getTagQuickQueryResult,
    getDocumentByIdForEdit,
    editADocument

}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditDocumentModal));
