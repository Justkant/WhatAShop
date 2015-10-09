import React, { Component } from 'react';
import { Background, CenterContainer, SignupForm, BigButton } from 'components';

export default class Signup extends Component {
  render() {
    const styles = require('./Signup.styl');
    return (
      <div>
        <CenterContainer>
          <h2 className={styles.title}><b>W</b>hat A <b>S</b>hop</h2>
          <SignupForm/>
          <BigButton to="/">Sign up</BigButton>
        </CenterContainer>

        <Background/>
      </div>
    );
  }
}
