import React, { Component } from 'react';
import 'components/common/Button/Button.scss'

import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import './Comment.scss'
//Set text props for this component
class Comment extends Component {
    constructor(props) {
        super(props);

    }
    componentDidMount() { }
    render() {
        return (

            <div class="comments-container">
                <ul id="comments-list" class="comments-list">
                    <li>
                        <div class="comment-main-level">
                            <div class="comment-avatar"><img src="http://i9.photobucket.com/albums/a88/creaticode/avatar_1_zps8e1c80cd.jpg" alt="" /></div>
                            <div class="comment-box">
                                <div class="comment-head">
                                    <h6 class="comment-name by-author"><a href="">Nguyễn Văn Đông</a></h6>
                                </div>
                                <div class="comment-content">
                                    Mọi người thấy bài viết này như thế nào?                                           </div>
                            </div>
                        </div>

                        <ul class="comments-list reply-list">
                            <li>
                                <div class="comment-avatar"><img src="http://i9.photobucket.com/albums/a88/creaticode/avatar_2_zps7de12f8b.jpg" alt="" /></div>
                                <div class="comment-box">
                                    <div class="comment-head">
                                        <h6 class="comment-name"><a href="">Lưu Biêu Nghị</a></h6>

                                    </div>
                                    <div class="comment-content">
                                        Hay nhưng mà nên có bản dịch nữa bạn, chưa ghi nguồn.
                        </div>
                                </div>
                            </li>

                            <li>
                                <div class="comment-avatar"><img src="http://i9.photobucket.com/albums/a88/creaticode/avatar_1_zps8e1c80cd.jpg" alt="" /></div>
                                <div class="comment-box">
                                    <div class="comment-head">
                                        <h6 class="comment-name by-author"><a href="">Nguyễn Văn Đông</a></h6>

                                    </div>
                                    <div class="comment-content">
                                        Ok, bạn
                                          </div>
                                </div>
                            </li>
                        </ul>
                    </li>

                    <li>
                        <div class="comment-main-level">
                            <div class="comment-avatar"><img src="http://i9.photobucket.com/albums/a88/creaticode/avatar_2_zps7de12f8b.jpg" alt="" />

                            </div>
                            <div class="comment-box">
                                <div class="comment-head">
                                    <h6 class="comment-name"><a href="">Lưu Biêu Nghị</a></h6>
                                </div>
                                <div class="comment-content">
                                    À, có một chỗ sai kìa bạn
                 </div>
                            </div>
                        </div>
                    </li>
                </ul>

            </div>



        )
    }


}

const mapStateToProps = (state) => {
    console.log(state);
    return {

    };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({

}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Comment));