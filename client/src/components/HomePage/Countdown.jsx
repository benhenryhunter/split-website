import React, { PropTypes, Component } from 'react';
import Paper from 'material-ui/Paper';

const paperStyle = {
  height: 100,
  width: 100,
  margin: 20,
  textAlign: 'center',
  display: 'inline-block'
}

class Countdown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      days: 0,
      hours: 0,
      min: 0,
      sec: 0,
    }
  }

  componentDidMount() {
    // update every second
    this.interval = setInterval(() => {
      const date = this.calculateCountdown(this.props.date);
      date ? this.setState(date) : this.stop();
    }, 1000);
  }

  componentWillUnmount() {
    this.stop();
  }

  calculateCountdown(endDate) {
    let diff = (Date.parse(new Date(endDate)) - Date.parse(new Date())) / 1000;

    // clear countdown when date is reached
    if (diff <= 0) return false;

    const timeLeft = {
      years: 0,
      days: 0,
      hours: 0,
      min: 0,
      sec: 0,
      millisec: 0,
    };

    // calculate time difference between now and expected date
    if (diff >= (365.25 * 86400)) { // 365.25 * 24 * 60 * 60
      timeLeft.years = Math.floor(diff / (365.25 * 86400));
      diff -= timeLeft.years * 365.25 * 86400;
    }
    if (diff >= 86400) { // 24 * 60 * 60
      timeLeft.days = Math.floor(diff / 86400);
      diff -= timeLeft.days * 86400;
    }
    if (diff >= 3600) { // 60 * 60
      timeLeft.hours = Math.floor(diff / 3600);
      diff -= timeLeft.hours * 3600;
    }
    if (diff >= 60) {
      timeLeft.min = Math.floor(diff / 60);
      diff -= timeLeft.min * 60;
    }
    timeLeft.sec = diff;

    return timeLeft;
  }

  stop() {
    clearInterval(this.interval);
  }

  addLeadingZeros(value) {
    value = String(value);
    while (value.length < 2) {
      value = '0' + value;
    }
    return value;
  }

  render() {
    const countDown = this.state;

    return (
      <div className="Countdown">
        <h2 style={{color:"white"}}>Time Until Something Happens</h2>
        <div className="Countdown-col">
          <Paper style={paperStyle}>
                <p className="Countdown-text">{this.addLeadingZeros(countDown.days)}</p>
                <p className="Countdown-title">{countDown.days === 1 ? 'Day' : 'Days'}</p>
            </Paper>
        </div>

        <div className="Countdown-col">
          <Paper style={paperStyle}>
              <p className="Countdown-text">{this.addLeadingZeros(countDown.hours)}</p>
              <p className="Countdown-title">Hours</p>
            </Paper>
        </div>


        <div className="Countdown-col">
          <Paper style={paperStyle}>
              <p className="Countdown-text">{this.addLeadingZeros(countDown.min)}</p>
              <p className="Countdown-title">Min</p>
            </Paper>
        </div>

        <div className="Countdown-col">
          <Paper style={paperStyle}>
              <p className="Countdown-text">{this.addLeadingZeros(countDown.sec)}</p>
              <p className="Countdown-title">Sec</p>
            </Paper>
        </div>
      </div>
    );
  }
}

Countdown.propTypes = {
  date: PropTypes.string.isRequired
};

Countdown.defaultProps = {
  date: new Date()
};

export default Countdown;