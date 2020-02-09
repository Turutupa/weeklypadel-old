import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
// import axios from 'axios';

const GameAttendance = withRouter(props => <Attendance {...props} />);

class Attendance extends Component {
  state = {
    attending: undefined,
    err: false,
    apiCall: undefined
  };

  componentDidMount = async () => {
    const attending = this.props.match.params.status;
    try {
      if (attending === 'true' || attending === 'false') {
        const url =
          'https://sfkj7v358a.execute-api.eu-west-1.amazonaws.com/weeklypadel';

        fetch(url)
          .then(res => res.json())
          .then(json => console.log(json));
      }
    } catch (err) {
      this.setState({ err: true });
    }
  };

  render() {
    console.log('state', this.state);
    // console.log(this.props.match.params);
    return (
      <div>
        {this.state.err ? (
          <p>Oops! Something went wrong!</p>
        ) : this.state.attending ? (
          <div>
            <p>Thank you for updating your attendance!</p>
            <p>
              You selected <em className="pink">attending</em>
              {this.state.attending}
            </p>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    );
  }
}

export default GameAttendance;
