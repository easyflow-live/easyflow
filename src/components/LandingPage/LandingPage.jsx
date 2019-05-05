import React from 'react';
import { Title } from 'react-head';
import { FaUserSecret } from 'react-icons/fa';

import './LandingPage.scss';
import { useGoogleLogin } from '../../hooks/useLogin';

const LandingPage = () => {
  const { login } = useGoogleLogin();

  return (
    <div className="landing-page">
      <Title>Sign in | React Kanban</Title>
      <div className="landing-page-background">
        <img
          srcSet={`/static/images/postits-1920.jpg 1920w, /static/images/postits-1366.jpg 1366w`}
          src={'/static/images/postits-1920.jpg'}
          alt="background"
        />
      </div>
      <div className="landing-page-info-wrapper">
        <div className="landing-page-info">
          <div className="landing-page-heading">
            <img
              src={'/static/images/kanban-logo.svg'}
              alt="React Kanban logo"
              className="landing-page-logo"
            />
            &nbsp;
            <h1>React Kanban</h1>
          </div>
          <p className="landing-page-description">
            An open source kanban application inspired by Trello. Check out the
            source code on{' '}
            <a
              href="https://github.com/yogaboll/react-kanban"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            .
          </p>
          <div className="signin-buttons">
            <div>
              <a onClick={login} className="signin-button google-button">
                <img
                  className="google-logo"
                  src={'/static/images/google-logo.svg'}
                  alt="google logo"
                />
              </a>
            </div>
            <div className="guest-button-wrapper">
              <button className="signin-button guest-button">
                <FaUserSecret className="logo-icon" /> &nbsp;Enter as guest
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
