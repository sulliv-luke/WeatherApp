import './navbar.css';
import React from 'react';
import gitlab from './assets/gitlab.png';
import atlassian from './assets/atlassian.png';

function Navbar(isDarkMode) {
    return (
      <div className={`${isDarkMode ? 'dark-mode' : 'light-mode'} navbar-wrap`}>
        <h1>Weather App</h1>
        <a href="https://gitlab.scss.tcd.ie/csu33012-group-17/weatherapp">
          <img src={gitlab} alt="gitlab logo" className="gitlab-logo"/>
        </a>
        <a href='https://softwareenggroup17scrum.atlassian.net/jira/software/projects/SEG1/boards/1'>
          <img src={atlassian} alt="atlassian logo" className="atlassian-logo"/>
        </a>
      </div>
  );
}

export default Navbar