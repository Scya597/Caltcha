import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import '../scss/title.scss';

export default class Vote extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.vote = this.vote.bind(this);
  }

  vote() {
    const tmpDates = [
      {
        date: 20170728,
        timeblocks: [1, 2, 3],
      },
      {
        date: 20170811,
        timeblocks: [6, 7, 8],
      },
    ];
    axios.post('/api/project/vote/', {
      projectId: this.props.match.params.id,
      dates: tmpDates,
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
    this.props.history.push('/');
  }

  render() {
    return (
      <div>
        <img src="http://www.motherjones.com/wp-content/uploads/silicon-valley.jpg" />
        <h1>vote</h1>
        <button onClick={this.vote}>VOTE</button>
        <Link to="/">Back to Main Page</Link>
      </div>
    );
  }
}
