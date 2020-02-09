import React, { Component } from 'react';
import axios from 'axios';
import { v4 as uuid } from 'uuid';

function weekdaySelector() {
  return [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
  ].map(day => {
    return (
      <option
        key={day.toLowerCase()}
        value={day.toLowerCase()}
        className="option"
      >
        {day}
      </option>
    );
  });
}

export default class CreateGame extends Component {
  state = {
    partyName: '',
    notificationDate: 'monday',
    notificationTime: '12:00',
    participants: [],
    addParticipant: '',
    createReminderMsg: false,
    creatingReminder: false
  };

  submitHandler(e) {
    e.preventDefault();
  }

  createWeeklyReminder = async () => {
    this.setState({ creatingReminder: true });
    const id = uuid();
    const {
      partyName,
      notificationDate,
      notificationTime,
      participants
    } = this.state;
    if (partyName.length > 0 && participants.length > 0) {
      const data = {
        partyName,
        notificationDate,
        notificationTime,
        participants,
        id
      };
      const LAMBDA_API =
        'https://6uyyk1iarc.execute-api.eu-west-1.amazonaws.com/createWeeklyReminder';
      const createReminderLambda = axios.post(LAMBDA_API, data);
      const createReminderPythonScript = axios({
        method: 'POST',
        url: 'http://192.168.1.74:5000/v1/api/create/',
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        },
        data: JSON.stringify(data)
      });

      createReminderPythonScript
        .then(res => {
          console.log('Reminder added to script!');
          createReminderLambda.then(lambda => {
            console.log('Reminder added to db!');
            this.setState({
              partyName: '',
              notificationDate: 'monday',
              notificationTime: '12:00',
              participants: [],
              addParticipant: '',
              createReminderMsg: false,
              creatingReminder: false
            });
            this.createReminderMsg(
              "<p class='bordered'>Weekly reminder <strong class='pink'>created!</strong></p>"
            );
          });
        })
        .catch(err =>
          this.createReminderMsg(
            "<p class='bordered'>Oops! Something went <strong class='pink'>wrong</strong>!</p>"
          )
        );
    }
  };

  createReminderMsg(msg) {
    this.setState({ createReminderMsg: { __html: msg } });
    setTimeout(() => {
      this.setState({ createReminderMsg: false });
    }, 6000);
  }

  addParticipant = () => {
    if (
      this.state.addParticipant.trim().length > 0 &&
      this.state.addParticipant.indexOf('@') >= 0 &&
      this.state.participants.indexOf(this.state.addParticipant.toLowerCase()) <
        0
    ) {
      this.setState({
        participants: [
          ...this.state.participants,
          this.state.addParticipant.trim().toLowerCase()
        ],
        addParticipant: ''
      });
    }
  };

  removeParticipant = participant => {
    let copyParticipants = [...this.state.participants];
    if (this.state.participants.includes(participant)) {
      copyParticipants = copyParticipants.filter(
        elem => elem.toLowerCase() !== participant.toLowerCase()
      );
    }
    this.setState({ participants: copyParticipants });
  };

  render() {
    return (
      <div className="container">
        {this.state.createReminderMsg && (
          <div dangerouslySetInnerHTML={this.state.createReminderMsg}></div>
        )}
        <form onSubmit={this.submitHandler}>
          <p>Please fill in the details</p>
          <div className="inline-input-fields">
            <label>Party name</label>
            <input
              style={{ width: 'calc(100% - 200px)', minWidth: '200px' }}
              value={this.state.partyName}
              onChange={e => this.setState({ partyName: e.target.value })}
              placeholder="The Fantastic 4.."
              required
            ></input>
          </div>
          <div className="inline-input-fields">
            <label>Remind every</label>
            <div>
              <select name="day" form="dayform" className="select">
                {weekdaySelector()}
              </select>
              <input
                type="time"
                id="time"
                name="notificationTime"
                step="60"
                value={this.state.notificationTime}
                onChange={event =>
                  this.setState({ notificationTime: event.target.value })
                }
                required
              ></input>
            </div>
          </div>
          <div className="input-fields">
            <label>
              Add Participants <em>(email)</em>
            </label>
            <div className="inline-input-fields" style={{ marginBottom: 0 }}>
              <div className="inline-inputs">
                <input
                  style={{
                    width: 'calc(100% - 150px)'
                  }}
                  type="email"
                  value={this.state.addParticipant}
                  onKeyPress={e => {
                    e.which === 13 && e.preventDefault();
                    e.which === 32 && e.preventDefault();
                    if (e.which === 13) {
                      this.addParticipant();
                    }
                  }}
                  onChange={e => {
                    this.setState({ addParticipant: e.target.value });
                  }}
                ></input>
                <button
                  type="button"
                  onClick={() => this.addParticipant()}
                  className="btn btn-secondary"
                  style={
                    this.state.addParticipant.length > 0 &&
                    this.state.addParticipant.indexOf('@') > 0
                      ? { backgroundColor: '#ff1493', borderColor: '#ff1493' }
                      : {}
                  }
                >
                  ▲ Add
                </button>
              </div>
            </div>
            {this.state.participants.map(participant => {
              return (
                <div
                  key={participant}
                  style={{
                    margin: '10px 0 5px 0',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%'
                  }}
                >
                  <p className="to-list">{participant}</p>
                  <button
                    type="button"
                    className="btn"
                    onClick={() => {
                      this.removeParticipant(participant);
                    }}
                  >
                    ▼ Remove
                  </button>
                </div>
              );
            })}
          </div>
          <p>
            <button
              onClick={this.createWeeklyReminder}
              className="btn btn-main"
              type="submit"
              disabled={this.state.creatingReminder}
            >
              <span style={{ fontSize: '80%' }} role="img" aria-label="thunder">
                ⚡
              </span>{' '}
              SET REMINDER!
            </button>
          </p>
          <label style={{ fontSize: '70%' }}>
            {this.state.partyName.length <= 0 ||
            this.state.participants.length === 0 ? (
              <span>Missing </span>
            ) : (
              false
            )}
            {this.state.partyName.length <= 0 ? (
              <span>
                {' '}
                a <strong style={{ color: '#ff1493' }}>party name</strong>..
              </span>
            ) : (
              false
            )}
            {this.state.participants.length <= 0 ? (
              <span>
                {' '}
                <strong style={{ color: '#ff1493' }}>particiants</strong>..
              </span>
            ) : (
              false
            )}
          </label>
        </form>
      </div>
    );
  }
}
