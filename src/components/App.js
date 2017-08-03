import React, { Component } from 'react';
import _ from 'lodash';
import testData from '../testData/testData.json';
import '../scss/title.scss';
import Test from './testPage';

class App extends Component {
  constructor() {
    super();
    this.state = {
      numbers: [1, 2, 3],
    };
    this.renderNumbers = this.renderNumbers.bind(this);
  }

  componentDidMount() {
    console.log(testData);
  }

  renderNumbers() {
    return _.map(this.state.numbers, number => (
      <div key={number}>{number}</div>
    ));
  }

  render() {
    return (
      <div className="title">
        Boilerplate by YU-AN LAN
        {this.renderNumbers()}
        <Test />
      </div>
    );
  }
}

export default App;
