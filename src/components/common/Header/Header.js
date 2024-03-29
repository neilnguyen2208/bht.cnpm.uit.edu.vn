import React from "react";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import { bindActionCreators } from 'redux';
import { Link, NavLink } from 'react-router-dom';
import { ClickAwayListener } from '@material-ui/core';
import "./Header.scss";
import "components/styles/Button.scss";
import red_delete_icon from 'assets/icons/24x24/red_delete_icon_24x24.png';
import search_icon from 'assets/icons/24x24/search_icon_24x24.png';
import logo from 'assets/images/logo.png';
import upload_icon from 'assets/icons/48x48/blue_upload_icon_48x48.png';
import write_icon from 'assets/icons/48x48/blue_write_icon_48x48.png';
import { getQuickSearchResult } from 'redux/services/commonServices';
import SmallLoader from "components/common/Loader/Loader_S"
import { logoRouter, headerMenuRouters } from "components/base_components/router.config.js"
import store from 'redux/store/index'
import { get_QuickSearchResultRequest, get_QuickSearchResultReset } from 'redux/actions/commonAction';
import { getPostSearch } from 'redux/services/postServices';
import { getDocumentSearch } from 'redux/services/documentServices';
import { getExerciseSearch } from 'redux/services/courseServices';

import { DELAY_TIME } from 'constants.js';
import QuickSearchResult from './QuickSearchResult'
import { getQueryParamByName } from 'utils/urlUtils'
import UserMenu from '../../user/UserMenu'
import authService from 'authentication/authenticationServices.js';
import ShowOnPermission from "components/base_components/ShowOnPermission";
import add_exercise_btn from 'assets/icons/24x24/add_exercise_btn.png';
import { RequireLogin } from "components/base_components/RequireLoginComponent";
import { Access } from "authentication/permission.config";

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            account: null,
            isQuickSearchShow: false,
            isCollapsedUserMenuOpened: false
        }
        this.isHaveClickAwayQuickSearhResult = false;// dung de kiem tra neu bam ra ngoai search result lan 1'
        this.quickSearchResultView = <></>;
        this.timeOut = null;
        this.redirect = <></>;
        this.searchLink = "/search/posts/";
        this.searchParamObject = {
            "page": 1,
            "postCategoryID": getQueryParamByName('category') ? getQueryParamByName('category') : 0,
            "sortByPublishDtm": "desc",
            "searchTerm": getQueryParamByName('q') ? getQueryParamByName('q') : '',
            "advancedSort": "HOT",
        }
    }

    componentDidMount() {

    }

    componentWillUnmount() {
        //reset 
        store.dispatch(get_QuickSearchResultReset);
    }

    handleClickAwayQuickSearchResult = () => {
        //Neu man hinh dang la chieu ngang va kich thuoc chieu ngang nho hon 992px thi khi bam ra ngoai, modal search khong bi huy
        if (window.innerWidth <= 992 &&
            window.innerHeight <= window.innerWidth)
            return;
        this.handleCancelQuickSearch();
    }

    onSearchTextFieldChange = (e) => {
        this.query = e.target.value;
        this.searchParamObject = { ...this.searchParamObject, searchTerm: getQueryParamByName('q') ? getQueryParamByName('q') : e.target.value };
        clearTimeout(this.timeOut);

        if (this.query.length > 0) {
            this.showQuickSearchBigContainer();
            store.dispatch(get_QuickSearchResultRequest());
            this.timeOut = setTimeout(() => this.props.getQuickSearchResult(this.query), DELAY_TIME);
        }

        document.getElementById("qssr-container").style.display = "block";
        document.getElementById("qsr-container-big").style.display = "block";
        this.setState({});
    }

    keyHandler = (e) => {
        if (!e.target.value) return;
        if (e.charCode === 13) { //press Enter  
            if (this.props.location.pathname.substring(0, 7) === '/search') {
                this.redirect = <Redirect to={`${this.props.location.pathname}?page=1&q=${e.target.value}&category=${getQueryParamByName('category')}`} />
                if (this.props.location.pathname === "/search/posts") {
                    store.dispatch(getPostSearch({ page: 1, searchTerm: e.target.value, postCategoryID: getQueryParamByName('category') }))
                }
            }
            else {
                this.redirect = <Redirect to={`/search/posts?page=1&q=${e.target.value}&category=0'`} />
                store.dispatch(getPostSearch({ page: 1, searchTerm: e.target.value, postCategoryID: 0 }))
            }
            document.getElementById("qssr-container").style.display = "none";
            document.getElementById("qsr-container-big").style.display = "none";
            //re-render
        }
    }

    render() {

        // Handle quick search result
        if (this.props.isQuickSearchLoadDone) {
            if (this.props.quickSearchResultData)
                this.quickSearchResultView = <QuickSearchResult quickSearchResultData={this.props.quickSearchResultData} />
            else {
                this.quickSearchResultView = <SmallLoader text="Đang tìm kiếm " />
            }
        }
        else
            this.quickSearchResultView = <SmallLoader text="Đang tìm kiếm " />;

        let userMenu = <></>;
        if (authService.isLoggedIn()) {
            userMenu = <UserMenu />

        }

        else {
            userMenu = <div className="header-end-lv2">
                <Link to="/upload-document" className="d-flex">
                    <img className="header-image-button" alt="" src={upload_icon} />
                </Link>
                <Link to={"/create-post"} className="d-flex">
                    <img className="header-image-button" src={write_icon} alt="" />
                </Link>
                <ShowOnPermission permissions={[Access.Admin]}   >
                    <Link className="d-flex" to={"/create-exercise"}>
                        <img className="header-image-button" src={add_exercise_btn} alt="" />
                    </Link>
                </ShowOnPermission>
                <button onClick={() => authService.doLogin()} className="blue-button mg-auto">
                    Đăng nhập
                </button>
            </div>
        }

        return (
            <div className="header-container" id="header" >
                <div className="header"  >

                    {/* Begin lv1: contain logo and searchbar */}
                    {/* Begin lv2: searchbar */}
                    <div className="header-begin-lv1" >
                        <Link to={logoRouter.path} className="mi-w-fit-content">
                            <img className="app-logo" src={logo} alt="logo" />
                        </Link>

                        <div className="header-menu-bar" >
                            {headerMenuRouters.map(item => {
                                return <ShowOnPermission key={item.id} permissions={item.permissions}>
                                    <NavLink
                                        exact
                                        activeClassName="activated-header-menu-item"
                                        to={item.path} className="header-menu-item" >
                                        {item.label}
                                    </NavLink>
                                </ShowOnPermission>
                            })}
                        </div>

                        <div className="header-begin-lv2" id="header-begin-lv2" >

                            {/*> 992 */}
                            <div className="qs-container-big">
                                <div className="sb-container-big" >
                                    <div className="sb-text-field-container">
                                        <input className="sb-text-field"
                                            id="sb-text-field-big"
                                            type="text" placeholder="Search"
                                            onChange={(e) => this.onSearchTextFieldChange(e)}
                                        // onKeyPress={(e) => { this.keyHandler(e) }}
                                        />

                                        {this.query ?
                                            //not in search
                                            window.location.pathname.substring(0, 8) !== "/search/" || window.location.pathname === "/search/posts" ?
                                                < Link to={`/search/posts?page=1&q=${this.query ? this.query : getQueryParamByName('q')}&category=${getQueryParamByName('category') ? getQueryParamByName('category') : 0}&tab=REVELANT`}
                                                    onClick={() => {
                                                        delete this.searchParamObject.sortByPublishDtm;
                                                        delete this.searchParamObject.sortByAttempts;
                                                        this.searchParamObject.searchTerm = this.query;
                                                        this.searchParamObject.postCategoryID = getQueryParamByName('category') ? getQueryParamByName('category') : 0;
                                                        this.searchParamObject.advancedSort = getQueryParamByName('sort') ? getQueryParamByName('sort') : null;
                                                        this.props.getPostSearch(this.searchParamObject);
                                                        this.setState({})
                                                    }}  >
                                                    <img src={search_icon} alt="" style={{ position: "absolute", right: "10px", top: "3px" }} />
                                                </Link> :
                                                window.location.pathname === "/search/documents" ?
                                                    < Link to={`/search/documents?page=1&q=${this.query ? this.query : getQueryParamByName('q')}&category=${getQueryParamByName('category') ? getQueryParamByName('category') : 0}&subject=${getQueryParamByName('subject') ? getQueryParamByName('subject') : 0}&tab=REVELANT`}
                                                        onClick={() => {
                                                            delete this.searchParamObject.postCategoryID;
                                                            delete this.searchParamObject.sortByPublishDtm;
                                                            delete this.searchParamObject.sortByAttempts;
                                                            this.searchParamObject.searchTerm = this.query;
                                                            this.searchParamObject.sortByPublishDtm = "DESC";
                                                            this.searchParamObject.categoryID = getQueryParamByName('category') ? getQueryParamByName('category') : 0;
                                                            this.searchParamObject.subjectID = getQueryParamByName('subject') ? getQueryParamByName('subject') : 0;
                                                            this.searchParamObject.advancedSort = getQueryParamByName('sort') ? getQueryParamByName('sort') : null;
                                                            this.props.getDocumentSearch(this.searchParamObject);
                                                            this.setState({});
                                                        }}  >
                                                        <img src={search_icon} alt="" style={{ position: "absolute", right: "10px", top: "3px" }} />
                                                    </Link> :
                                                    window.location.pathname === "/search/exercises" ?
                                                        < Link to={`/search/exercises?page=1&q=${this.query ? this.query : getQueryParamByName('q')}&category=${getQueryParamByName('category') ? getQueryParamByName('category') : 0}&subject=${getQueryParamByName('subject') ? getQueryParamByName('subject') : 0}&tab=REVELANT`}
                                                            onClick={() => {
                                                                delete this.searchParamObject.postCategoryID;
                                                                delete this.searchParamObject.advancedSort;
                                                                this.searchParamObject.searchTerm = this.query;
                                                                this.searchParamObject.sortByPublishDtm = "DESC";
                                                                this.searchParamObject.categoryID = getQueryParamByName('category') ? getQueryParamByName('category') : 0;

                                                                this.searchParamObject.subjectID = getQueryParamByName('subject') ? getQueryParamByName('subject') : 0;
                                                                this.searchParamObject.advancedSort = getQueryParamByName('sort') ? getQueryParamByName('sort') : null;
                                                                this.props.getExerciseSearch(this.searchParamObject);
                                                                this.setState({});
                                                            }}  >
                                                            <img src={search_icon} alt="" style={{ position: "absolute", right: "10px", top: "3px" }} />
                                                        </Link> : <img src={search_icon} alt="" style={{ position: "absolute", right: "10px", top: "3px" }} />
                                            :
                                            <img src={search_icon} alt="" style={{ position: "absolute", right: "10px", top: "3px" }} />
                                        }
                                    </div>
                                </div>

                                <ClickAwayListener onClickAway={() => this.handleClickAwayQuickSearchResult()}>
                                    <div className="qsr-container-big" id="qsr-container-big">
                                        <div className="qssr-container" id="qssr-container" >
                                            <div className="Cancel_Button_Port" id="qs-cancel-button-container" >
                                                <img className="Cancel_Button" alt=""
                                                    id="qs-cancel-button" onClick={() => { this.handleCancelQuickSearch() }} src={red_delete_icon} />
                                            </div>
                                            {this.quickSearchResultView}
                                        </div>
                                    </div>
                                </ClickAwayListener>
                            </div>
                        </div>
                    </div>

                    {/*  */}
                    <div className="Header_End_Lv1">
                        {/* <div className="header-end-lv2" > */}
                        {userMenu}
                        {/* </div> */}
                        <div className="header-end-lv2_Collapse"
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
                </div >
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
        isQuickSearchLoadDone: state.common.quickSearchResult.isLoadDone
    };
};

const mapDispatchToProps = (dispatch) => bindActionCreators({
    getQuickSearchResult,
    getPostSearch,
    getDocumentSearch,
    getExerciseSearch,
}, dispatch);

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(Header)
);