import React, { Component } from 'react';
import _ from 'lodash';
import '../scss/title.scss';
import { Link } from 'react-router-dom';

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <h1>Caltcha</h1>
        <Link to="/new">new</Link>
        <Link to="/vote">vote</Link>
      </div>

    );
  }
}
export default MainPage;
