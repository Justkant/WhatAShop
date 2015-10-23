import React, { Component, PropTypes } from 'react';
import { IndexLink, Link } from 'react-router';

export default class TabNav extends Component {
  static propTypes = {
    indexTab: PropTypes.object,
    tabs: PropTypes.array
  };

  render() {
    const {indexTab, tabs} = this.props;
    const styles = require('./TabNav.styl');

    return (
      <div className={styles.container}>
        <IndexLink to={indexTab.route} className={styles.tab} activeClassName={styles.active}>
          <i className="material-icons md-38">{indexTab.icon}</i>
          <span>{indexTab.name}</span>
        </IndexLink>
        {tabs.map((tab, index) => {
          return (
            <Link to={tab.route} className={styles.tab} activeClassName={styles.active} key={tab.name + index}>
              <i className="material-icons md-38">{tab.icon}</i>
              <span>{tab.name}</span>
            </Link>
          );
        })}
      </div>
    );
  }
}
