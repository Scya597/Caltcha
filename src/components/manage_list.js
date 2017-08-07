import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Panel } from 'react-bootstrap';

class manageList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const superProjJSX = this.props.superProj.map((proj) => {
      return (
        <Link to={`/vote/${proj.id}/${this.props.user.id}/${proj.superuser}`} key={proj.id}>
          <Panel bsStyle="primary" className="btn-shadow">
              <h3>{proj.title}</h3>
              <h5>Duration: {proj.minDuration*0.5} hrs</h5>
              <h5>Location: {proj.location}</h5>
              <h5>Deadline: {proj.deadline}</h5>
          </Panel>
        </Link>
      );
    });
    return (
      <div>
        <h3>Your Projects</h3>
        <Link to="/new"><Button bsStyle="primary" bsSize="large" className="btn-shadow" block>Add Event</Button></Link>
        <div className="manage-list-container">
          {superProjJSX}
        </div>
      </div>
    );
  }
}

export default manageList;
