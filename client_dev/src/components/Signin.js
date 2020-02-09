import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import axios from 'axios';

const SigninPage = withRouter(props => <Signin {...props} />);

class Signin extends Component {
  state = {
    loading: false,
    email: '',
    loginError: false
  };

  componentDidMount() {
    console.log(this.props.user, this.props.cookieUser);
  }

  async handleSignin(e) {
    e.preventDefault();
    this.getUserGamesInfo(this.state.email);
  }

  async getUserGamesInfo(email) {
    const errorMsg = {
      __html:
        "<div><strong class='pink'>Oops!</strong> Something went wrong!<p>User not found.</p></div>"
    };
    try {
      const url =
        'https://g974j1q9w3.execute-api.eu-west-1.amazonaws.com/weeklypadel';
      axios({
        method: 'POST',
        url,
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        },
        data: JSON.stringify({ email: email, loginError: false })
      }).then(async res => {
        console.log('signed in!', res);
        if (res.data.statusCode === 200) {
          await this.props.currentUser(res.data.body.id);
          // window.location.pathname = `/games/info/${res.data.body.id}`;
        } else {
          this.setState({ loginError: errorMsg, email: '' });
        }
      });
    } catch (error) {
      console.log(errorMsg, error);
      this.setState({ loginError: errorMsg });
    }
  }

  render() {
    if (!this.props.user) {
      // if (!this.state.redirect) {
      return (
        <div className="input-fields" style={{ minWidth: '40vw' }}>
          <form onSubmit={e => this.handleSignin(e)}>
            <label>Please enter your email</label>
            <div className="inline-input-fields">
              <div className="inline-inputs">
                <input
                  style={{
                    width: 'calc(100% - 150px)'
                  }}
                  value={this.state.email}
                  onKeyPress={e => {
                    e.which === 32 && e.preventDefault();
                  }}
                  onChange={e => this.setState({ email: e.target.value })}
                  type="email"
                  required
                ></input>
                <button type="submit" className="btn btn-secondary">
                  🚩 Signin
                </button>
              </div>
            </div>
            {this.state.loginError && (
              <div dangerouslySetInnerHTML={this.state.loginError}></div>
            )}
          </form>
        </div>
      );
    } else {
      return <Redirect to={`/games/info/${this.props.user}`} />;
      //   return this.state.redirect;
    }
    // } else {
    //   if (this.state.loading) {
    //     return <p>Loading...</p>;
    //   } else {
    //     return <div>These are your games {this.props.user}</div>;
    //   }
    // }
  }
}

export default SigninPage;
