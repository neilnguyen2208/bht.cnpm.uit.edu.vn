import React from 'react';
import './Countdown.scss';
import clock_icon from "assets/icons/24x24/clock_icon_24x24.png"
import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getAnExerciseInfoById } from 'redux/services/courseServices'
import { closeModal, openModal } from 'redux/services/modalServices';
class Countdown extends React.Component {
  componentDidMount() {
    document.getElementById("stopwatch-container").style.display = "none";
    document.getElementById("countdown-button").classList.add("active");
    this.dir = "cd";
  }

  formatTimer = function (a) {
    if (a < 10) {
      a = '0' + a;
    }
    return a;
  }

  startTimer = () => {
    var a;
    // save type
    // get current date
    this.d1 = new Date();
    console.log(this.d1.getTime())
    switch (this.componentState) {
      case 'pause':
        // resume timer
        // get current timestamp (for calculations) and
        // substract time difference between pause and now
        this.t1 = this.d1.getTime() - this.td;
        break;
      default:
        // get current timestamp (for calculations)
        this.t1 = this.d1.getTime();
        // if countdown add ms based on seconds in textfield
        if (this.dir === 'cd') {
          this.t1 += parseInt(document.getElementById('cd_minutes').value) * 60000;
        }
        break;
    }
    // reset state
    this.componentState = 'alive';
    // start loop
    this.loopTimer();
  }

  pauseTimer = () => {
    // save timestamp of pause
    this.dp = new Date();
    this.tp = this.dp.getTime();
    // save elapsed time (until pause)
    this.td = this.tp - this.t1;
    // change button value
    document.getElementById('' + this.dir + '_start').value = 'Resume';
    // set state
    this.componentState = 'pause';
  }

  resetTimer = () => {
    // reset display
    document.getElementById(this.dir + '_ms').innerText = '00';
    document.getElementById(this.dir + '_s').innerText = '00';
    document.getElementById(this.dir + '_m').innerText = '00';
    document.getElementById(this.dir + '_h').innerText = '00';
    // change button value
    document.getElementById(this.dir + '_start').value = 'Start';
    // set state
    this.componentState = 'reset';

  }

  endTimer = (callback) => {
    // change button value
    document.getElementById('' + this.dir + '_start').value = 'Restart';
    // set state
    this.componentState = 'end';
    // invoke callback
    if (typeof callback === 'function') {
      callback();
    }
  }

  loopTimer = () => {
    let td;
    let d2, t2;
    let ms = 0;
    let s = 0;
    let m = 0;
    let h = 0;
    if (this.componentState === 'alive') {
      // get current date and convert it into 
      // timestamp for calculations
      d2 = new Date();
      t2 = d2.getTime();
      // calculate time difference between
      // initial and current timestamp
      if (this.dir === 'sw') {
        td = t2 - this.t1;
        // reversed if countdown
      } else {
        td = this.t1 - t2;
        if (td <= 0) {
          // if time difference is 0 end countdown
          this.endTimer(this.resetTimer());
          if (this.dir === 'cd') {
            openModal("confirmation", {
              showIcon: false,
              text: "Hết thời gian đếm ngược.",
              title: "Hết giờ",
              confirmText: "Kiểm tra đáp án",
              cancelText: "Tiếp tục",
              onConfirm: () => {
                this.props.checkAnswer();
                closeModal();
              }
            })
          }
        }
      }
      // calculate milliseconds
      ms = td % 1000;
      if (ms < 1) {
        ms = 0;
      } else {
        // calculate seconds
        s = (td - ms) / 1000;
        if (s < 1) {
          s = 0;
        } else {
          // calculate minutes   
          // let 
          m = (s - (s % 60)) / 60;
          if (m < 1) {
            m = 0;
          } else {
            // calculate hours
            // let
            h = (m - (m % 60)) / 60;
            if (h < 1) {
              h = 0;
            }
          }
        }
      }
      // substract elapsed minutes & hours
      ms = Math.round(ms / 100);
      s = s - (m * 60);
      m = m - (h * 60);
      // update display
      document.getElementById(this.dir + '_ms').innerText = this.formatTimer(ms);
      document.getElementById(this.dir + '_s').innerText = this.formatTimer(s);
      document.getElementById(this.dir + '_m').innerText = this.formatTimer(m);
      document.getElementById(this.dir + '_h').innerText = this.formatTimer(h);
      // loop
      this.t = setTimeout(this.loopTimer, 1);
      this.setState({})

    } else {
      // kill loop => on pause

      clearTimeout(this.t);
      return true;
    }

  }

  onStopWatchClick = () => {
    document.getElementById("stopwatch-container").style.display = "block";
    document.getElementById("countdown-container").style.display = "none";
    document.getElementById("stopwatch-button").classList.add("active");
    document.getElementById("countdown-button").classList.remove("active");
    this.dir = 'sw';
    this.resetTimer();
  }

  onCountdownClick = () => {
    document.getElementById("countdown-container").style.display = "block";
    document.getElementById("stopwatch-container").style.display = "none";
    document.getElementById("stopwatch-button").classList.remove("active");
    document.getElementById("countdown-button").classList.add("active");
    this.dir = 'cd';
    this.resetTimer();
  }

  onCountdownInputChange = () => { }

  render() {

    if (this.props.isTimeStop) {
      this.pauseTimer();
      console.log("stop");
    }

    return (
      <div className="countdown-wrapper">
        <div className="h-menu-bar j-c-space-between">
          <img src={clock_icon} alt="" style={{ width: "20px", height: "20px", marginTop: "6px" }} />
          <div className="d-flex">
            <div id="countdown-button" className="h-menu-item" style={{ height: "30px" }} onClick={() => this.onCountdownClick()}>COUNTDOWN</div>
            <div id="stopwatch-button" className="h-menu-item" style={{ height: "30px" }} onClick={() => this.onStopWatchClick()} >STOPWATCH</div>
          </div>
        </div>

        <div id="stopwatch-container" >
          {this.props.exerciseContent && !this.props.isExerciseLoading &&
            <div className="" style={{ marginTop: "10px" }}>Thời gian làm bài đề xuất: {this.props.exerciseContent.suggestedDuration / 60} phút</div>}
          <div className="countdown-text-container">
            <span id="sw_h">00</span><span>:</span>
            <span id="sw_m">00</span><span>:</span>
            <span id="sw_s">00</span><span>:</span>
            <span id="sw_ms">00</span>
          </div>
          <div className="j-c-space-between" style={{ paddingBottom: "10px", borderBottom: "1px solid var(--gray)", marginBottom: "10px" }}>
            <input type="button" className="_button" value="START" id="sw_start" onClick={() => this.startTimer('sw')} />
            <input type="button" className="_button" value="PAUSE" id="sw_pause" onClick={() => this.pauseTimer('sw')} />
            <input type="button" className="_button" value="RESET" id="sw_reset" onClick={() => this.resetTimer()} />
          </div>
        </div>
        <div id="countdown-container" >

          {this.props.exerciseContent && !this.props.isExerciseLoading &&
            <div className="" style={{ marginTop: "10px" }}>Thời gian làm bài đề xuất: {this.props.exerciseContent.suggestedDuration / 60} phút</div>}
          <div className="countdown-text-container">
            <span id="cd_h">00</span><span>:</span>
            <span id="cd_m">00</span><span>:</span>
            <span id="cd_s">00</span><span>:</span>
            <span id="cd_ms">00</span>
            <div className="d-flex mg-top-5px" >
              <div className="countdown-time-label" style={{ marginRight: "5px", marginLeft: "5px" }}>Thời gian đếm ngược: </div>
              {this.props.exerciseContent && !this.props.isExerciseLoading &&
                <div className="d-flex">
                  <input type="number" className="countdown-time-input" min="0" defaultValue={this.props.exerciseContent.suggestedDuration ? this.props.exerciseContent.suggestedDuration / 60 : 15} id="cd_minutes" onChange={() => this.onCountdownInputChange()} />
                  <div id="minutes" className="countdown-time-label">phút.</div>
                </div>
              }
            </div>
          </div>
          <div className="j-c-space-between" style={{ paddingBottom: "10px", borderBottom: "1px solid var(--gray)", marginBottom: "10px" }}>
            <input type="button" className="_button" value="START" id="cd_start" onClick={() => this.startTimer('cd')} />
            <input type="button" className="_button" value="PAUSE" id="cd_pause" onClick={() => this.pauseTimer('cd')} />
            <input type="button" className="_button" value="RESET" id="cd_reset" onClick={() => this.resetTimer()} />
          </div>
        </div>
      </div >
    );
  }
}

const mapStateToProps = (state) => {
  return {
    exerciseContent: state.course.currentExercise.data,
    isExerciseLoading: state.course.currentExercise.isLoading,
    isTimeNormal: state.course.isTimeNormal,
    isTimeStop: !state.course.isTimeNormal
  };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getAnExerciseInfoById,
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Countdown));