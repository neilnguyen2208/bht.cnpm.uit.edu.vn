import React from "react";
import { ClickAwayListener } from '@material-ui/core';
import dropdown_btn from 'assets/icons/24x24/dropdown_icon_24x24.png';
import "./Combobox.scss"

export default class Combobox extends React.Component {
    constructor(props) {
        super(props);

        this.isAnyValueChanged = false; //will become true if you choose an option

        this.state = {
            isDropdownOpen: false,
        }

        //các option phải có dạng 
        this.selectedOption = {
            id: "",
            name: ""
        }

        //if you don't want to show placeHolder => assign name by "none". 
        //=> it will show selected option have name equal to name of selectedOption ID
        //placeHolder is not use as an option :)if use want to use an option default, assign placeHolder by none

        //if you used selectedOption ID, please assign name of placeHolder by none 

        this.disabled = false; //if you want to disable combobox, you this.
        this.isHaveFocus = false;

    }

    componentDidMount() {
        if (!this.isAnyValueChanged && !this.props.selectedOptionID && this.props.placeHolder) {
            document.getElementById("combobox-wrapper-" + this.props.comboboxId).classList.add("dummy-invalid");
            document.getElementById("combobox-wrapper-" + this.props.comboboxId).classList.remove("dummy-have-click");
        }
        if (this.props.validation) {
            document.getElementById("combobox-wrapper-" + this.props.comboboxId).classList.add("validation");
        }
        if (this.props.type === "small") {
            document.getElementById("combobox-" + this.props.comboboxId).classList.add("small");
            document.getElementById("combobox-wrapper-" + this.props.comboboxId).classList.add("small");

        }
    }

    closeAllOption = () => {
        let dropdown_element_id = "combobox-btn-element-" + this.props.comboboxId;
        let container_id = "dropdown-container-" + this.props.comboboxId;
        let dropdown_element = document.getElementById(dropdown_element_id);
        let dropdown_container = document.getElementById(container_id);

        if (dropdown_container.style.display === "block") {
            dropdown_container.style.display = "none";
            dropdown_element.src = dropdown_btn;
        }
        this.setState({})
    }

    onBlur = () => {
        this.closeAllOption();

        if (this.props.validation)
            this.validate();
    }

    handleComboboxClick = (e, dropdown_element_id, container_id) => {
        e.preventDefault();
        let dropdown_element = document.getElementById(dropdown_element_id);
        let dropdown_container = document.getElementById(container_id);

        if (dropdown_container.style.display === "block") {
            dropdown_container.style.display = "none";
            dropdown_element.src = dropdown_btn;
        }
        else {
            dropdown_container.style.display = "block";
            dropdown_element.src = dropdown_btn;
        }

        //cho nay can them vao mot doan xu ly cho props
        //...

        document.getElementById("combobox-wrapper-" + this.props.comboboxId).classList.add("dummy-have-click");

        this.setState({ isDropdownOpen: true });
        this.isHaveFocus = true;
    }

    handleOptionClick = (id) => {
        let item_id = "combobox-option-" + this.props.comboboxId + "-" + id;
        let combobox_option = document.getElementById(item_id);

        for (let i = 1; i <= this.props.options; i++) {
            let combobox_option_index_id = "combobox-option-" + this.props.comboboxId + "-" + this.props.options[i].id;
            let combobox_option_index = document.getElementById(combobox_option_index_id);
            combobox_option_index.className = "combox-option";
        }

        this.selectedOption = {
            ...this.props.options.filter(item => item.id === id)[0],
            id: parseInt(id),
            name: this.props.options.filter(item => item.id === id)[0].name,
        }

        //pass to parent
        if (this.props.onOptionChanged)
            this.props.onOptionChanged(this.selectedOption);
        else console.log('error', "Please implement onOptionChanged() of Combobox!");
        combobox_option.className = "activated-combox-option";
        this.isAnyValueChanged = true;

        //for submit btn
        document.getElementById("combobox-wrapper-" + this.props.comboboxId).classList.remove("dummy-invalid");

        this.onBlur();
        this.setState({});
    }

    validate = () => {
        if (!this.isHaveFocus) return;

        //lay element ngoai cung cua editor hien tai
        let wrapperCombobox = document.getElementById("combobox-wrapper-" + this.props.comboboxId);
        this.errorMessage = document.getElementById("d-e-combobox-wrapper-" + this.props.comboboxId).innerText;
        this.errorElement = this.getParent(wrapperCombobox, '.form-group').querySelector('.form-error-label');

        if (this.errorMessage &&
            document.getElementById("combobox-wrapper-" + this.props.comboboxId).classList.contains("dummy-invalid")) { //invalid nhung khong hien UI
            this.errorElement.innerText = this.errorMessage;
            this.getParent(wrapperCombobox, '.form-group').classList.add('invalid');
        } else {
            this.errorElement.innerText = '';
            this.getParent(wrapperCombobox, '.form-group').classList.remove('invalid');
        }

        return !this.errorMessage;
    }

    //lay form
    getParent = (wrapperCombobox, selector) => {
        while (wrapperCombobox.parentElement) {
            if (wrapperCombobox.parentElement.matches(selector)) {
                return wrapperCombobox.parentElement;
            }
            wrapperCombobox = wrapperCombobox.parentElement;
        }
    }

    render() {
        if (this.selectedOption.id === "" && this.props.selectedOptionID) { //chua co lua chon nao va prop co selectedOption ID

            //check if selected ID is not in the options list.

            this.selectedOption = {
                id: this.props.selectedOptionID,
                name: this.props.options.filter(item => item.id === parseInt(this.props.selectedOptionID))[0].name
            }
            if (document.getElementById("combobox-wrapper-" + this.props.comboboxId))
                document.getElementById("combobox-wrapper-" + this.props.comboboxId).classList.remove('dummy-invalid');
        }

        let options = this.props.options.map(option =>
            this.selectedOption.id === option.id ?
                <div className="activated-combox-option"
                    id={"combobox-option-" + this.props.comboboxId + "-" + option.id}
                    key={option.id}>
                    {option.name}
                </div>
                :
                <div className="combox-option"
                    id={"combobox-option-" + this.props.comboboxId + "-" + option.id}
                    key={option.id}
                    onClick={() => this.handleOptionClick(option.id)}>
                    {option.name}
                </div>
        )

        return (
            <div id={"combobox-wrapper-" + this.props.comboboxId} className='combobox wrapper-combobox' >
                < ClickAwayListener id={"combobox-clickaway-wrapper-" + this.props.comboboxId} onClickAway={() => { this.onBlur() }}>
                    <div>
                        {/* select */}
                        <div className="combox" id={"combobox-" + this.props.comboboxId}
                            onClick={(e) => this.handleComboboxClick(e, "combobox-btn-element-" + this.props.comboboxId, "dropdown-container-" + this.props.comboboxId)}>
                            <div className="d-flex">
                                <div className="combox-text" id={"combobox-text-" + this.props.comboboxId}>
                                    {
                                        this.props.placeHolder === "none" ? //neu khong dung placeHolder
                                            <div>
                                                {
                                                    this.props.options.map(item =>
                                                        <div>
                                                            {this.selectedOption.id ?
                                                                <div >
                                                                    {item.id === this.selectedOption.id //neu da chon roi thi se hien thi cac gia tri duoc chon trong bang cac option
                                                                        ? item.name
                                                                        : ""}
                                                                </div> :
                                                                <div >
                                                                    {item.id === this.props.selectedOptionID //neu da chon roi thi se hien thi cac gia tri duoc chon trong bang cac option
                                                                        ? item.name
                                                                        : ""}
                                                                </div>
                                                            }
                                                        </div>
                                                    )
                                                }
                                            </div>
                                            : // neu co dung place holder
                                            !this.isAnyValueChanged ?
                                                <div>
                                                    {(!this.props.selectedOptionID && this.props.placeHolder === "none") ?
                                                        <div  >
                                                            {
                                                                this.props.selectedOptionID ?
                                                                    this.selectedOption.name
                                                                    : this.props.options[0].name
                                                            }
                                                        </div>
                                                        :
                                                        <div>
                                                            {this.props.selectedOptionID ?
                                                                this.selectedOption.name
                                                                : <div> {this.props.placeHolder}</div>
                                                            }
                                                        </div>
                                                    }
                                                </div>
                                                : this.selectedOption.name//neu dung, khi co thay doi se chuyen thanh selected name
                                    }
                                </div>
                            </div>

                            {/* dropdown-icon */}
                            <img alt="v" className="dropdown-element" src={dropdown_btn} id={"combobox-btn-element-" + this.props.comboboxId} />
                        </div>

                        {/* dropdown */}
                        {this.state.isDropdownOpen ? (
                            <div className="dropdown-container" id={"dropdown-container-" + this.props.comboboxId}>
                                {options}
                                <div className="mg-bottom-5px" />
                                <div className="mg-bottom-5px" />
                            </div>
                        ) : <div id={"dropdown-container-" + this.props.comboboxId}></div>}
                    </div>
                </ClickAwayListener >
                {this.props.validation ? <div>
                    <div id={"d-e-combobox-wrapper-" + this.props.comboboxId} style={{ "display": "none" }} ></div>

                </div> : <></>
                }
            </div >
        );
    }
}

