import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Panel, ProgressBar } from 'react-bootstrap';

const ifvote = require('../utils/functions/ifvote');

class manageList extends Component {
  constructor(props) {
    super(props);

    this.state = { sProj: [] };

    this.getnormalvote = this.getnormalvote.bind(this);
  }
  componentDidMount() {
    const b = [];
    b.push(this.props.superProj.map(this.getnormalvote));
    this.setState({ sProj: b });
  }

  getnormalvote = (obj) => {
    const a = [];
    a.push({
      superuser: obj.superuser,
      minDuration: obj.minDuration,
      location: obj.location,
      id: obj.id,
      title: obj.title,
      sum: obj.normaluser.length,
      vote: ifvote(obj).normaluser.vote.length,
      deadline: obj.deadline,
    });
  }

  render() {
    const superProjJSX = this.state.sProj.map((proj) => {
      return (
        <Link to={`/vote/${proj.id}/${this.props.user.id}/${proj.superuser}`} key={proj.id}>
          <Panel bsStyle="primary" className="btn-shadow">
              <h1>{proj.title}</h1>
              <div className="manage-list">
                <h4>Duration: {proj.minDuration * 0.5} hrs</h4>
                <h4>Location: {proj.location}</h4>
                <ProgressBar
                  now={60}
                  label={`${60}%`}
                  bsStyle="danger"
                />
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
