import React from 'react';
import 'components/common/Button/Button.scss'

//Set text props for this component
export default class Button extends React.Component {

    //onDelete, tag: id, content

    constructor(props) {
        super(props);
        this.color = { red: "#fe3a3a", blue: "#5279db", green: "green", white: "white" }
        this.isDisabled = false;
        this.type = { close: "", delete: "", approve: "" }
    }

    onBtnClick = () => {
        this.props.onBtnClick();
    }

    render() {
        return (
            <button className="custom-button" style={{
                background: this.color[this.props.color],
                color: this.props.color === "white" ? "var(--black)" : "white",
                border: this.props.color === "white" ? "var(--black)" : this.props.color
            }} disabled={this.props.isDisabled} onClick={this.onBtnClick}>
                <div>   {this.props.icon}</div>
                <div>  {this.props.text} </div>
            </button>
        )
    }


}
