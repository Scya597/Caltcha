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
        <img src="https://s-media-cache-ak0.pinimg.com/originals/42/92/f9/4292f90fe4dea47e8a01efc4ec73c099.jpg" />
        <h1>EAT SHIT ASSHOLE</h1>
        <Test />
      </div>
    );
  }
}

export default App;
