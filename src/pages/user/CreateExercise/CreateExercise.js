import React from "react";

import { Redirect, withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { getPostCategories } from "redux/services/postCategoryServices";
import { getTagQuickQueryResult } from "redux/services/tagServices"
import { createAPost } from "redux/services/postServices"
import { get_tagQuickQueryResultRequest, get_tagQuickQueryResultReset } from "redux/actions/tagAction"
import { DELAY_TIME } from 'constants.js'
import "components/common/CustomCKE/CKEditorContent.scss";
import 'components/styles/Detail.scss'
import Tag from "components/post/Tag";
import Titlebar from 'components/common/Titlebar/Titlebar';
import Combobox from 'components/common/Combobox/Combobox';
import Editor from 'components/common/CustomCKE/CKEditor.js';
import { ClickAwayListener } from '@material-ui/core';
import { validation, styleFormSubmit } from 'utils/validationUtils'
import { today } from 'utils/miscUtils'
import store from 'redux/store/index'
import SmallLoader from 'components/common/Loader/Loader_S'
import { post_CreateAPostReset } from "redux/actions/postAction";
import { styleCodeSnippet } from 'components/common/CustomCKE/CKEditorUtils'
import { getCKEInstance } from 'components/common/CustomCKE/CKEditorUtils';
import { SimpleCKEToolbarConfiguration } from 'components/common/CustomCKE/CKEditorConfiguration'
import { getSubjectsList } from 'redux/services/subjectServices';
import { request } from "utils/requestUtils";

const validationCondition = {
    form: '#create-exercise-form',
    rules: [
        //truyen vao id, loai component, message
        validation.isRequired('cr-exercise-title', 'text-input', 'Tên bài tập không được để trống!'),
        // validation.noSpecialChar('cr-exercise-title', 'text-input', 'Tên bài tập không được chứa ký tự đặc biệt!'),
        validation.isRequired('cr-exercise-category-combobox', 'combobox', 'Danh mục không được để trống'),
        validation.isRequired('cr-exercise-cke', 'ckeditor', 'Nội dung bài tập không được để trống'),
        validation.isRequired('cr-exercise-imgurl', 'text-input', 'Link ảnh bìa không được để trống'),
    ],
}

class CreateExercise extends React.Component {
    constructor(props) {
        super(props);
        this.categoryList = [
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
        this.topicsList = [
            {
                id: 1,
                name: "Chọn chủ đề"
            }
        ];
        this.isNotifySuccessOpen = false;
        this.state = {
            currentCategory: "",
            publishDtm: today.getDateDMY(),

            isUploading: false,
            isPreview: false,
            isSearchingTag: false,

            CREATE_EXERCISE_DTO: {
                tags: [],
                title: "Nhan đề bài tập",//
                content: ``,
                summary: `null`,
                categoryID: "",
                imageURL: '',
                publishDtm: (new Date()).toISOString(),
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
        this.props.getSubjectsList();
        document.querySelector(".cr-exercise-form-container.edit").classList.remove("d-none");
        document.querySelector(".cr-exercise-form-container.edit").classList.add("d-block");

        this.timeOut = null;
        validation(validationCondition);
    }

    componentWillUnmount() {
        //reset global state isLoadDone of tagSearchQuickQuerry 
        store.dispatch(get_tagQuickQueryResultReset());
        store.dispatch(post_CreateAPostReset());
        if (getCKEInstance('cr-exercise-cke'))
            getCKEInstance('cr-exercise-cke').destroy();
    }

    onCategoryOptionChanged = (selectedOption) => {
        this.setState({
            CREATE_EXERCISE_DTO: { ...this.state.CREATE_EXERCISE_DTO, categoryID: selectedOption.id },
            currentCategory: selectedOption.name
        })
    }

    handleUploadBtnClick = () => {
        let dom = document.createElement("DIV");
        dom.innerHTML = this.state.CREATE_EXERCISE_DTO.content;
        let plain_text = (dom.textContent || dom.innerText);
        let tmpSummary = '';
        if (this.state.CREATE_EXERCISE_DTO.content.length < 160) {
            tmpSummary = plain_text;
        }
        else {
            tmpSummary = plain_text.substring(0, 160);
        }

        if (styleFormSubmit(validationCondition)) {
            this.props.createAPost({ ...this.state.CREATE_EXERCISE_DTO, summary: tmpSummary + "" }, this.imageFile);
        }
    }

    handleClosePopup = () => {
        this.setState({
            modalShow: false,
        });
    }

    //#region  tag region
    closeQuickSearchTag = () => {
        document.getElementById("cr-exercise-qs-tag-result-container").classList.add('hidden');
        document.getElementById("cr-exercise-qs-tag-result-container").classList.remove('show');
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

        document.getElementById("cr-exercise-qs-tag-result-container").classList.add('show');
        document.getElementById("cr-exercise-qs-tag-result-container").classList.remove('hidden');
    }

    keyHandler = (e) => {
        if (!e.target.value) return;
        let tags = this.state.CREATE_EXERCISE_DTO.tags;
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
                document.getElementById("cr-exercise-qs-tag-result-container").classList.add('hidden');
                document.getElementById("cr-exercise-qs-tag-result-container").classList.remove('show');

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
                    CREATE_EXERCISE_DTO: {
                        ...this.state.CREATE_EXERCISE_DTO,
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

        let tmpTagDTO = this.state.CREATE_EXERCISE_DTO.tags;
        tmpTagDTO.push({ id: tag.id });

        //cap nhat lai shownTag theo tmpDTO
        let tmpShownTag = this.shownTag;
        for (let i = 0; i < tmpShownTag.length; i++) {
            if (tmpShownTag[i].content === '' && tmpShownTag[i].id === '') {
                tmpShownTag[i].content = tag.content; tmpShownTag[i].id = tag.id; break;
            }
        }

        //cap nhat lai shown tag tu state
        document.getElementById("cr-exercise-qs-tag-result-container").classList.add('hidden');
        document.getElementById("cr-exercise-qs-tag-result-container").classList.remove('show');

        this.setState({
            CREATE_EXERCISE_DTO: {
                ...this.state.CREATE_EXERCISE_DTO,
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
            CREATE_EXERCISE_DTO: {
                ...this.state.CREATE_EXERCISE_DTO,
                tags: tempTagDTO,
            }
        });
        this.forceUpdate();
    }

    //#endregion

    handleEditorChange = (value) => {
        this.setState({ CREATE_EXERCISE_DTO: { ...this.state.CREATE_EXERCISE_DTO, content: value } });
        return;
    };

    handleDateChange = (data) => {
        console.log(data);
    }

    handleDateSelect = (data) => {
        console.log(data);
    }

    handleTitleChange = (e) => {
        this.setState({
            CREATE_EXERCISE_DTO: { ...this.state.CREATE_EXERCISE_DTO, title: e.target.value }
        })
    }

    onPublishTimeChange = (date) => {
        console.log(date)
        this.setState({
            CREATE_EXERCISE_DTO: { ...this.state.CREATE_EXERCISE_DTO, publishDtm: date }
        })
    }

    handleImageFileChange = (file) => {
        this.imageFile = file;
        // this.setState({
        //     CREATE_EXERCISE_DTO: { ...this.state.CREATE_EXERCISE_DTO }
        // })
    }

    onSubjectOptionChanged = (selectedOption) => {
        document.getElementById("cr-exercise-topic-combobox").classList.remove("d-none");
        //get list of topic
        request.get(`/exercises/topics?subject=${selectedOption.id}`).then(response => {
            this.topicsList = response.data;
            this.setState({});
        })
    }

    onTopicOptionChanged = (selectedOption) => {

    }

    render() {
        styleCodeSnippet();

        if (!this.props.isCategoryLoading && this.props.categories) {
            this.categoryList = this.props.categories;
        }

        if (!this.props.isSubjectLoading && this.props.subjects) {
            this.subjectsList = this.props.subjects;
        }

        this.tagSearchResult = <></>;
        if (this.props.isTagQuickQueryLoading) {
            this.tagSearchResult = <SmallLoader text="Đang tìm kiếm kết quả phù hợp" />;
            document.getElementById("cr-exercise-tag-container-tip-label").innerText = "";
        }

        else
            if (this.props.isTagQuickQueryLoadDone) {
                if (this.state.isSearchingTag) {
                    this.setState({ isSearchingTag: false })
                }
                if (this.props.tagQuickQueryResult && !this.isCategoryLoading) {

                    //truong hop khong co tag nao thoa man va chua du 5 tag
                    if (this.state.CREATE_EXERCISE_DTO.tags.length < 5) {
                        if (this.props.tagQuickQueryResult.length === 0)
                            document.getElementById("cr-exercise-tag-container-tip-label").innerText = "Không có kết quả tìm kiếm phù hợp! Bấm Enter để thêm tag mới."
                        else
                            document.getElementById("cr-exercise-tag-container-tip-label").innerText = "Chọn tag phù hợp, hoặc bấm enter để thêm tag!";
                    }
                    else {
                        document.getElementById("cr-exercise-tag-container-tip-label").innerText = "Không thể nhập quá 5 tag."
                    }
                    this.tagSearchResult = <div>
                        <div className="d-flex">
                            {this.props.tagQuickQueryResult.map(tag => {
                                return <div className="tag-search-item"
                                    onClick={() => { this.state.CREATE_EXERCISE_DTO.tags.length < 5 && this.onTagSearchResultClick(tag) }}>
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
                {/* <div className="cr-exercise-form-container post-detail-container preview" >

                    {this.props.userSummaryLoaded && this.props.userSummaryData ?
                        <Metadata title={this.state.CREATE_EXERCISE_DTO.title}
                            categoryName={this.state.currentCategory}
                            categoryID={this.state.CREATE_EXERCISE_DTO.categoryID}
                            readingTime={this.state.CREATE_EXERCISE_DTO.readingTime}
                            authorDisplayName={this.state.author.displayName}
                            authorAvatarURL={this.props.userSummaryData.avatarURL}
                            publishDtm={this.state.publishDtm}
                            type={detailType.preview}
                            imageURL={this.imageFile ? URL.createObjectURL(this.imageFile) : ''}
                            authorID={this.props.userSummaryData.id}
                        /> : <></>}

                    <div className="ck-editor-output" dangerouslySetInnerHTML={{
                        __html:
                            this.state.CREATE_EXERCISE_DTO.content
                    }} />

                    <div className="mg-top-10px mg-bottom-10px" >
                        {this.shownTag.map(item =>
                            <Tag isReadOnly={true} onDeleteTag={(item) => this.deleteTag(item)} clickable={false} tag={item} />
                        )}
                    </div>
                    <PostNormalReactionbar
                        postID={"-1"}
                        likeCount={0}
                        commentCount={0}
                        viewCount={0}
                        likedStatus={false}
                        savedStatus={false}
                        type="PREVIEW"
                    />

                    {formatMathemicalFormulas()}
                </div> */}

                {/* Edit region */}
                <div className="cr-exercise-form-container edit">
                    <div id="create-exercise-form" className="form-container" onSubmit={this.handleUpload} tabIndex="1">
                        <div className="mg-top-10px" />

                        <div className="form-group">
                            <label className="form-label-required">Tiêu đề:</label>
                            <input className="text-input" id="cr-exercise-title"
                                placeholder="Nhập tiêu đề bài tập " onChange={e => this.handleTitleChange(e)}
                                type="text" ></input>
                            <div className="form-error-label-container">
                                <span className="form-error-label" ></span>
                            </div>
                        </div>

                        {/* CKEditor */}
                        <div className="form-group">
                            <div className="form-label-required">Mô tả:</div>
                            <Editor
                                config={SimpleCKEToolbarConfiguration}
                                editorId="cr-exercise-description"
                                placeholder='Start typing here...'
                                onChange={this.handleEditorChange}
                                data="<p>Nhập nội dung bài tập ...</p>"
                                height={200}
                                autoGrow_maxHeight={300}
                                autoGrow_minHeight={200}
                                validation
                            />
                            <div className="form-error-label-container">
                                <span className="form-error-label" ></span>
                            </div>
                        </div>

                        {/* Subject */}
                        <div className="form-group" >
                            <label className="form-label-required">Môn học:</label>
                            <Combobox comboboxId="cr-exercise-subject-combobox"
                                options={this.subjectsList}
                                onOptionChanged={(selectedOption) => this.onSubjectOptionChanged(selectedOption)}
                                placeHolder="Chọn môn học"
                                validation>
                            </Combobox>
                            <div className="form-error-label-container">
                                <span className="form-error-label" ></span>
                            </div>
                        </div >

                        {/* Topic */}
                        <div className="form-group d-none" id="cr-exercise-topic-combobox" >
                            <label className="form-label-required">Chủ đề:</label>
                            <Combobox comboboxId="cr-exercise-topic-combobox"
                                options={this.topicsList}
                                onOptionChanged={(selectedOption) => this.onTopicOptionChanged(selectedOption)}
                                placeHolder="Chọn chủ đề"
                                validation>
                            </Combobox>
                            <div className="form-error-label-container">
                                <span className="form-error-label" ></span>
                            </div>
                        </div >

                        {/* Category */}
                        <div className="form-group" >
                            <label className="form-label-required">Danh mục:</label>
                            <Combobox comboboxId="cr-exercise-category-combobox"
                                options={this.categoryList}
                                onOptionChanged={(selectedOption) => this.onCategoryOptionChanged(selectedOption)}
                                placeHolder="Chọn danh mục"
                                validation>
                            </Combobox>
                            <div className="form-error-label-container">
                                <span className="form-error-label" ></span>
                            </div>
                        </div >


                        {/* Tag */}
                        <div className='form-group'>
                            <label className="form-label">Tags:</label>

                            <input onChange={(e) => this.quickSearchTags(e)} id="cr-exercise-tag-input"
                                onKeyPress={(this.state.CREATE_EXERCISE_DTO.tags.length < 5) && this.keyHandler}
                                className="text-input"
                                placeholder="Nhập tag " />

                            <ClickAwayListener onClickAway={() => this.closeQuickSearchTag()}>
                                {/* khi load xong thi ntn */}
                                <div id="cr-exercise-qs-tag-result-container" className="text-input-dropdown-container hidden">
                                    <div className="text-input-dropdown">
                                        {this.tagSearchResult}
                                        <div className="form-tip-label" id="cr-exercise-tag-container-tip-label" />
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
                        <div className="form-group d-flex">
                            <button className="blue-button mg-auto form-submit-btn" onClick={() => this.handleUploadBtnClick()}>Lưu</button>
                        </div>
                    </div >
                </div >
            </div >

        return (
            <div className="">
                <div className="content-layout">
                    <Titlebar title="TẠO BÀI TẬP MỚI" />
                    <div className="content-container">
                        <div className="form-container">
                            {/* <div className="j-c-end">
                                <div className="j-c-end" >
                                    <button className="blue-button" disabled={!this.state.isPreview} onClick={this.onEditBtnClick} >Soạn bài tập</button>
                                    <div className="mg-right-5px" />
                                    <button className="white-button" disabled={this.state.isPreview} onClick={this.onPreviewBtnClick} >Preview</button>
                                </div>
                            </div> */}
                            {/* <div className="mg-top-10px decoration-line" /> */}
                        </div>
                        {body}
                    </div>
                </div>

                {this.props.isHaveCreated ? <Redirect to="/user/my-posts" /> : <></>}
            </div>
        );
    }

    onEditBtnClick = () => {
        this.setState({ isPreview: !this.state.isPreview });
        document.querySelector(".cr-exercise-form-container.edit").classList.remove("d-none");
        document.querySelector(".cr-exercise-form-container.edit").classList.add("d-block");
    }

    onPreviewBtnClick = () => {
        this.setState({ isPreview: !this.state.isPreview });
        document.querySelector(".cr-exercise-form-container.edit").classList.add("d-none");
        document.querySelector(".cr-exercise-form-container.edit").classList.remove("d-block");
    }
}

const mapStateToProps = (state) => {
    return {
        categories: state.postCategory.categories.data,
        isCategoryLoading: state.postCategory.categories.isLoading,
        tagQuickQueryResult: state.tag.tagQuickQueryResult.data,
        isTagQuickQueryLoading: state.tag.tagQuickQueryResult.isLoading,

        //for redirect after create a post
        isHaveCreated: state.post.isHaveCreated,

        //sau nay su dung loading de tranh cac truong hop ma 2 bien isSearching va isLoadDone khong xu ly duoc
        isTagQuickQueryLoadDone: state.tag.tagQuickQueryResult.isLoadDone,
        userSummaryData: state.auth.currentUserSummary.data,
        userSummaryLoaded: state.auth.currentUserSummary.isLoadDone,

        subjects: state.documentSubject.subjects.data,
        isSubjectLoading: state.documentSubject.subjects.isLoading,

    };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
    getPostCategories,
    getTagQuickQueryResult,
    createAPost,
    getSubjectsList

}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateExercise));

