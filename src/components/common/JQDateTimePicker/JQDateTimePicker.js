
import React from 'react';

class DateTimePicker extends React.Component {

  constructor(props) {
    super(props);
    this.dtPickerID = "dt-picker-" + this.props.dtPickerId;
    this.state = { content: '' };
  }

  componentDidMount() {
    this.scriptLoaded();
  }

  scriptLoaded = () => {
    console.log(this.props.dtPickerId);
    window.createDTPickerInstance(this.props.dtPickerId, this.props.onDateTimeChange)
  }

  render() {
    return (

      <div className="dt-picker-wrapper dt-picker" id={"dt-wrapper-" + this.props.dtPickerId} >
        <input type="text" className="text-input" defaultValue={(new Date()).toISOString()} style={{ width: "200px", marginLeft: "0px" }} id={"dt-picker-input-" + this.props.dtPickerId} />

        {/* {this.props.validation ? <div>
          <div id={"d-e-cke-wrapper-" + this.props.editorId} style={{ "display": "none" }} ></div>
        </div> : <></>} */}

      </div>
    );
  }
}


export default DateTimePicker;
