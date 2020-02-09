import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const WelcomePage = withRouter(props => <Welcome {...props} />);

function Welcome(props) {
  return (
    <div>
      <ul>
        <li>
          <Link
            to={
              props.user || props.cookieUser
                ? `/games/info/${props.user || props.cookieUser}`
                : '/games/info/signin'
            }
            onClick={() => props.renderGoToHomepage()}
          >
            My Games
          </Link>
        </li>
        <li>
          <Link to="/games/create" onClick={() => props.renderGoToHomepage()}>
            Create Weekly Reminder
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default WelcomePage;
