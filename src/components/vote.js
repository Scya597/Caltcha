import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Super from './super';
import '../scss/title.scss';

export default class Vote extends Component {
  constructor(props) {
    super(props);

    const { userid, pjid, superid } = this.props.match.params;
    this.state = {
      userId: userid,
      projectId: pjid,
      superUserId: superid,
    };
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
      projectId: this.state.projectId,
      dates: tmpDates,
    })
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.log(error);
    });
    this.props.history.push('/');
  }

  ifsuper(user) {
    if (user.userId !== user.superUserId) {
      return (
        <div>
          <h1>vote</h1>
          <button onClick={this.vote}>VOTE</button>
        </div>
      );
    } else {
      return (
        <Super projectId={user.projectId} history={this.props.history} match={this.props.match} />
      );
    }
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="col-md-6">
          <div className="row">
            <Link className="btn btn-default col-md-1 back-button" to="/">
              Back
            </Link>
            <p className="com-md-5">3 days left</p>
          </div>
          <div>
            <h2>Title: 吃小龍蝦</h2>
            <h4>Location: 二餐</h4>
            <h4>Duration: 3小時</h4>
            <h5>Description: 大雨大雨一直下</h5>
          </div>
          <button className="btn btn-danger col-md-6">
            I don't feel like joining this event
          </button>
        </div>

        {this.ifsuper(this.state)}
      </div>
    );
  }
}
