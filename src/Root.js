import React, { Component } from 'react';
import { Router } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';

const newHistory = createBrowserHistory();
export default class Root extends Component {
  render() {
    return (
      <Router history={newHistory}>
        {this.props.routes()}
      </Router>
    );
  }
}
