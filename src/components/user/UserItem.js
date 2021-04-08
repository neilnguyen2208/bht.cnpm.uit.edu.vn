import React, { Component } from 'react'
import './UserItem.scss'
import gray_write_icon from 'assets/icons/48x48/gray_write_icon_48x48.png'
import gray_upload_icon from 'assets/icons/24x24/nb_gray_upload_icon_24x24.png'


//combobox
import 'components/common/Combobox/Combobox.scss'
import 'components/styles/Button.scss'
import 'components/styles/Label.scss'
import Combobox from 'components/common/Combobox/Combobox'

class UserItem extends Component {
    componentDidMount() {

    }

    onRoleOptionChanged = () => {

    }

    render() {
        return (
            <div className="user-item"  >
                <img alt="" src={this.props.avatarURL} className="avatar"></img>
                < div className="j-c-space-between" >
                    <div className="d-flex-vertical j-c-space-between">
                        <div>
                            <div className="d-flex">
                                <div className="display-name">{this.props.displayName}</div>

                            </div>
                            <div className="email">{this.props.email}</div>
                        </div>
                        <div className="achievement-bar" >
                            <div className="score">Score: {this.props.score}</div>
                            <img alt="avatar" src={gray_write_icon} className="user-item-icon" ></img>
                            <div className="post-count">{this.props.postCount}</div>
                            <img alt="avatar" src={gray_upload_icon} className="user-item-icon"></img>
                            <div className="document-count"> {this.props.docCount}</div>
                        </div>
                        <div>

                            <Combobox id={"ui-" + this.props.id} options={this.props.rolesList} onOptionChanged={() => this.onRoleOptionChanged()} />
                        </div>

                    </div>
                </div>
            </div >
        );
    }
}
export default UserItem;