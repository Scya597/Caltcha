import React, { Component } from 'react';
import _ from 'lodash';

import testData from '../testData/testData.json';
import '../scss/title.scss';
import Test from './testPage';

class App extends Component {
  constructor() {
    super();
    this.state = { numbers: 0 };
    this.renderNumbers = this.renderNumbers.bind(this);
  }

  renderNumbers() {
    return _.map(this.state.numbers, number => (
      <div key={number}>{number}</div>
    ));
  }

  render() {
    return (
      <div>
        <img src="http://a1.att.hudong.com/38/17/300001008759128923176593463.jpg" />
        <Test />
      </div>
    );
  }
}

export default App;
