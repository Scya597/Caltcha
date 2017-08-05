import React, { Component } from 'react';
import { DropdownButton, SplitButton, MenuItem, Popover, OverlayTrigger } from 'react-bootstrap';

const popoverClickRootClose = (
  <Popover id="popover-trigger-click-root-close" title="Popover bottom">
    <strong>Holy guacamole!</strong> Check this info.
  </Popover>
);

class navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTeam: {},
    };
  }

  renderTeamList() {
    if (typeof this.props.user.team === 'undefined' || this.props.user.team.length === 0) {
      return <option>No team, haha.</option>;
    } else {
      return this.props.user.team.map(item => <MenuItem value={item} key={item} eventKey={item}>{this.props.teams.find(team => team.id === item).name}</MenuItem>);
    }
  }

  renderMemberListPopover() {
    return (
      <Popover id="popover-trigger-click-root-close" title="Popover bottom">
        <strong>{this.props.teams.find(team => team.id === this.state.selectedTeam.id).length}</strong> members
      </Popover>
    );
  }

  selectTeam(teamId) {
    if (typeof this.props.teams === 'undefined' || this.props.teams.length === 0) {
    } else {
      const teamName = this.props.teams.find(team => team.id === teamId).name;
      this.setState({
        selectedTeam: {
          id: teamId,
          name: teamName,
        },
      });
      this.props.setSelectedTeam({
        id: teamId,
        name: teamName,
      });
    }
  }

  render() {
    return (
      <div className="row text-center">
        <div className="col-md-3">
          <h2>caltcha</h2>
        </div>
        <div className="col-md-2 col-md-offset-2">
          <OverlayTrigger id="nav-overlay" trigger="click" rootClose placement="bottom" overlay={popoverClickRootClose}>
          <SplitButton title={this.state.selectedTeam.name || 'Select Team'} id="dropdown-team-sel" onSelect={event => this.selectTeam(event)}>
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
