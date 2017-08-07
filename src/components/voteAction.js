import React, { Component } from 'react';

export default class VoteAction extends Component {
  constructor(props) {
    super(props);

    this.idCheckOut = this.idCheckOut.bind(this);
    this.checkNormal = this.checkNormal.bind(this);
    this.checkOptional = this.checkOptional.bind(this);
  }

  checkNormal() {
    this.props.voteData.normaluser.vote.forEach(id => {
      if (id === myId) return true;
      else return false;
    });
  }

  checkOptional() {
    this.props.voteData.optionaluser.vote.forEach(id => {
      if (id === myId) return true;
      else return false;
    });
  }

  idCheckOut() {
    const n = this.checkNormal(this.props.myId);
    const o = this.checkOptional(this.props.myId);
    if (n === false && o === false) return true;
    else return false;
  }

  renderVoted() {
    const bool = this.idCheckOut();
    if (bool === true) return (
      <div className="list-border row status-bar">
        <h2 className="col-md-10">you have picked your time</h2>
        <button className="btn btn-warning col-md-2">edit users</button>
      </div>
    );
    else return (
      <div className="list-border row status-bar">
        <h2 className="col-md-12">pick your time</h2>
      </div>
    );
  }

  render() {
    const { normaluser, optionaluser, closeduser } = this.props.voteData;
    const all = normaluser.vote.length + normaluser.nvote.length + optionaluser.vote.length + optionaluser.nvote.length;

    return (
      <div className="list-border col-md-12">
        {this.renderVoted()}
        <button className="btn btn-default row" onClick={() => this.props.vote()}>VOTE</button>
        <div className="row list-border">
          <h2 className="centify">statistics</h2>
        </div>
        <div>
          <h3>All members in this TEAM: {all + closeduser.length}</h3>
          <h3>All members in this EVENT: {all}</h3>
          <h3>Normal Users(vote/not vote): {normaluser.vote.length}/{normaluser.nvote.length + normaluser.vote.length}</h3>
          <h3>Optional Users(vote/not vote): {optionaluser.vote.length}/{optionaluser.nvote.length + optionaluser.vote.length}</h3>
          <br />
          <h3>Closed Users: {closeduser.length}</h3>
          <div className="row">
            <img src="https://i.ytimg.com/vi/LrNhz02bS7A/maxresdefault.jpg" className="size" />
          </div>
        </div>
      </div>
    );
  }
}
