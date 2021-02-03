import React from "react";
import { ClickAwayListener } from '@material-ui/core';
import "./PopupMenu.scss"

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
        if (!this.props.selectedItemID) return;

        this.selectedItem = {
            id: this.props.selectedItemID,
            name: this.props.items.filter(item => item.id === this.props.selectedItemID)[0].name
        }
    }

    closeMenu = () => {
        let parent_id = "popup-menu-" + this.props.id;

        let container_id = "popup-menu-dropdown-" + this.props.id;

        let parent_menu_item = document.getElementById(parent_id);
        let dropdown = document.getElementById(container_id);

        if (dropdown.style.display === "block") {
            dropdown.style.display = "none";
            parent_menu_item.style.background = "white";
            parent_menu_item.style.paddingLeft = "0px";
        }
        this.setState({})
    }

    handlePopupMenuClick = (e, popup_menu_id, dropdown_id, dropdown_container_id) => {
        e.preventDefault();

        let popup_menu = document.getElementById(popup_menu_id);
        let dropdown = document.getElementById(dropdown_id);

        if (dropdown.style.display === "block") {
            dropdown.style.display = "none";
            popup_menu.style.background = "white";

        }
        else {
            popup_menu.style.background = "var(--grayish)";
            dropdown.style.display = "block";
            dropdown.style.left = "-136px";

        }

        this.setState({ isDropdownOpen: true });
    }

    handleMenuItemClick = (id) => {
        this.selectedItem = {
            id: id,
            name: this.props.items.filter(item => item.id === id)[0].name
        }

        //pass to parent
        if (this.props.onMenuItemClick)
            this.props.onMenuItemClick(this.selectedItem);
        else console.log('error', "Please implement onMenuItemClick() of PopupMenu!");
        this.isAnyValueChanged = true;
        this.closeAllItem();
        this.setState({});
    }

    render() {

        if (this.selectedItem.id === "" && this.props.selectedItemID)
            this.selectedItem = {
                id: this.props.selectedItemID,
                name: this.props.items.filter(item => item.id === this.props.selectedItemID)[0].name
            }

        let items = this.props.items.map(menu_item =>
            <div className="popup-menu-item"
                id={"popup-menu-menu_item-" + this.props.id + "-" + menu_item.id}
                key={menu_item.id}
                onClick={() => this.handleMenuItemClick(menu_item.id)}>
                {menu_item.name}
            </div>
        )

        return (
            <div style={{ position: "relative", display: "flex" }} >
                < ClickAwayListener onClickAway={() => { this.closeMenu() }}>
                    <div>
                        <div className="popup-menu" id={"popup-menu-" + this.props.id}
                            onClick={(e) => this.handlePopupMenuClick(e, "popup-menu-" + this.props.id, "popup-menu-dropdown-" + this.props.id, "popup-menu-dropdown-container-" + this.props.id)}>
                            <div className="d-flex">
                                {this.props.placeHolder === "none" ? //neu khong dung placeHolder
                                    <div>{
                                        this.props.items.map(item =>
                                            <div>
                                                {this.selectedItem.id ?
                                                    <div>
                                                        {item.id === this.selectedItem.id //neu da chon roi thi se hien thi cac gia tri duoc chon trong bang cac option
                                                            ? item.name
                                                            : ""}
                                                    </div> : <div>
                                                        {item.id === this.props.selectedItemID //neu da chon roi thi se hien thi cac gia tri duoc chon trong bang cac option
                                                            ? item.name
                                                            : ""}
                                                    </div>
                                                }
                                            </div>
                                        )
                                    }
                                    </div>
                                    :
                                    !this.isAnyValueChanged ? //neu dung, khi co thay doi se chuyen thanh selected name
                                        <div>

                                            {!this.props.selectedItemID && this.props.placeHolder === "none" ? this.props.items[0].name :
                                                this.props.placeHolder}</div> :
                                        this.selectedItem.name
                                }
                            </div>
                        </div>

                        {/* dropdown */}

                        {this.state.isDropdownOpen ? (
                            <div className="popup-menu-dropdown" id={"popup-menu-dropdown-" + this.props.id}>
                                {items}
                                {/* <div className="mg-bottom-5px" /> */}
                            </div>
                        ) : <div id={"popup-menu-dropdown-" + this.props.id}></div>}
                    </div>
                </ClickAwayListener >
            </div >
        );
    }
}

export const PopupMenuLocationType = { topLeft: "TOP_LEFT", topRight: "TOP_RIGHT", bottomLeft: "BOTTOM_LEFT", bottomRight: "BOTTOM_RIGHT" }