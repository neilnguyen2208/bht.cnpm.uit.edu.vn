import React from 'react';
export default class Countdown extends React.Component {

  componentDidMount() {
    document.getElementById('sw_start').live('click', function () {
      this.startTimer('sw');
    });
    document.getElementById('cd_start').live('click', function () {
      this.startTimer('cd');
    });
    document.getElementById('sw_reset,#cd_reset').live('click', function () {
      this.resetTimer();
    });
    document.getElementById('sw_pause,#cd_pause').live('click', function () {
      this.pauseTimer();
    });

    document.getElementById("stopwatch").click(function () {
      document.getElementById("s").toggle();
      document.getElementById("c").hide();
      this.resetTimer();
    });
    document.getElementById("countdown").click(function () {
      document.getElementById("c").toggle();
      document.getElementById("s").hide();
      this.resetTimer();
    });
    // $(document).ready(function () {
    //   document.getElementById("c").hide();
    //   document.getElementById("s").hide();
    // })
  }
  formatTimer = (a) => {
    if (a < 10) {
      a = '0' + a;
    }
    return a;
  }
  startTimer = (dir) => {
    var a;
    // save type
    this.dir = dir;
    // get current date
    this.d1 = new Date();
    switch (this.state) {
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
          this.t1 += parseInt(document.getElementById('cd_minutes').val()) * 60000;
        }
        break;
    }
    // reset state
    this.state = 'alive';
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
    document.getElementById('' + this.dir + '_start').val('Resume');
    // set state
    this.state = 'pause';
  }
  resetTimer = () => {
    // reset display
    document.getElementById('' + this.dir + '_ms,#' + this.dir + '_s,#' + this.dir + '_m,#' + this.dir + '_h').html('00');
    // change button value
    document.getElementById('' + this.dir + '_start').val('Start');
    // set state
    this.state = 'reset';
  }
  endTimer = (callback) => {
    // change button value
    document.getElementById('' + this.dir + '_start').val('Restart');
    // set state
    this.state = 'end';
    // invoke callback
    if (typeof callback === 'function') {
      callback();
    }
  }
  loopTimer = () => {
    var td;
    var d2, t2;
    var ms = 0;
    var s = 0;
    var m = 0;
    var h = 0;
    if (this.state === 'alive') {
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
          this.endTimer(function () {
            this.resetTimer();
          });
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
          var m = (s - (s % 60)) / 60;
          if (m < 1) {
            m = 0;
          } else {
            // calculate hours
            var h = (m - (m % 60)) / 60;
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
      document.getElementById('' + this.dir + '_ms').html(this.formatTimer(ms));
      document.getElementById('' + this.dir + '_s').html(this.formatTimer(s));
      document.getElementById('' + this.dir + '_m').html(this.formatTimer(m));
      document.getElementById('' + this.dir + '_h').html(this.formatTimer(h));
      // loop
      this.t = setTimeout(this.loopTimer, 1);
    } else {
      // kill loop
      clearTimeout(this.t);
      return true;
    }
  }

  render() {
    return (
      <div>
        <div id="s">
          <h1>Stopwatch</h1>
          <span id="sw_h">00</span><span>&nbsp;:</span>
          <span id="sw_m">00</span><span>&nbsp;:</span>
          <span id="sw_s">00</span><span>&nbsp;:</span>
          <span id="sw_ms">00</span>
          <br />
          <br />
          <input type="button" value="START" id="sw_start" />
          <input type="button" value="PAUSE" id="sw_pause" />
          <input type="button" value="RESET" id="sw_reset" />
          <br />
          <br />
        </div>
        <div id="c">
          <h1>Countdown</h1>
          <span id="cd_h">00</span><span>&nbsp;:</span>
          <span id="cd_m">00</span><span>&nbsp;:</span>
          <span id="cd_s">00</span><span>&nbsp;:</span>
          <span id="cd_ms">00</span>
          <br />
          <br />
          <input type="button" value="START" id="cd_start" />
          <input type="button" value="PAUSE" id="cd_pause" />
          <input type="button" value="RESET" id="cd_reset" />
          <br />
          <br />
          <input type="number" value="15" id="cd_minutes" />
          <i id="minutes">Minutes</i>
        </div>
        <div id="switch">
          <button id="stopwatch">STOPWATCH</button>
          <p style={{ margin: "0px", height: "5px" }}></p>
          <button id="countdown">COUNTDOWN</button>
        </div>
      </div>
    );
  }
}
