import React, { Component } from 'react';

export default class Orders extends Component {
  render() {
    const styles = require('./Orders.styl');
    const array = [];
    for (let index = 0; index < 50; index++) {
      array.push('Orders of kant');
    }

    return (
      <div className={styles.container}>
        {array.map((value, index) => {
          return (<div className={styles.element} key={value + index}><h1>{value}</h1></div>);
        })}
      </div>
    );
  }
}
