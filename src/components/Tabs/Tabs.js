import React, {Component, PropTypes} from 'react';

export default class Tabs extends Component {
  static propTypes = {
    containerClass: PropTypes.string.isRequired,
    children: PropTypes.array.isRequired
  };

  constructor() {
    super();
    this.handleOnClick = this.handleOnClick.bind(this);
    this.getSelected = this.getSelected.bind(this);
    this.state = {
      selectedIndex: 0
    };
  }

  getSelected(tab, index) {
    return this.state.selectedIndex === index;
  }

  handleOnClick(tab) {
    this.setState({selectedIndex: tab.props.tabIndex});
  }

  render() {
    const {containerClass, children} = this.props;
    const styles = require('./Tabs.styl');
    const tabContent = [];

    const tabs = React.Children.map(children, (tab, index) => {
      tabContent.push(tab.props.children && this.getSelected(tab, index) ? tab.props.children : undefined);

      return React.cloneElement(tab, {
        key: index,
        selected: this.getSelected(tab, index),
        onClick: this.handleOnClick,
        tabIndex: index
      });
    });

    return (
      <div className={containerClass}>
        <div className={styles.tabContainer}>
          {tabs}
        </div>
        <div className={styles.contentContainer}>
          {tabContent}
        </div>
      </div>
    );
  }
}
