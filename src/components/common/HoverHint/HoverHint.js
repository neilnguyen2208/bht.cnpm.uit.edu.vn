import React from "react";
import "./HoverHint.scss"
import question_icon from "assets/icons/24x24/question_icon_24x24.png"

export default class HoverHint extends React.PureComponent {
    render() {
        return (
            <div className="hover-hint" id={this.props.id} >
                <img className="hover-hint-icon" src={question_icon} alt="hint" />
                <div className="hover-hint-container">
                    <div className="hover-hint-message">
                        {this.props.message}    
                    </div>
                </div >
            </div >
        );
    }
}