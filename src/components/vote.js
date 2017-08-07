import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import deadline from '../utils/functions/deadline';
import EventData from './eventData';
import VoteAction from './voteAction';
import '../scss/title.scss';

export default class Vote extends Component {
  constructor(props) {
    super(props);
    this.state = { project: {}, hourstoline: 0 };

    this.fetchpj = this.fetchpj.bind(this);
    this.vote = this.vote.bind(this);
    this.updatepj = this.updatepj.bind(this);
    this.removepj = this.removepj.bind(this);
    //this.checkSuper = this.checkSuper.bind(this);
  }
  componentDidMount() {
    this.fetchpj();
  }
  fetchpj() {
    const { pjid } = this.props.match.params;
    axios.get(`/api/project/${pjid}`)
      .then((res) => {
        this.setState({ project: res.data, hourstoline: deadline(res.data.deadline) });
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

  // checkSuper(user) {
  //   if (user.userId !== user.superId) {
  //     return (
  //       <div>
  //         <div className="list-border status-bar">
  //           {'pick your time' || 'you have picked your time'}
  //           <button className="btn btn-warning">edit users</button>
  //         </div>
  //         <button className="btn btn-default" onClick={this.vote}>VOTE</button>
  //       </div>
  //     );
  //   } else {
  //     return (
  //       <Super projectId={user.projectId} history={this.props.history} match={this.props.match} />
  //     );
  //   }
  // }

  render() {
    const { userid } = this.props.match.params;
    const { superid } = this.props.match.params;
    if (userid === superid) {
      return (
        <div>
          {this.state.project.title}
          <p>you are superuser</p>
        </div>
      );
    } else {
      return (
        <div>
          {this.state.project.title}
          <p>you are not superuser</p>
        </div>
      );
    }
  }
}
