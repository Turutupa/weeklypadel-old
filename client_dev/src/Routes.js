import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';

// import components
import Header from './components/Header';
import Welcome from './components/Welcome';
import GamesInfo from './components/GamesInfo';
import GameAttendance from './components/GameAttendance';
import CreateGame from './components/CreateGame';
import Signin from './components/Signin';

export default class Routes extends Component {
  state = {
    cookieUser: undefined,
    userId: undefined,
    homepage: false
  };

  // this actually SETS current user
  currentUser = userId => {
    console.log('setting new user', userId);
    document.cookie = `userId=${userId}`;
    this.setState({
      userId
    });
  };

  //
  getUserFromCookie() {
    let cookie = document.cookie;
    console.log('cookie', cookie);
    if (cookie.includes('userId=')) {
      let id = cookie.split('=')[1];
      if (id !== 'undefined') {
        this.setState({ cookieUser: id });
      }
    }
  }

  componentDidMount() {
    this.getUserFromCookie();
  }

  renderGoToHomepage = () => {
    this.setState({ homepage: true });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Header />
          <Switch>
            <Route
              exact
              path="/"
              component={() => (
                <Welcome
                  cookieUser={this.state.cookieUser}
                  user={this.state.userId}
                  renderGoToHomepage={this.renderGoToHomepage}
                />
              )}
            />
            <Route
              path="/users/signin"
              component={() => (
                <Signin
                  cookieUser={this.state.cookieUser}
                  user={this.state.userId}
                  currentUser={this.currentUser}
                />
              )}
            />
            <Route
              path="/games/info/:userId"
              component={() => (
                <GamesInfo
                  cookieUser={this.state.cookieUser}
                  user={this.state.userId}
                  currentUser={this.currentUser}
                />
              )}
            />
            <Route path="/games/create" component={() => <CreateGame />} />
            <Route
              path="/attendance/:status/:gameId/:userId"
              component={() => <GameAttendance />}
            />
          </Switch>
          {window.location.pathname !== '/' ? (
            <p style={{ marginTop: '50px', cursor: 'pointer' }}>
              <Link
                to="/"
                className="go-to-homepage"
                onClick={() => this.setState({ homepage: true })}
              >
                Go to Homepage
              </Link>
            </p>
          ) : (
            false
          )}
        </header>
      </div>
    );
  }
}

// export default RoutesProps;
