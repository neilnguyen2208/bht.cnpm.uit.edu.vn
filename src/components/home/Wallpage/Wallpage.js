import React from 'react';
import './Wallpage.scss'

import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { getHighlightPosts } from 'redux/services/homeServices';
import { openBLModal } from 'redux/services/modalServices';
import { delete_HighlightAPostReset, get_HighlightPostsRequest, stick_APostToTopReset } from 'redux/actions/homeAction';
import WallpageItem from './WallpageItem'
import highlight_icon from 'assets/icons/48x48/highlights_icon_48x48.png'
import store from 'redux/store/index';
import done_icon from 'assets/icons/24x24/done_icon_24x24.png';
import Loader from 'components/common/Loader/Loader_T';

class Wallpage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            slider: [],
            activeIndex: 1,
            left: 0
        }


    }

    componentDidMount() {
        this.props.getHighlightPosts();
    }

    prevSlide = () => {
        this.setState({
            activeIndex: this.state.activeIndex - 1,
            left: this.state.left + 1000 // this.props.sliderWidth not working for some reason
        })
        if (this.state.activeIndex === 1) {
            this.setState({
                activeIndex: this.state.activeIndex + this.props.highlightPosts.length - 1,
                left: this.state.left - this.props.sliderWidth * (this.props.highlightPosts.length - 1)
            })
        }
    }

    nextSlide = () => {
        this.setState({
            activeIndex: this.state.activeIndex + 1,
            left: this.state.left - this.props.sliderWidth
        })
        if (this.state.activeIndex === this.props.highlightPosts.length) {
            this.setState({
                activeIndex: this.state.activeIndex - this.props.highlightPosts.length + 1,
                left: 0
            })
        }
    }

    clickIndicator = (e) => {
        this.setState({
            activeIndex: parseInt(e.target.textContent),
            left: this.props.sliderWidth - parseInt(e.target.textContent) * this.props.sliderWidth
        })
    }

    reloadList = () => {
        this.props.getHighlightPosts();
        this.setState({});
    }

    componentWillUnmount() { store.dispatch(get_HighlightPostsRequest()) }

    render() {

        if (this.props.isHaveUnHighlighted) {
            this.reloadList();
            if (this.state.activeIndex === this.props.highlightPosts.length)
                this.prevSlide();
            openBLModal({ type: "success", text: "Đã huỷ ghim bài viết!" });
            store.dispatch(delete_HighlightAPostReset())
        }

        console.log(this.props.isHaveStickedToTop);
        if (
            this.props.isHaveStickedToTop) {


            this.reloadList();
            store.dispatch(stick_APostToTopReset())
            this.setState({
                activeIndex: 1,
                left: 0
            })
        }

        var style = {
            left: this.state.left,
        };

        if (this.props.highlightPosts && this.props.highlightPosts.length === 0) return <></>;

        return (
            <div className='i-h-slider-wrapper' >
                {/* Show sliders */}
                <div className="d-flex">
                    <div className="slider-wrapper">
                        {this.props.highlightPosts ?
                            <ul className="slider" style={{
                                width: `${this.props.highlightPosts.length * 1000}px`
                            }}
                            >
                                {
                                    this.props.highlightPosts.map(function (item, index) {
                                        return (<li key={index} style={style} className={index + 1 === this.state.activeIndex ? 'slider-item' : 'hide'}>
                                            <WallpageItem
                                                key={item.id}
                                                id={item.id}
                                                authorName={item.authorName}
                                                authorID={item.authorID}
                                                publishDtm={item.publishDtm}
                                                categoryName={item.categoryName}
                                                categoryID={item.categoryID}
                                                title={item.title}
                                                summary={item.summary}
                                                imageURL={item.imageURL}
                                                likeStatus={item.likeStatus}
                                                savedStatus={item.savedStatus}
                                                readingTime={item.readingTime}
                                                likeCount={item.likeCount}
                                                commentCount={item.commentCount}
                                                authorAvatarURL={item.authorAvatarURL}
                                            />

                                        </li>)
                                    }, this)
                                }
                            </ul>
                            : <Loader />}
                    </div>
                    <div className="pos-absolute" >
                        <div className="highlight-title" >
                            <img className="hightlight-icon" src={highlight_icon} alt="*" />
                                             HIGHLIGHTS
                                </div>
                    </div>
                </div>

                <div className="j-c-end">
                    <div className="indicators-wrapper">
                        <ul className="indicators">
                            {this.props.highlightPosts ? this.props.highlightPosts.map(function (item, index) {
                                return (
                                    <li className={index + 1 === this.state.activeIndex ? 'active-indicator' : ''} onClick={this.clickIndicator}>{index + 1}</li>
                                )
                            }, this)
                                :
                                <></>}
                        </ul>
                    </div>
                    <div className='btn-container'>
                        <div className="prev-button" onClick={this.prevSlide}></div>
                    </div>
                    <div className="btn-container">
                        <div className="next-button" onClick={this.nextSlide}></div>
                    </div>
                </div>
                <div className="mg-top-5px mg-bottom-10px" />
            </div>
        );
    }
}

const mapStateToProps = (state) => {

    return {
        highlightPosts: state.home.highlightPosts.data,
        isLoadDone: state.home.highlightPosts.isLoadDone,
        isHaveHighlighted: state.home.highlightPosts.isHaveHighlighted,
        isHaveUnHighlighted: state.home.highlightPosts.isHaveUnHighlighted,
        isHaveStickedToTop: state.home.highlightPosts.isHaveStickedToTop
    };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
    getHighlightPosts
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Wallpage));

