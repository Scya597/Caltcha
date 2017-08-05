import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ListGroupItem, ListGroup } from 'react-bootstrap';

class voteList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const unvotedProjJSX = this.props.unvotedProj.map((proj) => {
      return (
        <div key={proj.id} className="col-md-3 unvoted-proj">
          <Link to={`/vote/${proj.id}/${this.props.user.id}/${proj.superuser}`}>
            <h4>{proj.title}</h4>
            <h5>時程：{proj.minDuration*0.5} 小時</h5>
          </Link>
        </div>
      );
    });
    const votedProjJSX = this.props.votedProj.map((proj) => {
      return (
        <ListGroupItem key={proj.id}>
          <Link to={`/vote/${proj.id}/${this.props.user.id}/${proj.superuser}`}>
            <h5><strong>{proj.title}</strong> Location: {proj.location} 時程：{proj.minDuration*0.5} 小時</h5>
          </Link>
        </ListGroupItem>
      );
    });
    return (
      <div>
        <h3>Remember to vote!</h3>
        <div className="row">
          {unvotedProjJSX}
        </div>
        <h3>You have voted!</h3>
        <ListGroup>
          {votedProjJSX}
        </ListGroup>
      </div>
    );
  }
}

export default voteList;
