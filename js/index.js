let countdown;
let stop;

class PomodoroClock extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      breakTime: 5,
      sessionTime: 25,
      timeLeft: 1500,
      timerStatus: false,
      timerLabel: 'Session',
      clockInterval: null };


    this.handleStartStop = this.handleStartStop.bind(this);
    this.timerCountdown = this.timerCountdown.bind(this);
    this.decrementTimeLeft = this.decrementTimeLeft.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.setTime = this.setTime.bind(this);
    this.handleLengthControls = this.handleLengthControls.bind(this);
    this.handleCheckTimer = this.handleCheckTimer.bind(this);
  }

  handleStartStop() {
    if (this.state.timerStatus === false) {
      this.timerCountdown();
      this.setState({
        timerStatus: true });

    } else {
      this.setState({
        timerStatus: false,
        clockInteval: clearInterval(this.state.clockInterval) });


    }
  }

  timerCountdown() {
    this.setState({
      clockInterval: setInterval(() => {
        this.decrementTimeLeft();
        this.handleCheckTimer();
      }, 1000) });

  }

  decrementTimeLeft() {
    this.setState({
      timeLeft: this.state.timeLeft - 1 });

  }

  handleReset() {
    this.setState({
      breakTime: 5,
      sessionTime: 25,
      timeLeft: 1500,
      timerStatus: false,
      timerLabel: 'Session',
      clockInterval: clearInterval(this.state.clockInterval) });


    this.audioBeep.pause();
    this.audioBeep.currentTime = 0;
  }

  handleLengthControls(e) {
    const inc = e.target.id;
    if (this.state.timerStatus) {
      return null;
    }
    switch (inc) {
      case "break-increment":
        if (this.state.breakTime === 60) {
          break;
        }
        this.setState({
          breakTime: ++this.state.breakTime,
          timeLeft: this.state.sessionTime * 60 });

        break;
      case "break-decrement":
        if (this.state.breakTime === 1) {
          break;
        }
        this.setState({
          breakTime: --this.state.breakTime,
          timeLeft: this.state.sessionTime * 60 });

        break;
      case "session-increment":
        if (this.state.sessionTime === 60) {
          break;
        }
        this.setState({
          sessionTime: ++this.state.sessionTime,
          timeLeft: this.state.sessionTime * 60 });

        break;
      case "session-decrement":
        if (this.state.sessionTime === 1) {
          break;
        }
        this.setState({
          sessionTime: --this.state.sessionTime,
          timeLeft: this.state.sessionTime * 60 });

        break;}

  }

  setTime() {
    let minutes = Math.floor(this.state.timeLeft / 60);
    let seconds = this.state.timeLeft - minutes * 60;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return minutes + ':' + seconds;
  }

  handleCheckTimer() {
    //if session is 0, break length will start
    let timer = this.state.timeLeft;

    if (timer === 0) {
      this.alarm(timer);
      let timerLabel = this.state.timerLabel === "Session" ? "Break" : "Session";
      let timeLeft = this.state.timerLabel === "Session" ? this.state.breakTime * 60 : this.state.sessionTime * 60;
      this.setState({
        timerLabel,
        timeLeft });

    } /*else {
      this.setState({
        timeLeft: --this.state.timeLeft
      });
      }*/
  }

  alarm(_timer) {
    if (_timer === 0) {
      this.audioBeep.play();
    }
  }

  render() {
    return (
      React.createElement("div", { id: "clock" },
      React.createElement("div", { className: "title" }, React.createElement("h1", null, "Pomodoro Clock")),
      React.createElement("div", { className: "pomodoro" },
      React.createElement("div", { className: "time-controller" },
      React.createElement("div", { id: "break-timer" },
      React.createElement("div", { id: "break-label" }, React.createElement("h3", null, "Break Length")),
      React.createElement("button", { className: "btn", id: "break-decrement", value: "-", onClick: this.handleLengthControls }, "\u2212"),
      React.createElement("div", { className: "btn", id: "break-length" }, this.state.breakTime),
      React.createElement("button", { className: "btn", id: "break-increment", value: "+", onClick: this.handleLengthControls }, "+")),

      React.createElement("div", { id: "session-timer" },
      React.createElement("div", { id: "session-label" }, React.createElement("h3", null, "Session Length")),
      React.createElement("button", { className: "btn", id: "session-decrement", value: "-", onClick: this.handleLengthControls }, "\u2212"),
      React.createElement("div", { className: "btn", id: "session-length" }, this.state.sessionTime),
      React.createElement("button", { className: "btn", id: "session-increment", value: "+", onClick: this.handleLengthControls }, "+"))),


      React.createElement("div", { className: "timer" },
      React.createElement("div", { id: "timer-label" }, this.state.timerLabel),
      React.createElement("div", { id: "time-left" }, this.setTime()),
      React.createElement("div", { id: "timer-control" },
      React.createElement("button", { id: "start_stop", onClick: this.handleStartStop, timerStatus: this.state.timerStatus }, this.state.timerStatus === false ? 'Start' : 'Stop'),
      React.createElement("button", { id: "reset", onClick: this.handleReset }, "Reset")))),



      React.createElement("audio", { id: "beep", preload: "auto", src: "https://goo.gl/65cBl1", ref: audio => {this.audioBeep = audio;} })));


  }}


ReactDOM.render(React.createElement(PomodoroClock, null), document.getElementById('app'));