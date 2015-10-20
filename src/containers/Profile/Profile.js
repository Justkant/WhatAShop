import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Tabs, Tab } from 'components';

@connect(state => ({user: state.auth.user}))
export default class Profile extends Component {
  static propTypes = {
    user: PropTypes.object
  };

  constructor() {
    super();
  }

  render() {
    const {user} = this.props;
    const styles = require('./Profile.styl');
    const array = [];
    for (let index = 0; index < 50; index++) {
      array.push(user.username);
    }
    return (
      <Tabs containerClass={styles.main}>
        <Tab label="Profile" icon="person">
          <div className={styles.settingsContainer}>
            <div className={styles.setting}>
              <h4 className={styles.settingHead}>Profile</h4>
            </div>
            <div className={styles.setting}>
              <h4>Password</h4>
            </div>
            <div className={styles.setting}>
              <h4>Delete account</h4>
            </div>
          </div>
        </Tab>
        <Tab label="Orders" icon="list">
          <div className={styles.container}>
            {array.map((name, index) => {
              return (<div className={styles.element} key={name + index}><h1>{'Orders of ' + name}</h1></div>);
            })}
          </div>
        </Tab>
      </Tabs>
    );
  }
}
