import React, { Component } from 'react';
import { Background, CenterContainer, LoginForm } from 'components';

export default class Login extends Component {
  render() {
    const styles = require('./Login.styl');
    return (
      <div>
        <CenterContainer>
          <h2 className={styles.title}><b>W</b>hat A <b>S</b>hop</h2>
          <LoginForm/>
        </CenterContainer>

        <Background/>
      </div>
    );
  }
}
