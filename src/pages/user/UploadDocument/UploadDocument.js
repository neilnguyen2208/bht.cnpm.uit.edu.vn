import React, { Component } from "react";

import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { getPostCategories } from "redux/services/postCategoryServices";
import { getTagQuickQueryResult } from "redux/services/tagServices"
import { uploadADocument } from "redux/services/docServices"
import "./UploadDocument.scss";
import "components/common/CustomCKE/CKEditorContent.scss";
import 'components/styles/Metadata.scss'
import 'components/styles/DocPostDetail.scss'

//components
import Tag from "components/common/Tag/Tag";
import Titlebar from 'components/common/Titlebar/Titlebar';
import Combobox from 'components/common/Combobox/Combobox';
import Editor from 'components/common/CustomCKE/CKEditor.js';
import UserSidebar from 'layouts/UserSidebar'
import SmallLoader from 'components/common/Loader/Loader_S'

import liked_btn from 'assets/icons/24x24/liked_icon_24x24.png'
import unliked_btn from 'assets/icons/24x24/unliked_icon_24x24.png'
import full_blue_bookmark_btn from 'assets/icons/24x24/b_blue_bookmark_icon_24x24.png'
import gray_bookmark_btn from 'assets/icons/24x24/nb_gray_bookmark_icon_24x24.png'

//utils
import { ClickAwayListener } from '@material-ui/core';
import { validation, styleFormSubmit } from 'utils/validationUtils'
import { today } from 'utils/miscUtils'
import Metadata from 'components/post/DetailMetadata'
import { SimpleCKEToolbarConfiguration } from 'components/common/CustomCKE/CKEditorConfiguration'
import FormFileUploader from 'components/common/FormFileUploader/FormFileUploader'
import store from "redux/store/index.js"
import { get_tagQuickQueryResultRequest, get_tagQuickQueryResultReset } from 'redux/actions/tagAction'
import {DELAY_TIME} from 'constants.js';

const validationCondition = {
    form: '#create-document-form',
    formGroupSelector: '.form-group',
    errorSelector: '.form-error-label',
    rules: [
        //truyen vao id, loai component, message
        validation.isRequired('cr-doc-title', 'form-input', 'Tên tài liệu không được để trống!'),
        validation.isNotAllowSpecialCharacter('cr-doc-title', 'form-input', 'Tên tài liệu không được chứa ký tự đặc biệt!'),
        validation.isRequired('cr-doc-category-combobox', 'form-combobox', 'Danh mục không được để trống'),
        validation.isRequired('cr-doc-subject-combobox', 'form-combobox', 'Môn học không được để trống'),
        validation.isRequired('cr-doc-description', 'form-ckeditor', 'Mô tả tài liệu không được để trống'),
        // validation.isRequired('cr-doc-file-input', 'form-file-input', 'Tài liệu không được để trống!')
        validation.isRequired('cr-doc-file-link', 'form-input', 'Tài liệu không được để trống!')

    ],
}

class UploadDocument extends Component {
    constructor(props) {
        super(props);
        this.categoryList = [
            {
                id: 1,
                name: "Chọn danh mục"
            }
        ];

        this.state = {
            currentCategory: "Chọn danh mục",
            currentSubject: "Chọn môn học",
            publishDtm: today.getDateDMY(),

            isUploading: false,
            isPreview: false,
            isSearchingTag: false,

            UPLOAD_DOC_DTO: {
                tags: [],
                title: "Model View Presenter (MVP) in Android with a simple demo project.",//
                content: ``,//
                summary: `null`,
                // authorID: "",// khong co nhe
                categoryID: "",//
                subjectID: "",
                imageURL: "null",
                docURL: "http://www.africau.edu/images/default/sample.pdf"
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
        this.isPopupOpen = false;
        this.message = "";

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
        this.props.getPostCategories();
        document.querySelector(".cr-doc-form-container.preview").classList.remove("d-block");
        document.querySelector(".cr-doc-form-container.edit").classList.remove("d-none");
        document.querySelector(".cr-doc-form-container.preview").classList.add("d-none");
        document.querySelector(".cr-doc-form-container.edit").classList.add("d-block");
        validation(validationCondition);
    }
    componentWillUnmount() {
        store.dispatch(get_tagQuickQueryResultReset());
    }
    onCategoryOptionChanged = (selectedOption) => {
        this.setState({
            UPLOAD_DOC_DTO: { ...this.state.UPLOAD_DOC_DTO, categoryID: selectedOption.id },
            currentCategory: selectedOption.name
        })
    }

    onSubjectOptionChanged = (selectedOption) => {
        this.setState({
            UPLOAD_DOC_DTO: { ...this.state.UPLOAD_DOC_DTO, subjectID: selectedOption.id },
            currentSubject: selectedOption.name
        })
    }

    handleUploadBtnClick = () => {
        if (styleFormSubmit(validationCondition)) {
            this.props.uploadADocument(this.state.UPLOAD_DOC_DTO);
        }

    }

    //#region  tag region
    closeQuickSearchTag = () => {
        document.getElementById("cr-doc-qs-tag-result-container").classList.add('hidden');
        document.getElementById("cr-doc-qs-tag-result-container").classList.remove('show');
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

        document.getElementById("cr-doc-qs-tag-result-container").classList.add('show');
        document.getElementById("cr-doc-qs-tag-result-container").classList.remove('hidden');
    }

    keyHandler = (e) => {
        if (!e.target.value) return;
        let tags = this.state.UPLOAD_DOC_DTO.tags;
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
                document.getElementById("cr-doc-qs-tag-result-container").classList.add('hidden');
                document.getElementById("cr-doc-qs-tag-result-container").classList.remove('show');

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
                    UPLOAD_DOC_DTO: {
                        ...this.state.UPLOAD_DOC_DTO,
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

        let tmpTagDTO = this.state.UPLOAD_DOC_DTO.tags;
        tmpTagDTO.push({ id: tag.id });

        //cap nhat lai shownTag theo tmpDTO
        let tmpShownTag = this.shownTag;
        for (let i = 0; i < tmpShownTag.length; i++) {
            if (tmpShownTag[i].content === '' && tmpShownTag[i].id === '') {
                tmpShownTag[i].content = tag.content; tmpShownTag[i].id = tag.id; break;
            }
        }

        //cap nhat lai shown tag tu state
        document.getElementById("cr-doc-qs-tag-result-container").classList.add('hidden');
        document.getElementById("cr-doc-qs-tag-result-container").classList.remove('show');

        this.setState({
            UPLOAD_DOC_DTO: {
                ...this.state.UPLOAD_DOC_DTO,
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
            UPLOAD_DOC_DTO: {
                ...this.state.UPLOAD_DOC_DTO,
                tags: tempTagDTO,
            }
        });
        this.forceUpdate();
    }

    handleClickTag = (item) => {
    }

    handleFileLinkChange = (e) => {

    }

    //#endregion
    handleEditorChange = (value) => {
        let dom = document.createElement("DIV");
        dom.innerHTML = this.state.UPLOAD_DOC_DTO.content;
        let plain_text = (dom.textContent || dom.innerText);

        if (value.length < 160) {
            this.setState({ UPLOAD_DOC_DTO: { ...this.state.UPLOAD_DOC_DTO, content: value, summary: plain_text } })
            return;
        }
        else {
            this.setState({ UPLOAD_DOC_DTO: { ...this.state.UPLOAD_DOC_DTO, summary: plain_text.substring(0, 160) } });
            return;
        }
    };

    handleTitleChange = (e) => {
        this.setState({
            UPLOAD_DOC_DTO: { ...this.state.UPLOAD_DOC_DTO, title: e.target.value }
        })
    }

    onFileChange = (file) => {
        //gan cho state
        this.setState({ UPLOAD_DOC_DTO: { ...this.state.UPLOAD_DOC_DTO, file } })
    }

    render() {

        let likeBtn = <div></div>;
        let saveBtn = <div></div>;

        //render likeBtn
        if (!this.isLiked) {
            likeBtn = <img className="like-btn" alt="like" src={liked_btn} onClick={this.toggleLikeImage}></img>
        }
        else {
            likeBtn = <img className="like-btn" alt="like" src={unliked_btn} onClick={this.toggleLikeImage} ></img>
        }

        //render saveBtn
        if (!this.isSaved) {
            saveBtn = <img className="save-btn" alt="dislike" src={full_blue_bookmark_btn}></img>
        }
        else {
            saveBtn = <img className="save-btn" alt="dislike" src={gray_bookmark_btn} ></img>
        }

        if (!this.props.isCategoryLoading && this.props.categories) {
            this.categoryList = this.props.categories;
        }
        this.tagSearchResult = <></>;
        if (this.props.isTagQuickQueryLoading) {
            this.tagSearchResult = <SmallLoader text="Đang tìm kiếm kết quả phù hợp" />;
            document.getElementById("cr-doc-tag-container-tip-label").innerText = "";
        }
        else
            if (this.props.isTagQuickQueryLoadDone) {
                if (this.state.isSearchingTag) {
                    this.setState({ isSearchingTag: false })
                }
                if (this.props.tagQuickQueryResult && !this.isCategoryLoading) {

                    //truong hop khong co tag nao thoa man va chua du 5 tag
                    if (this.state.UPLOAD_DOC_DTO.tags.length < 5) {
                        document.getElementById("cr-doc-tag-input").classList.remove('invalid');
                        if (this.props.tagQuickQueryResult.length === 0)
                            document.getElementById("cr-doc-tag-container-tip-label").innerText = "Không có kết quả tìm kiếm phù hợp! Bấm Enter để thêm tag mới."
                        else
                            document.getElementById("cr-doc-tag-container-tip-label").innerText = "Chọn tag phù hợp với tài liệu của bạn.";
                    }
                    else {
                        document.getElementById("cr-doc-tag-container-tip-label").innerText = "Không thể nhập quá 5 tag."
                        document.getElementById("cr-doc-tag-input").classList.add('invalid');
                    }
                    this.tagSearchResult = <div>
                        <div className="d-flex">
                            {this.props.tagQuickQueryResult.map(tag => {
                                return <div className="tag-search-item"
                                    onClick={() => { this.state.UPLOAD_DOC_DTO.tags.length < 5 && this.onTagSearchResultClick(tag) }}>
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
                {/* Preview region */}
                <div className="cr-doc-form-container doc-post-detail preview" >
                    <Metadata title={this.state.UPLOAD_DOC_DTO.title}
                        category={this.state.currentCategory}
                        readingTime={this.state.UPLOAD_DOC_DTO.readingTime}
                        authorName={this.state.author.displayName}
                        avartarURL={this.state.author.avatarURL}
                        publishDtm={this.state.publishDtm}
                    />
                    <div className="ck-editor-output" dangerouslySetInnerHTML={{ __html: this.state.UPLOAD_DOC_DTO.content }} />

                    <div className="mg-top-10px pd-10px" >
                        {this.shownTag.map(item =>
                            <Tag isReadOnly={true} onDeleteTag={(item) => this.deleteTag(item)} tag={item} />
                        )}
                    </div>

                    <div className="d-flex mg-top-5px pd-10px">
                        <div className="d-flex">
                            <div> {likeBtn}</div>
                            <div className="like-count">0</div>
                        </div>

                        <div className="d-flex">
                            <div className="save-text-container" onClick={this.toggleSaveImage}>
                                <div>{saveBtn}</div>
                                {this.isSaved ? "Lưu" : "Huỷ"}
                            </div>
                            <div className="comment-count-container">
                                Bình luận
                                <div style={{ paddingLeft: "5px" }}>
                                    {this.props.comments}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="reaction-bar">
                        <div className="gray-label">Bình luận: {this.viewCount}</div>
                        <div className="gray-label mg-left-5px">lượt xem: {this.viewCount}</div>
                    </div>
                </div>

                {/* Edit region */}
                <div className="cr-doc-form-container edit">
                    <div id="create-document-form" className="form-container" onSubmit={this.handleUpload} tabIndex="1">
                        <div className="mg-top-10px" />

                        <div className="form-group">
                            <label className="form-label-required">Tiêu đề:</label>
                            <input className="form-input" id="cr-doc-title"
                                placeholder="Nhập tiêu đề tài liệu ..." onChange={e => this.handleTitleChange(e)}
                                type="text" ></input>
                            <div className="form-error-label-container">
                                <span className="form-error-label" ></span>
                            </div>
                        </div>

                        {/* CKEditor */}
                        <div className="form-group">
                            <div className="form-label-required">Mô tả tài liệu:</div>
                            <Editor
                                config={SimpleCKEToolbarConfiguration}
                                id="cr-doc-description"
                                placeholder='Start typing here...'
                                onChange={this.handleEditorChange}
                                data="<p>Nhập nội dung tài liệu ...</p>"
                                validation
                            />
                            <div className="form-error-label-container">
                                <span className="form-error-label" ></span>
                            </div>
                        </div>

                        {/* Category */}
                        <div className="form-group" >
                            <label className="form-label-required">Danh mục:</label>
                            <Combobox id="cr-doc-category-combobox"
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

                        <div className="form-group" >
                            <label className="form-label-required">Môn học:</label>
                            <Combobox id="cr-doc-subject-combobox"
                                options={this.categoryList}
                                onOptionChanged={(selectedOption) => this.onCategoryOptionChanged(selectedOption)}
                                placeHolder="Chọn môn học"
                                validation
                            >
                            </Combobox>
                            <div className="form-error-label-container">
                                <span className="form-error-label" ></span>
                            </div>
                        </div >

                        {/* Tag */}
                        <div className='form-group'>
                            <label className="form-label">Tags:</label>

                            <input onChange={(e) => this.quickSearchTags(e)} id="cr-doc-tag-input"
                                onKeyPress={(this.state.UPLOAD_DOC_DTO.tags.length < 5) && this.keyHandler}
                                className="form-input"
                                placeholder="Nhập tag ..." />

                            <ClickAwayListener onClickAway={() => this.closeQuickSearchTag()}>
                                {/* khi load xong thi ntn */}
                                <div id="cr-doc-qs-tag-result-container" className="form-input-dropdown-container hidden">
                                    <div className="form-input-dropdown">
                                        <div className="d-flex">
                                            {this.tagSearchResult}
                                        </div>

                                        <div className="form-tip-label" id="cr-doc-tag-container-tip-label">

                                        </div>
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

                        {/* Upload */}
                        <div className="form-group" >
                            <label className="form-label-required">Tài liệu:</label>
                            {/* <input className="form-input" id="cr-doc-file-link"
                                placeholder="Nhập liên kết tài liệu ..." onChange={e => this.handleFileLinkChange(e)}
                                type="text" >
                            </input> */}
                            {/* Su dung file input theo dung nhu cau truc duoi day thi moi co the tu validation */}
                            <FormFileUploader id='cr-doc-file-input'
                                onFileChange={(file) => this.onFileChange(file)}
                                maxSize={26214400} //byte
                                fileType={".pdf"} //n
                            />
                            <div className="form-error-label-container">
                                <span className="form-error-label" ></span>
                            </div>
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
                        <div className="form-container">
                            <div className="j-c-end">
                                <div className="j-c-end" >
                                    <button className="blue-button" disabled={!this.state.isPreview} onClick={this.onEditBtnClick} >Soạn tài liệu</button>
                                    <div className="mg-right-5px" />
                                    <button className="white-button" disabled={this.state.isPreview} onClick={this.onPreviewBtnClick} >Preview</button>
                                </div>
                            </div>
                            <div className="mg-top-10px decoration-line" />
                        </div>
                        {body}

                    </div>
                </div >
            </div>

        );
    }

    onEditBtnClick = () => {
        this.setState({ isPreview: !this.state.isPreview });
        document.querySelector(".cr-doc-form-container.preview").classList.remove("d-block");
        document.querySelector(".cr-doc-form-container.edit").classList.remove("d-none");
        document.querySelector(".cr-doc-form-container.preview").classList.add("d-none");
        document.querySelector(".cr-doc-form-container.edit").classList.add("d-block");

    }

    onPreviewBtnClick = () => {
        this.setState({ isPreview: !this.state.isPreview });
        document.querySelector(".cr-doc-form-container.preview").classList.add("d-block");
        document.querySelector(".cr-doc-form-container.edit").classList.add("d-none");
        document.querySelector(".cr-doc-form-container.preview").classList.remove("d-none");
        document.querySelector(".cr-doc-form-container.edit").classList.remove("d-block");
        console.log(this.state);
    }
}

const mapStateToProps = (state) => {
    return {
        categories: state.post_category.categories.data,
        isCategoryLoading: state.post_category.categories.isLoading,
        tagQuickQueryResult: state.tag.tagQuickQueryResult.data,
        isTagQuickQueryLoading: state.tag.tagQuickQueryResult.isLoading,
        //sau nay su dung loading de tranh cac truong hop ma 2 bien isSearching va isLoadDone khong xu ly duoc
        isTagQuickQueryLoadDone: state.tag.tagQuickQueryResult.isLoadDone,
        //upload thanh cong hay khong
        isUploadDone: state.document.uploadDocument.isLoadDone,
        uploadMessage: state.document.uploadDocument.notification
    };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
    getPostCategories,
    getTagQuickQueryResult,
    uploadADocument
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UploadDocument));

