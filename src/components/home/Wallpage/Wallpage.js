import React from 'react';
import './Wallpage.scss'

import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { getHighlightPostsList } from 'redux/services/homeServices'

import Loader from 'components/common/Loader/Loader'

import WallpageItem from './WallpageItem'

class Wallpage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            slider: ["first", "second", "third", "fourth", "fifth"],
            activeIndex: 1,
            left: 0
        }

        this.normalMenuItemList = [
            { id: 3, name: "Report" },
        ]
    }

    componentDidMount() {
        this.props.getHighlightPostsList()
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
            width: 1000,
            height: 250
        };

        let highlightView = <></>;
        if (!this.props.isLoading) {
            highlightView = this.props.highlightPosts.map(postItem =>
                <WallpageItem
                    key={postItem.id}
                    id={postItem.id}
                    authorName={postItem.authorName}
                    authorID={postItem.authorID}
                    publishDtm={postItem.publishDtm}
                    categoryName={postItem.categoryName}
                    categoryID={postItem.categoryID}
                    title={postItem.title}
                    summary={postItem.summary}
                    imageURL={postItem.imageURL}
                    likeStatus={postItem.likeStatus}
                    savedStatus={postItem.savedStatus}
                    readingTime={postItem.readingTime}
                    likeCount={postItem.likeCount}
                    commentCount={postItem.commentCount}
                />
            )
        }
        else highlightView = < Loader />;

        return (
            <div className='i-h-slider-wrapper' >
                <div className="i-h-slider">
                    {/* Show sliders */}
                    <div className="d-flex">
                        <div className='buttons-container'>
                            <div className="prev-button" onClick={this.prevSlide}></div>
                        </div>
                        <div className="slider-wrapper">
                            <ul className="slider">
                                {this.state.slider.map(function (item, index) {
                                    return (<li style={style} className={index + 1 === this.state.activeIndex ? 'slider-item' : 'hide'}>
                                        {highlightView}
                                    </li>)
                                }, this)
                                }
                            </ul>
                        </div>
                        <div className="buttons-container">
                            <div className="next-button" onClick={this.nextSlide}></div>
                        </div>
                    </div>

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
                </div>
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
    getHighlightPostsList
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Wallpage));

