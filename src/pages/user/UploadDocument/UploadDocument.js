import React from 'react';

import { Redirect, withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { getDocumentCategories } from "redux/services/documentCategoryServices";
import { getSubjectsList } from "redux/services/subjectServices";
import { getTagQuickQueryResult } from "redux/services/tagServices"
import { uploadADocument } from "redux/services/documentServices"
import "components/common/CustomCKE/CKEditorContent.scss";
import 'components/styles/Metadata.scss'
import 'components/styles/Detail.scss'

//components
import Tag from "components/document/Tag";
import Titlebar from 'components/common/Titlebar/Titlebar';
import Combobox from 'components/common/Combobox/Combobox';
import Editor from 'components/common/CustomCKE/CKEditor.js';
import UserSidebar from 'layouts/UserSidebar'
import SmallLoader from 'components/common/Loader/Loader_S'

//utils
import { ClickAwayListener } from '@material-ui/core';
import { validation, styleFormSubmit } from 'utils/validationUtils'
import { today } from 'utils/miscUtils'
import { SimpleCKEToolbarConfiguration } from 'components/common/CustomCKE/CKEditorConfiguration'
import FormFileUploader from 'components/common/FormFileUploader/FormFileUploader'
import store from "redux/store/index.js"
import {
    get_tagQuickQueryResultRequest,
    get_tagQuickQueryResultReset
} from 'redux/actions/tagAction'
import { DELAY_TIME } from 'constants.js';
import ImageUploader from 'components/common/FormFileUploader/FormImageUploader'
import DatePicker from "react-datepicker";
import { post_UploadDocumentRequest } from 'redux/actions/documentAction';

const validationCondition = {
    form: '#create-document-form',
    rules: [
        //truyen vao id, loai component, message
        validation.isRequired('cr-document-title', 'text-input', 'Tên tài liệu không được để trống!'),
        validation.noSpecialChar('cr-document-title', 'text-input', 'Tên tài liệu không được chứa ký tự đặc biệt!'),
        validation.isRequired('cr-document-category-combobox', 'combobox', 'Danh mục không được để trống'),
        validation.isRequired('cr-document-subject-combobox', 'combobox', 'Môn học không được để trống'),
        validation.isRequired('cr-document-description', 'ckeditor', 'Mô tả tài liệu không được để trống'),
        validation.isRequired('cr-document-file-input', 'file-input', 'Tài liệu không được để trống!'),
        validation.maxFileCount('cr-document-file-input', 'file-input', 3, 'Không được vượt quá 3 tài liệu!'),
        validation.maxFileSize('cr-document-file-input', 'file-input', 26214400, 'Không được vượt quá 25MB!'),
    ],
}

class UploadDocument extends React.Component {
    constructor(props) {
        super(props);
        this.categoriesList = [
            {
                id: 1,
                name: "Chọn danh mục"
            }
        ];
        this.subjectsList = [
            {
                id: 1,
                name: "Chọn môn học"
            }
        ];
        this.state = {
            currentCategory: "Chọn danh mục",
            currentSubject: "Chọn môn học",
            publishDtm: today.getDateDMY(),

            isUploading: false,
            isPreview: false,
            isSearchingTag: false,

            UPLOAD_DOCUMENT_DTO: {
                tags: [],
                title: "Model View Presenter (MVP) in Android with a simplUe demo project.",//
                description: ``,//
                publishDtm: new Date(new Date().getTime() + 8 * 60 * 60 * 1000),
                version: "0",
                categoryID: "",//
                subjectID: "",
                imageURL: "null",
                docFileUploadRequestDTOs: [],
            },

            shownDate: new Date(new Date().getTime() + 60 * 60 * 1000).toLocaleDateString('en-US', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
            }),

        };
        this.shownTag = [
            { dmID: 1, id: '', content: '' },
            { dmID: 2, id: '', content: '' },
            { dmID: 3, id: '', content: '' },
            { dmID: 4, id: '', content: '' },
            { dmID: 5, id: '', content: '' },
        ]
        this.isPopupOpen = false;
        this.message = "";
        this.filesList = [];
        this.imageFile = null;
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

    }

    componentDidMount() {
        this.props.getDocumentCategories();
        this.props.getSubjectsList();
        validation(validationCondition);
    }

    componentWillUnmount() {
        store.dispatch(get_tagQuickQueryResultReset());
        store.dispatch(post_UploadDocumentRequest());
    }

    onCategoryOptionChanged = (selectedOption) => {
        this.setState({
            UPLOAD_DOCUMENT_DTO: { ...this.state.UPLOAD_DOCUMENT_DTO, categoryID: selectedOption.id },
            currentCategory: selectedOption.name
        })
    }

    onSubjectOptionChanged = (selectedOption) => {
        this.setState({
            UPLOAD_DOCUMENT_DTO: { ...this.state.UPLOAD_DOCUMENT_DTO, subjectID: selectedOption.id },
            currentSubject: selectedOption.name
        })
    }

    handleUploadBtnClick = () => {
        if (styleFormSubmit(validationCondition)) {
            this.props.uploadADocument(this.state.UPLOAD_DOCUMENT_DTO, this.filesList, this.imageFile);
        }
    }

    //#region  tag region
    closeQuickSearchTag = () => {
        document.getElementById("cr-document-qs-tag-result-container").classList.add('hidden');
        document.getElementById("cr-document-qs-tag-result-container").classList.remove('show');
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

        document.getElementById("cr-document-qs-tag-result-container").classList.add('show');
        document.getElementById("cr-document-qs-tag-result-container").classList.remove('hidden');
    }

    keyHandler = (e) => {
        if (!e.target.value) return;
        let tags = this.state.UPLOAD_DOCUMENT_DTO.tags;
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
                document.getElementById("cr-document-qs-tag-result-container").classList.add('hidden');
                document.getElementById("cr-document-qs-tag-result-container").classList.remove('show');

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
                    UPLOAD_DOCUMENT_DTO: {
                        ...this.state.UPLOAD_DOCUMENT_DTO,
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
                return;
            }
            if (tag.id === _tag.id) {
                console.log("equal id");
                isTheSameContent = _tag.id; //co tag giong tag cu
                return;
            }
        })

        //neu trung tag thi khong cho cạp nhat
        if (isTheSameContent === tag.id) {
            console.log("Không thể chọn tag trùng");
            return;
        }

        let tmpTagDTO = this.state.UPLOAD_DOCUMENT_DTO.tags;
        tmpTagDTO.push({ id: tag.id });

        //cap nhat lai shownTag theo tmpDTO
        let tmpShownTag = this.shownTag;
        for (let i = 0; i < tmpShownTag.length; i++) {
            if (tmpShownTag[i].content === '' && tmpShownTag[i].id === '') {
                tmpShownTag[i].content = tag.content; tmpShownTag[i].id = tag.id; break;
            }
        }

        //cap nhat lai shown tag tu state
        document.getElementById("cr-document-qs-tag-result-container").classList.add('hidden');
        document.getElementById("cr-document-qs-tag-result-container").classList.remove('show');

        this.setState({
            UPLOAD_DOCUMENT_DTO: {
                ...this.state.UPLOAD_DOCUMENT_DTO,
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
            UPLOAD_DOCUMENT_DTO: {
                ...this.state.UPLOAD_DOCUMENT_DTO,
                tags: tempTagDTO,
            }
        });
        this.forceUpdate();
    }

    //#endregion

    handleEditorChange = (value) => {
        this.setState({ UPLOAD_DOCUMENT_DTO: { ...this.state.UPLOAD_DOCUMENT_DTO, description: value } });
    };

    handleTitleChange = (e) => {
        this.setState({
            UPLOAD_DOCUMENT_DTO: { ...this.state.UPLOAD_DOCUMENT_DTO, title: e.target.value }
        })
    }

    onFileChange = (files) => {
        this.filesList = files;
        this.setState({})
    }

    handleImageFileChange = (file) => {
        this.imageFile = file;
    }

    setStartDate = (date, time) => {
        let shownDate = new Date(date).toLocaleDateString('en-US', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        })
        this.setState({ shownDate: shownDate, selectedDate: date, UPLOAD_DOCUMENT_DTO: { ...this.state.UPLOAD_DOCUMENT_DTO, publishDtm: new Date(new Date(date).getTime() + 7 * 60 * 60 * 1000) } });
    }

    render() {

        if (this.props.isHaveUploaded) {
            return <Redirect to="/user/my-documents" />
        }
        //load for category and subject 
        if (!this.props.isCategoryLoading && this.props.categories) {
            this.categoriesList = this.props.categories;
        }

        if (!this.props.isSubjectLoading && this.props.subjects) {
            this.subjectsList = this.props.subjects;
        }

        //quick search tag
        this.tagSearchResult = <></>;
        if (this.props.isTagQuickQueryLoading) {
            this.tagSearchResult = <SmallLoader text="Đang tìm kiếm kết quả phù hợp" />;
            document.getElementById("cr-document-tag-container-tip-label").innerText = "";
        }
        else
            if (this.props.isTagQuickQueryLoadDone) {
                if (this.state.isSearchingTag) {
                    this.setState({ isSearchingTag: false })
                }
                if (this.props.tagQuickQueryResult) {

                    //truong hop khong co tag nao thoa man va chua du 5 tag
                    if (this.state.UPLOAD_DOCUMENT_DTO.tags.length < 5) {
                        if (this.props.tagQuickQueryResult.length === 0)
                            document.getElementById("cr-document-tag-container-tip-label").innerText = "Không có kết quả tìm kiếm phù hợp! Bấm Enter để thêm tag mới."
                        else
                            document.getElementById("cr-document-tag-container-tip-label").innerText = "Chọn tag phù hợp với tài liệu của bạn.";
                    }
                    else {
                        document.getElementById("cr-document-tag-container-tip-label").innerText = "Không thể nhập quá 5 tag."
                    }
                    this.tagSearchResult = <div>
                        <div className="d-flex">
                            {this.props.tagQuickQueryResult.map(tag => {
                                return <div className="tag-search-item"
                                    onClick={() => { this.state.UPLOAD_DOCUMENT_DTO.tags.length < 5 && this.onTagSearchResultClick(tag) }}>
                                    <div className="tag-search-item-content">  {tag.content}</div>
                                </div>
                            })}
                        </div>
                        {this.props.tagQuickQueryResult.length !== 0 ?
                            <div className='form-line' /> : <></>}
                    </div>
                }
            }

        let body =
            <div>
                {/* Edit region */}
                <div className="cr-document-form-container edit">
                    <div id="create-document-form" className="form-container" onSubmit={this.handleUpload} tabIndex="1">
                        <div className="mg-top-10px" />

                        <div className="form-group">
                            <label className="form-label-required">Tiêu đề:</label>
                            <input className="text-input" id="cr-document-title"
                                placeholder="Nhập tiêu đề tài liệu " onChange={e => this.handleTitleChange(e)}
                                type="text" ></input>
                            <div className="form-error-label-container">
                                <span className="form-error-label" ></span>
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label-required">Ảnh bìa:</label>
                            <ImageUploader id="cr-document-imgurl"
                                maxSize={512000}
                                onImageChange={this.handleImageFileChange}
                                fileType={[".png, .jpg"]}
                                recommenedSize={"800x400"}
                            ></ImageUploader>
                            <div className="form-error-label-container">
                                <span className="form-error-label" ></span>
                            </div>
                        </div>


                        {/* CKEditor */}
                        <div className="form-group">
                            <div className="form-label-required">Mô tả tài liệu:</div>
                            <div className="form-tip-label mg-bottom-10px">Tối đa 255 ký tự.</div>
                            <Editor
                                config={SimpleCKEToolbarConfiguration}
                                editorId="cr-document-description"
                                placeholder='Start typing here...'
                                onChange={this.handleEditorChange}
                                data="<p>Nhập nội dung tài liệu ...</p>"
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
                            <Combobox comboboxId="cr-document-category-combobox"
                                options={this.categoriesList}
                                onOptionChanged={(selectedOption) => this.onCategoryOptionChanged(selectedOption)}
                                placeHolder="Chọn danh mục"
                                validation
                            >
                            </Combobox>
                            <div className="form-error-label-container">
                                <span className="form-error-label" ></span>
                            </div>
                        </div >

                        {/* Subject */}
                        <div className="form-group" >
                            <label className="form-label-required">Môn học:</label>
                            <Combobox comboboxId="cr-document-subject-combobox"
                                options={this.subjectsList}
                                onOptionChanged={(selectedOption) => this.onSubjectOptionChanged(selectedOption)}
                                placeHolder="Chọn môn học"
                                validation
                            >
                            </Combobox>
                            <div className="form-error-label-container">
                                <span className="form-error-label" ></span>
                            </div>
                        </div >

                        {/* Publish date */}
                        <div className="form-group" >
                            <label className="form-label">Thời gian đăng:</label>
                            <div>
                                <DatePicker
                                    selected={this.state.selectedDate}
                                    onChange={(date) => this.setStartDate(date)}
                                    dateFormat='dd/MM/yyyy'
                                    locale="vi-VN"
                                    value={this.state.shownDate}
                                    showTimeSelect
                                    startDate={new Date(new Date().getTime() + 60 * 60 * 1000)}
                                    minDate={new Date(new Date().getTime() + 60 * 60 * 1000)}
                                    minTime={new Date(new Date().getTime() + 60 * 60 * 1000)}
                                    maxTime={new Date(new Date().getTime() + 365 * 24 * 60 * 60 * 1000)}
                                />
                            </div>
                        </div >

                        {/* Tag */}
                        <div className='form-group'>
                            <label className="form-label">Tags:</label>

                            <input onChange={(e) => this.quickSearchTags(e)} id="cr-document-tag-input"
                                onKeyPress={(this.state.UPLOAD_DOCUMENT_DTO.tags.length < 5) && this.keyHandler}
                                className="text-input"
                                placeholder="Nhập tag " />

                            <ClickAwayListener onClickAway={() => this.closeQuickSearchTag()}>
                                {/* khi load xong thi ntn */}
                                <div id="cr-document-qs-tag-result-container" className="text-input-dropdown-container hidden">
                                    <div className="text-input-dropdown">
                                        {this.tagSearchResult}
                                        <div className="form-tip-label" id="cr-document-tag-container-tip-label">
                                        </div>
                                    </div>
                                </div>
                            </ClickAwayListener>

                            <div className="form-tip-label-container">
                                <div className="form-tip-label">Có thể nhập tối đa 5 tag.</div>
                            </div>

                            <div className="mg-top-10px" >
                                {this.shownTag.map(item =>
                                    <Tag isReadOnly={false} onDeleteTag={(item) => this.deleteTag(item)} clickable={false} tag={item} />
                                )}
                            </div>
                            <div className="form-line" />
                        </div>

                        {/* Upload */}
                        <div className="form-group" >
                            <label className="form-label-required">Tài liệu:</label>
                            <FormFileUploader id='cr-document-file-input'
                                onFileChange={(file) => this.onFileChange(file)}
                                maxSize={26214400} //byte
                                fileType={".pdf"} //n
                                multiple
                                maxFileCount={3}
                            />
                        </div>

                        {/* Button */}
                        <div className="form-group d-flex">
                            <button className="blue-button mg-auto form-submit-btn mg-top-10px" onClick={() => this.handleUploadBtnClick()}>Upload</button>
                        </div>
                    </div >
                </div >
            </div >

        return (
            <div className="left-sidebar-layout">
                <UserSidebar />
                <div className="content-layout">
                    <Titlebar title="UPLOAD TÀI LIỆU" />
                    <div className="content-container">
                        {body}
                    </div>
                </div >
            </div>

        );
    }
}

const mapStateToProps = (state) => {
    return {
        //category and subject
        categories: state.documentCategory.categories.data,
        isCategoryLoading: state.documentCategory.categories.isLoading,
        subjects: state.subject.subjects.data,
        isSubjectLoading: state.subject.subjects.isLoading,

        //tah
        tagQuickQueryResult: state.tag.tagQuickQueryResult.data,
        isTagQuickQueryLoading: state.tag.tagQuickQueryResult.isLoading,

        //sau nay su dung loading de tranh cac truong hop ma 2 bien isSearching va isLoadDone khong xu ly duoc
        isTagQuickQueryLoadDone: state.tag.tagQuickQueryResult.isLoadDone,
        //upload thanh cong hay khong
        isHaveUploaded: state.document.isHaveUploaded

    };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
    getDocumentCategories,
    getSubjectsList,
    getTagQuickQueryResult,
    uploadADocument
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UploadDocument));

