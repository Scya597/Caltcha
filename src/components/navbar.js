import React, { Component } from 'react';
import { SplitButton, MenuItem, Popover, OverlayTrigger } from 'react-bootstrap';

class navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.popover = (
      <Popover id="popover-trigger-click-root-close" title="No Team Selected" />
    );
    this.selectTeam = this.selectTeam.bind(this);
  }

  componentDidMount() {
    this.selectTeam(this.props.selectedTeam.id);
    console.log(this.props.selectedTeam);
  }

  selectTeam = (teamId) => {
    if (typeof this.props.teams === 'undefined' || this.props.teams.length === 0) {
    } else {
      const teamName = this.props.teams.find(team => team.id === teamId).name;
      const teamMemberCnt = this.props.teams.find(team => team.id === teamId).members.length;
      this.popover = (
        <Popover id="popover-trigger-click-root-close" title={`${teamMemberCnt} members`}>
          {this.renderMemberList(teamId)}
        </Popover>
      );
      this.props.setSelectedTeam({
        id: teamId,
        name: teamName,
      });
    }
  }

  renderTeamList() {
    if (typeof this.props.user.team === 'undefined' || this.props.user.team.length === 0) {
      return <option>No team, haha.</option>;
    } else {
      return this.props.user.team.map(item => <MenuItem value={item} key={item} eventKey={item}>{this.props.teams.find(team => team.id === item).name}</MenuItem>);
    }
  }

  renderMemberList(teamId) {
    const selectedTeamObj = this.props.teams.find(team => team.id === teamId);
    return selectedTeamObj.members.map(item => <li key={item.id}>{item.username} <a href={`mailto:${item.email}`}><u>{item.email}</u></a></li>);
  }

  render() {
    return (
      <div className="row text-center">
        <div className="col-md-3">
          <h2>caltcha</h2>
        </div>
        <div className="col-md-2 col-md-offset-2">
          <OverlayTrigger id="nav-overlay" trigger="click" rootClose placement="bottom" overlay={this.popover}>
            <SplitButton title={this.props.selectedTeam.name || 'Select Team'} id="dropdown-team-sel" onSelect={event => this.selectTeam(event)}>
              {this.renderTeamList()}
            </SplitButton>
          </OverlayTrigger>
        </div>
        <div className="col-md-3">
          <div className="input-group">
            <span className="input-group-addon"><i className="glyphicon glyphicon-search" /></span>
            <input type="text" className="form-control" />
          </div>
        </div>
        <div className="col-md-1">
          <h5>{this.props.user.username}</h5>
        </div>
        <div className="col-md-1">
          <a href="/logout"><button className="btn btn-danger">Logout</button></a>
        </div>
      </div>
    );
  }
}

export default navbar;
