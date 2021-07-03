import React from 'react';

import { bindActionCreators } from 'redux';
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";

import HomeFirstInfo from 'components/document/HomeFirstInfo';
import HomeTextInfo from 'components/document/HomeTextInfo';
import { request } from 'utils/requestUtils';
import { getCourseDetailById } from 'redux/services/courseServices';
import HomeInfo from 'components/document/HomeInfo';
class PostsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { allResult: [] }
        this.allResult = [];
        this.allRenderResult = <></>;
    }

    componentDidMount() {
        this.props.getCourseDetailById(this.props.match.params.id);

        //fake for trending
        this.renderByCategory();

    }

    renderByCategory = () => {

        this.allResult = [];
        request.get(`/documents/categories`).then((response) => {
            for (let i = 0; i < response.data.length; i++) {
                request.get(`/documents/searchFilter?searchTerm=&page=0&categoryID=${response.data[i].id}&subjectID=${this.props.match.params.id}`).then(response_1 => {
                    let result_1 = response_1.data;
                    let IDarr = '';
                    response_1.data.docSummaryDTOs.map(item => IDarr += item.id + ",") //tao ra mang id moi

                    request.get(`/documents/statistics?docIDs=${IDarr}`)
                        .then(response_2 => {
                            //merge summary array and statistic array
                            let finalResult = [];

                            for (let j = 0; j < result_1.docSummaryDTOs.length; j++) {
                                finalResult.push({
                                    ...result_1.docSummaryDTOs[j],
                                    ...(response_2.data.find((itmInner) => itmInner.id === result_1.docSummaryDTOs[j].id)),
                                });
                            }

                            console.log(finalResult);

                            this.allResult = [...this.allResult, { id: response.data[i].id, categoryName: response.data[i].name, documents: finalResult }];
                            this.setState({});
                        })
                })
            }
        })
    }

    renderGridThreeItems = (items) => {
        return <div className="d-flex">
            {/* //item 0 */}
            {items[0] && <div className="home-item-container  grid" style={{ marginRight: "10px" }} >
                <HomeFirstInfo
                    key={items[0].id}
                    id={items[0].id}
                    authorID={items[0].authorID}
                    authorDisplayName={items[0].authorDisplayName}
                    categoryID={items[0].categoryID}
                    categoryName={items[0].categoryName}
                    imageURL={items[0].imageURL}
                    publishDtm={items[0].publishDtm}
                    description={items[0].description}
                    title={items[0].title}
                    likeCount={items[0].likeCount}
                    dislikeCount={items[0].dislikeCount}
                    downloadCount={items[0].downloadCount}
                    viewCount={items[0].viewCount}
                    subjectName={items[0].subjectName}
                    subjectID={items[0].subjectID}
                />
            </div >
            }

            <div style={{ borderLeft: "1px solid var(--grayish)", paddingLeft: "10px" }} >
                {items[1] && < div className="home-item-container grid" style={{ paddingRight: "0px" }}  >
                    <HomeTextInfo
                        key={items[1].id}
                        id={items[1].id}
                        authorID={items[1].authorID}
                        authorDisplayName={items[1].authorDisplayName}
                        categoryID={items[1].categoryID}
                        categoryName={items[1].categoryName}
                        imageURL={items[1].imageURL}
                        publishDtm={items[1].publishDtm}
                        description={items[1].description}
                        title={items[1].title}
                        likeCount={items[1].likeCount}
                        dislikeCount={items[1].dislikeCount}
                        downloadCount={items[1].downloadCount}
                        viewCount={items[1].viewCount}
                        subjectName={items[1].subjectName}
                        subjectID={items[1].subjectID}
                    />
                </div >}

                {items[2] && < div className="home-item-container grid" key={items[2].id} style={{ marginTop: "20px", paddingRight: "0px" }}>
                    <HomeTextInfo
                        key={items[2].id}
                        id={items[2].id}
                        authorID={items[2].authorID}
                        authorDisplayName={items[2].authorDisplayName}
                        categoryID={items[2].categoryID}
                        categoryName={items[2].categoryName}
                        imageURL={items[2].imageURL}
                        publishDtm={items[2].publishDtm}
                        description={items[2].description}
                        title={items[2].title}
                        likeCount={items[2].likeCount}
                        dislikeCount={items[2].dislikeCount}
                        downloadCount={items[2].downloadCount}
                        viewCount={items[2].viewCount}
                        subjectName={items[2].subjectName}
                        subjectID={items[2].subjectID}
                    ></HomeTextInfo>
                </div >
                }
            </div >
        </div>
    }
    renderRowThreeItems = (items) => {
        return <div className="d-flex">
            {/* //item 0 */}
            {items[0] && <div className="home-item-container row"  >
                <HomeInfo
                    key={items[0].id}
                    id={items[0].id}
                    authorID={items[0].authorID}
                    authorDisplayName={items[0].authorDisplayName}
                    categoryID={items[0].categoryID}
                    categoryName={items[0].categoryName}
                    imageURL={items[0].imageURL}
                    publishDtm={items[0].publishDtm}
                    description={items[0].description}
                    title={items[0].title}
                    likeCount={items[0].likeCount}
                    dislikeCount={items[0].dislikeCount}
                    downloadCount={items[0].downloadCount}
                    viewCount={items[0].viewCount}
                    subjectName={items[0].subjectName}
                    subjectID={items[0].subjectID}
                ></HomeInfo>
            </div >}

            {items[1] && < div className="home-item-container row"  >
                <HomeInfo
                    key={items[1].id}
                    id={items[1].id}
                    authorID={items[1].authorID}
                    authorDisplayName={items[1].authorDisplayName}
                    categoryID={items[1].categoryID}
                    categoryName={items[1].categoryName}
                    imageURL={items[1].imageURL}
                    publishDtm={items[1].publishDtm}
                    description={items[1].description}
                    title={items[1].title}
                    likeCount={items[1].likeCount}
                    dislikeCount={items[1].dislikeCount}
                    downloadCount={items[1].downloadCount}
                    viewCount={items[1].viewCount}
                    subjectName={items[1].subjectName}
                    subjectID={items[1].subjectID}
                />
            </div >}

            {items[2] && < div className="home-item-container row" key={items[2].id} >
                <HomeInfo
                    key={items[2].id}
                    id={items[2].id}
                    authorID={items[2].authorID}
                    authorDisplayName={items[2].authorDisplayName}
                    categoryID={items[2].categoryID}
                    categoryName={items[2].categoryName}
                    imageURL={items[2].imageURL}
                    publishDtm={items[2].publishDtm}
                    description={items[2].description}
                    title={items[2].title}
                    likeCount={items[2].likeCount}
                    dislikeCount={items[2].dislikeCount}
                    downloadCount={items[2].downloadCount}
                    viewCount={items[2].viewCount}
                    subjectName={items[2].subjectName}
                    subjectID={items[2].subjectID}
                />
            </div >}
        </div >
    }

    render() {
        return (
            <div className="home-layout">
                <div className="mg-top-10px" />
                <div className="nm-bl-layout-router-outlet" >
                    <div className="posts-list-container">
                        {!this.props.isCourseDetailLoading && this.props.courseDetailData[0] &&
                            <div className="course-detail">
                                < div className="d-flex" >
                                    <img className="cover-image" src={this.props.courseDetailData[0].imageURL} alt="" />
                                    <div style={{ marginLeft: "10px" }}>
                                        <div className="title">
                                            {this.props.courseDetailData[0].name}
                                        </div>
                                        <div className="description">
                                            {this.props.courseDetailData[0].description}
                                        </div>
                                    </div>
                                </div >
                            </div >
                        }
                        <div className="home-layout">
                            <div className="posts-list-container">
                                {this.allResult.map((item, index) => {
                                    if (item.documents.length > 0)
                                        return <div>
                                            <div className="j-c-space-between" style={{ marginTop: "30px", borderBottom: "1px solid var(--gray)", paddingBottom: "5px" }}>
                                                <div className="part-title" style={{ textTransform: "uppercase" }} >
                                                    {item.categoryName}
                                                </div>
                                                <Link className="link-label-s" to={`/search/documents?category=${item.id}&page=1&subject=${this.props.match.params.id}&q=`}>
                                            Xem tất cả >>
                                                </Link>
                                            </div>

                                            <div style={{ marginTop: "10px" }}>
                                                {item.documents.length > 0 ?
                                                    <div>
                                                        {index % 2 === 0 && item.documents.length > 0 && this.renderGridThreeItems(item.documents)}
                                                        {index % 2 === 1 && item.documents.length > 0 && this.renderRowThreeItems(item.documents)}
                                                    </div>
                                                    :
                                                    <div className="j-c-space-between" style={{ marginTop: "30px", borderBottom: "1px solid var(--gray)", paddingBottom: "5px" }}>
                                                        Môn học này chưa có tài liệu nào
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                    return <></>;
                                })}
                            </div>
                        </div>
                    </div >
                </div >
            </div >
        );
    }
}

const mapStateToProps = (state) => {
    return {

        isCourseDetailLoading: state.course.courseDetailById.isLoading,
        courseDetailData: state.course.courseDetailById.data,

    };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
    getCourseDetailById
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostsList));
