import React from "react";
import { Link } from 'react-router-dom';
//utils
//styles
import "./Header.scss";
import "components/styles/Button.scss";

//components
import Tag from "components/post/Tag";
import store from 'redux/store/index'
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from 'redux';
import { getPostByID } from 'redux/services/postServices'

class QuickSearchResult extends React.PureComponent {

    render() {
        if (this.props.quickSearchResultData.postQuickSearchResults.length > 0 ||
            this.props.quickSearchResultData.docQuickSearchResults.length > 0 ||
            this.props.quickSearchResultData.tagQuickSearchResults.length > 0)
            this.quickSearchResultView = <div>
                {this.props.quickSearchResultData.tagQuickSearchResults.length > 0 ?
                    <div className='w-100-percents' id="quick-search-post-result-port">
                        <div className="qs-type-title">BÀI VIẾT</div>
                        {this.props.quickSearchResultData.postQuickSearchResults.map(result =>

                            <Link to={`/post-content/${result.id}`} onClick={() => {
                                if (window.location.pathname.substring(0, 13) === "/post-content") {
                                    this.props.getPostByID(result.id)
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
                            <Link to={`/document-content/${result.id}`}>
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
                                    <Tag isReadOnly={true} tag={{ "id": result.id, "content": result.content }} />
                                </div>
                            )
                            }
                        </div>
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
    getPostByID
}, dispatch);

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(QuickSearchResult)
);