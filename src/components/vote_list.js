import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ListGroupItem, ListGroup, Panel } from 'react-bootstrap';

function finaldateFormat(finaldate) {
  if (typeof finaldate.date === 'undefined') {
    return 'Final Date not announced.';
  } else {
    const formattedTime = (`00${finaldate.timeblocks[0] * 30}`).slice(-4);
    return `${finaldate.date} ${formattedTime}`;
  }
}

class voteList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const unvotedProjJSX = this.props.unvotedProj.map((proj) => {
      return (
        <div className="col-md-3" key={proj.id}>
          <Link to={`/vote/${proj.id}/${this.props.user.id}/${proj.superuser}`}>
            <Panel bsStyle="danger" header={proj.title} className="btn-shadow">
              <h5>Created by @{this.props.teams.find(team => team.id === proj.team).members.find(member => member.id === proj.superuser).username}</h5>
              <h5>Duration: {proj.minDuration * 0.5} hrs</h5>
              <h5>Deadline: {proj.deadline}</h5>
            </Panel>
          </Link>
        </div>
      );
    });
    const votedProjJSX = this.props.votedProj.map((proj) => {
      return (
        <ListGroupItem key={proj.id} >
          <Link to={`/vote/${proj.id}/${this.props.user.id}/${proj.superuser}`}>
            <h5>{finaldateFormat(proj.finaldate)} <strong>{proj.title},</strong> Location: {proj.location}, Duration：{proj.minDuration * 0.5} hrs</h5>
          </Link>
        </ListGroupItem>
      );
    });
    return (
      <div>
        <h3>Remember to vote!</h3>
        <div className="row list-border">
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
