import React, { Component } from 'react'

//resource
import gray_btn_element from 'assets/images/g_btn_element.png'
import liked_btn from 'assets/images/liked_btn.png'
import unliked_btn from 'assets/images/unliked_btn.png'
import dislike_btn from 'assets/images/dislike_btn.png'
import undislike_btn from 'assets/images/undislike_btn.png'
import download_btn from 'assets/images/gray_download_icon.png'
import trash_icon from 'assets/icons/24x24/trash_icon_24x24.png'
import { itemType } from 'constants.js'

//styles
import 'components/styles/DocPostSummary.scss'
import 'components/styles/SimpleButton.scss'

//components
import PopupMenu from 'components/common/PopupMenu/PopupMenu'
import Modal from 'components/common/Modal/AlertModal'


class CourseSummaryBar extends Component {

  constructor(props) {
    super(props);

  }

  render() {

    return (
      <div className="item-container" >

      </div >
    );
  }

}
export default CourseSummaryBar;