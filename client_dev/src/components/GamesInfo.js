import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export default class GamesInfo extends Component {
  state = {
    redirect: false
  };

  componentDidMount() {
    // console.log('heree', this.props.user, this.props.cookieUser);
    if (!this.props.user && !this.props.cookieUser) {
      this.setState({ redirect: <Redirect to="/users/signin" /> });
    }
  }

  render() {
    if (!this.props.user && !this.props.cookieUser) {
      return this.state.redirect;
    } else {
      return (
        <div>Reminders Info {this.props.user || this.props.cookieUser}</div>
      );
    }
  }
}
