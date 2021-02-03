import React, { Component } from 'react'
import './Titlebar.scss'

class Titlebar extends Component {
    render() {
        return (
            <div className="h-menu-layout">
                {/* Menu bar */}
                <div className="title-bar">
                    <div className="main-title">{this.props.title}</div>
                </div>
            </div>
        );
    }
}
export default Titlebar;