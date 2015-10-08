import React, { Component } from 'react';
import './Background.styl';

export default class Background extends Component {
  render() {
    return (
      <div>
        <div className="background"></div>
        <div className="backgroundFader"></div>
      </div>
    );
  }
}
