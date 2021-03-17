import React, { Component } from 'react'

//resource
import gray_btn_element from 'assets/icons/24x24/gray_btn_element_24x24.png'
import liked_btn from 'assets/icons/24x24/liked_icon_24x24.png'
import unliked_btn from 'assets/icons/24x24/unliked_icon_24x24.png'
import dislike_btn from 'assets/icons/24x24/disliked_icon_24x24.png'
import undislike_btn from 'assets/icons/24x24/undisliked_icon_24x24.png'
import download_btn from 'assets/icons/24x24/gray_download_icon_24x24.png'
import trash_icon from 'assets/icons/24x24/trash_icon_24x24.png'
import { itemType } from 'constants.js'

//styles
import 'components/styles/Metadata.scss'
import 'components/styles/Button.scss'

//components
import PopupMenu from 'components/common/PopupMenu/PopupMenu'



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