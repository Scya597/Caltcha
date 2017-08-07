import React, { Component } from 'react';

export default class VoteAction extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="list-border col-md-12">
        <div className="list-border row status-bar">
          <p className="col-md-8">{'pick your time' || 'you have picked your time'}</p>
          <button className="btn btn-warning pull-xs-right">edit users</button>
        </div>
        <button className="btn btn-default row" onClick={() => this.props.vote()}>VOTE</button>
        <div className="row list-border">
          <h4 className="centify">statistics</h4>
        </div>
        <div>
          <h3>All members in this event: 5</h3>
          <h3>Normal Users(vote/not vote): 1/1</h3>
          <h3>Optional Users(vote/not vote): 2/2</h3>
          <h3>Closed Users: 1</h3>
          <div className="row">
            <img src="https://i.ytimg.com/vi/LrNhz02bS7A/maxresdefault.jpg" className="size" />
          </div>
        </div>
      </div>
    );
  }
}
