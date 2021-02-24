import React, { PureComponent } from 'react'
import './Titlebar.scss'

class Titlebar extends PureComponent {
    render() {
        return (
            <div className="title-bar">
                <div className="main-title">{this.props.title}</div>
            </div>
        );
    }
}
export default Titlebar;