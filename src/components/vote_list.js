import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class voteList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const unvotedProjJSX = this.props.unvotedProj.map((proj) => {
      return (
        <div key={proj.id} className="col-md-3">
          <Link to={`/vote/${proj.id}/${this.props.user.id}/${proj.superuser}`}>
            <h4>{proj.title}</h4>
            <h5>時程：{proj.minDuration*0.5} 小時</h5>
          </Link>
        </div>
      );
    });
    const votedProjJSX = this.props.votedProj.map((proj) => {
      return (
        <div key={proj.id}>
          <Link to={`/vote/${proj.id}/${this.props.user.id}/${proj.superuser}`}>
            <h5>{proj.title} 時程：{proj.minDuration*0.5} 小時</h5>
          </Link>
        </div>
      );
    });
    return (
      <div>
        <h3>Remember to vote!</h3>
        <div className="row">
          {unvotedProjJSX}
        </div>
        <h3>You have voted!</h3>
        {votedProjJSX}
      </div>
    );
  }
}

export default voteList;
