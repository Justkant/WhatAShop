import React, { Component } from 'react';
import './SignupLogin.styl';

export default class SignupLogin extends Component {
  constructor() {
    super();
    this.state = {
      signup: true
    };
  }

  toggleSignup() {
    this.setState({signup: !this.state.signup});
  }

  render() {
    const {signup} = this.state;
    return (
      <div>
        <header>
          <a className="headerLogo">
            <b>WS</b>
          </a>
          <div className="flexSpace"></div>
          <a onClick={this.toggleSignup.bind(this)} className="outlineButton">
            {signup && 'Log in'}
            {!signup && 'Sign up'}
          </a>
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
              {signup && <div className="inputBox">
                <input type="text" name="username" placeholder="Username"/>
              </div>}
            </form>
            <a className="signupButton">
              {signup && 'Sign up'}
              {!signup && 'Log in'}
            </a>
          </div>
        </div>

        <div className="background"></div>
        <div className="backgroundFader"></div>
      </div>
    );
  }
}
