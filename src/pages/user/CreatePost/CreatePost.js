import React, { Component } from "react";

import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { getPostCategories } from "redux/services/postCategoryServices";
import { getTagQuickQueryResult } from "redux/services/tagServices"
import { createAPost } from "redux/services/postServices"
import { get_tagQuickQueryResultRequest, get_tagQuickQueryResultReset } from "redux/actions/tagAction"
import { DELAY_TIME } from 'constants.js'
import "./CreatePost.scss";
import "components/common/CustomCKE/CKEditorContent.scss";
import 'components/styles/Detail.scss'
import Tag from "components/common/tag/Tag";
import Titlebar from 'components/common/Titlebar/Titlebar';
import Combobox from 'components/common/Combobox/Combobox';
import Editor from 'components/common/CustomCKE/CKEditor.js';
import unliked_btn from 'assets/icons/24x24/unliked_icon_24x24.png'
import gray_bookmark_btn from 'assets/icons/24x24/nb_gray_bookmark_icon_24x24.png'
import { ClickAwayListener } from '@material-ui/core';
import { validation, styleFormSubmit } from 'utils/validationUtils'
import { today } from 'utils/miscUtils'
import store from 'redux/store/index'
import Metadata from 'components/post/DetailInfo'
import UserSidebar from 'layouts/UserSidebar'
import SmallLoader from 'components/common/Loader/Loader_S'
import { detailType } from 'constants.js'
import NormalReactionbar from "components/post/NormalReactionbar";


const validationCondition = {
    form: '#create-post-form',
    rules: [
        //truyen vao id, loai component, message
        validation.isRequired('cr-post-title', 'text-input', 'Tên bài viết không được để trống!'),
        validation.noSpecialChar('cr-post-title', 'text-input', 'Tên bài viết không được chứa ký tự đặc biệt!'),
        validation.isRequired('cr-post-category-combobox', 'combobox', 'Danh mục không được để trống'),
        validation.isRequired('cr-post-cke', 'ckeditor', 'Nội dung bài viết không được để trống')
    ],
}

class CreatePost extends Component {
    constructor(props) {
        super(props);
        this.categoryList = [
            {
                id: 1,
                name: "Chọn danh mục"
            }
        ];
        this.isNotifySuccessOpen = false;
        this.state = {
            currentCategory: "",
            publishDtm: today.getDateDMY(),

            isUploading: false,
            isPreview: false,
            isSearchingTag: false,

            CREATE_POST_DTO: {
                tags: [],
                title: "Model View Presenter (MVP) in Android with a simple demo project.",//
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
        this.tagQuickQueryResult = <></>;
    }

    componentDidMount() {
        this.props.getPostCategories();
        document.querySelector(".cr-post-form-container.preview").classList.remove("d-block");
        document.querySelector(".cr-post-form-container.edit").classList.remove("d-none");
        document.querySelector(".cr-post-form-container.preview").classList.add("d-none");
        document.querySelector(".cr-post-form-container.edit").classList.add("d-block");

        this.timeOut = null;

        validation(validationCondition);
    }

    componentWillUnmount() {
        //reset global state isLoadDone of tagSearchQuickQuerry 
        store.dispatch(get_tagQuickQueryResultReset());
    }
    onCategoryOptionChanged = (selectedOption) => {
        this.setState({
            CREATE_POST_DTO: { ...this.state.CREATE_POST_DTO, categoryID: selectedOption.id },
            currentCategory: selectedOption.name
        })
    }

    handleUploadBtnClick = () => {
        let dom = document.createElement("DIV");
        dom.innerHTML = this.state.CREATE_POST_DTO.content;
        let plain_text = (dom.textContent || dom.innerText);
        let tmpSummary = '';
        if (this.state.CREATE_POST_DTO.content.length < 160) {
            tmpSummary = plain_text;
        }
        else {
            tmpSummary = plain_text.substring(0, 160);
        }

        if (styleFormSubmit(validationCondition)) {
            this.props.createAPost({ ...this.state.CREATE_POST_DTO, summary: tmpSummary + "..." });
        }
    }

    handleClosePopup = () => {
        this.setState({
            modalShow: false,
        });
    }

    //#region  tag region
    closeQuickSearchTag = () => {
        document.getElementById("cr-post-qs-tag-result-container").classList.add('hidden');
        document.getElementById("cr-post-qs-tag-result-container").classList.remove('show');
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

        document.getElementById("cr-post-qs-tag-result-container").classList.add('show');
        document.getElementById("cr-post-qs-tag-result-container").classList.remove('hidden');
    }

    keyHandler = (e) => {
        if (!e.target.value) return;
        let tags = this.state.CREATE_POST_DTO.tags;
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
                document.getElementById("cr-post-qs-tag-result-container").classList.add('hidden');
                document.getElementById("cr-post-qs-tag-result-container").classList.remove('show');

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
                    CREATE_POST_DTO: {
                        ...this.state.CREATE_POST_DTO,
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

        let tmpTagDTO = this.state.CREATE_POST_DTO.tags;
        tmpTagDTO.push({ id: tag.id });

        //cap nhat lai shownTag theo tmpDTO
        let tmpShownTag = this.shownTag;
        for (let i = 0; i < tmpShownTag.length; i++) {
            if (tmpShownTag[i].content === '' && tmpShownTag[i].id === '') {
                tmpShownTag[i].content = tag.content; tmpShownTag[i].id = tag.id; break;
            }
        }

        //cap nhat lai shown tag tu state
        document.getElementById("cr-post-qs-tag-result-container").classList.add('hidden');
        document.getElementById("cr-post-qs-tag-result-container").classList.remove('show');

        this.setState({
            CREATE_POST_DTO: {
                ...this.state.CREATE_POST_DTO,
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
            CREATE_POST_DTO: {
                ...this.state.CREATE_POST_DTO,
                tags: tempTagDTO,
            }
        });
        this.forceUpdate();
    }

    //#endregion
    handleEditorChange = (value) => {
        if (value.length < 160) {
            this.setState({ CREATE_POST_DTO: { ...this.state.CREATE_POST_DTO, content: value } })
            return;
        }
        else {
            this.setState({ CREATE_POST_DTO: { ...this.state.CREATE_POST_DTO, content: value } });
            return;
        }
    };

    handleTitleChange = (e) => {
        this.setState({
            CREATE_POST_DTO: { ...this.state.CREATE_POST_DTO, title: e.target.value }
        })
    }

    render() {
        //render likeBtn
        let likeBtn = <img className="like-btn" alt="like" src={unliked_btn} onClick={this.toggleLikeImage} ></img>

        //render saveBtn
        let saveBtn = <div className="d-flex" onClick={this.toggleSaveImage} >
            <img className="save-btn" alt="dislike" src={gray_bookmark_btn} />
            <div>Lưu</div>
        </div >


        if (!this.props.isCategoryLoading && this.props.categories) {
            this.categoryList = this.props.categories;
        }
        this.tagSearchResult = <></>;
        if (this.props.isTagQuickQueryLoading) {
            this.tagSearchResult = <SmallLoader text="Đang tìm kiếm kết quả phù hợp" />;
            document.getElementById("cr-post-tag-container-tip-label").innerText = "";
        }
        else
            if (this.props.isTagQuickQueryLoadDone) {
                if (this.state.isSearchingTag) {
                    this.setState({ isSearchingTag: false })
                }
                if (this.props.tagQuickQueryResult && !this.isCategoryLoading) {

                    //truong hop khong co tag nao thoa man va chua du 5 tag
                    if (this.state.CREATE_POST_DTO.tags.length < 5) {
                        document.getElementById("cr-post-tag-input").classList.remove('invalid');
                        if (this.props.tagQuickQueryResult.length === 0)
                            document.getElementById("cr-post-tag-container-tip-label").innerText = "Không có kết quả tìm kiếm phù hợp! Bấm Enter để thêm tag mới."
                        else
                            document.getElementById("cr-post-tag-container-tip-label").innerText = "Chọn tag phù hợp, hoặc bấm enter để thêm tag!";
                    }
                    else {
                        document.getElementById("cr-post-tag-container-tip-label").innerText = "Không thể nhập quá 5 tag."
                        document.getElementById("cr-post-tag-input").classList.add('invalid');
                    }
                    this.tagSearchResult = <div>
                        <div className="d-flex">
                            {this.props.tagQuickQueryResult.map(tag => {
                                return <div className="tag-search-item"
                                    onClick={() => { this.state.CREATE_POST_DTO.tags.length < 5 && this.onTagSearchResultClick(tag) }}>
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
                <div className="cr-post-form-container post-detail-container preview" >
                    <Metadata title={this.state.CREATE_POST_DTO.title}
                        categoryName={this.state.currentCategory}
                        categoryID={this.state.CREATE_POST_DTO.categoryID}
                        readingTime={this.state.CREATE_POST_DTO.readingTime}
                        authorName={this.state.author.displayName}
                        authorAvartarURL={this.state.author.authorAvatarURL}
                        publishDtm={this.state.publishDtm}
                        type={detailType.preview}
                    />

                    {/* content here */}
                    <div className="ck-editor-output" dangerouslySetInnerHTML={{
                        __html:
                            this.state.CREATE_POST_DTO.content
                    }} />

                    <div className="mg-top-10px mg-bottom-10px" >
                        {this.shownTag.map(item =>
                            <Tag isReadOnly={true} onDeleteTag={(item) => this.deleteTag(item)} tag={item} />
                        )}
                    </div>
                    <NormalReactionbar
                        id={"-1"}
                        likeCount={0}
                        commentCount={0}
                        likedStatus={false}
                        savedStatus={false}
                        type="PREVIEW"
                    />
                </div>

                {/* Edit region */}
                <div className="cr-post-form-container edit">
                    <div id="create-post-form" className="form-container" onSubmit={this.handleUpload} tabIndex="1">
                        <div className="mg-top-10px" />

                        <div className="form-group">
                            <label className="form-label-required">Tiêu đề:</label>
                            <input className="text-input" id="cr-post-title"
                                placeholder="Nhập tiêu đề bài viết ..." onChange={e => this.handleTitleChange(e)}
                                type="text" ></input>
                            <div className="form-error-label-container">
                                <span className="form-error-label" ></span>
                            </div>
                        </div>

                        {/* CKEditor */}
                        <div className="form-group">
                            <div className="form-label-required">Nội dung:</div>
                            <Editor
                                id="cr-post-cke"
                                placeholder='Start typing here...'
                                onChange={this.handleEditorChange}
                                data="<p>Nhập nội dung bài viết ...</p>"
                                validation
                            />
                            <div className="form-error-label-container">
                                <span className="form-error-label" ></span>
                            </div>
                        </div>

                        {/* Category */}
                        <div className="form-group" >
                            <label className="form-label-required">Danh mục:</label>
                            <Combobox id="cr-post-category-combobox"
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

                        {/* Tag */}
                        <div className='form-group'>
                            <label className="form-label">Tags:</label>

                            <input onChange={(e) => this.quickSearchTags(e)} id="cr-post-tag-input"
                                onKeyPress={(this.state.CREATE_POST_DTO.tags.length < 5) && this.keyHandler}
                                className="text-input"
                                placeholder="Nhập tag ..." />

                            <ClickAwayListener onClickAway={() => this.closeQuickSearchTag()}>
                                {/* khi load xong thi ntn */}
                                <div id="cr-post-qs-tag-result-container" className="text-input-dropdown-container hidden">
                                    <div className="text-input-dropdown">
                                        {this.tagSearchResult}
                                        <div className="form-tip-label" id="cr-post-tag-container-tip-label" />
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
                        <div className="form-group d-flex">
                            <button className="blue-button mg-auto form-submit-btn" onClick={() => this.handleUploadBtnClick()}>Đăng bài</button>
                        </div>
                    </div >
                </div >
            </div >

        return (
            <div className="left-sidebar-layout">
                <UserSidebar />
                <div className="content-layout">
                    <Titlebar title="TẠO BÀI VIẾT MỚI" />
                    <div className="content-container">
                        <div className="form-container">
                            <div className="j-c-end">
                                <div className="j-c-end" >
                                    <button className="blue-button" disabled={!this.state.isPreview} onClick={this.onEditBtnClick} >Soạn bài viết</button>
                                    <div className="mg-right-5px" />
                                    <button className="white-button" disabled={this.state.isPreview} onClick={this.onPreviewBtnClick} >Preview</button>
                                </div>
                            </div>
                            <div className="mg-top-10px decoration-line" />
                        </div>
                        {body}
                    </div>
                </div>

                {/* Custom for notifing success */}

            </div>

        );
    }

    onEditBtnClick = () => {
        this.setState({ isPreview: !this.state.isPreview });
        document.querySelector(".cr-post-form-container.preview").classList.remove("d-block");
        document.querySelector(".cr-post-form-container.edit").classList.remove("d-none");
        document.querySelector(".cr-post-form-container.preview").classList.add("d-none");
        document.querySelector(".cr-post-form-container.edit").classList.add("d-block");

    }

    onPreviewBtnClick = () => {
        this.setState({ isPreview: !this.state.isPreview });
        document.querySelector(".cr-post-form-container.preview").classList.add("d-block");
        document.querySelector(".cr-post-form-container.edit").classList.add("d-none");
        document.querySelector(".cr-post-form-container.preview").classList.remove("d-none");
        document.querySelector(".cr-post-form-container.edit").classList.remove("d-block");
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
    };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
    getPostCategories,
    getTagQuickQueryResult,
    createAPost,

}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreatePost));

