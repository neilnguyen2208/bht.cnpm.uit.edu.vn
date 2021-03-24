import React from 'react';
import './Wallpage.scss'

import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { getHighlightPosts } from 'redux/services/homeServices'

import Loader from 'components/common/Loader/Loader'

import WallpageItem from './WallpageItem'
import highlight_icon from 'assets/icons/48x48/highlights_icon_48x48.png'
import { normalMenuItemList } from 'constants.js'
class Wallpage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            slider: [],
            activeIndex: 1,
            left: 0
        }

        this.isLoadDone = false;

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
                activeIndex: this.state.activeIndex + this.state.slider.length - 1,
                left: this.state.left - this.props.sliderWidth * (this.state.slider.length - 1)
            })
        }
    }

    nextSlide = () => {
        this.setState({
            activeIndex: this.state.activeIndex + 1,
            left: this.state.left - this.props.sliderWidth
        })
        if (this.state.activeIndex === this.state.slider.length) {
            this.setState({
                activeIndex: this.state.activeIndex - this.state.slider.length + 1,
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

    render() {
        var style = {
            left: this.state.left,
        };

        if (!this.props.isLoading && this.props.highlightPosts.length !== 0 && !this.isLoadDone) {
            this.setState({
                slider: this.props.highlightPosts
            });

            this.isLoadDone = true;
        }

        return (
            <div className='i-h-slider-wrapper' >
                {/* Show sliders */}
                <div className="d-flex">
                    <div className="slider-wrapper">
                        <ul className="slider" style={this.props.highlightPosts ? { width: `${this.props.highlightPosts.length * 1000}px` } : { width: "4900px" }} >
                            {
                                this.state.slider.map(function (item, index) {
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
                            {this.state.slider.map(function (item, index) {
                                return (
                                    <li className={index + 1 === this.state.activeIndex ? 'active-indicator' : ''} onClick={this.clickIndicator}>{index + 1}</li>
                                )
                            }, this)
                            }
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
        isLoading: state.home.highlightPosts.isLoading
    };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
    getHighlightPosts
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Wallpage));

