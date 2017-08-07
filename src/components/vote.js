import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Super from './super';
import EventData from './eventData';
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
          <button className="btn btn-default" onClick={this.vote}>VOTE</button>
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
      <div>
        <div className="col-md-6 list-border">
          <div className="row">
            <Link className="btn btn-default col-md-2 back-button" to="/">
              ㄑ Back
            </Link>
            <div className="col-md-5 noti-div">
              <label className="noti-label">3 days left</label>
            </div>
          </div>
          <EventData />
        </div>
        <div className="col-md-6 list-border">
          {this.ifsuper(this.state)}
        </div>
      </div>
    );
  }
}
