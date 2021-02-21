import React from "react";
import { ClickAwayListener } from '@material-ui/core';
import dropdown_btn from 'assets/icons/24x24/dropdown_icon_24x24.png';
import white_dropdown_btn from 'assets/images/white_dropdown_icon.png';
import "./Combobox.scss"

export default class Combobox extends React.Component {
    constructor(props) {
        super(props);

        this.isAnyValueChanged = false; //will become true if you choose an option

        this.state = {
            isDropdownOpen: false
        }

        this.selectedOption = {
            id: "",
            name: ""
        }

        this.placeHolder = "All";
        //if you don't want to show placeHolder => assign name by "none". 
        //=> it will show selected option have name equal to name of selectedOption ID
        //placeHolder is not use as an option :)if use want to use an option default, assign placeHolder by none

        //if you used selectedOption ID, please assign name of placeHolder by none 

        this.disabled = false; //if you want to disable combobox, you this.



    }

    componentDidMount() {
        if (!this.props.selectedOptionID) return;

        this.selectedOption = {
            id: this.props.selectedOptionID,
            name: this.props.options.filter(item => item.id === this.props.selectedOptionID)[0].name
        }

        console.log(this.selectedOption)
    }

    closeAllOption = () => {
        let parent_id = "combobox-" + this.props.id;
        let show_text_id = "combobox-text-" + this.props.id;
        let dropdown_element_id = "combobox-btn-element-" + this.props.id;
        let container_id = "dropdown-container-" + this.props.id;

        let parent_menu_item = document.getElementById(parent_id);
        let dropdown_element = document.getElementById(dropdown_element_id);
        let show_text = document.getElementById(show_text_id);
        let dropdown_container = document.getElementById(container_id);

        if (dropdown_container.style.display === "block") {
            dropdown_container.style.display = "none";
            parent_menu_item.style.background = "white";
            parent_menu_item.style.borderRight = "var(--gray) 1px solid";
            parent_menu_item.style.paddingLeft = "0px";
            show_text.style.color = "var(--black)";
            dropdown_element.src = dropdown_btn;
        }
        this.setState({})
    }

    handleComboboxClick = (e, combobox_id, combobox_text_id, dropdown_element_id, container_id) => {
        e.preventDefault();

        let parent_menu_item = document.getElementById(combobox_id);
        let dropdown_element = document.getElementById(dropdown_element_id);
        let show_text = document.getElementById(combobox_text_id);
        let dropdown_container = document.getElementById(container_id);

        if (dropdown_container.style.display === "block") {
            dropdown_container.style.display = "none";
            dropdown_element.src = dropdown_btn;
        }
        else {
            parent_menu_item.style.background = "var(--white)"
            parent_menu_item.style.borderRight = "3px solid var(--blue)"
            dropdown_container.style.display = "block";
            dropdown_element.src = dropdown_btn;
        }


        //cho nay can them vao mot doan xu ly cho props
        this.setState({ isDropdownOpen: true });
    }

    handleOptionClick = (id) => {
        let item_id = "combobox-option-" + this.props.id + "-" + id;
        let combobox_option = document.getElementById(item_id);

        for (let i = 1; i <= this.props.options; i++) {
            let combobox_option_index_id = "combobox-option-" + this.props.id + "-" + this.props.options[i].id;
            let combobox_option_index = document.getElementById(combobox_option_index_id);
            combobox_option_index.className = "combox-option";
        }

        this.selectedOption = {
            id: id,
            name: this.props.options.filter(item => item.id === id)[0].name
        }


        //pass to parent
        if (this.props.onOptionChanged)
            this.props.onOptionChanged(this.selectedOption);
        else console.log('error', "Please implement onOptionChanged() of Combobox!");
        combobox_option.className = "activated-combox-option";
        this.isAnyValueChanged = true;
        this.closeAllOption();
        this.setState({});


    }

    render() {

        if (this.selectedOption.id === "" && this.props.selectedOptionID)
            this.selectedOption = {
                id: this.props.selectedOptionID,
                name: this.props.options.filter(item => item.id === this.props.selectedOptionID)[0].name
            }

        let options = this.props.options.map(option =>
            this.selectedOption.id === option.id ?
                <div className="activated-combox-option"
                    id={"combobox-option-" + this.props.id + "-" + option.id}
                    key={option.id}>
                    {option.name}
                </div>
                :
                <div className="combox-option"
                    id={"combobox-option-" + this.props.id + "-" + option.id}
                    key={option.id}
                    onClick={() => this.handleOptionClick(option.id)}>
                    {option.name}
                </div>

        )

        return (
            <div style={{ position: "relative", display: "flex", minWidth: "240px", width: "fit-content" }} >
                < ClickAwayListener onClickAway={() => { this.closeAllOption() }}>
                    {/* <div style={{ width: "100%" }}> */}
                    <div>
                        {/* select */}
                        <div className="combox" id={"combobox-" + this.props.id}
                            onClick={(e) => this.handleComboboxClick(e, "combobox-" + this.props.id, "combobox-text-" + this.props.id, "combobox-btn-element-" + this.props.id, "dropdown-container-" + this.props.id)}>
                            <div className="d-flex">
                                <div className="combox-text" id={"combobox-text-" + this.props.id}>
                                    {this.props.placeHolder === "none" ? //neu khong dung placeHolder
                                        <div>{
                                            this.props.options.map(item =>
                                                <div>
                                                    {this.selectedOption.id ?
                                                        <div>
                                                            {item.id === this.selectedOption.id //neu da chon roi thi se hien thi cac gia tri duoc chon trong bang cac option
                                                                ? item.name
                                                                : ""}
                                                        </div> : <div>
                                                            {item.id === this.props.selectedOptionID //neu da chon roi thi se hien thi cac gia tri duoc chon trong bang cac option
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

                                                {!this.props.selectedOptionID && this.props.placeHolder === "none" ? this.props.options[0].name :
                                                    this.props.placeHolder}</div> :
                                            this.selectedOption.name
                                    }
                                </div>
                            </div>

                            {/* dropdown-icon */}
                            <img alt="v" className="Dropdown_Btn_Element" style={{ marginLeft: "10px", userSelect: "none" }} src={dropdown_btn} id={"combobox-btn-element-" + this.props.id} />
                        </div>

                        {/* dropdown */}
                        {this.state.isDropdownOpen ? (
                            <div className="dropdown-container" id={"dropdown-container-" + this.props.id}>
                                {options}
                                <div className="mg-bottom-5px" />
                                <div className="mg-bottom-5px" />
                            </div>
                        ) : <div id={"dropdown-container-" + this.props.id}></div>}
                    </div>
                </ClickAwayListener >
            </div >
        );
    }
}