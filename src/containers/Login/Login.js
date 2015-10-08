import React, { Component } from 'react';
import { Link } from 'react-router';
import { Background } from 'components';
import './Login.styl';

export default class Login extends Component {
  render() {
    return (
      <div>
        <header>
          <a className="headerLogo">
            <b>WS</b>
          </a>
          <div className="flexSpace"></div>
          <Link to="/signup" className="outlineButton">Sign up</Link>
        </header>

        <div className="centerSignup">
          <div className="signupContainer">
            <h2 className="title"><b>W</b>hat A <b>S</b>hop</h2>
            <form className="inputGroup">
              <div className="inputBox">
                <input type="email" name="email" placeholder="Email"/>
              </div>
              <div className="inputBox">
                <input type="password" name="password" placeholder="Password"/>
              </div>
            </form>
            <Link to="/" className="signupButton">Log in</Link>
          </div>
        </div>

        <Background/>
      </div>
    );
  }
}
