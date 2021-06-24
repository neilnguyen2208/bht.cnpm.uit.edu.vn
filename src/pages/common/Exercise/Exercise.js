import React from 'react'

import 'components/styles/Metadata.scss'
import 'components/styles/Detail.scss'
import ExerciseInfo from 'components/course/ExerciseInfo'
import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Tag from 'components/post/Tag'
import ExerciseSidebar from 'components/course/ExcerciseSidebar'
import 'components/common/CustomCKE/CKEditorContent.scss';
import { getExerciseById, getRelativePostsByExerciseId, getRelativeDocumentsByExerciseId } from 'redux/services/courseServices'
import RelativePosts from 'components/post/RelativePosts'
import { formatMathemicalFormulas, styleCodeSnippet } from 'components/common/CustomCKE/CKEditorUtils';
import DocPostDetailLoader from 'components/common/Loader/DocPostDetailLoader'
import ExerciseReactionbar from 'components/course/ExerciseReactionbar'

class PostDetail extends React.Component {
    componentDidMount() {
        this.props.getExerciseById(this.props.match.params.id);
        this.props.getRelativeDocumentsByExerciseId(this.props.match.params.id);
        this.props.getRelativePostsByExerciseId(this.props.match.params.id);
    }

    componentWillUnmount() {

    }

    render() {
        return (
            <div className="left-sidebar-layout exercise">
                <div className="j-c-space-between" style={{ width: "100%" }}>
                    <div className="d-flex">
                        <ExerciseSidebar />
                        <div className="exercise-detail-container" >
                            {!this.props.isLoading && this.props.exerciseContent ?
                                <div>
                                    <ExerciseInfo
                                        exerciseId={this.props.exerciseContent.id}
                                        title={this.props.exerciseContent.title}
                                        categoryName={this.props.exerciseContent.categoryName}
                                        categoryID={this.props.exerciseContent.categoryID}
                                        authorDisplayName={this.props.exerciseContent.authorDisplayName}
                                        authorAvatarURL={this.props.exerciseContent.authorAvatarURL}
                                        publishDtm={this.props.exerciseContent.publishDtm}
                                        availableActions={this.props.exerciseContent.availableActions}
                                        imageURL={this.props.exerciseContent.imageURL}
                                        authorID={this.props.exerciseContent.authorID}
                                        subjectName={this.props.exerciseContent.subjectName}
                                        totalQuestions={this.props.exerciseContent.totalQuestions}
                                        attemptCount={this.props.exerciseContent.attemptCount}

                                    />

                                    {/* content here */}
                                    <div className="ck-editor-output" dangerouslySetInnerHTML={{
                                        __html:
                                            this.props.exerciseContent.description
                                    }} />

                                    <div className="j-c-space-between" style={{ marginTop: "20px" }}>
                                        <div className="metadata-label" style={{ marginLeft: "2px" }}>
                                            Tổng số câu hỏi: {this.props.exerciseContent.totalQuestions} </div>
                                        <div className="metadata-label" style={{ marginLeft: "2px" }}>
                                            Tổng số lượt giải: {this.props.exerciseContent.attemptCount} </div>
                                    </div>
                                    {this.props.exerciseContent.tags &&
                                        <div className="mg-top-10px mg-bottom-10px" >
                                            {this.props.exerciseContent.tags && this.props.exerciseContent.tags.map(item =>
                                                <Tag isReadOnly={true} key={item.id} clickable tag={item} />
                                            )}
                                        </div>}
                                    <div>
                                        <ExerciseReactionbar
                                            exerciseId={this.props.match.params.id}
                                        />
                                    </div>
                                    {formatMathemicalFormulas()}
                                    {styleCodeSnippet()}
                                </div>
                                : <div><DocPostDetailLoader />
                                </div>
                            }
                        </div>
                    </div>
                    <div>
                        <div className="fake-relative-sidebar exercise"></div>
                        <div style={{ position: "fixed" }}>
                            {!this.props.isRelativePostsLoading && this.props.relativePosts &&
                                <RelativePosts title={"BÀI VIẾT LIÊN QUAN"} items={
                                    this.props.relativePosts} />
                            }
                            {!this.props.isRelativeDocumentsLoading && this.props.relativeDocuments &&
                                <RelativePosts title={"TÀI LIỆU LIÊN QUAN"} items={
                                    this.props.relativeDocuments} />
                            }
                        </div>
                    </div>
                </div>
                {formatMathemicalFormulas()}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        exerciseContent: state.course.currentExercise.data,
        isExerciseLoading: state.course.currentExercise.isLoading,
        relativePosts: state.course.relativePosts.data,
        isRelativePostsLoading: state.course.relativePosts.isLoading,
        relativeDocuments: state.course.relativeDocuments.data,
        isRelativeDocumentsLoading: state.course.relativeDocuments.isLoading,
    };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
    getExerciseById, getRelativePostsByExerciseId, getRelativeDocumentsByExerciseId
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostDetail));