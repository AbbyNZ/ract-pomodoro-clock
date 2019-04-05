let countdown;

class PomodoroClock extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      breakTime: 5,
      sessionTime: 25,
      timeLeft: 1500,
      isStart: true,
      isPaused: true };


    this.handleStartStop = this.handleStartStop.bind(this);
    this.timerCountdown = this.timerCountdown.bind(this);
    this.decrementTimeLeft = this.decrementTimeLeft.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.setTime = this.setTime.bind(this);


  }

  handleStartStop() {
    let currentTime;
    if (this.state.isPaused) {
      if (pause) {
        currentTime = pause;
        this.timerCountdown();
        pause = "";
      } else {
        currentTime = this.state.sessionTime;
        this.timerCountdown();
      }
      this.setState({
        isPaused: false });

    } else {
      pause = this.state.timeLeft;
      clearInterval(countdown);
      this.setState({
        isPaused: false });

    }
  }

  timerCountdown() {
    countdown = setInterval(() => {
      this.decrementTimeLeft();
    }, 1000);
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
      isStart: true,
      isPaused: true });

  }

  setTime() {
    let minutes = Math.floor(this.state.timeLeft / 60);
    let seconds = this.state.timeLeft - minutes * 60;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return minutes + ':' + seconds;
  }

  render() {
    return (
      React.createElement("div", { id: "clock" },
      React.createElement("div", { className: "title" }, React.createElement("h1", null, "Pomodoro Clock")),
      React.createElement("div", { className: "pomodoro" },
      React.createElement("div", { className: "time-controller" },
      React.createElement("div", { id: "break-timer" },
      React.createElement("div", { id: "break-label" }, React.createElement("h3", null, "Break Length")),
      React.createElement("button", { className: "btn", id: "break-decrement", value: "-" }, "\u2212"),
      React.createElement("div", { className: "btn", id: "break-length" }, this.state.breakTime),
      React.createElement("button", { className: "btn", id: "break-increment", value: "+" }, "+")),

      React.createElement("div", { id: "session-timer" },
      React.createElement("div", { id: "session-label" }, React.createElement("h3", null, "Session Length")),
      React.createElement("button", { className: "btn", id: "session-decrement", value: "-" }, "\u2212"),
      React.createElement("div", { className: "btn", id: "session-length" }, this.state.sessionTime),
      React.createElement("button", { className: "btn", id: "session-increment", value: "+" }, "+"))),


      React.createElement("div", { className: "timer" },
      React.createElement("div", { id: "timer-label" }, React.createElement("h3", null, "Session")),
      React.createElement("div", { id: "time-left" }, this.setTime()),
      React.createElement("div", { id: "timer-control" },
      React.createElement("button", { id: "start_stop", onClick: this.handleStartStop }, "Start/Stop"),
      React.createElement("button", { id: "reset", onClick: this.handleReset }, "Reset"))))));





  }}


ReactDOM.render(React.createElement(PomodoroClock, null), document.getElementById('app'));