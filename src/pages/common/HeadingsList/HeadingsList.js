/* eslint-disable react/jsx-pascal-case */
import React from 'react'
import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

//styles
import 'layouts/Layout.scss';
import './HeadingsList.scss';
//utils
import dropdownIcon from 'assets/icons/12x12/dropdown_12x12.png'

//services
import {  } from "redux/services/postServices";
import { getPostCategories } from "redux/services/postCategoryServices";

//components
import Titlebar from 'components/common/Titlebar/Titlebar';

class PostsList extends React.Component {
    constructor(props) {
        super();

        this.description = `Đại số tuyến tính là một ngành toán học nghiên cứu về không gian vectơ, hệ phương trình tuyến tính và các phép biến đổi tuyến tính giữa chúng.
        Bài toán cơ bản của đại số tuyến tính là tìm nghiệm x của phương trình ma trận sau:
        Ax = B`;
        this.title = "ĐẠI SỐ TUYẾN TÍNH";
        this.image = "https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png"
        this.headingsList = [
            {
                "id": 41,
                "name": "Some text",
                "parts": [
                    {
                        "id": 81,
                        "name": "some text",
                        "contents": [
                            {
                                "id": 94,
                                "name": "some text",
                                "typeID": 46
                            },
                            {
                                "id": 42,
                                "name": "some text",
                                "typeID": 7
                            }
                        ]
                    },
                    {
                        "id": 35,
                        "name": "some text",
                        "contents": [
                            {
                                "id": 9,
                                "name": "some text",
                                "typeID": 89
                            },
                            {
                                "id": 84,
                                "name": "some text",
                                "typeID": 13
                            }
                        ]
                    }
                ]
            },
            {
                "id": 11,
                "name": "some text",
                "parts": [
                    {
                        "id": 38,
                        "name": "some text",
                        "contents": [
                            {
                                "id": 96,
                                "name": "some text",
                                "typeID": 6
                            },
                            {
                                "id": 38,
                                "name": "some text",
                                "typeID": 54
                            }
                        ]
                    },
                    {
                        "id": 54,
                        "name": "some text",
                        "contents": [
                            {
                                "id": 3,
                                "name": "some text",
                                "typeID": 1
                            },
                            {
                                "id": 74,
                                "name": "some text",
                                "typeID": 59
                            }
                        ]
                    }
                ]
            }
        ]

    }

    componentDidMount() {
        //lay ID

        // fetch thong tin tu ID

    }


    render() {

        let headingsList = <></>;

        // if (this.props.postsList) {

        this.postsList = this.props.postsList;

        headingsList = this.headingsList.map((contentHeading, index) => {
            return <div className="heading-content-container">
                <div>
                    <div className="heading-content-title">
                        Nội dung {index}
                        <div className="two-dots">: </div>
                        <p>&nbsp;</p>

                        {contentHeading.name}
                    </div>
                    <div>
                        {contentHeading.parts.map(partHeading => {
                            return <div className="part-heading"></div>
                        })}
                    </div>
                </div>
                <div className="dropdown-btn" id={"heading-content-dropdown-" + contentHeading.id}>
                    <img className="show-all-icon icon-10x10" alt="" src={dropdownIcon} ></img>
                </div>
            </div>;
        }
        )
        // }

        return (
            <div className="nm-bl-layout">
                <Titlebar title="" />
                <div className="layout-decoration">
                    <div className="heading-list">
                        < div className="subject-description" >
                            <img className="image" src={this.image} alt="*" />
                            <div className="content-container">
                                <div className="title">
                                    {this.title}
                                </div>
                                <div className="description">
                                    {this.description}
                                </div>
                                <div className="save-btn-container">
                                    <div className="save-btn blue-button">
                                        {!this.isSave ?
                                            "Lưu" : "Huỷ lưu"
                                        }
                                    </div>
                                </div>
                            </div >

                        </div >
                        <div className="main-content-text">NỘI DUNG CHÍNH</div>

                        <div className="heading-list-container">
                            {headingsList}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {

    return {
        postsList: state.post.postsList.data,
        postCategories: state.post_category.categories.data,
        isListLoading: state.post.postsList.isLoading,
        isCategoryLoading: state.post_category.categories.isLoading
    };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
   getPostCategories
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostsList));
