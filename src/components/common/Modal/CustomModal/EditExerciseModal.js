import React from "react";
import '../Modal.scss'
import 'components/styles/Button.scss'
import { closeBigModal, closeModal, openModal } from "redux/services/modalServices";
import store from 'redux/store/index.js'
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { getSubjectsList } from "redux/services/subjectServices";
import { getExerciseCategories } from "redux/services/exerciseCategoryServices";
import { getTagQuickQueryResult } from "redux/services/tagServices"
import {
    getAnExerciseInfoByIDForEdit,
    getAnExerciseInfoByID,
    editAnExerciseInfo
} from "redux/services/courseServices"
import { put_EditAnExerciseInfoReset } from "redux/actions/courseAction"

import {
    get_tagQuickQueryResultRequest,
    get_tagQuickQueryResultReset
} from "redux/actions/tagAction"
import { DELAY_TIME } from 'constants.js'
import "components/common/CustomCKE/CKEditorContent.scss";
import 'components/styles/Detail.scss'

//components
import Tag from "components/course/Tag";
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
import { request } from "utils/requestUtils";

const validationCondition = {
    form: '#edit-exercise-form',
    rules: [
        //truyen vao id, loai component, message
        validation.isRequired('ed-exercise-title', 'text-input', 'Tên bài tập không được để trống!'),
        validation.noSpecialChar('ed-exercise-title', 'text-input', 'Tên bài tập không được chứa ký tự đặc biệt!'),
        validation.isRequired('ed-exercise-category-combobox', 'combobox', 'Danh mục không được để trống'),
        validation.isRequired('ed-exercise-cke', 'ckeditor', 'Nội dung bài tập không được để trống'),
        validation.isRequired('ed-exercise-subject-combobox', 'combobox', 'Môn học không được để trống')
    ],
}

class EditExerciseModal extends React.Component {
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
            currentSubject: "",
            publishDtm: "",

            isUploading: false,
            isSearchingTag: false,

            EXERCISE_DTO: {
                tags: [],
                title: '',//
                description: ``,
                categoryID: "",
                topicID: "",
                rank: -1,
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
        this.props.getExerciseCategories();
        this.props.getSubjectsList();

        this.props.getAnExerciseInfoByIDForEdit(this.props.id);
        this.isFirstLoad = false;

        this.timeOut = null;
        this.isInstanceReady = false;

    }

    componentWillUnmount() {
        //reset global state isLoadDone of tagSearchQuickQuerry 
        store.dispatch(get_tagQuickQueryResultReset());
        store.dispatch(put_EditAnExerciseInfoReset());
        this.props.getAnExerciseInfoByID(this.props.id);
        if (getCKEInstance('ed-exercise-cke'))
            getCKEInstance('ed-exercise-cke').destroy();
    }

    onCategoryOptionChanged = (selectedOption) => {
        this.setState({
            EXERCISE_DTO: { ...this.state.EXERCISE_DTO, categoryID: selectedOption.id },
            currentCategory: selectedOption.name
        })
    }

    onSubjectOptionChanged = (selectedOption) => {
        //get list of topic
        request.get(`/exercises/topics?subject=${selectedOption.id}`).then(response => {
            this.topicsList = response.data;
            this.setState({});
        });

        this.setState({
            EXERCISE_DTO: { ...this.state.EXERCISE_DTO, subjectID: selectedOption.id },

            //for preview
            currentSubject: selectedOption.name
        })
    }

    onTopicOptionChanged = (selectedOption) => {
        //get list of topic
        this.setState({
            EXERCISE_DTO: { ...this.state.EXERCISE_DTO, topicID: selectedOption.id },
            currentTopic: selectedOption.name
        })
    }

    handleUploadBtnClick = () => {



        if (styleFormSubmit(validationCondition)) {
            openModal("confirmation",
                {
                    title: "Cập nhật bài tập",
                    text: "Hành động này cần phê duyệt và không thể hoàn tác.",
                    confirmText: "Xác nhận",
                    cancelText: "Huỷ",
                    onConfirm: () => {
                        this.props.editAnExerciseInfo(this.props.id,
                            {
                                ...this.EDIT_EXERCISE_DTO,
                                title: this.state.EXERCISE_DTO.title,
                                description: this.state.EXERCISE_DTO.description,
                                "categoryID": this.state.EXERCISE_DTO.categoryID,
                                "topicID": this.state.EXERCISE_DTO.topicID,
                                "tags": this.state.EXERCISE_DTO.tags
                            }

                        );
                        closeModal(); //close confimation popup
                        this.closeModal(); //close edit exercise popup
                    }
                })
        }
    }

    //#region  tag region
    closeQuickSearchTag = () => {
        document.getElementById("ed-exercise-qs-tag-result-container").classList.add('hidden');
        document.getElementById("ed-exercise-qs-tag-result-container").classList.remove('show');
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

        document.getElementById("ed-exercise-qs-tag-result-container").classList.add('show');
        document.getElementById("ed-exercise-qs-tag-result-container").classList.remove('hidden');
    }

    onCKEInstanceReady = () => {
        this.isInstanceReady = true;
        this.setState({})
    }

    keyHandler = (e) => {
        if (!e.target.value) return;
        let tags = this.state.EXERCISE_DTO.tags;
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
                document.getElementById("ed-exercise-qs-tag-result-container").classList.add('hidden');
                document.getElementById("ed-exercise-qs-tag-result-container").classList.remove('show');

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
                    EXERCISE_DTO: {
                        ...this.state.EXERCISE_DTO,
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

        let tmpTagDTO = this.state.EXERCISE_DTO.tags;
        tmpTagDTO.push({ id: tag.id });

        //cap nhat lai shownTag theo tmpDTO
        let tmpShownTag = this.shownTag;
        for (let i = 0; i < tmpShownTag.length; i++) {
            if (tmpShownTag[i].content === '' && tmpShownTag[i].id === '') {
                tmpShownTag[i].content = tag.content; tmpShownTag[i].id = tag.id; break;
            }
        }

        //cap nhat lai shown tag tu state
        document.getElementById("ed-exercise-qs-tag-result-container").classList.add('hidden');
        document.getElementById("ed-exercise-qs-tag-result-container").classList.remove('show');

        this.setState({
            EXERCISE_DTO: {
                ...this.state.EXERCISE_DTO,
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
            EXERCISE_DTO: {
                ...this.state.EXERCISE_DTO,
                tags: tempTagDTO,
            }
        });
        this.forceUpdate();
    }

    //#endregion

    handleEditorChange = (value) => {
        this.setState({ EXERCISE_DTO: { ...this.state.EXERCISE_DTO, description: value } });
    };

    handleTitleChange = (e) => {
        this.setState({
            EXERCISE_DTO: { ...this.state.EXERCISE_DTO, title: e.target.value }
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
            document.getElementById("ed-exercise-tag-container-tip-label").innerText = "";
        }

        else
            if (this.props.isTagQuickQueryLoadDone) {
                if (this.state.isSearchingTag) {
                    this.setState({ isSearchingTag: false })
                }
                if (this.props.tagQuickQueryResult && !this.isCategoryLoading) {

                    //truong hop khong co tag nao thoa man va chua du 5 tag
                    if (this.state.EXERCISE_DTO.tags.length < 5) {
                        if (this.props.tagQuickQueryResult.length === 0)
                            document.getElementById("ed-exercise-tag-container-tip-label").innerText = "Không có kết quả tìm kiếm phù hợp! Bấm Enter để thêm tag mới."
                        else
                            document.getElementById("ed-exercise-tag-container-tip-label").innerText = "Chọn tag phù hợp, hoặc bấm enter để thêm tag!";
                    }
                    else {
                        document.getElementById("ed-exercise-tag-container-tip-label").innerText = "Không thể nhập quá 5 tag."
                    }
                    this.tagSearchResult = <div>
                        <div className="d-flex">
                            {this.props.tagQuickQueryResult.map(tag => {
                                return <div className="tag-search-item"
                                    onClick={() => { this.state.EXERCISE_DTO.tags.length < 5 && this.onTagSearchResultClick(tag) }}>
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
        if (!this.props.isCurrentExerciseLoading
            && Object.keys(this.props.currentExercise).length > 0
            && !this.isFirstLoad
            && this.isInstanceReady) {

            this.isFirstLoad = true;
            this.props.currentExercise.tags.forEach((item, index) => {
                this.shownTag[index].id = item.id;
                this.shownTag[index].content = item.content;
            })

            getCKEInstance('ed-exercise-cke').setData(this.props.currentExercise.description)
            console.log(this.props.currentExercise)
            this.setState({
                EXERCISE_DTO: {
                    title: this.props.currentExercise.title,
                    tags: this.props.currentExercise.tags ? this.props.currentExercise.tags : [],
                    description: this.props.currentExercise.description,
                    imageURL: this.props.currentExercise.imageURL,
                    categoryID: this.props.currentExercise.categoryID,
                    categoryName: this.props.currentExercise.categoryName,
                    authorDisplayName: this.props.currentExercise.authorDisplayName,
                    authorID: this.props.currentExercise.authorID,
                    authorAvatarURL: this.props.currentExercise.authorAvatarURL,
                    id: this.props.currentExercise.id,
                    subjectID: this.props.currentExercise.subjectID,
                    subjectName: this.props.currentExercise.subject,
                    topicID: this.props.currentExercise.topicID,
                },

            });

            this.EDIT_EXERCISE_DTO = {
                categoryID: this.props.currentExercise.categoryID,
                subjectID: this.props.currentExercise.subjectID,
                topicID: this.props.currentExercise.topicID,
                title: this.props.currentExercise.title,
                description: this.props.currentExercise.description,
                imageURL: this.props.currentExercise.imageURL,
                publishDtm: "2021-07-08T00:24:38.794Z",
                tags: this.props.currentExercise.tags
            }

            request.get(`/exercises/topics?subject=${this.props.currentExercise.subjectID}`).then(response => {
                this.topicsList = response.data;
                this.setState({});
            });

        }

        //load xong thi cho hien thi body
        if (this.props.postDetailForEdit && !this.props.isCurrentExerciseLoading && document.getElementById('edit-post-body')) {
            document.getElementById('edit-exercise-body').classList.add("d-block");
            document.getElementById('edit-exercise-body').classList.remove("d-none");
        }

        return (
            <div>
                <div className="modal-overlay-shadow" />
                <div className="modal-fixed-layout">
                    <div className="modal-wrapper big o-f-hidden pd-top-5px">
                        <ModalTitlebar title="CHỈNH SỬA BÀI TẬP" />
                        <div className="scroller-container mg-bottom-10px">
                            <div className="form-container">
                                <div id="edit-exercise-body">
                                    {/* Edit region */}
                                    <div className="ed-exercise-form-container edit">
                                        <div id="edit-exercise-form" className="form-container" onSubmit={this.handleUpload} tabIndex="1">
                                            <div className="mg-top-10px" />

                                            <div className="form-group">
                                                <label className="form-label-required">Tiêu đề:</label>
                                                <input className="text-input" id="ed-exercise-title"
                                                    placeholder="Nhập tiêu đề bài tập"
                                                    onChange={e => this.handleTitleChange(e)}
                                                    type="text" defaultValue={
                                                        !this.props.isCurrentExerciseLoading ? this.state.EXERCISE_DTO.title : ''} ></input>
                                                <div className="form-error-label-container">
                                                    <span className="form-error-label" ></span>
                                                </div>
                                            </div>

                                            {/* CKEditor */}
                                            <div className="form-group">
                                                <div className="form-label-required">Mô tả bài tập:</div>
                                                <Editor
                                                    editorId="ed-exercise-cke"
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

                                            {/* Subject */}
                                            <div className="form-group" >
                                                <label className="form-label-required">Môn học:</label>
                                                <Combobox comboboxId="ed-exercise-subject-combobox"
                                                    selectedOptionID={!this.props.isCurrentExerciseLoading && !this.props.isSubjectLoading ? this.state.EXERCISE_DTO.subjectID : 0}
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

                                            {/* Topic */}
                                            <div className="form-group" >
                                                <label className="form-label-required">Chủ đề:</label>
                                                <Combobox comboboxId="ed-exercise-topic-combobox"
                                                    selectedOptionID={!this.props.isCurrentExerciseLoading && this.props.topicsList && this.state.EXERCISE_DTO.topicID ? this.state.EXERCISE_DTO.topicID : 0}
                                                    options={this.topicsList}
                                                    onOptionChanged={(selectedOption) => this.onTopicOptionChanged(selectedOption)}
                                                    placeHolder="Chọn chủ đề"
                                                    validation
                                                >
                                                </Combobox>
                                                <div className="form-error-label-container">
                                                    <span className="form-error-label" ></span>
                                                </div>
                                            </div >

                                            {/* Category */}
                                            <div className="form-group" >
                                                <label className="form-label-required">Danh mục:</label>
                                                <Combobox comboboxId="ed-exercise-category-combobox"
                                                    selectedOptionID={!this.props.isCurrentExerciseLoading && !this.props.isCategoryLoading ? this.state.EXERCISE_DTO.categoryID : 0}
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
                                            <div className='form-group mg-bottom-10px'>
                                                <label className="form-label">Tags:</label>

                                                <input onChange={(e) => this.quickSearchTags(e)} id="ed-exercise-tag-input"
                                                    onKeyPress={(this.state.EXERCISE_DTO.tags.length < 5) && this.keyHandler}
                                                    className="text-input"
                                                    placeholder="Nhập tag " />

                                                <ClickAwayListener onClickAway={() => this.closeQuickSearchTag()}>
                                                    {/* khi load xong thi ntn */}
                                                    <div id="ed-exercise-qs-tag-result-container" className="text-input-dropdown-container hidden">
                                                        <div className="text-input-dropdown">
                                                            {this.tagSearchResult}
                                                            <div className="form-tip-label" id="ed-exercise-tag-container-tip-label" />
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

                                            </div>

                                            {/* Button */}
                                            <div className="form-group j-c-end pd-bottom-10px">
                                                <button className="blue-button form-submit-btn" onClick={() => this.handleUploadBtnClick()}>Lưu</button>
                                                <button className="white-button form-submit-btn mg-left-10px" onClick={() => this.closeModal()}>Huỷ</button>
                                            </div>
                                        </div >
                                    </div >
                                </div >
                                {(this.props.isCurrentExerciseLoading || !this.props.currentExercise) ?
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
        categories: state.exerciseCategory.categories.data,
        isCategoryLoading: state.exerciseCategory.categories.isLoading,

        subjects: state.subject.subjects.data,
        isSubjectLoading: state.subject.subjects.isLoading,

        isCurrentExerciseLoading: state.course.currentExerciseForEdit.isLoading,
        currentExercise: state.course.currentExerciseForEdit.data,
        isCurrentExerciseLoadDone: state.course.currentExerciseForEdit.isLoadDone,

        tagQuickQueryResult: state.tag.tagQuickQueryResult.data,
        isTagQuickQueryLoading: state.tag.tagQuickQueryResult.isLoading,
        isTagQuickQueryLoadDone: state.tag.tagQuickQueryResult.isLoadDone,
    };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
    getExerciseCategories,
    getSubjectsList,
    getTagQuickQueryResult,
    getAnExerciseInfoByIDForEdit,
    getAnExerciseInfoByID,
    editAnExerciseInfo

}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditExerciseModal));
