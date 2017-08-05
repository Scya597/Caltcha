import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class manageList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const superProjJSX = this.props.superProj.map((proj) => {
      return (
        <div key={proj.id}>
          <Link to={`/vote/${proj.id}/${this.props.user.id}/${proj.superuser}`}>
            <h4>{proj.title}</h4>
            <h5>時程：{proj.minDuration*0.5} 小時</h5>
          </Link>
        </div>
      );
    });
    return (
      <div>
        <h3>Your Projects</h3>
        <Link to="/new"><button className="btn btn-primary">Add Event</button></Link>
        {superProjJSX}
      </div>
    );
  }
}

export default manageList;
