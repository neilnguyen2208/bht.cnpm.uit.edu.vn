import React from 'react'
import 'components/styles/Button.scss'
import 'components/styles/HomeItem.scss'

class HomeTextInfo extends React.Component {
  render() {

    return (
      <div className="3-items-container" >
        {this.props.children}
      </div>
    );
  }


}
export default HomeTextInfo;