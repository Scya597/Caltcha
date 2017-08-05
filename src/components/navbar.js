import React, { Component } from 'react';

class navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-3">
          <h2>caltcha</h2>
        </div>
        <div className="col-md-2 offset-md-2">
        </div>
        <div className="col-md-2">
          <div className="input-group">
            <span className="input-group-addon"><i className="glyphicon glyphicon-search" /></span>
            <input type="text" className="form-control" />
          </div>
        </div>
        <div className="col-md-2">
          <h5>{this.props.user.username}</h5>
        </div>
        <div className="col-md-1">
          <a href="/logout"><button>Logout</button></a>
        </div>
      </div>
    );
  }
}

export default navbar;
