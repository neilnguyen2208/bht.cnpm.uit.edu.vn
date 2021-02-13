import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from 'redux';
import { Link, NavLink } from 'react-router-dom';
import { ClickAwayListener } from '@material-ui/core';

//utils
import { routers } from 'router.config'
import { ContentManagement } from 'utils/permissionUtils'
//styles
import "./Header.scss";
import "components/styles/SimpleButton.scss";

//resource
import red_delete_icon from 'assets/images/red_delete_icon.png';
import search_icon from 'assets/images/search_icon.png';
import logo from 'assets/images/logo.png';
import upload_icon from 'assets/images/icon_upload.png';
import write_icon from 'assets/images/icon_write.png';

//services
import { getQuickSearchResult } from 'redux/services/commonServices';

//components
import Tag from "components/common/Tag/Tag";
import Loader from "components/common/Loader/Loader"
import { logoRouter, headerMenuRouters } from "router.config"
import { getSearchParamByName } from 'utils/urlUtils'
import history from 'history.js'
class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            account: null,
            isQuickSearchShow: false,
            isCollapsedUserMenuOpened: false
        }
        this.isHaveClickAwayQuickSearhResult = false;// dung de kiem tra neu bam ra ngoai search result lan 1
    }

    componentDidMount() {
    }

    handleClickAwayQuickSearchResult = () => {
        //Neu man hinh dang la chieu ngang va kich thuoc chieu ngang nho hon 992px thi khi bam ra ngoai, modal search khong bi huy
        if (window.innerWidth <= 992 &&
            window.innerHeight <= window.innerWidth)
            return;
        this.handleCancelQuickSearch();
    }

    onSearchTextFieldChange = (e) => {
        console.log(e.target.value);
        this.showQuickSearchBigContainer();
        this.props.getQuickSearchResult(e.target.value);
        document.getElementById("qssr-container").style.display = "block";
        document.getElementById("qsr-container-big").style.display = "block";
    }

    keyHandler = (e) => {
        if (!e.target.value) return;
        if (e.charCode === 13) { //press Enter    
            if (this.props.location.pathname.substring(0, 7) === '/search')
                window.location.href = (`${this.props.location.pathname}?page=1&q=${e.target.value}&category=1`);
            else
                window.location.href = (`/search/posts?page=1&q=${e.target.value}&category=1`);

            document.getElementById("qssr-container").style.display = "none";
            document.getElementById("qsr-container-big").style.display = "none";
            return;
        }
    }

    render() {
        let quickSearchResultView = <></>;

        if (this.props.isQuickSearchLoadingDone) {
            if (this.props.quickSearchResultData)
                if (this.props.quickSearchResultData.tagQuickSearchResults.length > 0 ||
                    this.props.quickSearchResultData.docQuickSearchResults.length > 0 ||
                    this.props.quickSearchResultData.tagQuickSearchResults.length > 0)
                    quickSearchResultView = <div>
                        {this.props.quickSearchResultData.tagQuickSearchResults.length > 0 ?
                            <div className='w-100-percents' id="quick-search-post-result-port">
                                <div className="qs-type-title">BÀI VIẾT</div>
                                {this.props.quickSearchResultData.postQuickSearchResults.map(result =>

                                    <Link to={`/posts/${result.id}`} className="qs-result-item  mg-top-5px">
                                        <div className="d-flex mg-top-5px">
                                            <img alt="" src={result.imageURL} className="qs-result-image mg-right-5px" />
                                            <div className="qsr-title">{result.title}</div>
                                        </div>
                                    </Link>
                                )
                                }
                            </div> : <></>
                        }
                        {this.props.quickSearchResultData.docQuickSearchResults.length > 0 ?
                            <div className='w-100-percents' id="quick-search-doc-result-port">
                                <div className="qs-type-title">TÀI LIỆU</div>
                                {this.props.quickSearchResultData.docQuickSearchResults.map(result =>
                                    <Link to={`/documents/${result.id}`} className="qs-result-item  mg-top-5px">
                                        <div className="d-flex mg-top-5px">
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
                                        <Link to={`/tags/${result.id}/post?page=1`} className="d-flex">
                                            <Tag isReadOnly={true} tag={{ "id": result.id, "name": result.content }} />
                                        </Link>
                                    )
                                    }
                                </div>
                            </div> : <></>
                        }
                    </div >
                else
                    quickSearchResultView = <>Không có kết quả ...</>;
            else {
                quickSearchResultView = <Loader />;
            }
        }
        else quickSearchResultView = <Loader />;

        return (

            <div className="header-container" >
                <div className="header" id="header" >

                    {/* Begin lv1: contain logo and searchbar */}
                    {/* Begin lv2: searchbar */}
                    <div className="header-begin-lv1" >
                        <Link to={logoRouter.path} className="mi-w-fit-content">
                            <img className="app-logo" src={logo} alt="logo" />
                        </Link>

                        <div className="header-menu-bar" >
                            {headerMenuRouters.map(item => {
                                return <NavLink exact activeClassName="activated-header-menu-item" to={item.path} className="header-menu-item" > {item.label} </NavLink>
                            })}
                        </div>

                        <div className="header-begin-lv2" id="header-begin-lv2" >

                            {/* Duoi 576 */}
                            <div className="sb-container-small" >
                                <form className="sb-text-field-container" autoComplete="off" onSubmit={(e) => this.handleSearch(e.target.value)} >
                                    <input className="sb-text-field" id="search-box-text-field-small" type="text" placeholder="Search..." onChange={() => this.handleQuickSearch()} />
                                    <div className="search-image-container"
                                        id="search-image-button-container" > <img className="search-image-button"
                                            src={search_icon}
                                            alt="*"
                                            onClick={
                                                (e) => this.handleSearch(e.target.value)}
                                        />
                                    </div>
                                </form>
                            </div>
                            {/* 576 -> 992 */}
                            <div className="qs-container-normal">
                                <div className="sb-container-normal" >
                                    <div className="sb-text-field-container">
                                        <input className="sb-text-field"
                                            id="sb-text-field-normal"
                                            type="text" placeholder="Search..."
                                            onChange={() => this.showQuickSearchNormalContainer()} />
                                        <div className="search-image-container"
                                            id="search-image-button-container" > <img className="search-image-button"
                                                src={search_icon}
                                                alt="*"
                                                onClick={
                                                    (e) => this.handleSearch(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <ClickAwayListener onClickAway={() => this.handleClickAwayQuickSearchResult()}>
                                    <div className="qsr-container-normal" id="qsr-container-normal">
                                        <div className="qssr-container" id="qssr-container" >
                                            <div className="Cancel_Button_Port" id="qs-cancel-button-container" >
                                                <img className="Cancel_Button" alt=""
                                                    id="qs-cancel-button" onClick={() => { this.handleCancelQuickSearch() }} src={red_delete_icon} />
                                            </div>
                                            {quickSearchResultView}
                                        </div>
                                    </div>
                                </ClickAwayListener>
                            </div>

                            {/*> 992 */}
                            <div className="qs-container-big">
                                <div className="sb-container-big" >
                                    <div className="sb-text-field-container">
                                        <input className="sb-text-field"
                                            id="sb-text-field-big"
                                            type="text" placeholder="Search..."
                                            onChange={(e) => this.onSearchTextFieldChange(e)}
                                            onKeyPress={(e) => { this.keyHandler(e) }}
                                        />
                                    </div>
                                </div>

                                <ClickAwayListener onClickAway={() => this.handleClickAwayQuickSearchResult()}>
                                    <div className="qsr-container-big" id="qsr-container-big">
                                        <div className="qssr-container" id="qssr-container" >
                                            <div className="Cancel_Button_Port" id="qs-cancel-button-container" >
                                                <img className="Cancel_Button" alt=""
                                                    id="qs-cancel-button" onClick={() => { this.handleCancelQuickSearch() }} src={red_delete_icon} />
                                            </div>
                                            {quickSearchResultView}
                                        </div>
                                    </div>
                                </ClickAwayListener>
                            </div>
                        </div>
                    </div>

                    {/*  */}
                    <div className="Header_End_Lv1">

                        {/* Tao bai viet, tai khoan, upload */}
                        <div className="Header_End_Lv2" > <img className="Header_Image_Button" alt="" src={upload_icon} />
                            <img className="Header_Image_Button" src={write_icon} alt="" />
                            <button className="blue-button mg-auto mi-w-fit-content" > Đăng nhập </button>
                        </div>

                        {/* Collapse menu cho noi dung tren */}
                        <div className="Header_End_Lv2_Collapse"
                            onClick={this.state.isCollapsedUserMenuOpened ?
                                () => this.handleCloseCollapsedUserMenu()
                                : () => this.handleOpenCollapsedUserMenu()} >
                            <div className="Menu_Icon" >
                                <div className="Menu_Icon_Part" />
                                <div className="Menu_Icon_Part" />
                                <div className="Menu_Icon_Part" />
                            </div>
                        </div>

                    </div>

                    {/* <div className="Collapsed_User_Menu_Port" id="collapsed-user-menu-port" >
                        <div className="Collapsed_User_Menu" id="collapsed-user-menu" >
                            <div className="j-c-space-between" >
                                <div className="d-flex" > <img className="Collapsed_User_Menu_Image_Button" src={upload_icon} alt="" />
                                    <div>
                                        <button className="Collapsed_User_Menu_Button" > Đăng nhập </button>
                                    </div>
                                    <div className="Logined_Menu" >
                                        <div className="Collapsed_User_Menu_Item" > Trang cá nhân </div>
                                        <div className="Collapsed_User_Menu_Item" > Thông báo... </div>
                                        <div className="Collapsed_User_Menu_Item" > Bài viết của tôi </div>
                                        <div className="Collapsed_User_Menu_Item" > Tài liệu của tôi </div>
                                        <div className="Collapsed_User_Menu_Item" > Đăng xuất </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div >
        );
    }

    //reach when click X or click over of quick search result
    handleCancelQuickSearch = () => {
        if (document.getElementById("qsr-container-big"))
            document.getElementById("qsr-container-big").style.display = "none";
        if (document.getElementById("qsr-container-normal"))
            document.getElementById("qsr-container-normal").style.display = "none";

        let quickSearchSubResultPortsHTMLColection = document.getElementsByClassName("sub-result-container");

        document.getElementById("qs-cancel-button-container").style.display = "none";
        this.setState({ isQuickSearchShow: false });
        Array.from(quickSearchSubResultPortsHTMLColection).forEach(item => item.style.display = "none");
    }

    handleOpenCollapsedUserMenu = () => {

        let collapsedMenuPort = document.getElementById("collapsed-user-menu-port");
        let collapsedMenu = document.getElementById("collapsed-user-menu");
        collapsedMenu.style.width = document.getElementById("search-image-button-container").offsetWidth + document.getElementById("search-box-text-field-small").offsetWidth + "px";

        collapsedMenuPort.style.height = "30vh";
        collapsedMenu.style.height = "28vh";
        collapsedMenuPort.style.padding = "5px";
        collapsedMenu.style.padding = "5px"
        collapsedMenu.style.borderRadius = "5px";
        let collapsedMenuItemHTMLCollection = document.getElementsByClassName("Collapsed_User_Menu_Item");
        Array.from(collapsedMenuItemHTMLCollection).forEach(item => item.style.display = "flex");

        Array.from(document.getElementsByClassName("Collapsed_User_Menu_Image_Button")).forEach(item => item.style.display = "block");
        Array.from(document.getElementsByClassName("Collapsed_User_Menu_Button")).forEach(item => item.style.display = "flex");
        this.setState({ isCollapsedUserMenuOpened: true });
    }

    handleCloseCollapsedUserMenu = () => {
        let collapsedMenuPort = document.getElementById("collapsed-user-menu-port");
        let collapsedMenu = document.getElementById("collapsed-user-menu");
        collapsedMenuPort.style.height = "0vh";
        collapsedMenuPort.style.padding = "0px";
        collapsedMenu.style.height = "0px"
        collapsedMenu.style.padding = "0px"
        collapsedMenu.style.borderRadius = "0px";
        let collapsedMenuItemHTMLCollection = document.getElementsByClassName("Collapsed_User_Menu_Item");

        Array.from(collapsedMenuItemHTMLCollection).forEach(item => item.style.display = "none");
        Array.from(document.getElementsByClassName("Collapsed_User_Menu_Image_Button")).forEach(item => item.style.display = "none");
        Array.from(document.getElementsByClassName("Collapsed_User_Menu_Button")).forEach(item => item.style.display = "none");

        this.setState({ isCollapsedUserMenuOpened: false });
    }

    showQuickSearchNormalContainer = () => {

    }

    showQuickSearchBigContainer = () => {
        let searchBoxTextField = document.getElementById("sb-text-field-big");

        //neu gia tri la rong thi khong hien ket qua
        if (searchBoxTextField.value.length === 0) { this.handleCancelQuickSearch(); return; }

        let qsrContainer = document.getElementById("qsr-container-big");
        qsrContainer.style.display = "block";

        // if result is showing => skip
        if (!this.state.isQuickSearchShow) {
            document.getElementById("qs-cancel-button").style.display = "none";
            document.getElementById("qs-cancel-button-container").style.display = "none";
            Array.from(document.getElementsByClassName("sub-result-container")).forEach(item => item.style.display = "flex");

            this.setState({
                isQuickSearchShow: true
            });
        }
    }
}

const mapStateToProps = (state) => {
   
    return {
        quickSearchResultData: state.common.quickSearchResult.data,
        isQuickSearchLoading: state.common.quickSearchResult.isLoading,
        isQuickSearchLoadingDone: state.common.quickSearchResult.isLoadingDone

    };
};
const mapDispatchToProps = (dispatch) => bindActionCreators({
    getQuickSearchResult
}, dispatch);

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(Header)
);