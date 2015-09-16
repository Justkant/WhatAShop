import React from 'react';
import mainStyle from './main.styl';

export default class Main extends React.Component {
    render() {
        return (
            <h1>{this.props.title}</h1>
        );
    }
}
