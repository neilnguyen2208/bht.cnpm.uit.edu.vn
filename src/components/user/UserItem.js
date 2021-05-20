import React from 'react'
import './UserItem.scss'
import gray_write_icon from 'assets/icons/48x48/gray_write_icon_48x48.png'
import gray_upload_icon from 'assets/icons/48x48/gray_upload_icon_48x48.png'
import pencil_icon from 'assets/icons/svg/pencil_icon.svg'

//combobox
import 'components/common/Combobox/Combobox.scss'
import 'components/styles/Button.scss'
import 'components/styles/Label.scss'
import Combobox from 'components/common/Combobox/Combobox'

class UserItem extends React.Component {
    componentDidMount() {

    }

    onRoleOptionChanged = () => {

    }

    render() {
        return (
            <div className="user-item"  >
                <img alt="" src={this.props.avatarURL} className="avatar"></img>
                <div className="j-c-space-between" >
                    <div className="d-flex-vertical j-c-space-between">
                        <div>
                            <div className="d-flex">
                                <div className="display-name">{this.props.displayName}</div>
                                <img className="edit-icon" src={pencil_icon} alt="" />
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
                    </div>
                </div>
                <div className="j-c-end">
                    <div className="d-flex-vertical j-c-space-between">
                        <div></div>
                        <div className="d-flex">
                            <div className="gray-label" style={{ marginTop: "0px", lineHeight: "1rem" }} >
                                Role:
                             </div>
                            <Combobox type="small" comboboxId={"ui-" + this.props.userID} options={this.props.rolesList} selectedOptionID={this.props.roleID} onOptionChanged={() => this.onRoleOptionChanged()} />
                            <button className="red-button" style={{ marginLeft: "1rem" }}>Ban</button>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}
export default UserItem;