import React from "react";
import '../Modal.scss'
import 'components/styles/Button.scss'
import { closeBigModal, closeModal, openModal } from "redux/services/modalServices";
import store from 'redux/store/index.js'
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { getPostCategories } from "redux/services/postCategoryServices";
import { getTagQuickQueryResult } from "redux/services/tagServices"
import { getPostByID, editAPost } from "redux/services/postServices"
import { get_PostByIDReset, put_EditAPostReset } from "redux/actions/postAction"

import { get_tagQuickQueryResultRequest, get_tagQuickQueryResultReset } from "redux/actions/tagAction"
import { DELAY_TIME } from 'constants.js'
import "components/common/CustomCKE/CKEditorContent.scss";
import 'components/styles/Detail.scss'

//components
import Tag from "components/post/Tag";
import ModalTitlebar from 'components/common/Titlebar/ModalTitlebar';
import Combobox from 'components/common/Combobox/Combobox';
import Editor from 'components/common/CustomCKE/CKEditor.js';
import { getCKEInstance } from 'components/common/CustomCKE/CKEditorUtils';

import Loader from 'components/common/Loader/Loader'

//utils
import { ClickAwayListener } from '@material-ui/core';
import { validation, styleFormSubmit } from 'utils/validationUtils'
import Metadata from 'components/post/DetailInfo'
import SmallLoader from 'components/common/Loader/Loader_S'
import PostNormalReactionbar from 'components/post/NormalReactionbar'

const validationCondition = {
    form: '#edit-post-form',
    rules: [
        //truyen vao id, loai component, message
        validation.isRequired('ed-post-title', 'text-input', 'Tên bài viết không được để trống!'),
        // validation.noSpecialChar('ed-post-title', 'text-input', 'Tên bài viết không được chứa ký tự đặc biệt!'),
        validation.isRequired('ed-post-category-combobox', 'combobox', 'Danh mục không được để trống'),
        validation.isRequired('ed-post-cke', 'ckeditor', 'Nội dung bài viết không được để trống')
    ],
}

class EditPostModal extends React.Component {
    constructor(props) {
        super(props);
        this.categoryList = [
            {
                id: 0,
                name: "Chọn danh mục"
            }
        ];
        this.isNotifySuccessOpen = false;
        this.state = {

            currentCategory: "",
            publishDtm: "",

            isUploading: false,
            isPreview: false,
            isSearchingTag: false,

            EDIT_POST_DTO: {
                tags: [],
                title: '',//
                content: ``,
                summary: `null`,
                categoryID: "",
                imageURL: "",
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
        this.props.getPostCategories();
        this.props.getPostByID(this.props.id);

        document.querySelector(".ed-post-form-container.preview-modal").classList.remove("d-block");
        document.querySelector(".ed-post-form-container.edit").classList.remove("d-none");
        document.querySelector(".ed-post-form-container.preview-modal").classList.add("d-none");
        document.querySelector(".ed-post-form-container.edit").classList.add("d-block");
        this.isFirstLoad = false;

        this.timeOut = null;
        this.isInstanceReady = false;
    }

    componentWillUnmount() {
        //reset global state isLoadDone of tagSearchQuickQuerry 
        store.dispatch(get_tagQuickQueryResultReset());
        store.dispatch(get_PostByIDReset());
        store.dispatch(put_EditAPostReset());
        if (getCKEInstance('ed-post-cke'))
            getCKEInstance('ed-post-cke').destroy();
    }
    onCategoryOptionChanged = (selectedOption) => {
        this.setState({
            EDIT_POST_DTO: { ...this.state.EDIT_POST_DTO, categoryID: selectedOption.id },
            currentCategory: selectedOption.name
        })
    }

    handleUploadBtnClick = () => {
        let dom = document.createElement("DIV");
        dom.innerHTML = this.state.EDIT_POST_DTO.content;
        let plain_text = (dom.textContent || dom.innerText);
        let tmpSummary = '';
        if (this.state.EDIT_POST_DTO.content.length < 160) {
            tmpSummary = plain_text;
        }
        else {
            tmpSummary = plain_text.substring(0, 160);
        }

        if (styleFormSubmit(validationCondition)) {
            openModal("confirmation",
                {
                    title: "Thay đổi bài viết",
                    text: "Hành động này cần phê duyệt và không thể hoàn tác.",
                    confirmText: "Xác nhận",
                    cancelText: "Huỷ",
                    onConfirm: () => {
                        this.props.editAPost(this.props.id, { ...this.state.EDIT_POST_DTO, summary: tmpSummary + "" });
                        closeModal(); //close confimation popup
                        this.closeModal(); //close edit post popup
                    }
                })
        }
    }

    //#region  tag region
    closeQuickSearchTag = () => {
        document.getElementById("ed-post-qs-tag-result-container").classList.add('hidden');
        document.getElementById("ed-post-qs-tag-result-container").classList.remove('show');
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

        document.getElementById("ed-post-qs-tag-result-container").classList.add('show');
        document.getElementById("ed-post-qs-tag-result-container").classList.remove('hidden');
    }

    onCKEInstanceReady = () => {
        this.isInstanceReady = true;
        this.setState({})
    }

    keyHandler = (e) => {
        if (!e.target.value) return;
        let tags = this.state.EDIT_POST_DTO.tags;
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
                document.getElementById("ed-post-qs-tag-result-container").classList.add('hidden');
                document.getElementById("ed-post-qs-tag-result-container").classList.remove('show');

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
                    EDIT_POST_DTO: {
                        ...this.state.EDIT_POST_DTO,
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

        let tmpTagDTO = this.state.EDIT_POST_DTO.tags;
        tmpTagDTO.push({ id: tag.id });

        //cap nhat lai shownTag theo tmpDTO
        let tmpShownTag = this.shownTag;
        for (let i = 0; i < tmpShownTag.length; i++) {
            if (tmpShownTag[i].content === '' && tmpShownTag[i].id === '') {
                tmpShownTag[i].content = tag.content; tmpShownTag[i].id = tag.id; break;
            }
        }

        //cap nhat lai shown tag tu state
        document.getElementById("ed-post-qs-tag-result-container").classList.add('hidden');
        document.getElementById("ed-post-qs-tag-result-container").classList.remove('show');

        this.setState({
            EDIT_POST_DTO: {
                ...this.state.EDIT_POST_DTO,
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
            EDIT_POST_DTO: {
                ...this.state.EDIT_POST_DTO,
                tags: tempTagDTO,
            }
        });
        this.forceUpdate();
    }

    //#endregion
    handleEditorChange = (value) => {
        if (value.length < 160) {
            this.setState({ EDIT_POST_DTO: { ...this.state.EDIT_POST_DTO, content: value } })
            return;
        }
        else {
            this.setState({ EDIT_POST_DTO: { ...this.state.EDIT_POST_DTO, content: value } });
            return;
        }
    };

    handleTitleChange = (e) => {
        this.setState({
            EDIT_POST_DTO: { ...this.state.EDIT_POST_DTO, title: e.target.value }
        })
    }

    closeModal = () => {
        store.dispatch(closeBigModal())
        if (window.location.pathname.substring(0, 13) === "/post-content")
            window.location.reload()
    }

    handleImageURLChange = (e) => {
        this.setState({
            EDIT_POST_DTO: { ...this.state.EDIT_POST_DTO, imageURL: e.target.value }
        })
    }

    render() {

        if (!this.props.isCategoryLoading && this.props.categories) {
            this.categoryList = this.props.categories;
        }

        this.tagSearchResult = <></>;
        if (this.props.isTagQuickQueryLoading) {
            this.tagSearchResult = <SmallLoader text="Đang tìm kiếm kết quả phù hợp" />;
            document.getElementById("ed-post-tag-container-tip-label").innerText = "";
        }

        else
            if (this.props.isTagQuickQueryLoadDone) {
                if (this.state.isSearchingTag) {
                    this.setState({ isSearchingTag: false })
                }
                if (this.props.tagQuickQueryResult && !this.isCategoryLoading) {
                    //truong hop khong co tag nao thoa man va chua du 5 tag
                    if (this.state.EDIT_POST_DTO.tags.length < 5) {
                        document.getElementById("ed-post-tag-input").classList.remove('invalid');
                        if (this.props.tagQuickQueryResult.length === 0)
                            document.getElementById("ed-post-tag-container-tip-label").innerText = "Không có kết quả tìm kiếm phù hợp! Bấm Enter để thêm tag mới."
                        else
                            document.getElementById("ed-post-tag-container-tip-label").innerText = "Chọn tag phù hợp, hoặc bấm enter để thêm tag!";
                    }
                    else {
                        document.getElementById("ed-post-tag-container-tip-label").innerText = "Không thể nhập quá 5 tag."
                    }
                    this.tagSearchResult = <div>
                        <div className="d-flex">
                            {this.props.tagQuickQueryResult.map(tag => {
                                return <div className="tag-search-item"
                                    onClick={() => { this.state.EDIT_POST_DTO.tags.length < 5 && this.onTagSearchResultClick(tag) }}>
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
        if (!this.props.isCurrentPostLoading && Object.keys(this.props.currentPost).length > 0 && !this.isFirstLoad && this.isInstanceReady) {
            this.isFirstLoad = true;
            this.props.currentPost.tags.forEach((item, index) => {
                this.shownTag[index].id = item.id;
                this.shownTag[index].content = item.content;
            })

            getCKEInstance('ed-post-cke').setData(this.props.currentPost.content);

            this.setState({
                EDIT_POST_DTO: {
                    title: this.props.currentPost.title,
                    tags: this.props.currentPost.tags ? this.props.currentPost.tags : [],
                    content: this.props.currentPost.content,
                    imageURL: this.props.currentPost.imageURL,
                    categoryID: this.props.currentPost.categoryID,
                    categoryName: this.props.currentPost.categoryName,
                    readingTime: this.props.currentPost.readingTime,
                    authorDisplayName: this.props.currentPost.authorDisplayName,
                    authorID: this.props.currentPost.authorID,
                    authorAvatarURL: this.props.currentPost.authorAvatarURL,
                    id: this.props.currentPost.id

                }
            })
        }
        //load xong thi cho hien thi body
        if (this.props.currentPost && !this.props.isCurrentPostLoading && document.getElementById('edit-post-body')) {
            document.getElementById('edit-post-body').classList.add("d-block");
            document.getElementById('edit-post-body').classList.remove("d-none");
        }

        return (
            <div>
                <div className="modal-overlay-shadow" />
                <div className="modal-fixed-layout">
                    <div className="modal-wrapper big o-f-hidden pd-top-5px">
                        <ModalTitlebar title="CHỈNH SỬA BÀI VIẾT" />
                        <div className="scroller-container mg-bottom-10px">
                            <div className="form-container">
                                <div>
                                    <div className="j-c-end " >
                                        <button className="blue-button" disabled={!this.state.isPreview} onClick={this.onEditBtnClick} >Chỉnh sửa</button>
                                        <div className="mg-right-5px" />
                                        <button className="white-button" disabled={this.state.isPreview} onClick={this.onPreviewBtnClick} >Preview</button>
                                    </div>
                                    <div className="decoration-line mg-top-10px" />
                                </div>
                                <div id="edit-post-body" >
                                    {/* Preview region */}
                                    <div className="ed-post-form-container post-detail-container preview-modal d-none" >
                                        <div style={{ marginTop: "20px" }} />
                                        {
                                            this.state.EDIT_POST_DTO.authorID ?
                                                < Metadata
                                                    postId={this.props.currentPost.id}
                                                    title={this.state.EDIT_POST_DTO.title}
                                                    categoryName={this.state.EDIT_POST_DTO.categoryName}
                                                    categoryID={this.state.EDIT_POST_DTO.categoryID}
                                                    readingTime={this.state.EDIT_POST_DTO.readingTime}
                                                    authorDisplayName={this.state.EDIT_POST_DTO.authorDisplayName}
                                                    authorAvatarURL={this.state.EDIT_POST_DTO.authorAvatarURL}
                                                    authorID={this.state.EDIT_POST_DTO.authorID}
                                                    publishDtm={this.state.EDIT_POST_DTO.publishDtm}
                                                    imageURL={this.state.EDIT_POST_DTO.imageURL}
                                                    type="PREVIEW"
                                                    popUpMenuPrefix="edpmd-"
                                                /> : <></>}
                                        <div className="ck-editor-output" dangerouslySetInnerHTML={{ __html: this.state.EDIT_POST_DTO.content }} />

                                        <div className="mg-top-10px mg-bottom-10px" >
                                            {this.shownTag.map(item =>
                                                <Tag isReadOnly={true} onDeleteTag={(item) => this.deleteTag(item)} clickable={false} tag={item} />
                                            )}
                                        </div>
                                        <PostNormalReactionbar
                                            postId={"-1"}
                                            likeCount={0}
                                            commentCount={0}
                                            likedStatus={false}
                                            savedStatus={false}
                                            viewCount={0}
                                            type="PREVIEW"
                                        />
                                    </div>

                                    {/* Edit region */}
                                    <div className="ed-post-form-container edit d-none">
                                        <div id="edit-post-form" className="form-container" onSubmit={this.handleUpload}>
                                            <div className="mg-top-10px" />

                                            <div className="form-group">
                                                <label className="form-label-required">Tiêu đề:</label>
                                                <input className="text-input" id="ed-post-title"
                                                    placeholder="Nhập tiêu đề bài viết "
                                                    onChange={e => this.handleTitleChange(e)}
                                                    type="text" defaultValue={
                                                        !this.props.isCurrentPostLoading ? this.state.EDIT_POST_DTO.title : ''} ></input>
                                                <div className="form-error-label-container">
                                                    <span className="form-error-label" ></span>
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <label className="form-label-required">Link ảnh bìa:</label>
                                                <input className="text-input" id="ed-post-imgurl"
                                                    placeholder="Nhập link hình ảnh: "
                                                    defaultValue={
                                                        !this.props.isCurrentPostLoading ? this.state.EDIT_POST_DTO.imageURL : ''}
                                                    onChange={e => this.handleImageURLChange(e)}
                                                    type="text" ></input>
                                                <div className="form-error-label-container">
                                                    <span className="form-error-label" ></span>
                                                </div>
                                            </div>

                                            {/* CKEditor */}
                                            <div className="form-group">
                                                <div className="form-label-required">Nội dung:</div>
                                                <Editor
                                                    editorId={"ed-post-cke"}
                                                    onChange={this.handleEditorChange}
                                                    myData={!this.props.isCurrentPostLoading ? this.state.EDIT_POST_DTO.content : ''}
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
                                                <Combobox comboboxId="ed-post-category-combobox"
                                                    selectedOptionID={!this.props.isCurrentPostLoading ? this.state.EDIT_POST_DTO.categoryID : 0}
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
                                            {/* 
                                            <div className="form-group" style={{ zIndex: "4" }}>
                                                <label className="form-label">Thời gian đăng:</label>
                                                <JQDateTimePicker dtPickerId="cr-post" onDateTimeChange={(date) => this.onPublishTimeChange(date)} />
                                            </div> */}

                                            {/* Tag */}
                                            <div className='form-group mg-bottom-10px'>
                                                <label className="form-label">Tags:</label>

                                                <input onChange={(e) => this.quickSearchTags(e)} id="ed-post-tag-input"
                                                    onKeyPress={(this.state.EDIT_POST_DTO.tags.length < 5) && this.keyHandler}
                                                    className="text-input"
                                                    placeholder="Nhập tag " />

                                                <ClickAwayListener onClickAway={() => this.closeQuickSearchTag()}>
                                                    {/* khi load xong thi ntn */}
                                                    <div id="ed-post-qs-tag-result-container" className="text-input-dropdown-container hidden">
                                                        <div className="text-input-dropdown">
                                                            {this.tagSearchResult}
                                                            <div className="form-tip-label" id="ed-post-tag-container-tip-label" />
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

                                            {/* Button */}
                                            <div className="form-group j-c-end pd-bottom-10px">
                                                <button className="blue-button form-submit-btn" onClick={() => this.handleUploadBtnClick()}>Lưu</button>
                                                <button className="white-button form-submit-btn mg-left-10px" onClick={() => this.closeModal()}>Huỷ</button>
                                            </div>
                                        </div >
                                    </div >
                                </div >
                                {(this.props.isCurrentPostLoading || !this.props.currentPost) ?
                                    <Loader /> :
                                    <></>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    onEditBtnClick = () => {
        this.setState({ isPreview: !this.state.isPreview });
        document.querySelector(".ed-post-form-container.preview-modal").classList.remove("d-block");
        document.querySelector(".ed-post-form-container.edit").classList.remove("d-none");
        document.querySelector(".ed-post-form-container.preview-modal").classList.add("d-none");
        document.querySelector(".ed-post-form-container.edit").classList.add("d-block");

    }

    onPreviewBtnClick = () => {
        this.setState({ isPreview: !this.state.isPreview });
        document.querySelector(".ed-post-form-container.preview-modal").classList.add("d-block");
        document.querySelector(".ed-post-form-container.edit").classList.add("d-none");
        document.querySelector(".ed-post-form-container.preview-modal").classList.remove("d-none");
        document.querySelector(".ed-post-form-container.edit").classList.remove("d-block");
    }
}

const mapStateToProps = (state) => {
    return {
        categories: state.postCategory.categories.data,
        isCategoryLoading: state.postCategory.categories.isLoading,

        isCurrentPostLoading: state.post.currentPost.isLoading,
        currentPost: state.post.currentPost.data,
        isCurrentPostLoadDone: state.post.currentPost.isLoadDone,

        tagQuickQueryResult: state.tag.tagQuickQueryResult.data,
        isTagQuickQueryLoading: state.tag.tagQuickQueryResult.isLoading,
        //sau nay su dung loading de tranh cac truong hop ma 2 bien isSearching va isLoadDone khong xu ly duoc
        isTagQuickQueryLoadDone: state.tag.tagQuickQueryResult.isLoadDone,
    };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
    getPostCategories,
    getTagQuickQueryResult,
    getPostByID,
    editAPost

}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditPostModal));
