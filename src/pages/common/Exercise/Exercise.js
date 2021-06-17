import React from 'react'

import 'components/styles/Metadata.scss'
import 'components/styles/Detail.scss'
import ExerciseInfo from 'components/course/ExerciseInfo'
import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Tag from 'components/post/Tag'
import Loader from 'components/common/Loader/Loader'
import store from 'redux/store/index.js';
import ExerciseSidebar from 'components/course/ExcerciseSidebar'
import 'components/common/CustomCKE/CKEditorContent.scss';
import { getExerciseById } from 'redux/services/courseServices'
import RelativePosts from 'components/post/RelativePosts'
import { formatMathemicalFormulas, styleCodeSnippet } from 'components/common/CustomCKE/CKEditorUtils';
import DocPostDetailLoader from 'components/common/Loader/DocPostDetailLoader'

class PostDetail extends React.Component {
    componentDidMount() {
        this.props.getExerciseById(this.props.match.params.id);
    }

    componentWillUnmount() {

    }

    render() {

        return (
            <div className="left-sidebar-layout exercise">
                <ExerciseSidebar />
                <div className="d-flex">
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
                                />

                                {/* content here */}
                                <div className="ck-editor-output" dangerouslySetInnerHTML={{
                                    __html:
                                        this.props.exerciseContent.description
                                }} />
                                {this.props.exerciseContent.tags &&
                                    <div className="mg-top-10px mg-bottom-10px" >
                                        {this.props.exerciseContent.tags && this.props.exerciseContent.tags.map(item =>
                                            <Tag isReadOnly={true} key={item.id} clickable tag={item} />
                                        )}
                                    </div>}
                                {/* <div>
                                            <PostNormalReactionbar
                                                useAction={true}
                                                availableActions={this.props.exerciseContent.availableActions}
                                                postId={this.props.exerciseContent.id}
                                                likeCount={this.props.exerciseContent.likeCount}
                                                commentCount={this.props.postStatistic.commentCount}
                                                likedStatus={this.props.exerciseContent.likeStatus}
                                                savedStatus={this.props.exerciseContent.savedStatus}
                                                viewCount={this.props.exerciseContent.viewCount}
                                            />
                                        </div> */}
                                {formatMathemicalFormulas()}
                                {styleCodeSnippet()}
                            </div>
                            : <div><DocPostDetailLoader />
                            </div>
                        }
                    </div>
                    <div>
                        <div className="fake-relative-sidebar exercise"></div>
                        <div style={{ position: "fixed" }}>
                            {/* {this.props.isSameAuthorLoadDone && this.props.sameAuthor ? */}
                            <RelativePosts title={"TÀI LIỆU LIÊN QUAN"} items={
                                [{ id: 1, title: "Bài 1" }]} />
                            {/* // : <Loader />} */}
                            {/* {this.props.isSameCategoryLoadDone && this.props.sameCategory ? */}
                            < RelativePosts title={"BÀI VIẾT LIÊN QUAN"}
                                items={[{ id: 1, title: "Bài 1" }]} />
                            {/* : <Loader /> */}
                            {/*} */}
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
        exerciseContent: state.course.exercise.data,
        isExerciseLoading: state.course.exercise.isLoading,
    };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
    getExerciseById
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostDetail));