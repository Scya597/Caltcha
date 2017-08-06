import React, { Component } from 'react';
import { SplitButton, MenuItem, Popover, OverlayTrigger, Navbar, NavItem, Nav, Button, ButtonGroup, Glyphicon, InputGroup, FormGroup, FormControl } from 'react-bootstrap';
import axios from 'axios';

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
      axios.get('/api/profile')
        .then((res) => {
          let team;
          team = res.data.teams[0];
          const teamMemberCnt = res.data.teams[0].members.length;
          this.popover = (
            <Popover id="popover-trigger-click-root-close" title={`${teamMemberCnt} members`}>
              {team.members.map(this.renderemail)}
            </Popover>
          );
        })
        .catch((err) => {
          console.log(err);
        });
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
  renderemail = (item) => {
    return <li key={item.id}>{item.username} <a href={`mailto:${item.email}`}><u>{item.email}</u></a></li>;
  }

  handleNavLink() {
    window.location = '/logout';
  }

  render() {
    return (
<<<<<<< HEAD
      <Navbar collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <h2>
              <span className="logo">
                <span className="letter">c</span>
                a
                <span className="cool">l</span>
                t
                <span className="letter">c</span>
                <span className="cool">h</span>
                a
              </span>
            </h2>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem>
              <OverlayTrigger id="nav-overlay" trigger="click" rootClose placement="bottom" overlay={this.popover}>
                <SplitButton title={this.props.selectedTeam.name || 'Select Team'} id="dropdown-team-sel" onSelect={event => this.selectTeam(event)}>
                  {this.renderTeamList()}
                </SplitButton>
              </OverlayTrigger>
            </NavItem>
          </Nav>
          <Nav pullRight>
            <NavItem>
              <Navbar.Form>
                <FormGroup>
                  <InputGroup>
                    <InputGroup.Addon><Glyphicon glyph="search" /></InputGroup.Addon>
                    <FormControl type="text" placeholder="Search" />
                  </InputGroup>
                </FormGroup>
              </Navbar.Form>
            </NavItem>
            <NavItem>
              <ButtonGroup>
                <Button>{this.props.user.username}</Button>
                <Button onClick={this.handleNavLink} bsStyle="danger">Logout</Button>
              </ButtonGroup>
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
=======
      <div className="row text-center nav">
        <div className="col-md-3">
          <h2>
            <span className="logo">
              <span className="letter">c</span>
              a
              <span className="cool">l</span>
              t
              <span className="letter">c</span>
              <span className="cool">h</span>
              a
            </span>
          </h2>
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
          <a href="/logout"><button className="btn btn-secondary">Logout</button></a>
        </div>
      </div>
>>>>>>> Maximus
    );
  }
}

export default navbar;
