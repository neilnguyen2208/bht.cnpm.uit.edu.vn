import React from "react";
import { Link } from 'react-router-dom';
//utils
//styles
import "./Header.scss";
import "components/styles/Button.scss";

//components
import Tag from "components/post/Tag";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from 'redux';
import { getAPostByID } from 'redux/services/postServices';
import { getADocumentByID } from 'redux/services/documentServices';
import { getAnExerciseInfoByID } from 'redux/services/courseServices';

class QuickSearchResult extends React.PureComponent {

    render() {
        if (this.props.quickSearchResultData.postQuickSearchResults.length > 0 ||
            this.props.quickSearchResultData.docQuickSearchResults.length > 0 ||
            this.props.quickSearchResultData.tagQuickSearchResults.length > 0 ||
            this.props.quickSearchResultData.exerciseQuickSearchResults.length > 0)
            this.quickSearchResultView = <div>
                {this.props.quickSearchResultData.postQuickSearchResults.length > 0 ?
                    <div className='w-100-percents' id="quick-search-post-result-port">
                        <div className="qs-type-title">BÀI VIẾT</div>
                        {this.props.quickSearchResultData.postQuickSearchResults.map(result =>
                            <Link to={`/post-content/${result.id}`} onClick={() => {
                                if (window.location.pathname.substring(0, 13) === "/post-content") {
                                    this.props.getAPostByID(result.id)
                                }
                            }}
                            >
                                <div className="d-flex qs-result-item">
                                    <img alt="" src={result.imageURL} className="qs-result-image mg-right-5px" />
                                    <div className="qsr-title">{result.title}</div>
                                </div>
                            </Link>
                        )
                        }
                    </div> : <></>
                }
                {this.props.quickSearchResultData.docQuickSearchResults.length > 0 ?
                    <div className='w-100-percents' id="quick-search-document-result-port">
                        <div className="qs-type-title">TÀI LIỆU</div>
                        {this.props.quickSearchResultData.docQuickSearchResults.map(result =>
                            <Link to={`/document-content/${result.id}`}
                                onClick={() => {
                                    if (window.location.pathname.substring(0, 17) === "/document-content") {
                                        this.props.getADocumentByID(result.id)
                                    }
                                }}
                            >
                                <div className="d-flex qs-result-item">
                                    <img alt="" src={result.imageURL} className="qs-result-image mg-right-5px" />
                                    <div className="qsr-title">{result.title}</div>
                                </div>
                            </Link>)
                        }
                    </div> : <></>
                }
                {this.props.quickSearchResultData.tagQuickSearchResults.length > 0 ?
                    <div className='w-100-percents' id="quick-search-tag-result-port">
                        <div className="qs-type-title mg-top-5px ">TAGS</div>
                        <div className="d-flex mg-top-5px">
                            {this.props.quickSearchResultData.tagQuickSearchResults.map(result =>
                                <div className="d-flex">
                                    <Tag isReadOnly={true} clickable tag={{ "id": result.id, "content": result.content }} />
                                </div>
                            )
                            }
                        </div>
                    </div> : <></>
                }
                {this.props.quickSearchResultData.exerciseQuickSearchResults.length > 0 ?
                    <div className='w-100-percents' id="quick-search-tag-result-port">
                        <div className="qs-type-title">BÀI TẬP</div>
                        {this.props.quickSearchResultData.exerciseQuickSearchResults.map(result =>
                            <Link to={`/courses/exercise/${result.id}`}
                                onClick={() => {
                                    if (window.location.pathname.substring(0, 17) === "/courses/exercise") {
                                        this.props.getAnExerciseInfoByID(result.id)
                                    }
                                }}
                            >
                                <div className="d-flex qs-result-item">
                                    <img alt="" src={result.imageURL} className="qs-result-image mg-right-5px" />
                                    <div className="qsr-title">{result.title}</div>
                                </div>
                            </Link>)
                        }
                    </div> : <></>
                }
            </div >
        else
            this.quickSearchResultView = <div className='form-tip-label'>Không có kết quả ...</div>;

        return this.quickSearchResultView;
    }
}

const mapStateToProps = (state) => {
    return {
    };
};

const mapDispatchToProps = (dispatch) => bindActionCreators({
    getAPostByID,
    getADocumentByID,
    getAnExerciseInfoByID,
}, dispatch);

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(QuickSearchResult)
);