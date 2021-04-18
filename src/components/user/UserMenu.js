import React from "react";
import { connect } from "react-redux";
import { Link, Redirect, withRouter } from "react-router-dom";
import { bindActionCreators } from 'redux';
import "./UserMenu.scss";
import dropdown_btn from 'assets/icons/24x24/dropdown_icon_24x24.png'
import gray_write_icon from 'assets/icons/48x48/gray_write_icon_48x48.png'
import gray_upload_icon from 'assets/icons/48x48/gray_upload_icon_48x48.png'
import { ClickAwayListener } from "@material-ui/core";
import { logout } from 'redux/services/authServices'

const userMenuOptions = [
    { id: 1, text: "Trang cá nhân", value: "PROFILE", icon: '', tip: "", hasLine: true, to: "/user", isLink: true },
    { id: 2, text: "Thông báo", value: "NOTIFICATION", icon: '', tip: "" },
    {
        id: 3, text: "Bài viết của tôi", value: "MY_POST", icon: '',
        style: {
            height: "26px",
            paddingTop: "3px",
            paddingBottom: "3px"
        }
    },
    {
        id: 4, text: "Tài liệu của tôi", value: "MY_DOCUMENT", icon: '', tip: "", hasLine: true,
        style: {
            height: "26px",
            paddingTop: "1px",
            paddingBottom: "5px"
        }
    },
    {
        id: 5, text: "Đăng xuất", value: "LOGOUT", icon: '', tip: "",
        style: {
            height: "26px",
            paddingTop: "1px",
            paddingBottom: "5px"
        }
    },
]



class UserMenu extends React.Component {

    constructor(props) {
        super(props);

        this.isAnyValueChanged = false; //will become true if you choose an option

        this.state = {
            isDropdownOpen: false,
        }

        this.selectedItem = {
            id: "",
            name: ""
        }

    }
    componentDidMount() {
        this.setState({ isDropdownOpen: false });
    }

    closeMenu = () => {
        let parent_id = "h-um-btn";
        let parent_menu_item = document.getElementById(parent_id);
        if (this.state.isDropdownOpen) {
            parent_menu_item.style.background = "white";
        }
        this.setState({ isDropdownOpen: false })
    }

    handlePopupMenuClick = (e, user_menu_id, dropdown_id) => {
        e.preventDefault();
        let user_menu = document.getElementById(user_menu_id);
        let dropdown = document.getElementById(dropdown_id);
        user_menu.style.background = "var(--grayish)";
        dropdown.style.left = "-9rem";

        if (!this.state.isDropdownOpen) {
            document.getElementById("h-um-wrapper").style.background = "var(--grayish)";
        }
        else {
            document.getElementById("h-um-wrapper").style.background = "white";
        }

        this.setState({ isDropdownOpen: !this.state.isDropdownOpen });
    }

    handleMenuItemClick = (menuItem) => {
        //UI
        document.getElementById("h-um-wrapper").style.background = "white";
        this.isAnyValueChanged = true;
        this.closeMenu();
        this.setState({});

        //Event handlers
        if (menuItem.value === "PROFILE") {
            // return <Redirect to="/user" />;
        }
        if (menuItem.value === "LOGOUT") {
            this.props.logout();
            return;
        }
    }


    render() {
        let items = userMenuOptions.map(menuItem => {
            return <div className="header-user-menu-item" style={menuItem.hasLine && { borderBottom: "1px solid var(--grayish)" }}
                id={"header-user-menuItem-" + menuItem.id}
                key={menuItem.id}
                onClick={() => this.handleMenuItemClick(menuItem)}>
                <div className='d-flex'>
                    {menuItem.tip ?

                        <>{menuItem.isLink ?
                            <Link className='d-flex' to={menuItem.to} style={{ color: "var(--black)" }}>
                                {menuItem.icon ? <img className='user-menu-icon' style={{
                                    height: "27px",
                                    paddingTop: "7px"
                                }} alt="" src={menuItem.icon} /> : <></>}
                                < div >
                                    <div className='user-menu-text'>{menuItem.text}</div>
                                    <div className='user-menu-tip'>{menuItem.tip}</div>
                                </div>
                            </Link>
                            :
                            <div className='d-flex'>
                                {menuItem.icon ? <img className='user-menu-icon' style={{
                                    height: "27px",
                                    paddingTop: "7px"
                                }} alt="" src={menuItem.icon} /> : <></>}
                                < div >
                                    <div className='user-menu-text'>{menuItem.text}</div>
                                    <div className='user-menu-tip'>{menuItem.tip}</div>
                                </div>
                            </div>
                        }
                        </>
                        :

                        <>{menuItem.isLink ?
                            <Link className='d-flex' to={menuItem.to} style={{ color: "var(--black)" }}>
                                {menuItem.icon ? <img className='user-menu-icon' style={menuItem.style ? menuItem.style : {
                                    height: "23px",
                                    paddingTop: "0px",
                                    paddingBottom: "3px"
                                }} alt="" src={menuItem.icon} /> : <></>}
                                <div className='user-menu-text'>{menuItem.text}
                                </div>
                            </Link>
                            :
                            <div className='d-flex'>
                                {menuItem.icon ? <img className='user-menu-icon' style={menuItem.style ? menuItem.style : {
                                    height: "23px",
                                    paddingTop: "0px",
                                    paddingBottom: "3px"
                                }} alt="" src={menuItem.icon} /> : <></>}
                                <div className='user-menu-text'>{menuItem.text}</div>
                            </div>
                        }
                        </>
                    }
                </div>

            </div >
        }
        )

        return (
            <div id="h-um-wrapper" className="user-menu">
                <div className="d-flex">
                    <img className="avatar" src="https://i.imgur.com/SZJgL6C.png" alt="" />
                </div>

                <div className='d-flex pos-relative' >
                    <ClickAwayListener onClickAway={() => { this.closeMenu() }}>
                        <div>
                            <div className="d-flex">
                                <img className="user-menu-btn" id={"h-um-btn"} //h-um: header user menu
                                    onClick={(e) => this.handlePopupMenuClick(e, "h-um-btn", "h-um-dropdown")} alt=""
                                    src={dropdown_btn}
                                />
                            </div>
                            <div>
                                {this.state.isDropdownOpen ?
                                    <div className="user-menu-dropdown" id={"h-um-dropdown"}>
                                        <div className="display-name">Nguyễn Văn Đông</div>
                                        <div className="d-flex mg-bottom-5px">
                                            <div className="reputation-sub-container">
                                                <img alt="" src={gray_write_icon} className="user-menu-icon" />
                                                <div className="reputation-label">  2000</div>
                                            </div>
                                            <div className="reputation-sub-container">
                                                <img alt="" src={gray_upload_icon} className="user-menu-icon" />
                                                <div className="reputation-label">   2000</div>
                                            </div>
                                        </div>

                                        {items}
                                    </div>
                                    : <div id={"h-um-dropdown"}></div>}
                            </div>
                        </div>
                    </ClickAwayListener >
                </div>
            </div>

        );
    }

}

const mapStateToProps = (state) => {

    return {
        isAuthenticated: state.auth.isAuthenticated,
    };
};
const mapDispatchToProps = (dispatch) => bindActionCreators({
    logout
}, dispatch);

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(UserMenu)
);