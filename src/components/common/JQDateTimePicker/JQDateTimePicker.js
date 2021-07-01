
import React from 'react';

class DateTimePicker extends React.Component {

  constructor(props) {
    super(props);
    this.dtPickerID = "dt-picker-" + this.props.dtPickerId;
    this.state = { content: '' };

  }

  componentDidMount() {
    // window.createDTPickerInstance(this.props.dtPickerId, this.props.onDateTimeChange)
  }

  initValue = () => {
    let d = new Date();
    let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
    let mo = new Intl.DateTimeFormat('en', { month: 'numeric' }).format(d);
    let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
    let ho = new Intl.DateTimeFormat('en', { hour: '2-digit' }).format(d);
    let mi = new Intl.DateTimeFormat('en', { minute: '2-digit' }).format(d);

    return `${da}-${mo}-${ye} ${ho}:${mi}`
  }

  render() {
    return (

      <div className="dt-picker-wrapper dt-picker" id={"dt-wrapper-" + this.props.dtPickerId} >
        <input type="text" className="text-input"
          // defaultValue={" "}
          style={{ width: "200px", marginLeft: "0px" }} id={"dt-picker-input-" + this.props.dtPickerId} />

        {/* {this.props.validation ? <div>
          <div id={"d-e-cke-wrapper-" + this.props.editorId} style={{ "display": "none" }} ></div>
        </div> : <></>} */}

      </div>
    );
  }
}


export default DateTimePicker;
