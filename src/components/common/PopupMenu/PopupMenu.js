import React from "react";
import { ClickAwayListener } from '@material-ui/core';
import "./PopupMenu.scss"
import ShowOnPermission from 'components/base_components/ShowOnPermission'
import { RequireLogin } from "components/base_components/RequireLoginComponent";
export default class PopupMenu extends React.Component {
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
        let parent_id = "pm-" + this.props.id;
        let parent_menu_item = document.getElementById(parent_id);
        if (this.state.isDropdownOpen) {
            parent_menu_item.style.background = "white";
        }
        this.setState({ isDropdownOpen: false })
    }

    handlePopupMenuClick = (e, popup_menu_id, dropdown_id) => {
        e.preventDefault();
        let popup_menu = document.getElementById(popup_menu_id);
        let dropdown = document.getElementById(dropdown_id);
        popup_menu.style.background = "var(--grayish)";
        dropdown.style.left = "-136px";
        this.setState({ isDropdownOpen: !this.state.isDropdownOpen });
    }

    handleMenuItemClick = (menuItem) => {
        //pass to parent
        let { id, value } = menuItem;
        if (this.props.onMenuItemClick)
            this.props.onMenuItemClick({ id, value });

        else console.log('error', "Please implement onMenuItemClick() of PopupMenu!");
        this.isAnyValueChanged = true;
        this.closeMenu();
        this.setState({});
    }

    render() {

        let items = this.props.items.map(menuItem => {
            if (menuItem.permissions && menuItem.showOnPermission)
                return <ShowOnPermission permissions={menuItem.permissions} >
                    <div className="popup-menu-item" style={menuItem.hasLine && { borderBottom: "1px solid var(--grayish)" }}
                        id={"pm-menuItem-" + this.props.id + "-" + menuItem.id}
                        key={menuItem.id}
                        onClick={() => this.handleMenuItemClick(menuItem)}>
                        <div className='d-flex'>
                            {menuItem.tip ?
                                <div className='d-flex'>
                                    {menuItem.icon ? <img className='popup-menu-icon' style={{
                                        height: "27px",
                                        paddingTop: "7px"
                                    }} alt="" src={menuItem.icon} /> : <></>}
                                    < div >
                                        <div className='popup-menu-text'>{menuItem.text}</div>
                                        <div className='popup-menu-tip'>{menuItem.tip}</div>
                                    </div>
                                </div>
                                :
                                <div className='d-flex'>
                                    {menuItem.icon ? <img className='popup-menu-icon' style={menuItem.style ? menuItem.style : {
                                        height: "23px",
                                        paddingTop: "0px",
                                        paddingBottom: "3px"
                                    }} alt="" src={menuItem.icon} /> : <></>}
                                    <div className='popup-menu-text'>{menuItem.text}</div>
                                </div>
                            }
                        </div>
                    </div >
                </ShowOnPermission>
            if (menuItem.permissions && !menuItem.showOnPermission)
                return <RequireLogin permissions={menuItem.permissions}
                    availableActions={this.props.availableActions}
                    requiredAction={menuItem.requiredAction}
                    showOnAction={menuItem.showOnAction}
                    useAction={this.props.useAction}
                    expectedEvent={() => this.handleMenuItemClick(menuItem)}>
                    <div className="popup-menu-item" style={menuItem.hasLine && { borderBottom: "1px solid var(--grayish)" }}
                        id={"pm-menuItem-" + this.props.id + "-" + menuItem.id}
                        key={menuItem.id}>
                        <div className='d-flex'>
                            {menuItem.tip ?
                                <div className='d-flex'>
                                    {menuItem.icon ? <img className='popup-menu-icon' style={{
                                        height: "27px",
                                        paddingTop: "7px"
                                    }} alt="" src={menuItem.icon} /> : <></>}
                                    < div >
                                        <div className='popup-menu-text'>{menuItem.text}</div>
                                        <div className='popup-menu-tip'>{menuItem.tip}</div>
                                    </div>
                                </div>
                                :
                                <div className='d-flex'>
                                    {menuItem.icon ? <img className='popup-menu-icon' style={menuItem.style ? menuItem.style : {
                                        height: "23px",
                                        paddingTop: "0px",
                                        paddingBottom: "3px"
                                    }} alt="" src={menuItem.icon} /> : <></>}
                                    <div className='popup-menu-text'>{menuItem.text}</div>
                                </div>
                            }
                        </div>
                    </div >
                </RequireLogin>

            return <div className="popup-menu-item" style={menuItem.hasLine && { borderBottom: "1px solid var(--grayish)" }}
                id={"pm-menuItem-" + this.props.id + "-" + menuItem.id}
                key={menuItem.id}
                onClick={() => this.handleMenuItemClick(menuItem)}>
                <div className='d-flex'>
                    {menuItem.tip ?
                        <div className='d-flex'>
                            {menuItem.icon ? <img className='popup-menu-icon' style={{
                                height: "27px",
                                paddingTop: "7px"
                            }} alt="" src={menuItem.icon} /> : <></>}
                            < div >
                                <div className='popup-menu-text'>{menuItem.text}</div>
                                <div className='popup-menu-tip'>{menuItem.tip}</div>
                            </div>
                        </div>
                        :
                        <div className='d-flex'>
                            {menuItem.icon ? <img className='popup-menu-icon' style={menuItem.style ? menuItem.style : {
                                height: "23px",
                                paddingTop: "0px",
                                paddingBottom: "3px"
                            }} alt="" src={menuItem.icon} /> : <></>}
                            <div className='popup-menu-text'>{menuItem.text}</div>
                        </div>
                    }
                </div>
            </div >
        }
        )

        return (
            <div className='d-flex pos-relative' style={{ zIndex: 2 }} >
                < ClickAwayListener onClickAway={() => { this.closeMenu() }}>
                    <div>
                        <div className="popup-menu" id={"pm-" + this.props.id} //pm: popup menu
                            onClick={(e) => this.handlePopupMenuClick(e, "pm-" + this.props.id, "pm-dropdown-" + this.props.id)}>
                            <div className="d-flex">
                            </div>
                        </div>

                        {/* dropdown */}
                        {this.state.isDropdownOpen ? (
                            <div className="popup-menu-dropdown" id={"pm-dropdown-" + this.props.id}>
                                {items}
                            </div>
                        ) : <div id={"pm-dropdown-" + this.props.id}></div>}
                    </div>
                </ClickAwayListener >
            </div >
        );
    }
}

export const PopupMenuLocationType = { topLeft: "TOP_LEFT", topRight: "TOP_RIGHT", bottomLeft: "BOTTOM_LEFT", bottomRight: "BOTTOM_RIGHT" }