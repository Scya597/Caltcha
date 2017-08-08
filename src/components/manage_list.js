import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Panel, ProgressBar } from 'react-bootstrap';

const ifvote = require('../utils/functions/ifvote');

class manageList extends Component {
  constructor(props) {
    super(props);

    this.state = {};

  }
  rendervote = (proj) => {
    if (proj.normaluser.length === 0) {
      return (
        <ProgressBar
          now={Math.round((ifvote(proj).optionaluser.vote.length/proj.optionaluser.length) * 100)}
          label={`${Math.round((ifvote(proj).optionaluser.vote.length/proj.optionaluser.length) * 100)}%`}
          bsStyle="danger"
        />
      );
    } else {
      return (
        <ProgressBar
          now={Math.round((ifvote(proj).normaluser.vote.length/proj.normaluser.length) * 100)}
          label={`${Math.round((ifvote(proj).normaluser.vote.length/proj.normaluser.length) * 100)}%`}
          bsStyle="danger"
        />
      );
    }
  }

  render() {
    const superProjJSX = this.props.superProj.map((proj) => {
      return (
        <Link to={`/vote/${proj.id}/${this.props.user.id}/${proj.superuser}`} key={proj.id}>
          <Panel bsStyle="primary" className="btn-shadow">
              <h1>{proj.title}</h1>
              <div className="manage-list">
                <h4>Duration: {proj.minDuration * 0.5} hrs</h4>
                <h4>Location: {proj.location}</h4>
                {this.rendervote(proj)}
              </div>
              <div className="danger">
                <h5>Deadline: {proj.deadline}</h5>
              </div>
          </Panel>
        </Link>
      );
    });
    return (
      <div>
        <h3>Your Projects</h3>
        <Link to="/new"><Button bsStyle="primary" bsSize="large" className="btn-shadow" block>Add Event</Button></Link>
        <div className="manage-list-container list-border">
          {superProjJSX}
        </div>
      </div>
    );
  }
}

export default manageList;
