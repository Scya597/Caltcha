import React, { Component } from 'react';
import axios from 'axios';

import EventData from './eventData';
import VoteAction from './voteAction';
import '../scss/title.scss';

const deadline = require('../utils/functions/deadline');
const ifvote = require('../utils/functions/ifvote');

export default class Vote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      project: {},
      hourstoline: 0,
      normaluser: { vote: [], nvote: [] },
      optionaluser: { vote: [], nvote: [] },
    };

    this.fetchpj = this.fetchpj.bind(this);
    this.vote = this.vote.bind(this);
    this.updatepj = this.updatepj.bind(this);
    this.removepj = this.removepj.bind(this);
  }
  componentDidMount() {
    this.fetchpj();
  }

  fetchpj() {
    const { pjid } = this.props.match.params;
    axios.get(`/api/project/${pjid}`)
      .then((res) => {
        this.setState({
          project: res.data,
          hourstoline: deadline(res.data.deadline),
          normaluser: ifvote(res.data).normaluser,
          optionaluser: ifvote(res.data).optionaluser,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  vote() {
    const { pjid } = this.props.match.params;
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
      projectId: pjid,
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

  updatepj() {
    const { pjid } = this.props.match.params;
    axios.post('/api/project/update', {
      projectId: pjid,
      ended: false,
      deadline: 20170925,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    this.fetchpj();
  }

  removepj() {
    const { pjid } = this.props.match.params;
    axios.post('/api/project/remove', {
      projectId: pjid,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    this.props.history.push('/');
  }

  render() {
    const { userid } = this.props.match.params;
    const { superid } = this.props.match.params;
    if (userid === superid) {
      return (
        <div>
          <EventData project={this.state.project} />
        </div>
      );
    } else {
      return (
        <div>
          <div className="col-md-6">
            <EventData project={this.state.project} />
          </div>
          <div className="col-md-6">
            <VoteAction project={this.state.project} />
          </div>
        </div>
      );
    }
  }
}
